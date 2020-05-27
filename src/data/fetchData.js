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
          
          // Callback function called once PapaParser finishes parsing
          complete: (results) => {
            if (results.errors.length > 0) {
              results.errors.map(error => (console.log(error)));
            }

            console.log(results.data);
            setData(results.data);
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
  return [{ data, isLoading, isError }, setUrl];
}

export default FetchOwidData;