import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import PrettoSlider from './PrettoSlider';

class Track extends Component {
  state = {
    audio: null,
  };

  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);

    this.source = null;
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

      this.source.connect(this.analyser);
      await this.audioContext.resume();

      this.setState({ audio: media });
    }
  };

  render() {
    return (
      <div className="Track">
        {/* <audio src="/에필로그.mp3" id="audio-file" controls/> */}
        <div className="controls">
          <button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
          <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
        </div>
        {this.state.audio ? (
          <AudioAnalyser analyser={this.analyser} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Track;
