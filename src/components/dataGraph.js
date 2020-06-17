import React, {Component} from 'react';

import {
  FlexibleWidthXYPlot, 
  XAxis, 
  YAxis, 
  VerticalBarSeries, 
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

import PropTypes from 'prop-types';

/**
 * Visualization of COVID-19 Data using react-vis
 */
class DataGraph extends Component {
  render() {
    const props = this.props;
    if (!props.visualize) return <div />;

    // Props
    const height = props.height;
    const animation = props.animation;
    const colorRange = props.colorRange;
    const gridLineColor = props.gridLineColor;
    const data = props.data;
    const onMouseLeave = props.onMouseLeave;
    const onNearestX = props.onNearestX;
    const onValueClick = props.onValueClick;
    const xAxisTitle = props.xAxisTitle;
    const yAxisTitle = props.yAxisTitle;
    const yAxisLeft = props.yAxisLeft;

    return (
      <FlexibleWidthXYPlot 
          height={height}
          onMouseLeave={onMouseLeave}
          colorRange={colorRange}
          animation={animation}
        >
          <HorizontalGridLines style={{stroke: gridLineColor}} />
          <VerticalGridLines style={{stroke: gridLineColor}} />

          <VerticalBarSeries
            data={data}
            onNearestX={onNearestX}
            onValueClick={onValueClick}
          />

          <XAxis title={xAxisTitle} />
          <YAxis title={yAxisTitle} left={yAxisLeft} />
        </FlexibleWidthXYPlot>
    );
  }
}

DataGraph.propTypes = {
  visualize: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  animation: PropTypes.bool.isRequired,
  colorRange: PropTypes.array.isRequired,
  gridLineColor: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onNearestX: PropTypes.func.isRequired,
  onValueClick: PropTypes.func.isRequired,
  xAxisTitle: PropTypes.string.isRequired,
  yAxisTitle: PropTypes.string.isRequired,
  yAxisLeft: PropTypes.number.isRequired
}

export default DataGraph;
