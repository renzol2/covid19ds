import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Toggles through the app's oscillator types
 * 
 * @param {func}   setOscSelection function that sets oscSelection state
 * @param {string} oscSelection    state that represents selected oscillator from oscTypes
 * @param {array}  oscTypes        array that holds names of different oscillator types
 */
function OscillatorDropdown({oscSelection, setOscSelection, oscTypes}) {
  return (
    <Dropdown onSelect={(newOscSelection) => setOscSelection(newOscSelection)}>
      <Dropdown.Toggle>
        Oscillator: <b>{oscSelection}</b>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {oscTypes.map(osc => (
          <Dropdown.Item eventKey={osc} key={osc}>
            {osc}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

OscillatorDropdown.propTypes = {
  setOscSelection: PropTypes.func.isRequired,
  oscSelection: PropTypes.string.isRequired,
  oscTypes: PropTypes.array.isRequired,
}

export default OscillatorDropdown;