import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCities, setPlaces, setVehicles } from "./store/slices/gameSlice";
import LandingPage from "./components/LandingPage";
import CopSelectionPage from "./components/CopSelectionPage";
import "./App.css";
import { getCitiesData } from "./services/homeApis/getCities";
import { getVehiclesData } from "./services/homeApis/getVehicles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { copsDescription, copsInfo } from "./constants/copsPageDetails";
import { cityDescription } from "./constants/cityDetails";
import { vehicleDescription } from "./constants/vehicleDetails";
import ResultPage from "./components/ResultPage";
import { getPlacesData } from "./services/homeApis/getPlaces";
import { placeDescription } from "./constants/placeDetails";

const App = () => {
  const dispatch = useDispatch();
  const { stage, cities ,vehicles,places} = useSelector((state) => state.game);
  const cityErrorShown = useRef(false);
  const vehicleErrorShown = useRef(false);
  const PlacesErrorShown = useRef(false);


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

    const handleGetPlaces = async () => {
      try {
        const response = await getPlacesData();
        dispatch(setPlaces(response.data));
        PlacesErrorShown.current = false;
      } catch (error) {
        if (!vehicleErrorShown.current) {
          toast.error(`Failed to fetch places: ${error.message}`);
          PlacesErrorShown.current = true;
        }
      }
    };

    handleGetCities();
    handleGetVehicles();
    handleGetPlaces()
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
            nextPage={"placeSelection"}
            pageInfo={cities}
            pageDesc={cityDescription}
          />
        );
        case "placeSelection":
        return (
          <CopSelectionPage
            currPage={"placeSelection"}
            prevPage={"citySelection"}
            nextPage={"vehicleSelection"}
            pageInfo={places}
            pageDesc={placeDescription}
          />
        );
      case "vehicleSelection":
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
