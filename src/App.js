import React, {useState, useRef, useEffect} from 'react';
import './App.css';

// Tone.js imports
import * as Tone from 'tone';

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Required for react-bootstrap-slider
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css"
import ReactBootstrapSlider from 'react-bootstrap-slider';

// Function imports
import FetchOwidData from './data/FetchOwidData';
import getMinMax from './util/getMinMax';
import mapData from './util/mapData';
import quantizeNote from './util/quantizeNote';

// Components
import RegionDropdown from './components/regionDropdown';
import DataDropdown from './components/dataDropdown';
import DataVisualization from './components/DataVisualization';
import BpmInput from './components/BpmInput';
import OscillatorToggleButton from './components/OscillatorToggleButton';
import PitchButtonGroup from './components/PitchButtonGroup';
import MinMaxMidiInput from './components/MinMaxMidiInput';
import ScaleDropdown from './components/ScaleDropdown';

// Default pitch
const defaultPitch = 60;

// Default BPM
const defaultBpm = 999;

// Default MIDI parameters
const defaultMinMidi = 36;
const defaultMaxMidi = 96;

// Default oscillator selection
const defaultOscSelection = 1;

const defaultRegion = 'World';

// All oscillator types
const oscTypes = [
  'sine',
  'triangle',
  'square',
  'sawtooth',
];

// Scales
const scales = {
  chromatic: {
    key: 'chromatic',
    name: 'Chromatic',
    scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  major: {
    key: 'major',
    name: 'Major',
    scale: [0, 2, 4, 5, 7, 9, 11]
  },
  minor: {
    key: 'minor',
    name: 'Minor',
    scale: [0, 2, 3, 5, 7, 8, 10]
  },
  pentatonic: {
    key: 'pentatonic',
    name: 'Pentatonic',
    scale: [0, 2, 4, 7, 9]
  },
  wholeTone: {
    key: 'wholeTone',
    name: 'Whole tone',
    scale: [0, 2, 4, 6, 8, 10]
  }
};

// Default scale selection
const defaultScaleSelection = 'chromatic';

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
  const [region, setRegion] = useState(defaultRegion);
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [displayViz, setVisualize] = useState(true);
  const [doAnimation, setAnimation] = useState(true);
  const [currentAmt, setCurrentAmt] = useState(Number.MAX_SAFE_INTEGER);
  const [currentDate, setCurrentDate] = useState('');
  const [playbackData, setPlaybackData] = useState([]);

  // Sonification state variables
  const [pitch, setPitch] = useState(defaultPitch);
  const [volume, setVolume] = useState(-5);  // in dB
  const [oscSelection, setOscSelection] = useState(defaultOscSelection);
  const [minMidiPitch, setMinMidiPitch] = useState(defaultMinMidi);
  const [maxMidiPitch, setMaxMidiPitch] = useState(defaultMaxMidi);
  const [bpm, setBpm] = useState(defaultBpm);
  const [scaleSelection, setScaleSelection] = useState(defaultScaleSelection);
  const [inPlayback, setInPlayback] = useState(false);

  // Synth using React Hooks
  // https://github.com/Tonejs/Tone.js/wiki/Using-Tone.js-with-React-or-Vue
  const synth = useRef(null);

  // Initialize synth
  useEffect(() => {
    // Set oscillator type and initialize synth
    const options = {oscillator: {
      type: oscTypes[oscSelection],
      volume: volume
    }};

    synth.current = new Tone.Synth(options).toMaster();
    
  }, [oscSelection, volume]);

  // Continually initialize region data on startup until data is loaded
  // FIXME: tacky solution to load the graph on app startup, is there a better way to do this?
  useEffect(() => {
    if (regionData.length > 0) return;
    initializeRegion(region);
  });


  /**
   * Updates state variables with region from dropdown
   * @param {string} selectedRegion region from dropdown component
   */
   function initializeRegion(selectedRegion) {
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
    setInPlayback(true);

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
      playbackData.push(regionData[entry.index]);
      setPlaybackData(playbackData);

      // Stop playback when finished
      if (pattern.index === pattern.values.length - 1) {
        setInPlayback(false);
        setPlaybackData([]);
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
  return (
    <div className='body'>
      <h1>COVID-19 Data Sonification</h1>

      {/* Data information */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>
      
      <p>Min/max amount: {minAmount}/{maxAmount}</p>
      <p>Current amount: {currentAmt === Number.MAX_SAFE_INTEGER ? 'None' : `${currentAmt} cases at ${currentDate}`}</p>
      <p>Dataset URL: {dataset === '' ? 'None' : dataset}</p>

      <h4>Current region: {region}</h4>
      
      <ButtonGroup>
        
        <RegionDropdown 
          regions={regions} 
          callback={initializeRegion}
          currentRegionName={region}
        />

        <DataDropdown
          currentDatasetName={datasets.find(dset => dset.url === dataset).title}
          datasets={datasets}
          setDataset={setDataset}
          fetchData={fetchData}
          region={region}
          initializeRegion={initializeRegion}
          waitTime={600}
        />

        <Button onClick={() => setVisualize(!displayViz)}>
          {`Visualization: ${displayViz ? 'on' : 'off'}`}
        </Button>
        
        <Button onClick={() => setAnimation(!doAnimation)}>
          {`Animation: ${doAnimation ? 'on' : 'off'}`}
        </Button>
      
      </ButtonGroup>

      {/* Play/stop buttons when region data is selected */}
      {regionData.length !== 0 && 
        (
          <ButtonGroup>
            <Button 
              variant='success' 
              onClick={() => {
                Tone.Transport.cancel();
                sonifyData();
              }}
            >
              Play
            </Button>

            <Button 
              variant='danger' 
              onClick={() => {
                Tone.Transport.cancel();
                setPlaybackData([]);
                setInPlayback(false);
              }}
            >
              Stop
            </Button>
          </ButtonGroup>
        )
      }

      {/* Data visualization */}
      <div className="dataViz">
        {displayViz && <DataVisualization 
          animate={doAnimation}
          axisLeft={{
            legend: datasets.find(d => d.url === dataset).title,
            legendOffset: 10,
            format: '.2s'
          }}
          data={[{
            id: region, 
            data: inPlayback ? sanitizeData(playbackData) : sanitizeData(regionData)
          }]}
          onClick={(point, event) => {
            if (point === undefined) return;
            playMidiNote( quantizeNote( convertEntryToMidi(point.data.y), scales[scaleSelection].scale ) );
          }}
          onMouseMove={(point, event) => {
            // Don't set current amount/date through mouse if in playback
            if (point === undefined || inPlayback) return;
            setCurrentAmt(point.data.y)
            setCurrentDate(regionData[point.data.x].date)
          }}
        />}
      </div>

      { /* Sonification parameters */}
      <h3>Options:</h3>
      
      {/* React bootstrap slider */}
      <p>Volume (in dB)</p>
      <ReactBootstrapSlider
        value={volume}
        min={-30}
        max={0}
        step={0.05}
        change={(event) => {
          const newVolume = event.target.value;  // in dB
          setVolume(newVolume);
        }}
      />
      <br />
      <br />
      
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

      <ScaleDropdown
        scales={scales}
        scaleSelection={scaleSelection}
        setScaleSelection={setScaleSelection}
      />

      <br />
      <br />

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

    </div>
  )
}

export default App;