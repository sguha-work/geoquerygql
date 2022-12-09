import express from 'express';
import https from 'https';
import fs from 'fs';
import {ApolloServer} from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import {makeExecutableSchema} from '@graphql-tools/schema';
dotenv.config();
mongoose.connect(`mongodb+srv://angshu_mongo:HhWjjsZoi1wDqZkj@cluster0.1f9ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('Database connection established');
}).catch((error) => {
    console.error('Unable to connect to database ', error);
});


import typeDefs from './typedefs/typedefs.js';
import resolvers from './resolvers/resolvers.js';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
const port = process.env.PORT || 3005;
const startServer = async () => {
    const app = express();
    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(port, () => {
        console.log(`Server listning to port ${port}`);
    });
    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe
    }, {
        server: httpsServer,
        path: '/api'
    });
    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }]
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: "/api" });
};
startServer();