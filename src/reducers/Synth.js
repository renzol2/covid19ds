import { SYNTH } from '../actions/ActionTypes';

// TODO: put default settings somewhere
const defaultSynthState = {
  volume: -5,
  oscillator: 'triangle',
  useChorus: false,
  useDistortion: false,
  useJcreverb: false,
  useFreeverb: false,
  useAutowah: false,
};

const synth = (state = defaultSynthState, action) => {
  switch (action.type) {
    case SYNTH.VOLUME_SET:
      return { ...state, volume: action.volume };
    case SYNTH.OSCILLATOR_SET:
      return { ...state, oscillator: action.oscillator };
    case SYNTH.CHORUS_TOGGLE:
      return { ...state, useChorus: !state.useChorus };
    case SYNTH.DISTORTION_TOGGLE:
      return { ...state, useDistortion: !state.useDistortion };
    case SYNTH.JCREVERB_TOGGLE:
      return { ...state, useJcreverb: !state.useJcreverb };
    case SYNTH.FREEVERB_TOGGLE:
      return { ...state, useFreeverb: !state.useFreeverb };
    case SYNTH.AUTOWAH_TOGGLE:
      return { ...state, useAutowah: !state.useAutowah };
    default:
      return state;
  }
};

export default synth;
