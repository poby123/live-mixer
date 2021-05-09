import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import PrettoSlider from './PrettoSlider';

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: null,
    };
    this.audioContext = new AudioContext();
  }

  getMicrophone = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.setState({ audio: media });
  };

  stopMicrophone = () => {
    this.state.audio.getTracks().forEach((track) => track.stop());
    this.setState({ audio: null });
  };

  toggleMicrophone = () => {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
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
          <AudioAnalyser
            audio={this.state.audio}
            audioContext={this.audioContext}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Track;
