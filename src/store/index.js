import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { timeline: {} },
  mutations: {
    setTimelineState(state, timelineJson) {
      state.timeline = timelineJson.sort((a, b) => {
        return Date.parse(a.registered) < Date.parse(b.registered) ? 1 : -1;
      });
    },
  },
  actions: {
    setTimeline({ commit }, timelineJson) {
      commit("setTimelineState", timelineJson);
    },
  },
  getters: {
    timelineGetter: (state) => {
      return state.timeline;
    },
  },
});
