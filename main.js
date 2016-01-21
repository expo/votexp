/**
 * @providesModule VoteApp
 */
'use strict';

import React, {
  AppRegistry,
  StatusBarIOS,
  StyleSheet,
  View,
} from 'react-native';

import ContestEntryList from 'ContestEntryList';
import HeaderBar from 'HeaderBar';

class VoteApp extends React.Component {

  componentWillMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', false);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ContestEntryList />
        <HeaderBar />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
    paddingTop: 90,
  },
});

AppRegistry.registerComponent('main', () => VoteApp);
