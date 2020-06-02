import React, {Component, useState} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

// TODO:
// Start typing out from here:
// https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components

const CustomToggle = React.forwardRef(({ children, onClick}, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc; {/* unicode hex character for down-pointing arrowhead */}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        stlye={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className='mx-3 my-2 w-auto'
          placeholder='Type to filter...'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className='list-unstyled'>
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

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
      <div>
        <h4>Current region (form): {this.state.region}</h4>
        <Dropdown onSelect={this.handleChange}>
          <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
            Choose country 
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
            {this.props.regions.map(region => (
              <Dropdown.Item eventKey={key++}>{region}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default RegionDropdown;