export const SCALES = {
  chromatic: {
    key: 'chromatic',
    name: 'Chromatic',
    scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  major: {
    key: 'major',
    name: 'Major',
    scale: [0, 2, 4, 5, 7, 9, 11],
  },
  minor: {
    key: 'minor',
    name: 'Minor',
    scale: [0, 2, 3, 5, 7, 8, 10],
  },
  pentatonic: {
    key: 'pentatonic',
    name: 'Pentatonic',
    scale: [0, 2, 4, 7, 9],
  },
  wholeTone: {
    key: 'wholeTone',
    name: 'Whole tone',
    scale: [0, 2, 4, 6, 8, 10],
  },
};

export const DEFAULT_SCALE_SELECTION = 'chromatic';
