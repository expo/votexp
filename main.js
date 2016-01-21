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

import { Provider } from 'react-redux';

import AccountStorage from 'AccountStorage';
import Api from 'Api';
import ContestEntryList from 'ContestEntryList';
import EmailDialog from 'EmailDialog';
import HeaderBar from 'HeaderBar';
import InfoDialog from 'InfoDialog';
import VoteStore from 'VoteStore';

class VoteApp extends React.Component {

  componentWillMount() {
    if (StatusBarIOS) {
      StatusBarIOS.setStyle('light-content', false);
    }
  }

  componentDidMount() {
    this._loadData();
  }

  render() {
    return (
      <Provider store={VoteStore}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <ContestEntryList />
            <HeaderBar onPressInfo={this._handlePressInfo.bind(this)} />
          </View>

          { /* <InfoDialog ref={view => { this._infoDialog = view; }} /> */ }
          <EmailDialog ref={view => { this._emailDialog = view; }} />
        </View>
      </Provider>
    );
  }

  async _loadData() {
    let user = await AccountStorage.loadAccountAsync();
    let email = user && user.email;
    let result = await Api.getVotesAsync(email);

    if (email) {
      VoteStore.dispatch({
        type: 'UPDATE_USER',
        user,
      });
    } else {
      this._emailDialog.show();
    }

    VoteStore.dispatch({
      type: 'UPDATE_DATA',
      result,
    });
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
