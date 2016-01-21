/**
 * @providesModule AccountStorage
 */
'use strict';

import { AsyncStorage } from 'react-native';

const KEY = 'voteApp';

async function loadAccountAsync() {
  let json = await AsyncStorage.getItem(KEY);
  if (!json) {
    return null;
  }

  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

async function storeAccountAsync(account) {
  if (account) {
    let json = JSON.stringify(account);
    return await AsyncStorage.setItem(KEY, json);
  } else {
    return await AsyncStorage.removeItem(KEY);
  }
}

async function clearAccountAsync() {
  return await storeAccountAsync(null);
}

export default {
  loadAccountAsync,
  storeAccountAsync,
  clearAccountAsync,
};
