/**
 * @providesModule ContestEntry
 */

import React from 'react';
import {
  Dimensions,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import Api from 'Api';
import FadeIn from 'FadeIn';
import ResponsiveImage from 'ResponsiveImage';
import {
  RegularText,
  BoldText,
} from 'StyledText';

const FontSizeMultiplier = (
  Platform.OS === 'android' ||
  Dimensions.get('window').width <= 320
) ?  0.8 : 1;

class ContestEntry extends React.Component {

  static getDataProps(data, props) {
    return {
      votes: data.allVotes[props.title] || 0,
      alreadyVoted: data.myVotes.indexOf(props.title) !== -1,
      userEmail: data.user.email,
    };
  };

  render() {
    let {
      author,
      imageName,
      title,
    } = this.props;

    return (
      <View style={styles.container} shouldRasterizeIOS>
        <View style={styles.meta}>
          <View style={{flexDirection: 'row', marginRight: 10, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={this.props.alreadyVoted ? require('../assets/images/heart-full.png') : require('../assets/images/heart-empty.png')}
              style={{width: 19, height: 17}}
            />
            <RegularText style={styles.voteButtonText}>
              {this.props.votes} {this.props.votes === 0 || this.props.votes > 1 ? 'votes' : 'vote'}
            </RegularText>
          </View>

        </View>

        <TouchableHighlight
          onPress={() => { this._openEntry() }}
          underlayColor="#E9F9FE"
          style={styles.openAppButton}>
          <View>
            <View style={styles.appInfo}>
              <FadeIn>
                <ResponsiveImage
                  filename={imageName}
                  style={{width: 60, height: 60, borderRadius: 30,}} />
              </FadeIn>

              <View style={styles.titleAndAuthor}>
                <BoldText style={styles.title}>
                  {title}
                </BoldText>

                <RegularText style={styles.author}>
                  by {author}
                </RegularText>
              </View>
            </View>

            <View style={styles.caretContainer}>
              <Text style={styles.caret}>
                &gt;
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  async _submitVoteAsync() {
    let {
      title,
      userEmail,
    } = this.props;

    if (!this.props.userEmail) {
      return;
    }

    let result = await Api.submitVoteAsync(userEmail, title);

    this.props.dispatch({
      type: 'UPDATE_DATA',
      result,
    });
  }

  _openEntry() {
    if (Platform.OS === 'android' && this.props.iosOnly) {
      ToastAndroid.show('Sorry, this entry is iOS only :(', 500);
    } else {
      Linking.openURL(this.props.url);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 50,
  },

  openAppButton: {
    elevation: 3,
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderColor: '#E1E1E1',
    shadowColor: '#E1E1E1',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    padding: 15,
    backgroundColor: '#fff',
  },
  appInfo: {
    flexDirection: 'row',
  },
  caretContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  caret: {
    fontSize: 26 * FontSizeMultiplier,
    color: '#e1e1e1',
  },
  titleAndAuthor: {
    flexDirection: 'column',
    marginLeft: 10,
    flex: 1,
    paddingTop: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21 * FontSizeMultiplier,
  },
  author: {
    fontSize: 20 * FontSizeMultiplier,
  },
  meta: {
    elevation: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: '#f8f8f8',
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderTopWidth: 0,
    borderColor: '#E1E1E1',
    shadowColor: '#E1E1E1',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 3,
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    flexDirection: 'row',
  },
  voteButtonText: {
    marginLeft: 4,
    fontSize: 20 * FontSizeMultiplier,
    color: '#888',
    paddingTop: Platform.OS === 'ios' ? 3 : 0,
  },
  viewCountText: {
    marginLeft: 4,
    fontSize: 20 * FontSizeMultiplier,
    color: '#888',
    paddingTop: Platform.OS === 'ios' ? 3 : 0,
  },
});


export default connect(
  (data, props) => ContestEntry.getDataProps(data, props),
)(ContestEntry);
