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
    const cri = [20, 60, 200, 400, 600, 1000, 3000, 5000, 10000, 20000];
    let crii = 0;
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height; 
    const width = canvas.width;

    const dbH = height - 20;
    const textY = height - 8;
    const context = canvas.getContext('2d');
    let sliceWidth = 37;
    let x = 0;

    context.lineWidth = 1;
    context.strokeStyle = '#54527D';
    context.clearRect(0, 0, width, textY);

    /* drawing */
    context.beginPath();
    context.moveTo(0, dbH);

    context.fillText(`RTA`, x, 0);

    for (let i = 0; i < audioData.length; i++) {
      const item = audioData[i];
      const y = (item / 255.0) * dbH;
      const hz = (24000 / audioData.length) * i;
      
      /* draw db rectangle */
      context.fillStyle = `#0093FC`;
      context.fillRect(x, dbH - y, sliceWidth, y);

      // draw vertical line
      context.fillStyle = `#7876B5`;
      if (hz > cri[crii] || i == audioData.length - 1) {
        ++crii;
        context.lineTo(x, dbH);
        context.lineTo(x, 0);
        context.lineTo(x, dbH);

        const displayHz = hz > 1000 ? `${Math.round(hz / 1000)}K` : Math.round(hz);
        context.fillText(displayHz, x, textY);
        sliceWidth /= 1.8;
      }

      x += sliceWidth;
    }
    context.lineTo(x, dbH);
    context.stroke();
  }

  render() {
    return <canvas width="600" height="300" ref={this.canvas} />;
  }
}

export default AudioRTA;
