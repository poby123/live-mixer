import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import PrettoSlider from './PrettoSlider';

class Track extends Component {
  state = {
    audio: null,
    output: false,
  };

  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext.createGain();
    this.source = null;

    this.gainValue = 1.0;

    console.log(this.state);
  }

  getMicrophone = async () => {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  };

  stopMicrophone = () => {
    this.state.audio.getTracks().forEach((track) => track.stop());
    this.setState({ audio: null });
    this.clear();
  };

  componentWillUnmount() {
    this.clear();
  }

  clear() {
    this.analyser && this.analyser.disconnect();
    this.source && this.source.disconnect();
  }

  toggleMicrophone = async () => {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      const media = await this.getMicrophone();
      this.source = this.audioContext.createMediaStreamSource(media);

      this.source.connect(this.gainNode).connect(this.analyser);

      if(this.state.output){
        this.analyser.connect(this.audioContext.destination);
      }

      if (this.audioContext.state == 'suspended') {
        await this.audioContext.resume();
      }

      this.setState({ audio: media });
    }
  };

  toggleOutput = ()=> {
    if (this.state.output) {
      this.analyser.disconnect(this.audioContext.destination);
    } else {
      this.analyser.connect(this.audioContext.destination);
    }
    this.setState({ output: !this.state.output });
  }

  onChangeVolume(v) {
    this.gainValue = v;
    this.gainNode.gain.value = v;
  }

  render() {
    return (
      <div className="Track">
        <div className="controls">
          <button onClick={this.toggleMicrophone}>{this.state.audio ? 'Mute' : 'Unmute'}</button>
          % 울림주의 %
          <button onClick={this.toggleOutput}>
            {this.state.output ? '스피커 출력 끄기' : '스피커 출력 켜기'}
          </button>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={this.gainValue}
            onChange={(e, v) => this.onChangeVolume(v)}
            min={0}
            max={8}
            step={0.1}
          />
        </div>
        {this.state.audio && <AudioAnalyser analyser={this.analyser} />}
      </div>
    );
  }
}

export default Track;
