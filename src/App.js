import React, {useState} from 'react';
import './App.css';

import fetchData from './data/fetchData';

const App = () => {
  const [data, setData] = useState([]);
  const amount = 5;
  let key = 0;
  
  React.useEffect(() => {setData(fetchData(amount))}, []);

  return (
    <div>
      <h1>test</h1>
      <ul>
        {data.map(row => {
          let rowString = '';
          for (let value in row) {
            rowString += value;
          }
          return <li key={key++} >{rowString}</li>
        })}
      </ul>
    </div>
  )
}

export default App;