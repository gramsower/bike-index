import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service.js';

// Business Logic

function resultsFilter(response, location) {
  //   BikeService.resultsFilter(response);
  const filteredBikes = response.bikes.map(function (bike) {
    return { 
      "serialNum": bike.serial,
      "date_stolen": bike.date_stolen,
      "title": bike.title,
      "url": bike.url
    };
  });
  console.log(filteredBikes);
  printElements(filteredBikes, location);
}
function getStolen(location) {
  BikeService.getStolen(location)
    .then(function (response) {
      if (response.bikes) {
        resultsFilter(response, location);
      } else {
        printError(response, location);
      }
    });
}

// UI Logic

function printElements(filteredBikes, location) {
  const bikeList = JSON.stringify(filteredBikes)
  document.querySelector('#showResponse').innerText = `The following bikes have been stolen in the ${location} area: ${bikeList}`;

}

function printError(error, location) {
  document.querySelector('#showResponse').innerText = `There was an error revealing stolen bikes for ${location}:
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getStolen(location);
}

window.addEventListener("load", function () {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});