
import { useDispatch } from 'react-redux';
import { setStage } from '../store/slices/gameSlice';

const LandingPage = () => {
  const dispatch = useDispatch();

  const startGame = () => {
    dispatch(setStage('copSelection'));
  };

  return (
    <div className=" ">
      <h1>Welcome to the Fugitive Capture Game</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default LandingPage;

