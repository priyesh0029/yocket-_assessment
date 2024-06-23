import { BASE_URL } from "../../constants/mainUrl";
import axios from 'axios';

//get all vehicle details
export const getVehiclesData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles`);
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred while fetching vehicles.");
    } else if (error.request) {
      throw new Error("No response received from server while fetching vehicles.");
    } else {
      throw new Error(error.message || "An error occurred while fetching vehicles.");
    }
  }
};
