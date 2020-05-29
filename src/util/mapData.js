/**
 * Maps a point of data from one set of bounds to another
 * @param {*} low1 lower bound of range 1
 * @param {*} high1 upper bound of range 1
 * @param {*} low2 lower bound of range 2
 * @param {*} high2 upper bound of range 2
 * @param {*} point point in range 1 to map from range 1 to range 2
 */
const mapData = (low1, high1, low2, high2, point) => {
  let range1 = high1 - low1;
  let range2 = high2 - low2;

  let pointPosition = point - low1;
  let ratio = pointPosition / range1;

  return low2 + range2 * ratio;
}

export default mapData;