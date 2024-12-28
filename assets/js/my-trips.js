// assets/js/my-trips.js

document.addEventListener("DOMContentLoaded", () => {
    const trips = getSavedTrips();
    const tripsContainer = document.getElementById("saved-trips");
  
    if (trips.length === 0) {
      tripsContainer.innerHTML = "<p>No trips saved yet.</p>";
    } else {
      tripsContainer.innerHTML = trips.map((trip, index) => `
        <div class="trip">
          <h2>Trip ${index + 1}</h2>
          <p>Destination: ${trip.destination}</p>
          <p>Duration: ${trip.days} days</p>
          <p>Budget: ${trip.budget}</p>
          <p>Companions: ${trip.companions}</p>
          <h3>Itinerary:</h3>
          <ul>
            ${trip.itinerary.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }
  });