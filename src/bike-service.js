export default class BikeService {
  static getStolen(location='IP') {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=50&location=${location}&distance=10&stolenness=proximity`)
      .then(function (response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}