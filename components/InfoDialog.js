/**
 * @providesModule InfoDialog
 */

import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default class InfoDialog extends React.Component {
  state = {
    visibileValue: new Animated.Value(0),
  }

  render() {
    let { isVisible } = this.state;

    return (
      <View
        style={[styles.container, {opacity: isVisible ? 1 : 0}]}
        pointerEvents={isVisible ? 'auto' : 'none'}>

        <TouchableWithoutFeedback onPress={() => { this.hide() }}>
          <Animated.View style={[styles.underlay, {opacity: this.state.visibileValue}]} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => { this.hide() }}>
          <Animated.View style={[styles.contentContainer, {opacity: this.state.visibileValue}]}>
            <Text style={styles.title}>Hi people! Thanks for checking this out and voting!</Text>
            <Text style={styles.paragraph}>This is pretty straightforward -- tap on the name of something to open it. Tap on the heart underneath it to vote for it. The icon with the eye in it (eyecon?) tells you how many opens the thing has.</Text>
            <Text style={styles.paragraph}>The first time you try to vote for something, you will be asked for your Github username. We'll validate these for the winners.</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  show() {
    this.setState({isVisible: true}, () => {
      Animated.timing(this.state.visibileValue, {
        toValue: 1, duration: 250,
      }).start();
    });
  }

  hide() {
    Animated.timing(this.state.visibileValue, {
      toValue: 0, duration: 200,
    }).start(() => {
      this.setState({isVisible: false});
    });
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  underlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  contentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
  },

  title: {

  },

  paragraph: {

  },

});
