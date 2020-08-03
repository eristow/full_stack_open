import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const FeedbackButtons = ({
  handleGoodClick,
  handleNeutralClick,
  handleBadClick,
}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
    </div>
  );
};

const Statistic = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <>
        <td>{text}</td>
        <td> {value + '%'}</td>
      </>
    );
  }
  return (
    <>
      <td>{text}</td>
      <td> {value}</td>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const weightedSum = 1 * good + 0 * neutral + -1 * bad;
  const all = good + neutral + bad;
  const average = weightedSum / all;
  const positive = (good / all) * 100;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={bad} />
          </tr>
          <tr>
            <Statistic text="all" value={all} />
          </tr>
          <tr>
            <Statistic text="average" value={average} />
          </tr>
          <tr>
            <Statistic text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <FeedbackButtons
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
        handleBadClick={handleBadClick}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
