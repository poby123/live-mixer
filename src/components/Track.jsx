import react from 'react';
import ReactSlider from 'react-slider';

export default (props) => {
    return <ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
}