import React, { Component } from 'react'
import { PanResponder, View, Dimensions } from 'react-native'
import Svg, { Path, Circle, G, Text } from 'react-native-svg'

export default class CircleSlider extends Component {
  constructor(props){
    super(props)

    this.state = {
      angle: this.props.value,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e,gs) => true,
      onStartShouldSetPanResponderCapture: (e,gs) => true,
      onMoveShouldSetPanResponder: (e,gs) => true,
      onMoveShouldSetPanResponderCapture: (e,gs) => true,
      onPanResponderMove: (e,gs) => {
        let xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
        let yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
        let a = this.cartesianToPolar(gs.moveX-xOrigin, gs.moveY-yOrigin);
        
        if (a<=this.props.min) {
          this.setState({angle: this.props.min});
        } else if (a>=this.props.max) {
          this.setState({angle: this.props.max});
        } else {
          this.setState({angle: a});
        }
      }
    });
  }

  polarToCartesian(angle) {
    let r = this.props.dialRadius;
    let hC = this.props.dialRadius + this.props.btnRadius;
    //-180 para que incie desde 0
    let a = (angle-180) * Math.PI / 180.0;

    let x = hC + (r * Math.cos(a));
    let y = hC + (r * Math.sin(a));
    return {x,y};
  }

  cartesianToPolar(x,y) {
    let hC = this.props.dialRadius + this.props.btnRadius;

    if (x === 0) {
      return (y>hC ? 0 : 180);
    }
    else if (y === 0) {
      return x>hC ? 90 : 270;
    }
    else {
      return (Math.round((Math.atan((y-hC)/(x-hC)))*180/Math.PI) +
        (x>hC ? 180 : 1));
    }
  }

  render() {
    let width = (this.props.dialRadius + this.props.btnRadius)*4;
    let bR = this.props.btnRadius;
    let dR = this.props.dialRadius;
    let startCoord = this.polarToCartesian(0);
    let endCoord = this.polarToCartesian(this.state.angle);

    return (
      <Svg
        >
        <Path stroke={this.props.meterColor}
          strokeWidth={this.props.dialWidth}
          fill='none'
          d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${this.state.angle>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}/>

        <G x={endCoord.x-bR} y={endCoord.y-bR}>
          <Circle r={bR}
            cx={bR}
            cy={bR}
            fill={this.props.meterColor}
            {...this._panResponder.panHandlers}/>
        </G>
      </Svg>
    )
  }
}

CircleSlider.defaultProps = {
    //tamaño datos 
  btnRadius: 25,
  //tamaño circuloslider
  dialRadius: 70,
  dialWidth: 5,
  meterColor: '#42C2F4',
  textColor: '#fff',
  fillColor: 'none',
  strokeColor: '#fff',
  strokeWidth: 0.5,
  value: 0,
  min: 0,
  max: 179,
  xCenter: Dimensions.get('window').width/2,
  yCenter: Dimensions.get('window').height/2,
  onValueChange: x => x,
}