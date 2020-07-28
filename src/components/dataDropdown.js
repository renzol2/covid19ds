import React, {useCallback} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';


function DataDropdown({currentDatasetName, datasets, setDataset, fetchData, region, initializeRegion, waitTime}) {

  const handleDatasetSelection = useCallback(
    (newDatasetUrl) => {
      setDataset(newDatasetUrl);
      fetchData(newDatasetUrl);

      /*
        FIXME: the function initializeRegion finishes BEFORE the
        dataset can be downloaded and updated with fetchData. Need to find a way to do a
        await/async operation with fetchData and initializeRegion.
      */
      setTimeout(() => initializeRegion(region), waitTime);
    },
    []  // FIXME: this needs to be empty otherwise data loading lags again :(
  );

  let key = 0;
  return (
    <Dropdown onSelect={handleDatasetSelection}>
      <Dropdown.Toggle id="dropdown-basic">
        Data: <b>{currentDatasetName}</b>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {datasets.map(dataset => (
          <Dropdown.Item eventKey={dataset.url} key={key++}>
            {dataset.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )

}

DataDropdown.propTypes = {
  currentDatasetName: PropTypes.string.isRequired,
  datasets: PropTypes.array.isRequired,
  setDataset: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired,
  initializeRegion: PropTypes.func.isRequired,
  waitTime: PropTypes.number.isRequired
}

export default DataDropdown;