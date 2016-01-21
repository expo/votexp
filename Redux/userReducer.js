/**
 * @providesModule userReducer
 */
'use strict';

import defaultReducer from 'defaultReducer';

export default defaultReducer({

  DEFAULT(state = {}) {
    return state;
  },

  UPDATE_USER(state, action) {
    return action.user;
  }

});
