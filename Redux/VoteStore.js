/**
 * @providesModule VoteStore
 */
'use strict';

import { combineReducers, createStore } from 'redux';

import allVotes from 'allVotesReducer';
import myVotes from 'myVotesReducer';
import user from 'userReducer';

export default createStore(combineReducers({
  allVotes,
  myVotes,
  user,
}));
