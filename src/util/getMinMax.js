/**
 * Finds the minimum and maximum of an array
 * @param {Array} arr array to find min/max
 * @returns object { min: [min], max: [max] }
 */
const getMinMax = arr => {
  let min = arr[0];
  let max = arr[0];
  let i = arr.length;

  while (i--) {
    if (isNaN(arr[i])) continue;
    min = arr[i] < min ? arr[i] : min;
    max = arr[i] > max ? arr[i] : max;
  }
  
  return { min, max };
}

export default getMinMax;

