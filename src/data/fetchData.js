import Papa from 'papaparse';

const fetchData = amount => {
  const url = 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv';

  Papa.parse(url, {
    download: true,
    preview: amount,
    complete: (results) => {
      if (results.errors.length > 0) {
        results.errors.map(error => (console.log(error)));
        return [];
      } else {
        console.log(results.data);
        return results.data;
      }
    }
  })
}

export default fetchData;