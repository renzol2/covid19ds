import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

/**
 * Toggles through the app's oscillator types
 * 
 * @param {func}   props.setOscSelection function that sets oscSelection state
 * @param {number} props.oscSelection    state that represents selected oscillator from oscTypes
 * @param {array}  props.oscTypes        array that holds names of different oscillator types
 */
class OscillatorToggleButton extends Component {
  render() {
    return (
      <Button 
        variant='primary' 
        onClick={
          () => this.props.setOscSelection(
            (this.props.oscSelection + 1) % this.props.oscTypes.length
          )
        }
      >
        Toggle oscillator
      </Button>
    );
  }
}

OscillatorToggleButton.propTypes = {
  setOscSelection: PropTypes.func.isRequired,
  oscSelection: PropTypes.number.isRequired,
  oscTypes: PropTypes.array.isRequired,
}

export default OscillatorToggleButton;