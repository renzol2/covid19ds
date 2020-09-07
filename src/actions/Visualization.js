import { VISUALIZATION } from './ActionTypes';

// TODO: add support for multiple visualizations by including an id
export const visualizationToggle = () => {
  return {
    type: VISUALIZATION.TOGGLE,
  };
};

export const animationToggle = () => {
  return {
    type: VISUALIZATION.ANIMATED,
  };
};
