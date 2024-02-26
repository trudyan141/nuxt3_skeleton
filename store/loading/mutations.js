import {
  UPDATE_COUNTRY_SUBSCRIBE,
  SET_LOADING,
  CANCEL_LOADING,
} from "./constants";
export default {
  [UPDATE_COUNTRY_SUBSCRIBE](state, payload) {
    state.country_subscribe = payload;
  },
  [SET_LOADING](state) {
    state.isLoading = true;
  },
  [CANCEL_LOADING](state) {
    state.isLoading = false;
  },
};
