import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

/**
 * Allows user to set the bounds of min/max MIDI values for sonification
 * 
 * @param {func} handleInput     function to handle numerical state change
 * @param {func} setMinMidiPitch function that sets min MIDI value state
 * @param {func} setMaxMidiPitch function that sets max MIDI value state
 */
function MinMaxMidiInput({handleInput, setMinMidiPitch, setMaxMidiPitch}) {
  return (
    <div>
      {/* Min MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Minimum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          placeholder='Ex: 0'
          aria-label='Minimum MIDI pitch'
          onChange={
            (event) => handleInput(event, setMinMidiPitch)
          }
        />
      </InputGroup>

      {/* Max MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Maximum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder='Ex: 127'
          aria-label='Maximum MIDI pitch'
          onChange={
            (event) => handleInput(event, setMaxMidiPitch)
          }
        />
      </InputGroup>
    </div>
  );
}

MinMaxMidiInput.propTypes = {
  handleInput: PropTypes.func.isRequired,
  setMinMidiPitch: PropTypes.func.isRequired,
  setMaxMidiPitch: PropTypes.func.isRequired,
}

export default MinMaxMidiInput;
