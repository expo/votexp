/**
 * @providesModule ContestEntryList
 */

import React from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

import ContestEntry from 'ContestEntry';
import EntryData from '../data';

import shuffle from 'shuffle';

export default class ContestEntryList extends React.Component {

  constructor(props, context) {
    super(props, context);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(shuffle(EntryData)),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
    );
  }

  _renderRow(data) {
    return (
      <ContestEntry {...data} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
});
