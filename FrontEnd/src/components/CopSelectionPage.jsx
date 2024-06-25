/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStage,
  setCurrentCop,
  setCopSelections,
  setResult,
} from "../store/slices/gameSlice";
import { CLOUD_URL, COP_PAGE_BACKGROUND } from "../constants/imageUrl";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { handleSelection } from "../utils/vehicleSelection";
import { captureResult } from "../services/resultApis/captureResult";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopSelectionPage = ({
  currPage,
  prevPage,
  nextPage,
  pageInfo,
  pageDesc,
}) => {
  const dispatch = useDispatch();
  const { currentCop, copSelections, cities } = useSelector(
    (state) => state.game
  );

  const [animationClass, setAnimationClass] = useState("");
  const carouselRef = useRef(null);

  const selectionFunction = (info) => {
    setAnimationClass("page-leave");
    setTimeout(() => {
      if (currPage === "copSelection") {
        console.log("cop selected");
        dispatch(setCurrentCop(info.name));
        dispatch(setStage(nextPage));
      } else if (currPage === "citySelection") {
        handleCitySelect(info.name);
      } else if (currPage === "vehicleSelection") {
        const selection = handleSelection(
          currentCop,
          info,
          cities,
          copSelections
        );
        if (!selection.status) {
          alert(selection.message);
        } else {
          handleVehicleSubmit(info.name);
        }
      }
      setAnimationClass("page-enter");
    }, 500); 
  };

  const handleCitySelect = (city) => {
    const selection = copSelections.find((copInfo) => copInfo.city === city);

    if (selection && selection.copName !== currentCop) {
      console.log("copSelections : ", selection);
      alert(`${city} already selected by ${selection.copName}!`);
    } else {
      handleCitySubmit(city);
    }
  };

  const handleCitySubmit = (city) => {
    const existingCop = copSelections.filter(
      (copInfo) => copInfo.copName !== currentCop
    );
    const newSelections = [...existingCop, { copName: currentCop, city: city }];
    dispatch(setCopSelections(newSelections));
    dispatch(setStage(nextPage));
  };

  const handleVehicleSubmit = async (vehicleName) => {
    const newSelections = copSelections.map((selection) =>
      selection.copName === currentCop
        ? { ...selection, vehicle: vehicleName }
        : selection
    );
    dispatch(setCopSelections(newSelections));
    if (newSelections.length < 3) {
      dispatch(setStage("copSelection"));
    } else {
      console.log("body data before sending the request : ", newSelections);

      handleCaptureResult(newSelections);
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

  const handleBackButton = () => {
    setAnimationClass("page-leave");
    setTimeout(() => {
      dispatch(setStage(prevPage));
      setAnimationClass("page-enter");
    }, 500);
  };

  useEffect(() => {
    setAnimationClass("page-enter");
    if (carouselRef.current) {
      carouselRef.current.moveTo(0);
    }
  }, [currPage, pageInfo]);

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${animationClass}`}
      style={{
        backgroundImage: `url(${COP_PAGE_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg overflow-hidden w-full h-full mx-4 flex md:flex-row flex-col">
        {/* Left side */}
        <div className="md:w-1/3 w-full md:h-full h-1/2 p-8 flex flex-col">
          <div>
            <button
              className="text-white border rounded-xl shadow-xl border-gray-200 py-1 md:py-2 px-3 text-md md:text-xl mb-4"
              onClick={handleBackButton}
            >
              {"<--"} Back
            </button>
          </div>
          <h1 className="md:text-4xl sm:text-2xl text-xl font-bold mb-4 text-white">
            {pageDesc.title}
          </h1>
          <p className="text-sm text-white">
            {currPage === "citySelection"
              ? `Select a city for ${currentCop} to investigate.${pageDesc.desc}`
              : pageDesc.desc}
          </p>
          {copSelections.length !== 0 && (
            <div className="sm:flex flex-col gap-2 mt-5 hidden">
              {copSelections.map((copInfo, index) => (
                <p
                  key={copInfo.copName}
                  className="text-yellow-900 text-xs text-center  bg-black bg-opacity-70 rounded-xl p-2"
                >
                  <span className="text-md text-white">{index + 1}</span> . Name
                  : {copInfo.copName},Investigating City : {copInfo.city}
                  ,choosed vehicle : {copInfo.vehicle}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="md:w-2/3 w-full md:h-full h-1/2 flex items-center justify-center">
          <Carousel
            ref={carouselRef}
            showThumbs={false}
            infiniteLoop={true}
            showStatus={false}
            autoPlay={false}
            interval={3000}
            className="w-full h-full flex justify-center p-4"
          >
            {pageInfo.map((info, idx) => (
              <div
                key={idx}
                className={`relative w-full flex items-center justify-center h-[45vh] sm:h-[45vh] md:h-[100vh] `}
                onClick={() => selectionFunction(info)}
              >
                <img
                  src={
                    currPage === "copSelection"
                      ? info.image
                      : `${CLOUD_URL + info.image}`
                  }
                  alt={"image" + idx}
                  className="object-contain h-full w-full"
                />
                <div
                  className={`absolute inset-0 flex cursor-pointer bg-black bg-opacity-25 ${
                    currPage === "copSelection" ||
                    currPage === "vehicleSelection"
                      ? ""
                      : "flex-col"
                  }`}
                >
                  <div className="sm:mx-24 mx-6 mt-6">
                    <p className="text-white text-md sm:text-xl md:text-2xl lg:text-3xl font-bold">
                      {info.name}
                    </p>
                    {currPage !== "copSelection" && (
                      <div className="text-white mt-12 sm:mt-16 md:mt-36 bg-black bg-opacity-35 rounded-xl py-2">
                        <p className="text-white text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold">
                          {info.subHead}
                        </p>
                        {currPage === "citySelection" && (
                          <p className="text-white text-xs mt-2">
                            {info.desc}
                          </p>
                        )}
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="text-white font-semibold text-sm md:text-md mt-2 px-2">
                          {currPage === "citySelection"
                            ? `${info.distance}km from the cop's location`
                            : `This ${info.name} has ${info.range} Kms range`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CopSelectionPage;




