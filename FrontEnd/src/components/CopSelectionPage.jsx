import { useDispatch } from 'react-redux';
import { setStage, setCurrentCop } from '../store/slices/gameSlice';

const CopSelectionPage = () => {
  const dispatch = useDispatch();
  const cops = ['Cop 1', 'Cop 2', 'Cop 3'];

  const selectCop = (cop) => {
    dispatch(setCurrentCop(cop));
    dispatch(setStage('citySelection'));
  };

  return (
    <div className=" cop-selection">
      <div className="description">
        <h1>Select a Cop</h1>
        <p>Select a cop to assign them a city and a vehicle.</p>
      </div>
      <div className="carousel">
        {cops.map((cop, index) => (
          <div key={index} onClick={() => selectCop(cop)}>
            <h2>{cop}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopSelectionPage;
