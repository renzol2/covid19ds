import React, {Component} from 'react';

// TODO:
// Start typing out from here:
// https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components

class RegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: 'World',
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendRegionToParent = this.sendRegionToParent.bind(this);
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
    return (
      
    );
  }
}

export default RegionDropdown;