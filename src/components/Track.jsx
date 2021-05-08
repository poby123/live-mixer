import React, { useState } from 'react';
import AudioAnalyser from './AudioAnalyser';
import PrettoSlider from './PrettoSlider';

const Track = () => {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(media);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="Track">
      <div className="controls">
        <button onClick={toggleMicrophone}>
          {audio ? 'Stop microphone' : 'Get microphone input'}
        </button>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={20}
          style={{ root: { color: 'red' } }}
        />
      </div>
      {audio ? <AudioAnalyser audio={audio} /> : ''}
    </div>
  );
};

export default Track;
