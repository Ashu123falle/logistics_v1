// src/api/vehicle.js
import { API } from "./api";

export const postVehicle = async (vehicleData) => {
  try {
    const response = await API.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error posting vehicle:", error);
    throw error;
  }
};
