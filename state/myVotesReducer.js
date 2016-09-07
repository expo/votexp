/**
 * @providesModule myVotesReducer
 */
'use strict';

import defaultReducer from 'defaultReducer';

export default defaultReducer({

  DEFAULT(state = []) {
    return state;
  },

  UPDATE_DATA(state, action) {
    if (action.result && action.result.votes) {
      return action.result.votes || state;
    } else {
      return state;
    }
  },

});
