/**
 * @providesModule HeaderBar
 */
'use strict';

import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ResponsiveImage from 'ResponsiveImage';
import WithFreightSansFont from 'WithFreightSansFont';

export default class HeaderBar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ResponsiveImage
            filename="react-logo"
            style={styles.image}
          />

          <WithFreightSansFont>
            <Text style={styles.title}>
              Contest Entries
            </Text>
          </WithFreightSansFont>

          { /*
          <WithFreightSansFont>
            <TouchableOpacity
              onPress={this.props.onPressInfo}
              style={styles.helpButton}>
              <Text style={styles.helpButtonText}>
                i
              </Text>
            </TouchableOpacity>
          </WithFreightSansFont> */ }
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
    fontFamily: 'FreightSansLFPro',
    fontSize: 25,
    lineHeight: 32,
  },

  helpButton: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 17,
  },

  helpButtonText: {
    fontSize: 24,
    fontFamily: 'FreightSansLFPro',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
  },
});
