/**
 * @providesModule EmailDialog
 */
'use strict';

import React, {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import AccountStorage from 'AccountStorage';
import VoteStore from 'VoteStore';

export default class EmailDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visibileValue: new Animated.Value(0),
      email: null,
    };
  }

  render() {
    let { isVisible } = this.state;

    return (
      <View
        style={[styles.container, {opacity: isVisible ? 1 : 0}]}
        pointerEvents={isVisible ? 'auto' : 'none'}>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.underlay, {opacity: this.state.visibileValue}]} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.contentContainer, {opacity: this.state.visibileValue}]}>
            <Text style={styles.prompt}>
              Identify yourself to vote!
            </Text>

            <Text style={styles.subheader}>
              yeah, it's easy to cheat, don't be a jerk
            </Text>

            <TextInput
              ref={view => { this._emailInput = view; }}
              keyboardType="email-address"
              returnKeyType="go"
              blurOnSubmit={false}
              onChangeText={email => { this.setState({email}) }}
              value={this.state.email}
              style={styles.emailInput}
              onSubmitEditing={() => this._submitEmail() }
              placeholder="you@example.com" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  async _submitEmail() {
    if (!this.state.email || !this.state.email.match(/^\S+@\S+$/)) {
      return;
    }

    let user = {email: this.state.email};
    await AccountStorage.storeAccountAsync(user);

    VoteStore.dispatch({
      type: 'UPDATE_USER',
      user,
    });

    this.hide();
  }

  show() {
    this.setState({isVisible: true}, () => {
      Animated.timing(this.state.visibileValue, {
        toValue: 1, duration: 250,
      }).start(({finished}) => {
        if (finished) {
          this._emailInput.focus();
        }
      });
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
    marginBottom: 200,
  },

  prompt: {
    fontFamily: 'FreightSansLFPro',
    fontSize: 18,
  },

  emailInput: {
    width: Dimensions.get('window').width - 80,
    height: 45,
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 3,
  },

  subheader: {
    fontFamily: 'FreightSansLFPro',
    fontSize: 16,
    color: '#ccc',
  },

});
