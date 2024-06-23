import { BASE_URL } from "../../constants/mainUrl";
import axios from 'axios';

//get all cities details
export const getCitiesData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred while fetching cities.");
    } else if (error.request) {
      throw new Error("No response received from server while fetching cities.");
    } else {
      throw new Error(error.message || "An error occurred while fetching cities.");
    }
  }
};
