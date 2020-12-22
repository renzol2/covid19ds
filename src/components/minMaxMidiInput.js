import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { minPitchSet, maxPitchSet } from '../actions/MinMaxPitch';

/**
 * Allows user to set the bounds of min/max MIDI values for sonification
 */
function MinMaxMidiInput({ minPitch, maxPitch, minPitchSet, maxPitchSet }) {
  return (
    <div>
      {/* Min MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Minimum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Ex: 0"
          aria-label="Minimum MIDI pitch"
          onChange={(event) => {
            let newPitch = parseInt(event.target.value);
            if (isNaN(newPitch)) {
              return;
            }
            minPitchSet(newPitch);
          }}
        />
      </InputGroup>

      {/* Max MIDI pitch input */}
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Maximum MIDI pitch</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Ex: 127"
          aria-label="Maximum MIDI pitch"
          onChange={(event) => {
            let newPitch = parseInt(event.target.value);
            if (isNaN(newPitch)) {
              return;
            }
            maxPitchSet(newPitch);
          }}
        />
      </InputGroup>

      <p>
        Min/max MIDI pitch:{' '}
        <strong>
          [{minPitch}, {maxPitch}]
        </strong>
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    minPitch: state.minMaxPitch.minPitch,
    maxPitch: state.minMaxPitch.maxPitch,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      minPitchSet: minPitchSet,
      maxPitchSet: maxPitchSet,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(MinMaxMidiInput);
