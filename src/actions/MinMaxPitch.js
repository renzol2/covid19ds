import { MIN_PITCH_SET, MAX_PITCH_SET } from './ActionTypes';

export const minPitchSet = midiPitch => {
  return {
    type: MIN_PITCH_SET,
    midiPitch
  };
}

export const maxPitchSet = midiPitch => {
  return {
    type: MAX_PITCH_SET,
    midiPitch
  };
}
