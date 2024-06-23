import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStage, setCopSelections } from "../store/slices/gameSlice";

const CitySelectionPage = () => {
  const dispatch = useDispatch();
  const { currentCop, copSelections, cities } = useSelector(
    (state) => state.game
  );
  const [selectedCity, setSelectedCity] = useState("");
  // const [selectedCopInfo, setselectedCopInfo] = useState({});

  const handleCitySelect = (city) => {
    const selection = copSelections.find((copInfo) => copInfo.city === city);

    if (selection && selection.copName !== currentCop) {
      // setselectedCopInfo(selection);
      console.log("copSelections : ", selection);
      alert(`${city} already selected by ${selection.copName}!`);
    } else {
      setSelectedCity(city);
    }
  };

  const handleSubmit = () => {
    const existingCop = copSelections.filter(
      (copInfo) => copInfo.copName !== currentCop
    );
    const newSelections = [
      ...existingCop,
      { copName: currentCop, city: selectedCity },
    ];
    dispatch(setCopSelections(newSelections));

    dispatch(setStage("vehicleSelection"));
  };

  return (
    <div className=" city-selection">
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
