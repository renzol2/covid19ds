import React, {Component, useState} from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

// TODO:
// Start typing out from here:
// https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
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

const RegionDropdown = ({regions, callback}) => {
  const [region, setRegion] = useState('Init region');

  const handleChange = event => {
    setRegion(regions[event]);
    sendRegionToParent(regions[event]);
  }

  const sendRegionToParent = region => {
    callback(region);
  }

  let key = 0;
  return (
    <div>
        <h4>Current region (Bootstrap): {region}</h4>
        <Dropdown navbar={true} onSelect={handleChange}>
          <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
            Choose country 
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu}>
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

export default RegionDropdown;