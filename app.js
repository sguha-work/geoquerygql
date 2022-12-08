import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import https from 'https';
import fs from 'fs';
import cors from "cors";
import schema from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*"
    })
);
app.use('/gql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));
(async () => {
    https.createServer({
        key: fs.readFileSync("./key.pem"),
        cert: fs.readFileSync("./cert.pem"),
        requestCert: false,
        rejectUnauthorized: false,
    }, app).listen(3005, function () {
        console.log("Successfully started server on port 3005");
    });
})();

/**
 * Example mutation
 * 
 mutation {
  insertGeoLocationDetail(geolocationinput:{
    name:"Angshu",
    latitude:10.009,
    longitude:11.234
  }) {
    _id
    name
    latitude
    longitude
    createdAt
  }
}

query {
  geolocations {
    _id
    name
    latitude
    longitude
    createdAt
  }
}
 */