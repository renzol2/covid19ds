import React, {Component} from 'react';

class RegionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: props.regions[0],
    };

    this.handleChange = this.handleChange.bind(this);
  }
   
  handleChange(event) {
    this.setState({region: event.target.value});
  }

  getRegionInfo = () => {
    console.log(this.region);
    this.props.callback(this.region);
  }

  render() {
    let key = 0;
    return (
      <div>
        <h4>Current region: {this.state.region}</h4>
        <form>
          <label>
            Choose region:
            <select value={this.state.region} onChange={this.handleChange}>
              {this.props.regions.map(regionName =>
                <option key={key++} value={regionName}>{regionName}</option>
              )}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default RegionForm;