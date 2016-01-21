/**
 * @providesModule ContestEntry
 */
'use strict';

import React, {
  Dimensions,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const { EXURLHandler } = NativeModules;

import FadeIn from 'FadeIn';
import ResponsiveImage from 'ResponsiveImage';
import WithFreightSansFont from 'WithFreightSansFont';
import WithFreightSansBoldFont from 'WithFreightSansBoldFont';

const FontSizeMultiplier = (
  Platform.OS === 'android' ||
  Dimensions.get('window').width <= 320
) ?  0.8 : 1;

export default class ContestEntry extends React.Component {

  render() {
    let {
      author,
      imageName,
      title,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.meta}>
          <TouchableOpacity style={{flexDirection: 'row', marginRight: 8,}}>
            <ResponsiveImage filename="heart-empty" style={{width: 18, height: 17}} />
            <WithFreightSansFont>
              <Text style={styles.voteButtonText}>
                35
              </Text>
            </WithFreightSansFont>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <ResponsiveImage filename="open-count" style={{width: 18, height: 18}} />
            <WithFreightSansFont>
              <Text style={styles.viewCountText}>
                20
              </Text>
            </WithFreightSansFont>
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

              <WithFreightSansBoldFont>
                <View style={styles.titleAndAuthor}>
                  <Text style={styles.title}>
                    {title}
                  </Text>

                  <WithFreightSansFont>
                    <Text style={styles.author}>
                      by {author}
                    </Text>
                  </WithFreightSansFont>
                </View>
              </WithFreightSansBoldFont>
            </View>

            <View style={styles.caratContainer}>
              <Text style={styles.carat}>
                &gt;
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _openEntry() {
    if (Platform.OS === 'android' && this.props.iosOnly) {
      React.ToastAndroid.show('Sorry, this entry is iOS only :(', 500);
    } else {
      EXURLHandler.openURLAsync(this.props.url);
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
  caratContainer: {
    position: 'absolute',
    top: 10,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  carat: {
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
    fontFamily: 'FreightSansLFPro',
    fontWeight: 'bold',
    fontSize: 21 * FontSizeMultiplier,
  },
  author: {
    fontFamily: 'FreightSansLFPro',
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
    marginLeft: 3,
    fontFamily: 'FreightSansLFPro',
    fontSize: 20 * FontSizeMultiplier,
    color: '#888',
  },
  viewCountText: {
    marginLeft: 3,
    fontFamily: 'FreightSansLFPro',
    fontSize: 20 * FontSizeMultiplier,
    color: '#888',
  },
  countsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  countsAlignment: {
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  countsText: {
    fontFamily: 'FreightSansLFPro',
    fontSize: 20 * FontSizeMultiplier,
    color: '#888',
  },
});
