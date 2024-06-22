import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStage, setCopSelections, setResult } from '../Features/gameSlice';
import axios from 'axios';

const VehicleSelectionPage = () => {
  const dispatch = useDispatch();
  const { currentCop, copSelections, vehicles } = useSelector((state) => state.game);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSubmit = async () => {
    const newSelections = copSelections.map((selection) =>
      selection.copName === currentCop ? { ...selection, vehicle: selectedVehicle } : selection
    );
    dispatch(setCopSelections(newSelections));
    if (newSelections.some((selection) => !selection.vehicle)) {
      dispatch(setStage('copSelection'));
    } else {
      const response = await axios.post('http://localhost:3000/capture', { copSelections: newSelections });
      dispatch(setResult(response.data));
      dispatch(setStage('result'));
    }
  };

  return (
    <div className="page vehicle-selection">
      <div className="description">
        <h1>Select a Vehicle</h1>
        <p>Select a vehicle for {currentCop} to use.</p>
      </div>
      <div className="carousel">
        {vehicles.map((vehicle) => (
          <div key={vehicle.kind} onClick={() => handleVehicleSelect(vehicle.kind)}>
            <h2>{vehicle.kind}</h2>
          </div>
        ))}
      </div>
      {selectedVehicle && <button onClick={handleSubmit}>Next</button>}
    </div>
  );
};

export default VehicleSelectionPage;
