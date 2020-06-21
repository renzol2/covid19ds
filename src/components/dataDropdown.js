import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

class DataDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(url) {
    console.log(url);
    this.props.setDataset(url);
    this.props.fetchData(url);

    /*
     FIXME: the function initializeRegion finishes BEFORE the
     dataset can be downloaded and updated with fetchData. Need to find a way to do a
     await/async operation with fetchData and initializeRegion.
     */
    setTimeout(() => this.props.initializeRegion(this.props.region), 1000);
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