import ApolloClient from './../../services/Apollo.service.js';
import { ApolloProvider } from '@apollo/react-hooks';
import LocationTable from '../LocationTable/LocationTable.component.js';
const LocationDisplay = () => (
    <ApolloProvider client={ApolloClient}>
        <LocationTable />
    </ApolloProvider>
  );
   
  export default LocationDisplay;
  