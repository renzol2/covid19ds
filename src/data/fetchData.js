import {useState, useEffect} from 'react';
import Papa from 'papaparse';

/*
  Fetches data from Our World In Data at the requested URL.
  Amount specifies how many lines of CSV file to parse.

  Modeled after: https://www.robinwieruch.de/react-hooks-fetch-data
*/
const FetchOwidData = (initUrl, amount) => {
  const [url, setUrl] = useState(initUrl);
  const [data, setData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        Papa.parse(url, {
          download: true,
          preview: amount,
          header: true,  // uses the header to convert CSV into JSON
          
          // Callback function called once PapaParser finishes parsing
          complete: (results) => {
            if (results.errors.length > 0) {
              results.errors.map(error => (console.log(error)));
            }
            
            //console.log(results.data);
            setData(results.data);

            let regionsList = Object.keys(results.data[0]);
            regionsList.shift();  // removes the first element 'date'
            //console.log(regionsList);
            setRegions(regionsList);
          }
        })
      } catch (error) {
        console.log(error);
        setError(true);
      };

      setLoading(false);
    }
    
    // Call the above function
    fetchData();

  }, [url, amount]);
  
  // Returned as state
  return [{ data, regions, isLoading, isError }, setUrl];
}

export default FetchOwidData;