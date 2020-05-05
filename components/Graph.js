import React from 'react';
import {View} from 'react-native';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';

const Graph = ({data}) => {
  const contentInset = {top: 20, bottom: 20};

  return (
    <View>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          backgroundColor: 'black',
        }}>
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
          contentInset={contentInset}>
          <Grid />
        </LineChart>
      </View>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          backgroundColor: 'black',
        }}>
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
          contentInset={contentInset}>
          <Grid />
        </LineChart>
      </View>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          backgroundColor: 'black',
        }}>
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
          contentInset={contentInset}>
          <Grid />
        </LineChart>
      </View>
    </View>
  );
};

export default Graph;
