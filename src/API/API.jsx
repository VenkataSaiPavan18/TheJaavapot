import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://pagoanalytics.azurewebsites.net";


export const sendLocationData = async (
  latitude,
  longitude,
  sessionId,
  website
) => {
  if (!sessionId) {
    sessionId = uuidv4();
  }

  try {
    const response = await axios.post(`${API_URL}/cookies/user-info/gather-info`, {
      location: { latitude, longitude },
      sessionId,
      website,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending location data:", error);
    return error.response;
  }
};
