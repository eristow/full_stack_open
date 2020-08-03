import React from 'react';
import ReactDOM from 'react-dom';

import { Counter } from './Counter';
import LeftRight from './LeftRight';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Counter />
      <LeftRight />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// let counter = 1;

// const refresh = () => {
//   ReactDOM.render(
//     <Counter counter={counter} />,
//     document.getElementById('root'),
//   );
// };

// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 1000);
