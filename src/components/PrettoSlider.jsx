import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export default (props) => {

    let style = {
        root: {
          color: '#52af77',
          height: 10,
          marginTop: 100,
          width:400
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          marginTop: -8,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
    };
    const PrettoSlider = withStyles(style)(Slider); 
    return <PrettoSlider {...props}/>
}