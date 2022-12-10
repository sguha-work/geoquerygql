import gql from 'graphql-tag';
import React from 'react';
import { useSubscription } from '@apollo/react-hooks';

const GEOLOCATION_INSERTED_FOR = gql`
      subscription GeoLocationInsertedForIndividual($name: String!){
        geoLocationInsertedForIndividual(name: $name) {
            _id
            createdAt
            latitude
            longitude
            name
        }
      }
`;

const LocationTable = () => {
  const { data, error, loading } = useSubscription(GEOLOCATION_INSERTED_FOR, {
    variables: {
      name: "Angshu"
    }
  });
  console.log('data from subscription',data);
  if (loading) {
    return (<div>Loading...</div>);
  };

  if (error) {
    return (<div>Error! {error.message}</div>);
  };
  
  return (
    <div className="notification">
      hi
    </div>
  );
}

export default LocationTable;
