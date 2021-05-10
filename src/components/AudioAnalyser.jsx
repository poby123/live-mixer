import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioVisualiser from './AudioVisualiser';
import AudioRTA from './AudioRTA';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);

    this.state = { audioData: new Uint8Array(0), freqData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount() {
    const {analyser} = this.props;
    this.dataArray = new Uint8Array(analyser.frequencyBinCount); // frequencyBinCount : 데이터를 시각화하기 위해 사용되는 데이터의 수와 같다.
    this.freqArray = new Uint8Array(analyser.frequencyBinCount);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    const {analyser} = this.props;

    analyser.getByteTimeDomainData(this.dataArray); // 데이터의 파형 또는 시간기반 데이터를 Uint8Array로 전달
    analyser.getByteFrequencyData(this.freqArray); // 주파수 데이터를 Uint8Array로 전달. 0Hz ~ 24Khz 1024

    this.setState({ audioData: this.dataArray, freqData: this.freqArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
  }

  render() {
    return (
      <>
        <AudioVisualiser audioData={this.state.audioData} />
        <AudioRTA audioData={this.state.freqData} /> 
      </>
    )
  }
}

AudioAnalyser.propTypes = {
  analyser: PropTypes.object.isRequired
}

export default AudioAnalyser;
