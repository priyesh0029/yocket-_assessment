import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAPTURE_IMG_URL,
  FUGITIVE_IMAGE,
  LANDING_PAGE_IMAGE,
} from "../constants/imageUrl";
import {
  setStage,
  setCopSelections,
  setCurrentCop,
  setResult,
} from "../store/slices/gameSlice";

const ResultPage = () => {
  const result = useSelector((state) => state.game.result);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    dispatch(setCurrentCop(null));
    dispatch(setCopSelections([]));
    dispatch(setResult(null));
    dispatch(setStage("landing"));
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${LANDING_PAGE_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-900 bg-opacity-70 rounded-lg shadow-lg w-11/12 h-5/6 mx-2 flex flex-col items-center justify-center p-8">
        {loading ? (
          <p className="text-2xl font-semibold">Loading...</p>
        ) : (
          result && (
            <div className="text-center flex flex-col items-center">
              <p
                className={`md:text-3xl text-2xl font-bold ${
                  result.success ? "text-green-500" : "text-red-700"
                }`}
              >
                {result.success ? "You Won!" : "You Lose!"}
              </p>
              <img
                src={result.success ? CAPTURE_IMG_URL : FUGITIVE_IMAGE}
                alt={result.success ? "Success" : "Failure"}
                className="md:mt-8 mt-4 w-[50vw] h-[30vh] object-contain mx-auto"
              />
              <p className="md:text-xl text-md font-medium mt-8 text-white bg-black bg-opacity-55 p-2 rounded-xl">
                {result.success
                  ? `The fugitive was captured by ${result.cop} from the city ${result.city}.`
                  : "The fugitive was not captured."}
              </p>
              <button
                onClick={handlePlayAgain}
                className="mt-8 text-white bg-yellow-900 hover:bg-yellow-700 font-bold py-2 px-4 rounded"
              >
                Play Again
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResultPage;
