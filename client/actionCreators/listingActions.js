import axios from 'axios';

export const GET_LISTINGS = 'GETLISTINGS';
export const POST_LISTINGS = 'POSTLISTINGS';
export const PUT_LISTINGS = 'PUTLISTINGS';

export const getListings = function(){
  const request = axios.get('/api/listings/', {
    headers: {'x-access-token': window.localStorage.getItem('userToken')}
  })
  // .then(function (response) {
  //   console.log('listings response received', response.data);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  return {
    type: GET_LISTINGS,
    payload: request
  };
}

export const postListing = function(preference, user_id){
  const request = axios.post('/api/listings/', {
    location: preference.location,
    price: preference.price,
    pets: preference.pets
  }).catch((response) => {
    if(response instanceof Error){
      console.error('Error sending response', response);
    } else {
      console.error('Error from server', response);
    }
  });

  return {
    type: POST_LISTINGS,
    payload: request
  }
}

//TODO: Accommodate (with BE) to be a fully flexible PUT request
export const putListing = function(listing) {
  const request = axios.put('/api/listings/', {
    listing
  }).catch((response) => {
    if(response instanceof Error){
      console.error('Error sending response', response);
    } else {
      console.error('Error from server', response);
    }
  });

  return {
    type: PUT_LISTINGS,
    payload: request
  }
}
