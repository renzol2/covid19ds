import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import './RegionDropdown.css';

// Search function for dropdown taken from:
// https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components

/**
 * Button that toggles visibility of countries
 */
const CountryToggle = React.forwardRef(({children, onClick}, ref) => (
  <Button
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

/**
 * Menu that lists all countries
 */
const RegionMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
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


/**
 * Dropdown that displays regions and sends selection to parent component
 * @param {Array} regions array of region names (strings)
 * @param {func} callback function from parent component that returns selected region 
 */
const RegionDropdown = ({regions, callback}) => {

  const handleChange = event => {
    sendRegionToParent(regions[event]);
  }

  const sendRegionToParent = region => {
    callback(region);
  }

  let key = 0;
  return (
    <div>
        <Dropdown onSelect={handleChange}>
          <Dropdown.Toggle as={CountryToggle} id='dropdown-custom-components'>
            Choose country 
          </Dropdown.Toggle>

          <Dropdown.Menu as={RegionMenu} className='dropdown-scroll'>
            {regions.map(region => (
              <Dropdown.Item 
                eventKey={key++}
                key={key} 
              >
                {region}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
  );
}

RegionDropdown.propTypes = {
  regions: PropTypes.array.isRequired,
  callback: PropTypes.func.isRequired,
}

export default RegionDropdown;