import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';

// Tone.js imports
import * as Tone from 'tone';

// React-Bootstrap imports
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

// Function imports
import FetchOwidData from './data/FetchOwidData';
import getMinMax from './util/getMinMax';
import mapData from './util/mapData';
import quantizeNote from './util/quantizeNote';

// Components
import RegionDropdown from './components/regionDropdown';
import DataDropdown from './components/DataDropdownClass';
import DataVisualization from './components/DataVisualization';
import BpmInput from './components/BpmInput';
import OscillatorDropdown from './components/OscillatorDropdown';
import MinMaxMidiInput from './components/MinMaxMidiInput';
import ScaleDropdown from './components/ScaleDropdown';

// Constants
import { DEFAULT_SCALE_SELECTION, SCALES } from './constants/Scales';
import { DEFAULT_DATASET, DATASETS } from './constants/Datasets';
import { DEFAULT_VOLUME, MIN_VOLUME, MAX_VOLUME } from './constants/Volume';
import { DEFAULT_OSCILLATOR, OSCILLATORS } from './constants/Oscillators';

// Actions
import { bindActionCreators } from 'redux';
import { visualizationToggle, animationToggle } from './actions/Visualization';

const defaultRegion = 'World';

function App({
  minMidiPitch,
  maxMidiPitch,
  bpm,
  showVisualization,
  showAnimation,
  visualizationToggle,
  animationToggle
}) {
  // Data state variables
  const [{ data, regions, isLoading, isError }, fetchData] = FetchOwidData(
    DEFAULT_DATASET.url
  );
  const [dataset, setDataset] = useState(DEFAULT_DATASET.url);
  const [region, setRegion] = useState(defaultRegion);
  const [regionData, setRegionData] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [currentAmt, setCurrentAmt] = useState(Number.MAX_SAFE_INTEGER);
  const [currentDate, setCurrentDate] = useState('');
  const [playbackData, setPlaybackData] = useState([]);

  // Sonification state variables
  const [synthVolume, setSynthVolume] = useState(DEFAULT_VOLUME); // in dB
  const [oscSelection, setOscSelection] = useState(DEFAULT_OSCILLATOR);
  const [scaleSelection, setScaleSelection] = useState(DEFAULT_SCALE_SELECTION);
  const [inPlayback, setInPlayback] = useState(false);
  const [useChorus, setUseChorus] = useState(false);
  const [useDist, setUseDist] = useState(false);
  const [useJCRev, setUseJCRev] = useState(false);
  const [useFreeverb, setUseFreeverb] = useState(false);
  const [useAutoWah, setUseAutoWah] = useState(false);

  // Synth using React Hooks
  // https://github.com/Tonejs/Tone.js/wiki/Using-Tone.js-with-React-or-Vue
  const synth = useRef(null);

  // Initialize synth
  useEffect(() => {
    // Set oscillator type and initialize synth
    const options = {
      oscillator: {
        type: oscSelection,
        volume: synthVolume,
      },
    };

    // Effects
    const dist = new Tone.Distortion(1).toMaster(); // 0-1
    const jcrev = new Tone.JCReverb(0.5).toMaster(); // 0-1
    const freeverb = new Tone.Freeverb(0.75).toMaster(); // 0-1,freq
    // These settings I'm taking straight from the Tone.js docs
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster();
    const autoWah = new Tone.AutoWah(50, 6, -30).toMaster();
    autoWah.Q.value = 10;

    synth.current = new Tone.Synth(options);

    if (useDist) synth.current.connect(dist);
    if (useChorus) synth.current.connect(chorus);
    if (useFreeverb) synth.current.connect(freeverb);
    if (useJCRev) synth.current.connect(jcrev);
    if (useAutoWah) synth.current.connect(autoWah);

    synth.current.toMaster();
  }, [
    oscSelection,
    synthVolume,
    useDist,
    useChorus,
    useFreeverb,
    useJCRev,
    useAutoWah,
  ]);

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
  }

  /**
   * Sets region data and min/max pitches using region data
   * @param {string} newRegion selected region from dropdown
   */
  function initializeRegionData(newRegion) {
    // console.log('init region data');
    let selectedRegionData = [];
    let amounts = [];

    // Populate region data and amounts
    let key = 0;
    for (var line of data) {
      selectedRegionData.push({
        date: line['date'],
        amount: parseInt(line[newRegion]),
        index: key++,
      });

      amounts.push(parseInt(line[newRegion]));
    }

    selectedRegionData.filter((entry) => !isNaN(entry.amount));
    setRegionData(selectedRegionData);

    let minMax = getMinMax(amounts.filter((amount) => !isNaN(amount)));

    setMinAmount(minMax.min);
    setMaxAmount(minMax.max);
  }

  /**
   * Maps a point of data to a MIDI note using min/max amounts kept in state
   * @param {number} amount data to map
   * @returns {number} MIDI note
   */
  function convertEntryToMidi(amount) {
    let mapped = mapData(
      minAmount,
      maxAmount,
      minMidiPitch,
      maxMidiPitch,
      amount
    );
    let midi = Math.floor(mapped);
    return midi;
  }

  /**
   * Sonifies data of selected region
   */
  function sonifyData() {
    setInPlayback(true);

    Tone.Transport.cancel(); // stops previous loop

    // Map region data to objects { note, index }
    const notes = regionData
      .map((entry) => ({
        note: convertEntryToMidi(entry.amount),
        date: entry.date,
        index: entry.index,
      }))
      .filter((entry) => !isNaN(entry.note));

    // Quantize notes according to scale (can't do this within convertEntryToMidi for some reason...)
    const quantizedNotes = notes.map((entry) => ({
      ...entry,
      note: quantizeNote(entry.note, SCALES[scaleSelection].scale),
    }));

    // Set up pattern to play data
    var pattern = new Tone.Pattern((time, entry) => {
      synth.current.triggerAttackRelease(
        Tone.Frequency(entry.note, 'midi'),
        0.25
      );

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
    const data = regionData
      .filter((entry) => !isNaN(entry.amount))
      .map((entry) => ({
        x: entry.index,
        y: entry.amount,
        color: entry.amount === currentAmt ? 0 : 1,
      }));

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
   * Render
   */
  return (
    <div className="body">
      <h1>COVID-19 Data Sonification</h1>

      {/* Data information */}
      <h3>Display data:</h3>
      <p>{isLoading ? 'Loading data...' : null}</p>
      <p>{isError ? 'An error occurred.' : null}</p>

      <p>
        Min/max amount: {minAmount}/{maxAmount}
      </p>
      <p>
        Current amount:{' '}
        {currentAmt === Number.MAX_SAFE_INTEGER
          ? 'None'
          : `${currentAmt} cases at ${currentDate}`}
      </p>
      <p>Dataset URL: {dataset === '' ? 'None' : dataset}</p>

      <h4>Current region: {region}</h4>

      <ButtonGroup>
        <RegionDropdown
          regions={regions}
          callback={initializeRegion}
          currentRegionName={region}
        />

        <DataDropdown
          currentDatasetName={
            DATASETS.find((dset) => dset.url === dataset).title
          }
          datasets={DATASETS}
          setDataset={setDataset}
          fetchData={fetchData}
          region={region}
          initializeRegion={initializeRegion}
          waitTime={600}
        />

        <Button onClick={() => visualizationToggle()}>
          {`Visualization: ${showVisualization ? 'on' : 'off'}`}
        </Button>

        <Button onClick={() => animationToggle()}>
          {`Animation: ${showAnimation ? 'on' : 'off'}`}
        </Button>
      </ButtonGroup>

      {/* Play/stop buttons when region data is selected */}
      {regionData.length !== 0 && (
        <ButtonGroup>
          <Button
            variant="success"
            onClick={() => {
              Tone.Transport.cancel();
              sonifyData();
            }}
          >
            Play
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              Tone.Transport.cancel();
              setPlaybackData([]);
              setInPlayback(false);
            }}
          >
            Stop
          </Button>
        </ButtonGroup>
      )}

      {/* Data visualization */}
      <div className="dataViz">
        {showVisualization && (
          <DataVisualization
            animate={showAnimation}
            axisLeft={{
              legend: DATASETS.find((d) => d.url === dataset).title,
              legendOffset: 10,
              format: '.2s',
            }}
            data={[
              {
                id: region,
                data: inPlayback
                  ? sanitizeData(playbackData)
                  : sanitizeData(regionData),
              },
            ]}
            onClick={(point, event) => {
              if (point === undefined) return;
              playMidiNote(
                quantizeNote(
                  convertEntryToMidi(point.data.y),
                  SCALES[scaleSelection].scale
                )
              );
            }}
            onMouseMove={(point, event) => {
              // Don't set current amount/date through mouse if in playback
              if (point === undefined || inPlayback) return;
              setCurrentAmt(point.data.y);
              setCurrentDate(regionData[point.data.x].date);
            }}
          />
        )}
      </div>

      {/* Sonification parameters */}
      <h3>Options:</h3>

      {/* React bootstrap slider */}
      <Form>
        <Form.Label>Synth Volume (in dB)</Form.Label>
        <Form.Control
          type="range"
          defaultValue={mapData(MIN_VOLUME, MAX_VOLUME, 0, 100, DEFAULT_VOLUME)}
          onChange={(event) => {
            const newValue = event.target.value; // dB
            const newVolume = mapData(0, 100, MIN_VOLUME, MAX_VOLUME, newValue);
            setSynthVolume(newVolume);
          }}
        />
      </Form>

      <ButtonGroup>
        <OscillatorDropdown
          setOscSelection={setOscSelection}
          oscSelection={oscSelection}
          oscTypes={OSCILLATORS}
        />

        <ScaleDropdown
          scales={SCALES}
          scaleSelection={scaleSelection}
          setScaleSelection={setScaleSelection}
        />
      </ButtonGroup>
      <br />

      <ButtonGroup>
        <Button
          variant={useDist ? 'primary' : 'outline-primary'}
          onClick={() => setUseDist(!useDist)}
        >
          Distortion: <b>{useDist ? 'enabled' : 'disabled'}</b>
        </Button>
        <Button
          variant={useChorus ? 'primary' : 'outline-primary'}
          onClick={() => setUseChorus(!useChorus)}
        >
          Chorus: <b>{useChorus ? 'enabled' : 'disabled'}</b>
        </Button>
        <Button
          variant={useFreeverb ? 'primary' : 'outline-primary'}
          onClick={() => setUseFreeverb(!useFreeverb)}
        >
          Freeverb: <b>{useFreeverb ? 'enabled' : 'disabled'}</b>
        </Button>
        <Button
          variant={useJCRev ? 'primary' : 'outline-primary'}
          onClick={() => setUseJCRev(!useJCRev)}
        >
          JCReverb: <b>{useJCRev ? 'enabled' : 'disabled'}</b>
        </Button>
        <Button
          variant={useAutoWah ? 'primary' : 'outline-primary'}
          onClick={() => setUseAutoWah(!useAutoWah)}
        >
          AutoWah: <b>{useAutoWah ? 'enabled' : 'disabled'}</b>
        </Button>
      </ButtonGroup>

      <br />
      <br />

      <MinMaxMidiInput />
      <BpmInput />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    minMidiPitch: state.minMaxPitch.minPitch,
    maxMidiPitch: state.minMaxPitch.maxPitch,
    bpm: state.bpm.playbackBpm,
    showVisualization: state.visualization.visible,
    showAnimation: state.visualization.animation,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      visualizationToggle,
      animationToggle,
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
