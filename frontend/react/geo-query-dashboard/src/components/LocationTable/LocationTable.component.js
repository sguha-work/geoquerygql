import gql from 'graphql-tag';
import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { useState } from 'react';
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

const LocationTable = (props) => {
  const [locationData, setLocationData] = useState([]);
  const { data, error, loading } = useSubscription(GEOLOCATION_INSERTED_FOR, {
    variables: {
      name: props.userName
    }
  });
  console.log(`data from subscription: ${props.userName}`, data);
  if (data && data.geoLocationInsertedForIndividual) {
    const locationList = [...locationData];
    locationList.push(data.geoLocationInsertedForIndividual);
    setLocationData(locationList);
  }
  if (loading) {
    return (<div>Loading...</div>);
  };

  if (error) {
    return (<div>Error! {error.message}</div>);
  };

  return (
    <div className="notification">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {
            locationData.map((data, index) => (
              <tr key={index}>
                <td>{data.createdAt}</td>
                <td>{data.latitude}</td>
                <td>{data.longitude}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default LocationTable;
