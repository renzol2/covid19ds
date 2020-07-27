import React from 'react';

import { ResponsiveLine } from '@nivo/line';

function DataVisualization({ animate, axisLeft, data, onClick, onMouseMove, currentDate }) {
  return (
    <ResponsiveLine
      isInteractive
      enableArea
      useMesh
      animate={animate}
      curve={'linear'}
      enableGridY={false}
      colors={{scheme: 'dark2'}}
      axisLeft={axisLeft}
      axisBottom={{
        legend: 'Days since December 2019',
        legendOffset: 40,
        // Only show values on x-axis that are divisible by 10
        format: value => value % 10 === 0 ? value : ''
      }}
      margin={{top:20,bottom:50,left:75,right:30}}
      data={data}
      onClick={onClick}
      onMouseMove={onMouseMove}
      crosshairType={'cross'}
      motionStiffness={300}
      motionDamping={40}
    />
  );
}

export default DataVisualization;
