/**
 * Quantizes a MIDI note based on the given scale
 * @param {number} note MIDI note to be quantized
 * @param {Array} scale list of notes in scale
 * @returns {number} quantized MIDI note
 */
function quantizeNote(note, scale) {
  let midiPitch = note;
  
  const pitchClasses = 12;
  let quantized = false;

  while (!quantized) {
    let pitchClass = midiPitch % pitchClasses;

    if (scale.includes(pitchClass)) {
      quantized = true;
      break;
    }

    if (!quantized) {
      midiPitch--;
    }
  }
  
  return midiPitch;
}

export default quantizeNote;