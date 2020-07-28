import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Allows user to change the MIDI value of test pitch
 * 
 * @param {func}   setPitch function to change pitch state of app
 * @param {number} pitch    state representing MIDI value of test pitch
 */
function PitchButtonGroup({pitch, setPitch}) {
  return (
    <ButtonGroup aria-label='Increase/decrease pitch'>
      <Button variant='secondary' onClick={
        () => setPitch(pitch - 1)
      }>
        Decrease pitch
      </Button>

      <Button variant='secondary' onClick={
        () => setPitch(pitch + 1)
      }>
        Increase pitch
      </Button>
    </ButtonGroup>
  );
}

PitchButtonGroup.propTypes = {
  setPitch: PropTypes.func.isRequired,
  pitch: PropTypes.number.isRequired,
}

export default PitchButtonGroup;
