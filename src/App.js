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
        
      </ul>
    </div>
  )
}

export default App;