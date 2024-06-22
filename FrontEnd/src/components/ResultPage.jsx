
import { useSelector } from 'react-redux';

const ResultPage = () => {
  const result = useSelector((state) => state.game.result);

  return (
    <div className="page result">
      <h1>Result</h1>
      {result ? (
        result.success ? (
          <p>The fugitive was captured by {result.cop}</p>
        ) : (
          <p>The fugitive was not captured</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultPage;
