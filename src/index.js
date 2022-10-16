import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './bike-service.js';

// Business Logic

function getStolen(location) {
  BikeService.getStolen(location)
  .then(function(response) {
    if (response.bikes) {
      printElements(response, location);
    } else {
      printError(response, location);
    }
  });
}

// UI Logic

function printElements(response, location) {
document.querySelector('#showResponse').innerText = `The following bikes have been stolen in the ${location} area: ${response.bikes}`
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

window.addEventListener("load", function() {
  this.document.querySelector('form').addEventListener("submit", handleFormSubmission);
});