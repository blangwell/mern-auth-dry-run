import axios from 'axios';

// This utility will add the authorized user's JSON Web Token (JWT)
// to the request header
// Any routes that are protected will require the JWT to access

const setAuthToken = token => {
  if (token) {
    // Apply token to every request header
    axios.defaults.headers.common['Authorization'] = token;
    console.log(axios.defaults.headers.common);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;