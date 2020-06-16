import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

/**
 * Allows user to change sonification playback BPM
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

export default BpmInput;
