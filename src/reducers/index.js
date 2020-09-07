import { combineReducers } from '@reduxjs/toolkit';
import minMaxPitch from './MinMaxPitch';
import bpm from './Bpm';
import visualization from './Visualization';
import synth from './Synth';

export default combineReducers({
  minMaxPitch,
  bpm,
  visualization,
  synth,
});
