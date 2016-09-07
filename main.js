/**
 * @providesModule VoteApp
 */

import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  StatusBar,
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
import cacheAssetsAsync from 'cacheAssetsAsync';

class VoteApp extends React.Component {

  state = {
    isReady: false,
  };

  async componentWillMount() {
    this._loadDataAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <Exponent.Components.AppLoading />;
    }

    return (
      <Provider store={VoteStore}>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <ContestEntryList />
            <HeaderBar onPressInfo={this._handlePressInfo.bind(this)} />
            <StatusBar barStyle="light-content" />
          </View>

          { /* <InfoDialog ref={view => { this._infoDialog = view; }} /> */ }
          <EmailDialog ref={view => { this._emailDialog = view; }} />
        </View>
      </Provider>
    );
  }

  async _loadDataAsync() {
    let user = await AccountStorage.loadAccountAsync();
    let email = user && user.email;
    let fetchResults = Api.getVotesAsync(email);
    let cacheAssets = cacheAssetsAsync({
      images: [
      ],
      fonts: [
        {'freight-sans-bold': require('./assets/fonts/FreigSanLFProBol.otf')},
        {'freight-sans': require('./assets/fonts/FreigSanLFProBoo.otf')},
      ],
    })

    let [ result, ...rest ] = await Promise.all([ fetchResults, cacheAssets ]);
    this.setState({isReady: true});

    requestAnimationFrame(() => {
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
