import { BPM_SET } from './ActionTypes';

export const bpmSet = (bpm) => {
  return {
    type: BPM_SET,
    bpm,
  };
};
