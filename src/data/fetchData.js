import {useState, useEffect} from 'react';
import Papa from 'papaparse';

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

    fetchData();
  }, [url, amount]);
  
  return [{ data, isLoading, isError }, setUrl];
}

export default FetchOwidData;