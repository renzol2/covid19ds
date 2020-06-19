import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

class DataDropdown extends Component {
  render() {
    let key = 0;
    return (
      <Dropdown
        onSelect={this.props.onDatasetChange}
      >
        <Dropdown.Toggle id="dropdown-basic">
          Choose data
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.datasets.map(dataset => (
            <Dropdown.Item eventKey={dataset.url} key={key++}>
              {dataset.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DataDropdown.propTypes = {
  datasets: PropTypes.array.isRequired,
  onDatasetChange: PropTypes.func.isRequired,
}

export default DataDropdown;