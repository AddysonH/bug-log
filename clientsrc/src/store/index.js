import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setNotes(state, notes) {
      state.notes = notes
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
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotesByBugId({ commit, dispatch }, bugId) {
      try {
        let res = await api.get('bugs/' + bugId + '/notes')
        commit('setNotes', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteNote({ commit, dispatch }, noteData) {
      try {
        await api.delete('notes/' + noteData.id)
        dispatch('getNotesByBugId', noteData.bugId)
      } catch (error) {
        console.error(error)
      }
    },

    async addNote({ commit, dispatch }, noteData) {
      try {
        await api.post('notes', noteData)
        dispatch('getNotesByBugId', noteData.bugId)
      } catch (error) {
        console.error(error)
      }
    },
    // async editBug({ commit, dispatch }, bugData) {
    //   try {
    //     await api.put('bugs' + bugData.id, { title: bugData.title })
    //     dispatch('getBugs', bugData.bugId)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },

  }
});
