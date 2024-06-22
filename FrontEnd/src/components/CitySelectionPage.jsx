import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStage, setCopSelections } from '../Features/gameSlice';

const CitySelectionPage = () => {
  const dispatch = useDispatch();
  const { currentCop, copSelections, cities } = useSelector((state) => state.game);
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    if (copSelections.some(selection => selection.city === city)) {
      alert('City already selected by another cop!');
    } else {
      setSelectedCity(city);
    }
  };

  const handleSubmit = () => {
    const newSelections = [...copSelections, { copName: currentCop, city: selectedCity }];
    dispatch(setCopSelections(newSelections));
    if (newSelections.length < 3) {
      dispatch(setStage('copSelection'));
    } else {
      dispatch(setStage('vehicleSelection'));
    }
  };

  return (
    <div className="page city-selection">
      <div className="description">
        <h1>Select a City</h1>
        <p>Select a city for {currentCop} to investigate.</p>
      </div>
      <div className="carousel">
        {cities.map((city) => (
          <div key={city.name} onClick={() => handleCitySelect(city.name)}>
            <h2>{city.name}</h2>
          </div>
        ))}
      </div>
      {selectedCity && <button onClick={handleSubmit}>Next</button>}
    </div>
  );
};

export default CitySelectionPage;
