import { 
    SET_LOADING,
    CANCEL_LOADING
  } from "./constants";
export default {
    setLoading({commit}){
        commit(SET_LOADING)
    },
    cancelLoading({commit}){
        commit(CANCEL_LOADING)
    }

}