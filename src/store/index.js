import { createStore } from "vuex";
import {
  loginRequest,
  registerRequest,
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  placeOrder,
  getOrders,
  logoutRequest,
} from "@/utils/api.js";

export default createStore({
  state: {
    token: localStorage.getItem("myAppToken") || "",
    products: [],
    cart: [],
    orders: [],
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
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, cart) => {
      state.cart = cart;
    },
    REMOVE_CART_ITEM: (state, cartItemId) => {
      state.cart = state.cart.filter((item) => item.id !== cartItemId);
    },
    SET_ORDERS: (state, orders) => {
      state.orders = orders;
    },
    CLEAR_CART: (state) => {
      state.cart = [];
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
    LOGOUT: ({ commit, state }) => {
      return logoutRequest(state.token).finally(() => {
        commit("AUTH_ERROR");
      });
    },
    FETCH_PRODUCTS: ({ commit }) => {
      return getProducts().then((data) => {
        commit("SET_PRODUCTS", data);
      });
    },
    FETCH_CART: ({ commit, state }) => {
      return getCart(state.token)
        .then((data) => {
          commit("SET_CART", data);
        })
        .catch(() => {
          commit("SET_CART", []);
        });
    },
    ADD_TO_CART: ({ commit, state }, productId) => {
      return addToCart(productId, state.token).then(() => {
        return getCart(state.token).then((data) => {
          commit("SET_CART", data);
        });
      });
    },
    REMOVE_FROM_CART: ({ commit, state }, cartItemId) => {
      return removeFromCart(cartItemId, state.token).then(() => {
        commit("REMOVE_CART_ITEM", cartItemId);
      });
    },
    PLACE_ORDER: ({ commit, state }) => {
      return placeOrder(state.token).then(() => {
        commit("CLEAR_CART");
      });
    },
    FETCH_ORDERS: ({ commit, state }) => {
      return getOrders(state.token).then((data) => {
        commit("SET_ORDERS", data);
      });
    },
  },
  modules: {},
});
