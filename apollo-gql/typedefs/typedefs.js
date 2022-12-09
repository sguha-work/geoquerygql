
import {gql} from 'apollo-server-express';
const typeDefs = gql`
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
    type Query {
        geolocations: [GeoLocation!]!,
            geolocationsbyname(name: String):[GeoLocation!]!
    }
    type Mutation {
        insertGeoLocationDetail(geolocationinput: GeoLocationInput): GeoLocation
    }
    type Subscription {
        geoLocationUpdated: [GeoLocation!]!
    }
`;
export default typeDefs;