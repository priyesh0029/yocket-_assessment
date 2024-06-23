import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStage, setCopSelections, setResult } from "../store/slices/gameSlice";
// import axios from "axios";
import { handleSelection } from "../utils/vehicleSelection";
import { captureResult } from "../services/resultApis/captureResult";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const VehicleSelectionPage = () => {
  const dispatch = useDispatch();
  const { currentCop, copSelections, vehicles, cities } = useSelector(
    (state) => state.game
  );
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const handleVehicleSelect = (vehicleInfo) => {
    const selection = handleSelection(currentCop,vehicleInfo,cities,copSelections);
    if (!selection.status) {
      alert(selection.message);
    } else {
      setSelectedVehicle(vehicleInfo.kind);
    }
  };

  const handleSubmit = async () => {
    const newSelections = copSelections.map((selection) =>
      selection.copName === currentCop
        ? { ...selection, vehicle: selectedVehicle }
        : selection
    );
    dispatch(setCopSelections(newSelections));
    if (newSelections.length < 3) {
      dispatch(setStage("copSelection"));
    } else {
      console.log("body data before sending the request : ", newSelections);
      // const response = await axios.post(
      //   "http://localhost:3000/capture",
      //   newSelections
      // );
      handleCaptureResult(newSelections)
      // dispatch(setResult(response.data));
      // dispatch(setStage("result"));
    }
  };

  const handleCaptureResult = async (newSelections) => {
    try {
      const response = await captureResult(newSelections);
      dispatch(setResult(response.data));
      dispatch(setStage("result"));
    } catch (error) {
      toast.error(`Failed to capture result: ${error.message}`);
      console.error("Failed to capture result:", error);
    }
  };
  
  return (
    <div className=" vehicle-selection">
       <ToastContainer />
      <div className="description">
        <h1>Select a Vehicle</h1>
        <p>Select a vehicle for {currentCop} to use.</p>
      </div>
      <div className="carousel">
        {vehicles.map((vehicle) => (
          <div key={vehicle.kind} onClick={() => handleVehicleSelect(vehicle)}>
            <h2>{vehicle.kind}</h2>
          </div>
        ))}
      </div>
      {selectedVehicle && <button onClick={handleSubmit}>Next</button>}
    </div>
  );
};

export default VehicleSelectionPage;
