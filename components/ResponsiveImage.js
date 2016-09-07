/**
 * @providesModule ResponsiveImage
 */
'use strict';

import React,{
  PropTypes,
} from 'react';
import {
  Image,
  View,
} from 'react-native';

import GenericResponsiveImage from '@exponent/react-native-responsive-image';
import Constants from 'Constants';

export default class ResponsiveImage extends React.Component {

  static propTypes = {
    ...Image.propTypes,
    filename: PropTypes.string,
  };

  static sources(filename, options = {}) {
    return {
      1: {uri: `${Constants.cdnHost}${filename}.png`},
      2: {uri: `${Constants.cdnHost}${filename}@2x.png`},
      3: {uri: `${Constants.cdnHost}${filename}@${options.twoXOnly ? '2' : '3'}x.png`},
    };
  }

  setNativeProps(nativeProps) {
    this._image.setNativeProps(nativeProps);
  }

  render() {
    return (
      <GenericResponsiveImage
        ref={image => { this._image = image; }}
        sources={ResponsiveImage.sources(this.props.filename, this.props)}
        {...this.props}
      />
    );
  }
}
