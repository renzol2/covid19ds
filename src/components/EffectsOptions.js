import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  synthChorusToggle,
  synthDistortionToggle,
  synthJcreverbToggle,
  synthFreeverbToggle,
  synthAutowahToggle,
} from '../actions/Synth';

/**
 * Allows user to choose effects of playback synthesizer 
 */
function EffectsOptions({
  synth,
  synthChorusToggle,
  synthDistortionToggle,
  synthJcreverbToggle,
  synthFreeverbToggle,
  synthAutowahToggle,
}) {
  // Deconstruct state of synth
  const {
    useChorus,
    useDistortion,
    useJcreverb,
    useFreeverb,
    useAutowah,
  } = synth;
  return (
    <ButtonGroup>
      <Button
        variant={useChorus ? 'primary' : 'outline-primary'}
        onClick={synthChorusToggle}
      >
        Chorus: <b>{useChorus ? 'enabled' : 'disabled'}</b>
      </Button>

      <Button
        variant={useDistortion ? 'primary' : 'outline-primary'}
        onClick={synthDistortionToggle}
      >
        Distortion: <b>{useDistortion ? 'enabled' : 'disabled'}</b>
      </Button>

      <Button
        variant={useJcreverb ? 'primary' : 'outline-primary'}
        onClick={synthJcreverbToggle}
      >
        JCReverb: <b>{useJcreverb ? 'enabled' : 'disabled'}</b>
      </Button>

      <Button
        variant={useFreeverb ? 'primary' : 'outline-primary'}
        onClick={synthFreeverbToggle}
      >
        Freeverb: <b>{useFreeverb ? 'enabled' : 'disabled'}</b>
      </Button>

      <Button
        variant={useAutowah ? 'primary' : 'outline-primary'}
        onClick={synthAutowahToggle}
      >
        AutoWah: <b>{useAutowah ? 'enabled' : 'disabled'}</b>
      </Button>
    </ButtonGroup>
  );
}

function mapStateToProps(state) {
  return {
    synth: state.synth,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      synthChorusToggle,
      synthDistortionToggle,
      synthJcreverbToggle,
      synthFreeverbToggle,
      synthAutowahToggle,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(EffectsOptions);
