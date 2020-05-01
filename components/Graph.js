import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const Graph = () => {
  const [data, setData] = useState([0, 50, 0, 50, 0, 50, 0, 50, 0, 50]);

  useEffect(() => {
    const id = setInterval(() => {
      let val = data[data.length - 1];
      val === 50 ? (val = 0) : (val = 50);
      let prevData = [...data, val];
      prevData.shift();
      console.log(prevData);
      setData(prevData);
    }, 100);
    return () => clearInterval(id);
  }, [data]);

  const contentInset = {top: 20, bottom: 20};

  return (
    <View>
      <View
        style={{height: 100, flexDirection: 'row', backgroundColor: 'black'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'green',
            fontSize: 10,
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${value}ºcm3`}
        />
        <LineChart
          style={{flex: 1, marginLeft: 16}}
          data={data}
          svg={{stroke: 'green'}}
          curve={shape.curveNatural}
          contentInset={contentInset}>
          <Grid />
        </LineChart>
      </View>
    </View>
  );
};

export default Graph;
