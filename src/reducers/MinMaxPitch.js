import { MIN_PITCH_SET, MAX_PITCH_SET } from '../actions/ActionTypes';

// TODO: find out a better way to set initial values
const minMaxPitch = (state = { min: 36, max: 96 }, action) => {
  switch (action.type) {
    case MIN_PITCH_SET:
      return {...state, min: action.midiPitch};
    case MAX_PITCH_SET:
      return {...state, max: action.midiPitch};
    default:
      return state;
  }
}

export default minMaxPitch;
