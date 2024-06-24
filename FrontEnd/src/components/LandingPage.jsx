import { useDispatch } from "react-redux";
import { setStage } from "../store/slices/gameSlice";
import { LANDING_PAGE_IMAGE } from "../constants/imageUrl";
import { useState } from "react"; // Import useState hook

const LandingPage = () => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false); // State for button hover

  const startGame = () => {
    dispatch(setStage("copSelection"));
  };

  return (
    <div
      className="h-screen w-screen flex justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${LANDING_PAGE_IMAGE})` }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mt-36 animate-pulse">
          WELCOME TO MANHUND:{" "}
          <span className="text-yellow-900">THE SHADOWED PURSUIT</span>
        </h1>
        <button
          className={`bg-green-900 md:text-2xl text-md text-white font-bold md:py-3 md:px-10 py-1 px-8 rounded-2xl bottom-0 md:right-4 right-0 absolute m-8  transition duration-300 ease-in-out ${
            hovered ? "hover:bg-green-700 scale-110" : "hover:bg-green-800"
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
