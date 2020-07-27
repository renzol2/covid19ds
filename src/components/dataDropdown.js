import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

class DataDropdown extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(newDatasetUrl) {
    this.props.setDataset(newDatasetUrl);
    await this.props.fetchData(newDatasetUrl);

    /*
     FIXME: the function initializeRegion finishes BEFORE the
     dataset can be downloaded and updated with fetchData. Need to find a way to do a
     await/async operation with fetchData and initializeRegion.
     */
    setTimeout(() => this.props.initializeRegion(this.props.region), this.props.waitTime);
  }

  render() {
    let key = 0;
    return (
      <Dropdown
        onSelect={this.handleChange}
      >
        <Dropdown.Toggle id="dropdown-basic">
          Data: <b>{this.props.currentDatasetName}</b>
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