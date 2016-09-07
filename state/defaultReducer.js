/**
 * @providesModule defaultReducer
 */

/*
 * Return a reducer that runs the reducer `reductions[action]`, defaulting to
 * `reductions.DEFAULT` if not found.
 */
export default (reductions) => (state, action, ...rest) => (
  (reductions[action.type] || reductions.DEFAULT)(state, action, ...rest)
);
