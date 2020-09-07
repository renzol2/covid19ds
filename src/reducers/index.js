import { combineReducers } from '@reduxjs/toolkit';
import minMaxPitch from './MinMaxPitch';
import bpm from './Bpm';

export default combineReducers({
  minMaxPitch,
  bpm,
});
