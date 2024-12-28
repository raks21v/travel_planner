// Import the generateTrip function from gemini-api.js
const { generateTrip } = require('./gemini-api');

// Handle form submission for travel preferences
document.getElementById("travel-preferences-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const preferences = {
    destination: document.getElementById("destination").value,
    days: document.getElementById("days").value,
    budget: document.querySelector('input[name="budget"]:checked').value,
    companions: document.querySelector('input[name="companions"]:checked').value,
  };

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

// Save trip details to local storage
function saveTripToLocal(tripDetails) {
  const trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.push(tripDetails);
  localStorage.setItem("trips", JSON.stringify(trips));
}

// Get saved trips from local storage
function getSavedTrips() {
  return JSON.parse(localStorage.getItem("trips")) || [];
}

// To display trip details
if (document.getElementById("trip-details")) {
  const trips = getSavedTrips();
  const latestTrip = trips[trips.length - 1];
  document.getElementById("trip-details").innerHTML = `
    <h2>Destination: ${latestTrip.destination}</h2>
    <p>Duration: ${latestTrip.days} days</p>
    <p>Budget: ${latestTrip.budget}</p>
    <p>Companions: ${latestTrip.companions}</p>
    <h3>Itinerary:</h3>
    <ul>
      ${latestTrip.itinerary.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}