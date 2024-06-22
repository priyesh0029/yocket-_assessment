import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCities, setVehicles } from "./Features/gameSlice";
import LandingPage from "./components/LandingPage";
import CopSelectionPage from "./components/CopSelectionPage";
import CitySelectionPage from "./components/CitySelectionPage";
import VehicleSelectionPage from "./components/VehicleSelectionPage";
import ResultPage from "./components/ResultPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "@material-tailwind/react";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.game.stage);

  useEffect(() => {
    axios.get("http://localhost:3000/cities").then((response) => {
      dispatch(setCities(response.data));
    });
    axios.get("http://localhost:3000/vehicles").then((response) => {
      dispatch(setVehicles(response.data));
    });
  }, [dispatch]);

  const renderStage = () => {
    switch (stage) {
      case "landing":
        return <LandingPage />;
      case "copSelection":
        return <CopSelectionPage />;
      case "citySelection":
        return <CitySelectionPage />;
      case "vehicleSelection":
        return <VehicleSelectionPage />;
      case "result":
        return <ResultPage />;
      default:
        return <LandingPage />;
    }
  };

  return <div className="app">{renderStage()}</div>;
};

export default App;
