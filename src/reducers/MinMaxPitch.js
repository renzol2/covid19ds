import { MIN_PITCH_SET, MAX_PITCH_SET } from '../actions/ActionTypes';

// TODO: find out a better way to set initial values
const minMaxPitch = (state = { minPitch: 36, maxPitch: 96 }, action) => {
  switch (action.type) {
    case MIN_PITCH_SET:
      return { ...state, minPitch: action.midiPitch };
    case MAX_PITCH_SET:
      return { ...state, maxPitch: action.midiPitch };
    default:
      return state;
  }
};

export default minMaxPitch;
