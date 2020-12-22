import { VISUALIZATION } from '../actions/ActionTypes';

const visualization = (state = { visible: true, animation: false }, action) => {
  switch (action.type) {
    case VISUALIZATION.TOGGLE:
      return { ...state, visible: !state.visible };
    case VISUALIZATION.ANIMATED:
      return { ...state, animation: !state.animation };
    default:
      return state;
  }
};

export default visualization;
