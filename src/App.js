import React, {useState, useRef, useEffect} from 'react';
import './App.css';

// Tone.js imports
import * as Tone from 'tone';

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Function imports
import FetchOwidData from './data/FetchOwidData';
import getMinMax from './util/getMinMax';
import mapData from './util/mapData';
import quantizeNote from './util/quantizeNote';

// Components
import RegionDropdown from './components/regionDropdown';
import DataDropdown from './components/dataDropdown';
import DataGraph from './components/DataGraph';
import BpmInput from './components/BpmInput';
import OscillatorToggleButton from './components/OscillatorToggleButton';
import PitchButtonGroup from './components/pitchChange';
import MinMaxMidiInput from './components/MinMaxMidiInput';

// Default pitch
const defaultPitch = 60;

// Default BPM
const defaultBpm = 999;

// Default MIDI parameters
const defaultMinMidi = 36;
const defaultMaxMidi = 96;

// Default oscillator selection
const defaultOscSelection = 1;

// All oscillator types
const oscTypes = [
  'sine',
  'triangle',
  'square',
  'sawtooth',
];

// Scales
const scales = [
  {
    name: 'Chromatic',
    scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Major',
    scale: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    name: 'Minor',
    scale: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    name: 'Pentatonic',
    scale: [0, 2, 4, 7, 9],
  },
  {
    name: 'Whole tone',
    scale: [0, 2, 4, 6, 8, 10],
  },
];

// Default scale selection
const defaultScaleSelection = 0;

// URL to fetch data
const defaultUrl = 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv';

// All data
const datasets = [
  {
    title: 'Total cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/total_cases.csv',
  },
  {
    title: 'Total deaths',
    url: 'https://covid.ourworldindata.org/data/ecdc/total_deaths.csv'
  },
  {
    title: 'New cases',
    url: 'https://covid.ourworldindata.org/data/ecdc/new_cases.csv',
  },
  {
    title: 'New deaths',
    url: 'https://covid.ourworldindata.org/data/ecdc/new_deaths.csv'
  }
];

