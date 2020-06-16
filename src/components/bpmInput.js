import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import PropTypes from 'prop-types';

/**
 * Allows user to change sonification playback BPM
 * 
 * @param {number} props.bpm         BPM state of application to be displayed
 * @param {func}   props.handleInput function that handles numerical state change
 * @param {func}   props.setBpm      function that sets BPM state of application
 */
class BpmInput extends Component {
  render() {
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
              (event) => this.props.handleInput(
                event, this.props.setBpm
              )
            }
          />
        </InputGroup>
        <p>
          Current BPM: <strong>{this.props.bpm}</strong>
        </p>
      </div>
    )
  }
}

BpmInput.propTypes = {
  handleInput: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  bpm: PropTypes.number.isRequired,
}

export default BpmInput;
