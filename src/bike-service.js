export default class BikeService {
  static getStolen(location) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=50&location=${location}&distance=10&stolenness=proximity`)
    .then(function(response) {
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } else {
        const queryResponse = response.json();
        const filteredBikes = queryResponse.bikes.map(function(bike) {
          return {
            "serialNum" : bike.serial,
            "date_stolen" : bike.date_stolen,
            "title" : bike.title,
            "url" : bike.url
          }  
        });
        return filteredBikes;
      }
    })
    .catch(function(error) {
      return error;
    });
  }
}