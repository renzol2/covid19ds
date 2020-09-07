import { combineReducers } from '@reduxjs/toolkit';
import minMaxPitch from './MinMaxPitch';
import bpm from './Bpm';
import visualization from './Visualization';

export default combineReducers({
  minMaxPitch,
  bpm,
  visualization,
});
