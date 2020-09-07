import { BPM_SET } from '../actions/ActionTypes';

// TODO: move initial value to constants file
const bpm = (state = { playbackBpm: 999 }, action) => {
  switch (action.type) {
    case BPM_SET:
      return { ...state, playbackBpm: action.bpm };
    default:
      return state;
  }
};

export default bpm;
