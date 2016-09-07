/**
 * @providesModule allVotesReducer
 */

import defaultReducer from 'defaultReducer';

export default defaultReducer({

  DEFAULT(state = {}) {
    return state;
  },

  UPDATE_DATA(state, action) {
    if (action.result && action.result.totals) {
      return action.result.totals || state;
    } else {
      return state;
    }
  }

});
