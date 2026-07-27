import axios from 'axios';

// *** API SETUP ***/
// const token= JSON.parse(localStorage.getItem('communeety-auth-session'))?.state?.userData?.token;

// export const APINEW = axios.create({ baseURL: `http://107.23.145.186/api/index.php/` });


export const APINEW = axios.create({ baseURL: `https://hrnew.creditclan.com/index.php/` }); //https://hrnew.creditclan.com/api/index.php/
APINEW.interceptors.request.use((req) => {

  // const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
  //   ?.state?.userData?.token;

  // req.headers['Token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});

export const APIAPPROVAL = axios.create({ baseURL: `https://hrnew.creditclan.com/index.php/` }); //https://hrnew.creditclan.com/api/index.php/
APIAPPROVAL.interceptors.request.use((req) => {
  // const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
  //   ?.state?.userData?.token;

  // req.headers['token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});





// const API = axios.create({ baseURL: `http://lamp3.ncaa.gov.ng/` });
// const API = axios.create({ baseURL: `https://hr.ncaa.gov.ng/apis/` });
const API = axios.create({ baseURL: `https://hr.ncaa.gov.ng/old_hr/apis/` });
API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
    ?.state?.userData?.token;

  req.headers['token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});
export default API;

export const APILocal = axios.create({ baseURL: `http://localhost:3000/api/` });
APILocal.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
    ?.state?.userData?.token;
  req.headers['token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});

// export const APIAttendance = axios.create({ baseURL: `http://54.236.118.226/hr/api/` });
// export const APIAttendance = axios.create({ baseURL: `https://hr.ncaa.gov.ng/old_hr/apis/` });
export const APIAttendance = axios.create({ baseURL: `https://blockchain.creditclan.com/api/` }); //https://blockchain.creditclan.com/hr/api/
APIAttendance.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
    ?.state?.userData?.token;
  req.headers['token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});

export const API_FILE = axios.create({ baseURL: `http://lamp3.ncaa.gov.ng/` });
API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem('communeety-auth-session'))
    ?.state?.userData?.token;
  req.headers['token'] = token || '';
  req.headers['Content-type'] = 'multipart/form-data';
  req.headers['Accept'] = 'multipart/form-data';
  return req;
});

// // Optional: Add a response interceptor to handle token expiration
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Token has expired or is invalid
//       localStorage.removeItem('communeety-auth-session');
//       // Redirect to login page or dispatch a logout action
//        window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
