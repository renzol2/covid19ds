import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Toggles through the app's oscillator types
 * 
 * @param {func}   setOscSelection function that sets oscSelection state
 * @param {number} oscSelection    state that represents selected oscillator from oscTypes
 * @param {array}  oscTypes        array that holds names of different oscillator types
 */
function OscillatorToggleButton({oscSelection, setOscSelection, oscTypes}) {
  return (
    <Button 
      variant='primary' 
      onClick={
        () => setOscSelection(
          (oscSelection + 1) % oscTypes.length
        )
      }
    >
      Current oscillator: <b>{oscTypes[oscSelection]}</b>
    </Button>
  );
}

OscillatorToggleButton.propTypes = {
  setOscSelection: PropTypes.func.isRequired,
  oscSelection: PropTypes.number.isRequired,
  oscTypes: PropTypes.array.isRequired,
}

export default OscillatorToggleButton;