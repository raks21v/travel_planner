import { generateTrip, saveTripToLocal, getSavedTrips } from './api.js';

// Handle form submission for travel preferences
document.getElementById("travel-preferences-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const preferences = {
    destination: document.getElementById("destination").value,
    days: document.getElementById("days").value,
    budget: document.querySelector('input[name="budget"]:checked').value,
    companions: document.querySelector('input[name="companions"]:checked').value,
  };

  console.log("Form submitted with preferences:", preferences);

  try {
    const tripDetails = await generateTrip(preferences);
    console.log('Generated trip details:', tripDetails);
    saveTripToLocal(tripDetails);
    window.location.href = "trip-details.html";
  } catch (error) {
    alert("Error: " + error.message);
    console.log("Error generating trip:", error);
  }
});

// To display trip details
if (document.getElementById("trip-details")) {
  const trips = getSavedTrips();
  const latestTrip = trips[trips.length - 1];

  if (latestTrip) {
    document.getElementById("trip-details").innerHTML = `
      <h1>${latestTrip.destination}</h1>
      <p>A beautiful coastal destination known for its beaches and vibrant nightlife.</p>

      <h2>Hotel Recommendations</h2>
      ${latestTrip.hotels.map(hotel => `
        <div>
          <h3>${hotel.name}</h3>
          <p>Price: ${hotel.price}</p>
          <p>Rating: ${hotel.rating} stars</p>
        </div>
      `).join('')}

      <h2>Places to Visit</h2>
      ${latestTrip.itinerary.map(day => `
        <h3>${day.title}</h3>
        <p>${day.description}</p>
      `).join('')}
    `;
  } else {
    document.getElementById("trip-details").innerHTML = "<p>No trip details available.</p>";
  }
}