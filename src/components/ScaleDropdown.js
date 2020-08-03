import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';

function ScaleDropdown({scales, scaleSelection, setScaleSelection}) {
  return (
    <Dropdown onSelect={(newScaleKey) => {
      setScaleSelection(newScaleKey)
    }}>
      <Dropdown.Toggle>
        Scale: <b>{scales[scaleSelection].name}</b>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.values(scales).map(scale => (
          <Dropdown.Item eventKey={scale.key} key={scale.key}>
            {scale.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

ScaleDropdown.propTypes = {
  scales: PropTypes.object.isRequired,
  scaleSelection: PropTypes.string.isRequired,
  setScaleSelection: PropTypes.func.isRequired
};

export default ScaleDropdown;