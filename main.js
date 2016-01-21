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

import Api from 'Api';
import ContestEntryList from 'ContestEntryList';
import HeaderBar from 'HeaderBar';
import InfoDialog from 'InfoDialog';

class VoteApp extends React.Component {

  async componentWillMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', false);
    }

    // let result = await Api.getVotesAsync();
    // alert(JSON.stringify(result));

    // let other = await Api.submitVoteAsync('brentvatne@gmail.com', 'Den');
    // alert(JSON.stringify(other));
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <ContestEntryList />
          <HeaderBar onPressInfo={this._handlePressInfo.bind(this)} />
        </View>

        <InfoDialog ref={view => { this._infoDialog = view; }} />
      </View>
    );
  }

  _handlePressInfo() {
    this._infoDialog.show();
  }
}

let styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
    paddingTop: 90,
  },
});

AppRegistry.registerComponent('main', () => VoteApp);
