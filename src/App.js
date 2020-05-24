import React, {useState} from 'react';
import './App.css';

import fetchData from './data/fetchData';

const HeaderList = ({data}) => {
  console.log(data);
  return (
    <ul>
      {data.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <button onClick={() => setData(fetchData)}>run</button>
      <HeaderList data={data} />
    </div>
  )
}

export default App;