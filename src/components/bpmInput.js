import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bpmSet } from '../actions/Bpm';

/**
 * Allows user to change sonification playback BPM
 */
function BpmInput({ bpm, bpmSet }) {
  return (
    <div>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Playback BPM</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Ex: 200"
          aria-label="BPM"
          onChange={(event) => {
            let newBpm = parseInt(event.target.value);
            if (isNaN(newBpm)) {
              return;
            }
            bpmSet(newBpm);
          }}
        />
      </InputGroup>
      <p>
        Current BPM: <strong>{bpm}</strong>
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    bpm: state.bpm.playbackBpm,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      bpmSet,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(BpmInput);
