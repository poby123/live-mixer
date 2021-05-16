import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioAnalyser from './AudioAnalyser';
import PrettoSlider from './PrettoSlider';

class MusicTrack extends Component {
  state = {
    audio: null,
    play: false,
  };

  constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext.createGain();
    this.source = null;

    this.gainValue = 1;

    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.audioEl = document.querySelector('audio');
    this.playButtonEl = document.querySelector('button');

    this.source = this.audioContext.createMediaElementSource(this.audioEl);
    this.source
      .connect(this.gainNode)
      .connect(this.analyser)
      .connect(this.audioContext.destination);
  }

  togglePlay() {
    this.setState({ play: !this.state.play });
    if (this.audioContext.state == 'suspended') {
      this.audioContext.resume();
    }
  }

  onChangeVolume(v) {
    this.gainValue = v;
    this.gainNode.gain.value = v;
  }

  componentDidUpdate() {
    if (this.state.play) {
      this.audioEl.play();
    } else {
      this.audioEl.pause();
    }
  }

  componentWillUnmount() {
    this.audioEl.pause();
  }

  render() {
    const { audioSrc } = this.props;

    return (
      <div className="MusicTrack">
        <audio src={audioSrc} id="audio-file" />
        <div className="controls">
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={this.gainValue}
            onChange={(e, v) => this.onChangeVolume(v)}
            min={0}
            max={8}
            step={0.1}
          />
          <button name="play" onClick={this.togglePlay}>
            {this.state.play ? '일시정지' : '재생'}
          </button>
        </div>
        {this.state.play ? <AudioAnalyser analyser={this.analyser} /> : ''}
      </div>
    );
  }
}

MusicTrack.defaultProps = {
  audioSrc: '/에필로그.mp3',
};

MusicTrack.propTypes = {
  audioSrc: PropTypes.string,
};

export default MusicTrack;
