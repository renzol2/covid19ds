import React, {Component} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Allows user to change the MIDI value of test pitch
 * 
 * @param {func}   props.setPitch function to change pitch state of app
 * @param {number} props.pitch    state representing MIDI value of test pitch
 */
class PitchButtonGroup extends Component {
  render() {
    return (
      <ButtonGroup aria-label='Increase/decrease pitch'>
        <Button variant='secondary' onClick={
          () => this.props.setPitch(this.props.pitch - 1)
        }>
          Decrease pitch
        </Button>

        <Button variant='secondary' onClick={
          () => this.props.setPitch(this.props.pitch + 1)
        }>
          Increase pitch
        </Button>
      </ButtonGroup>
    );
  }
}

PitchButtonGroup.propTypes = {
  setPitch: PropTypes.func.isRequired,
  pitch: PropTypes.number.isRequired,
}

export default PitchButtonGroup;
