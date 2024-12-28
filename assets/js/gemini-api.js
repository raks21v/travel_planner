import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite's import.meta.env to access environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function generateTrip(preferences) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Generate Travel Plan for Location: ${preferences.destination}, for ${preferences.days} Days for ${preferences.companions} with a ${preferences.budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions based on their live location or the places nearby them and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${preferences.days} days with each day plan with best time to visit in JSON format.`,
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage("Generate the travel plan");
    console.log('API response:', result);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Error generating trip:', error.message);
    throw error;
  }
}

export function saveTripToLocal(tripDetails) {
  let trips = JSON.parse(localStorage.getItem("savedTrips")) || [];
  trips.push(tripDetails);
  localStorage.setItem("savedTrips", JSON.stringify(trips));
}

export function getSavedTrips() {
  return JSON.parse(localStorage.getItem("savedTrips")) || [];
}