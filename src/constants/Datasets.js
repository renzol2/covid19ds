export const DATASETS = [
  {
    title: 'Total cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv',
  },
  {
    title: 'Total deaths',
    url: 'https://covid.ourworldindata.org/data/ecdc/total_deaths.csv',
  },
  {
    title: 'New cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/new_cases.csv',
  },
  {
    title: 'New deaths',
    url: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv',
  },
];

export const DEFAULT_DATASET = DATASETS.find((d) => d.title === 'New cases');
