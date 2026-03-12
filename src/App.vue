<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <h1 class="logo">Просто купить</h1>

        <nav class="nav" v-if="!isAuthenticated">
          <router-link to="/register" class="nav-link">Регистрация</router-link>
          <router-link to="/login" class="nav-link">Вход</router-link>
        </nav>

        <nav class="nav" v-else>
          <button @click="logout" class="nav-button">Выход</button>
          <router-link to="/cart" class="nav-link">Корзина</router-link>
          <router-link to="/orders" class="nav-link">Мои заказы</router-link>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
}

.app-header {
  background: green;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-button {
  background: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.nav-button:hover {
  background: #d32f2f;
}

.app-main {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
