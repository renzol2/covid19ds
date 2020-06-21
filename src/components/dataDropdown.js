import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

class DataDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(url) {
    this.props.setDataset(url);
    this.props.fetchData(url);
    this.props.initializeRegion('');
    this.props.initializeRegion(this.props.region);
  }

  render() {
    let key = 0;
    return (
      <Dropdown
        onSelect={this.handleChange}
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
  setDataset: PropTypes.func.isRequired,
}

export default DataDropdown;