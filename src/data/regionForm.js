import React, {Component} from 'react';

class RegionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: 'World',
    };

    this.handleChange = this.handleChange.bind(this);
  }
   
  handleChange(event) {
    this.setState({region: event.target.value});
  }

  sendRegionToParent = () => {
    //console.log(this.state.region);
    this.props.callback(this.state.region);
  }

  render() {
    let key = 0;

    // this is not the 'correct' placement for this call,
    // even if it appears to do the job correctly.
    // it sends the selected region to parent component
    // through a props callback function.
    // however, it is called every single time this component is
    // rendered, which is more than just once every time the page loads.
    // TODO: really need to figure this out...
    this.sendRegionToParent();

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