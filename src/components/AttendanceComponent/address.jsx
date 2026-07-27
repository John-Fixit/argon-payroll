import { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];
const api = "AIzaSyBEPMCw_nu2eFsNg"

function Map() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const { isLoaded, } = useJsApiLoader({
    googleMapsApiKey: api,
    libraries,
  });


//   useEffect(() => {
//     getAddress(latitude, longitude,);
//   }, [isLoaded])
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          getAddress(latitude, longitude, isLoaded);
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [isLoaded]);

  const getAddress = (lat, lng) => {
    // console.log('here', isLoaded)
    if (isLoaded){
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              setAddress(results[0].formatted_address);
            } else {
              setError('No results found');
            }
          } else {
            setError('Geocoder failed due to: ' + status);
          }
        });
    }
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Latitude: {location.lat}, Longitude: {location.lng}</p>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
}

export default Map;
