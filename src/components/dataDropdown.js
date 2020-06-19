import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const datasets = [
  {
    title: 'Total cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv',
  },
  {
    title: 'New cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/new_cases.csv',
  },
]

class DataDropdown extends Component {
  render() {
    return (
      <Dropdown
        onSelect={(eventKey) => {
          console.log(eventKey);
        }}
      >
        <Dropdown.Toggle id="dropdown-basic">
          Choose data
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {datasets.map(dataset => (
            <Dropdown.Item eventKey={dataset.url}>{dataset.title}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DataDropdown.propTypes = {

}

export default DataDropdown;