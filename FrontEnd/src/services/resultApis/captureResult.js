import { BASE_URL } from "../../constants/mainUrl";
import axios from 'axios';
import { toast } from 'react-toastify';

export const captureResult = async (copsDetails) => {
  try {
    console.log("copsDetails in capture api call : ",copsDetails);
    const response = await axios.post(`${BASE_URL}/capture`, copsDetails);
    return response;
  } catch (error) {
    toast.error(`Failed to capture result: ${error.message}`);
    console.error("Failed to capture result:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};