function App() {
  // Data state variables
  const [{ data, regions, isLoading, isError }, fetchData] = FetchOwidData(defaultUrl);
  const [dataset, setDataset] = useState(defaultUrl);
  const [region, setRegion] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [visualize, setVisualize] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [currentAmt, setCurrentAmt] = useState(-1);
  const [currentDate, setCurrentDate] = useState('');

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(defaultMinMidi);
  const [maxMidiPitch, setMaxMidiPitch] = useState(defaultMaxMidi);
  const [bpm, setBpm] = useState(defaultBpm);
  const [scaleSelection, setScale] = useState(defaultScaleSelection);

  // Synth (with initialization)
  const synth = useRef(null);
  useEffect(() => {
    // Set oscillator type and initialize synth
    const options = {oscillator: {
      type: oscTypes[oscSelection],
    }};
    synth.current = new Tone.Synth(options).toMaster();
  });

  /**
   * Updates state variables with region from dropdown
   * @param {string} selectedRegion region from dropdown component
   */
  function initializeRegion(selectedRegion) {
    console.log('init region');
    setRegion(selectedRegion);
    initializeRegionData(selectedRegion);
  };

  /**
   * Sets region data and min/max pitches using region data
   * @param {string} newRegion selected region from dropdown
   */
  function initializeRegionData(newRegion) {
    let selectedRegionData = [];
    let amounts = [];

    // Populate region data and amounts
    let key = 0;
    for (var line of data) {
      selectedRegionData.push(
        { 
          date: line['date'], 
          amount: parseInt(line[newRegion]),
          index: key++
        }
      );
      
      amounts.push(parseInt(line[newRegion])); 
    }

    selectedRegionData.filter(entry => !isNaN(entry.amount));
    setRegionData(selectedRegionData);
    
    let minMax = getMinMax(amounts.filter(
      amount => !isNaN(amount)
    ));

    setMinAmount(minMax.min);
    setMaxAmount(minMax.max);
  };

  /**
   * Maps a point of data to a MIDI note using min/max amounts kept in state
   * @param {number} amount data to map
   * @returns {number} MIDI note
   */
  function convertEntryToMidi(amount) {
    let mapped = mapData(minAmount, maxAmount, minMidiPitch, maxMidiPitch, amount);
    let midi = Math.floor(mapped);
    return midi;
  }

  /**
   * Sonifies data of selected region
   */
  function sonifyData() {
    Tone.Transport.cancel();  // stops previous loop

    // Map region data to objects { note, index }
    const notes = regionData.map(entry => ({
      note: convertEntryToMidi(entry.amount),
      date: entry.date,
      index: entry.index,
    })).filter(entry => !isNaN(entry.note));
    
    // Quantize notes according to scale (can't do this within convertEntryToMidi for some reason...)
    const quantizedNotes = notes.map(entry => ({
      ...entry,
      note: quantizeNote(entry.note, scales[scaleSelection].scale)
    }));

    // Set up pattern to play data
    var pattern = new Tone.Pattern((time, entry) => {
      synth.current.triggerAttackRelease(Tone.Frequency(entry.note, 'midi'), 0.25);
      
      setCurrentAmt(regionData[entry.index].amount);
      setCurrentDate(entry.date);

      // Stop playback when finished
      if (pattern.index === pattern.values.length - 1) {
        Tone.Transport.cancel();
      }
    }, quantizedNotes);
    
    pattern.start(0);
    Tone.Transport.bpm.value = bpm;

    Tone.Transport.start();
  }

  /**
   * Sanitizes region data for visualiation in react-vis
   * @param {Array} regionData region data containing objects { date, amount, index }
   * @returns {Array} an array of objects { x, y, color }
   */
  function sanitizeData(regionData) {
    const data = regionData.filter(entry => !isNaN(entry.amount)).map(
      entry => ({
        x: entry.index,
        y: entry.amount,
        color: entry.amount === currentAmt ? 0 : 1,
      })
    );
    
    return data;
  }

  /**
   * Plays the given MIDI note using the synth and its current settings
   * @param {number} midiNote 
   */
  function playMidiNote(midiNote) {
    synth.current.triggerAttackRelease(Tone.Frequency(midiNote, 'midi'), '8n');
  }  

  /**
   * Handles numerical input for visualization/sonification parameters (state)
   * Insures only numerical inputs are processed
   * 
   * @param {Object} event event from React-Bootstrap form input 
   * @param {Function} setStateFunction function to set state with new event value
   */
  function handleInput(event, setStateFunction) {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      return;
    }
    setStateFunction(newValue);
  }

  /**
   * Render
   */
  let key = 0;
  return (
    <div className='body'>
      <h1>COVID-19 Data Sonification</h1>

      {/* Data information */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>
      
      <p>Min/max amount: {minAmount}/{maxAmount}</p>
      <p>Current amount: {currentAmt === -1 ? 'None' : `${currentAmt} cases at ${currentDate}`}</p>
      <p>Dataset URL: {dataset === '' ? 'None' : dataset}</p>

      <h4>Current region: {region}</h4>
      
      <ButtonGroup>
        <RegionDropdown regions={regions} callback={initializeRegion} />
        <DataDropdown
          datasets={datasets}
          setDataset={setDataset}
          fetchData={fetchData}
          region={region}
          initializeRegion={initializeRegion}
          waitTime={600}
        />
        <Button onClick={() => setVisualize(!visualize)}>Toggle visualization</Button>
        <Button onClick={() => setAnimation(!animation)}>Toggle animation (affects performance)</Button>
      </ButtonGroup>

      {/* Play/stop buttons when region data is selected */}
      {regionData.length !== 0 && 
        (
          <ButtonGroup>
            <Button variant='success' onClick={() => sonifyData()}>
              Play
            </Button>
            <Button variant='danger' onClick={() => Tone.Transport.cancel()}>
              Stop
            </Button>
          </ButtonGroup>
        )
      }

      {/* Data visualization */}
      <DataGraph
        visualize={visualize}
        height={400}
        animation={animation}
        colorRange={['yellow', 'cornflowerblue']}
        gridLineColor={'#B7E9ED'}
        data={sanitizeData(regionData)}
        onMouseLeave={() => setCurrentAmt(-1)}
        onNearestX={(entry, {index}) => {
          setCurrentAmt(entry.y);
          setCurrentDate(regionData[index].date);
        }}
        onValueClick={entry => {
          playMidiNote( quantizeNote(convertEntryToMidi(entry.y), scales[scaleSelection].scale) );
        }}

        xAxisTitle={'Days since December 31, 2019'}
        yAxisTitle={datasets.filter(dset => dset.url === dataset)[0].title}
        yAxisLeft={50}
      />

      { /* Sonification parameters */}
      <h3>Options:</h3>
      
      <Button variant="info" onClick={() => playMidiNote(pitch)}>Play test pitch</Button>
      <br />
      <br />
      
      <PitchButtonGroup setPitch={setPitch} pitch={pitch} />
      <p>The current MIDI pitch is: <strong>{pitch}</strong></p>
      
      <OscillatorToggleButton 
        setOscSelection={setOscSelection}
        oscSelection={oscSelection}
        oscTypes={oscTypes}
      />
      <p>The current oscillator is: <strong>{oscTypes[oscSelection]}</strong></p>

      <Button
        variant='primary'
        onClick={() => {
          setScale((scaleSelection + 1) % scales.length)
        }}>
          Toggle scale
      </Button>
      <p>Scale: <strong>{ scales[scaleSelection].name }</strong></p>

      <MinMaxMidiInput
        handleInput={handleInput}
        setMinMidiPitch={setMinMidiPitch}
        setMaxMidiPitch={setMaxMidiPitch}
      />
      <p>
        Min/max MIDI pitch: <strong>[{minMidiPitch}, {maxMidiPitch}]</strong>
      </p>

      {/* BPM input */}
      <BpmInput bpm={bpm} setBpm={setBpm} handleInput={handleInput} />
      
      {/* Data (actual / MIDI) */}
      {regionData.length !== 0 && (<h2>Raw data</h2>)}
      <ul>
        {regionData.length !== 0 &&
          regionData.map(entry => (
            <li key={key++} >
              {entry.date}: <strong>{
                isNaN(entry.amount) 
                  ? 'No data' 
                  : entry.amount
              }</strong> 
            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default App;