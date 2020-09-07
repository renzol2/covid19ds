import { SYNTH } from './ActionTypes';

export const synthVolumeSet = (volume) => {
  return {
    type: SYNTH.VOLUME_SET,
    volume,
  };
};

export const synthOscillatorSet = (oscillator) => {
  return {
    type: SYNTH.OSCILLATOR_SET,
    oscillator,
  };
};

export const synthChorusToggle = () => {
  return {
    type: SYNTH.CHORUS_TOGGLE,
  };
};

export const synthDistortionToggle = () => {
  return {
    type: SYNTH.DISTORTION_TOGGLE,
  };
};

export const synthJcreverbToggle = () => {
  return {
    type: SYNTH.JCREVERB_TOGGLE,
  };
};

export const synthFreeverbToggle = () => {
  return {
    type: SYNTH.FREEVERB_TOGGLE,
  };
};

export const synthAutowahToggle = () => {
  return {
    type: SYNTH.AUTOWAH_TOGGLE,
  };
};
