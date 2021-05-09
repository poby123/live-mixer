import React, { Component } from 'react';

class AudioRTA extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0;

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height);

    let sliceWidth = width / 25;
    let temp = 10;
    const frequency = 5 / audioData.length;

    for (let i = 0; i < audioData.length; i++) {
      const item = audioData[i];
      const y = (item / 255.0) * height;

      const r = Math.floor(Math.sin(frequency * i + 2) * 127 + 128);
      const g = Math.floor(Math.sin(frequency * i + 4) * 127 + 128);
      const b = Math.floor(Math.sin(frequency * i + 0) * 127 + 128);

      context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillRect(x, height - y, sliceWidth, y);

      const hz = (24000 / audioData.length) * i;

      x += sliceWidth;
      if (hz > temp) {
        context.lineTo(x, height);
        context.lineTo(x, 0);
        temp *= 10;
        // console.log(hz);
        sliceWidth *= 0.3;
        context.lineTo(x, height);
      }

      if (i == audioData.length - 1) {
        // console.log('Last : ' + hz);
        context.lineTo(x, height);
        context.lineTo(x, 0);
        context.lineTo(x, height);
      }
    }
    context.lineTo(x, height);
    context.stroke();
  }

  render() {
    return <canvas width="600" height="300" ref={this.canvas} />;
  }
}

export default AudioRTA;
