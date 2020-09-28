import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug
    },
    addBug(state, bug) {
      state.bugs.push(bug)
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit, dispatch }) {
      try {
        let res = await api.get('bugs')
        commit('setBugs', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addBug({ commit, dispatch }, newBug) {
      try {
        let res = await api.post('bugs', newBug)
        res.data.creator = this.state.profile
        commit("addBug", res.data)
        commit("setActiveBug", res.data)
        router.push({ name: "bug", params: { id: res.data._id } })
      } catch (error) {
        console.error(error)
      }

    },
    async setActive({ commit, dispatch }, bugId) {
      try {
        let res = await api.get("bugs/" + bugId)
        console.log(res)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
});
