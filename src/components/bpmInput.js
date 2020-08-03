import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

/**
 * Allows user to change sonification playback BPM
 * 
 * @param {number} bpm         BPM state of application to be displayed
 * @param {func}   handleInput function that handles numerical state change
 * @param {func}   setBpm      function that sets BPM state of application
 */
function BpmInput({bpm, setBpm, handleInput}) {
  return (
    <div>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Playback BPM</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Ex: 200'
          aria-label='BPM'
          onChange={
            (event) => handleInput(
              event, setBpm
            )
          }
        />
      </InputGroup>
      <p>
        Current BPM: <strong>{bpm}</strong>
      </p>
    </div>
  )
}


BpmInput.propTypes = {
  handleInput: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  bpm: PropTypes.number.isRequired,
}

export default BpmInput;
