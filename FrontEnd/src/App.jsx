import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCities, setVehicles } from "./store/slices/gameSlice";
import LandingPage from "./components/LandingPage";
import CopSelectionPage from "./components/CopSelectionPage";
// import CitySelectionPage from "./components/CitySelectionPage";
// import VehicleSelectionPage from "./components/VehicleSelectionPage";
import ResultPage from "./components/ResultPage";
import "./App.css";
import { getCitiesData } from "./services/homeApis/getCities";
import { getVehiclesData } from "./services/homeApis/getVehicles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { copsDescription, copsInfo } from "./constants/copsPageDetails";
import { cityDescription } from "./constants/cityDetails";
import { vehicleDescription } from "./constants/vehicleDetails";

const App = () => {
  const dispatch = useDispatch();
  const { stage, cities ,vehicles} = useSelector((state) => state.game);
  const cityErrorShown = useRef(false);
  const vehicleErrorShown = useRef(false);

  useEffect(() => {
    const handleGetCities = async () => {
      try {
        const response = await getCitiesData();
        dispatch(setCities(response.data));
        cityErrorShown.current = false;
      } catch (error) {
        if (!cityErrorShown.current) {
          toast.error(`Failed to fetch cities: ${error.message}`);
          cityErrorShown.current = true;
        }
      }
    };

    const handleGetVehicles = async () => {
      try {
        const response = await getVehiclesData();
        dispatch(setVehicles(response.data));
        vehicleErrorShown.current = false;
      } catch (error) {
        if (!vehicleErrorShown.current) {
          toast.error(`Failed to fetch vehicles: ${error.message}`);
          vehicleErrorShown.current = true;
        }
      }
    };

    handleGetCities();
    handleGetVehicles();
  }, [dispatch]);

  const renderStage = () => {
    switch (stage) {
      case "landing":
        return <LandingPage />;
      case "copSelection":
        return (
          <CopSelectionPage
            currPage={"copSelection"}
            prevPage={"landing"}
            nextPage={"citySelection"}
            pageInfo={copsInfo}
            pageDesc={copsDescription}
          />
        );
      case "citySelection":
        return (
          <CopSelectionPage
            currPage={"citySelection"}
            prevPage={"copSelection"}
            nextPage={"vehicleSelection"}
            pageInfo={cities}
            pageDesc={cityDescription}
          />
        );
      case "vehicleSelection":
        // return <VehicleSelectionPage />;
        return (
          <CopSelectionPage
            currPage={"vehicleSelection"}
            prevPage={"citySelection"}
            nextPage={"result"}
            pageInfo={vehicles}
            pageDesc={vehicleDescription}
          />
        );
      case "result":
        return <ResultPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="app">
      {renderStage()}
      <ToastContainer />
    </div>
  );
};

export default App;
