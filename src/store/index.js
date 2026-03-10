import { createStore } from "vuex";
import { loginRequest, registerRequest } from "@/utils/api.js";

export default createStore({
  state: {
    token: localStorage.getItem("myAppToken") || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
      localStorage.setItem("myAppToken", token);
    },
    AUTH_ERROR: (state) => {
      state.token = "";
      localStorage.removeItem("myAppToken");
    },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then((token) => {
            commit("AUTH_SUCCESS", token);
            resolve();
          })
          .catch((error) => {
            commit("AUTH_ERROR");
            reject(error);
          });
      });
    },
    REGISTER_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        registerRequest(user)
          .then((token) => {
            commit("AUTH_SUCCESS", token);
            resolve();
          })
          .catch((error) => {
            commit("AUTH_ERROR");
            reject(error);
          });
      });
    },
  },
  modules: {},
});
