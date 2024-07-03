import { BASE_URL } from "../../constants/mainUrl";
import axios from 'axios';

//get all places details
export const getPlacesData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/places`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred while fetching places.");
    } else if (error.request) {
      throw new Error("No response received from server while fetching places.");
    } else {
      throw new Error(error.message || "An error occurred while fetching places.");
    }
  }
};
