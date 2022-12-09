import * as GeoLocation from './../models/geolocation.model.js';
import {PubSub} from 'graphql-subscriptions';
const pubsub = new PubSub();

const resolvers = {
    Query: {
        geolocations: async (args) => {
            const result = await GeoLocation.default.find();
            return result.map((dataChunk) => {
                return { ...dataChunk._doc };
            });
        },
        geolocationsbyname: async (args) => {
            let result;
            if (typeof args.name !== 'undefined') {
                result = await GeoLocation.default.find({ "name": args.name });
            } else {
                result = await GeoLocation.default.find();
            }
            return result.map((dataChunk) => {
                return { ...dataChunk._doc };
            });
        },
    },
    Mutation: {
        insertGeoLocationDetail: async (args) => {
            const location = new GeoLocation.default({
                name: args.geolocationinput.name,
                latitude: args.geolocationinput.latitude,
                longitude: args.geolocationinput.longitude,
            });
            let result;
            try {
                result = await location.save();
            } catch (error) {
                console.error('Unable to save car info', error);
            }
            return { ...result._doc };
        }
    },
    Subscription: {
        geoLocationUpdated: {
            subscribe: () => {
                return pubsub.asyncIterator('GEOLOCATION_UPDATED');
            }
        }
    }
};
export default resolvers;