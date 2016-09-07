/**
 * @providesModule StyledText
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { Font } from 'exponent';

export class RegularText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.regular, this.props.style]} />
    );
  }
}

export class BoldText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.bold, this.props.style]} />
    );
  }
}

const styles = StyleSheet.create({
  regular: {
    ...Font.style('freight-sans'),
  },
  bold: {
    ...Font.style('freight-sans-bold'),
  },
});
