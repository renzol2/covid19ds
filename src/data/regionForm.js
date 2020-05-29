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
    this.sendRegionToParent();
  }

  sendRegionToParent = () => {
    this.props.callback(this.state.region);
  }

  render() {
    let key = 0;

    // TODO:
    // find a place for this function all that will not throw
    // a warning ('Cannot update a component App while...')
    

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