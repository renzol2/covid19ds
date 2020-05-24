import Papa from 'papaparse';

const fetchData = () => {
  const url = 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv';
  let data = [];

  Papa.parse(url, {
    download: true,
    complete: (results) => {
      if (results.errors.length > 0) {
        results.errors.map(error => (console.log(error)));
        return;
      } else {
        console.log(results.data);
        data = results.data;
      }
    }
  })

  return data;
}

export default fetchData;