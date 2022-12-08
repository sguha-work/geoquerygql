import { buildSchema } from 'graphql';
const schema = buildSchema(`
        type GeoLocation {
            _id: ID!
            name: String!
            latitude: Float!
            longitude: Float!
            createdAt: Float!
        }
        input GeoLocationInput {
            name: String!
            latitude: Float!
            longitude: Float!
        }
        type RootQuery {
            geolocations: [GeoLocation!]!
        }
        type RootMutation {
            insertGeoLocationDetail(geolocationinput: GeoLocationInput): GeoLocation
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
export default schema;