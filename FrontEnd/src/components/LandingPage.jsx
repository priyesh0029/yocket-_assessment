import { useDispatch } from "react-redux";
import { setStage } from "../store/slices/gameSlice";
import { LANDING_PAGE_IMAGE } from "../constants/imageUrl";
import { useState } from "react";
import { landingPageDetails } from "../constants/landingPageDetails";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const startGame = () => {
    dispatch(setStage("copSelection"));
  };

  return (
    <div
      className="h-screen w-screen flex justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${LANDING_PAGE_IMAGE})` }}
    >
      <div className="text-center">
        <h1 className="md:text-4xl text-2xl font-bold text-white md:mt-36 mt-28 animate-pulse">
          WELCOME TO MANHUND:{" "}
          <span className="text-yellow-900">THE SHADOWED PURSUIT</span>
        </h1>
        <h1 className="text-xs bg-black bg-opacity-50 p-2 font-semibold md:mx-16 mt-6 mx-4 rounded-xl text-white md:mt-12">
          {landingPageDetails.desc}
        </h1>
        <button
          className={`bg-yellow-900 md:text-2xl text-md  font-bold md:py-3 md:px-10 py-1 px-8 rounded-2xl bottom-0 md:right-4 right-0 absolute m-8  transition duration-300 ease-in-out ${
            hovered
              ? "hover:bg-yellow-700 scale-110 text-black"
              : "hover:bg-yellow-800 text-white"
          }`}
          onClick={startGame}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
