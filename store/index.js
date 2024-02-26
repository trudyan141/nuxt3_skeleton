export const UPDATE_LANG = "UPDATE_LANG";
export const UPDATE_EXIT_MODAL_SHOW = "UPDATE_EXIT_MODAL_SHOW";
export const UPDATE_SLUGS_VOTE = "UPDATE_SLUGS_VOTE";
export const UPDATE_CATEGORIES_NEWS = "UPDATE_CATEGORIES_NEWS";
export const UPDATE_FILTER_NOTI_SHOW = "UPDATE_FILTER_NOTI_SHOW";
export const state = () => ({
  langChoose: {
    name: "English",
    value: "en",
  },
  isExitModalShow: false,
  slugsVote: [],
  categoriesNews: [],
  filterNotiShow: true,
});

export const mutations = {
  [UPDATE_LANG](state, payload) {
    state.langChoose = Object.assign({}, payload);
  },
  [UPDATE_EXIT_MODAL_SHOW](state, payload) {
    state.isExitModalShow = payload;
  },
  [UPDATE_SLUGS_VOTE](state, payload) {
    let new_arr = [...state.slugsVote, payload];
    state.slugsVote = [...new_arr];
  },
  [UPDATE_CATEGORIES_NEWS](state, payload) {
    state.categoriesNews = [...payload];
  },
  [UPDATE_FILTER_NOTI_SHOW](state, payload) {
    state.filterNotiShow = payload;
  },
};
