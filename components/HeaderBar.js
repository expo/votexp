/**
 * @providesModule HeaderBar
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  RegularText,
} from 'StyledText';
import ResponsiveImage from 'ResponsiveImage';

export default class HeaderBar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ResponsiveImage
            filename="react-logo"
            style={styles.image}
          />

          <RegularText style={styles.title}>
            Contest Entries
          </RegularText>

        </View>

        <View style={styles.statusBarUnderlay} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingTop: 25,
    paddingHorizontal: 15,
    backgroundColor: '#151518',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  statusBarUnderlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: '#242429',
  },

  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  image: {
    width: 40,
    height: 40,
    marginRight: 7,
    marginTop: 2,
  },

  title: {
    color: '#fff',
    fontSize: 25,
    lineHeight: 32,
  },
});
