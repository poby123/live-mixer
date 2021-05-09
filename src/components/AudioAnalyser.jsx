import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualiser';
import AudioRTA from './AudioRTA';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0), freqData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser(); // AnalyserNode를 반환
    this.master = this.audioContext.createGain(); // GainNode를 반환
    this.master.connect(this.audioContext.destination);
  }
  
  componentDidMount() {
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount); // frequencyBinCount : 데이터를 시각화하기 위해 사용되는 데이터의 수와 같다.
    this.freqArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray); // 데이터의 파형 또는 시간기반 데이터를 Uint8Array로 전달
    this.analyser.getByteFrequencyData(this.freqArray); // 주파수 데이터를 Uint8Array로 전달. 0Hz ~ 24Khz 1024

    this.setState({ audioData: this.dataArray, freqData: this.freqArray });
    
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
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

export default AudioAnalyser;
