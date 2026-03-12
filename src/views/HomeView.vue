<template>
  <div class="home">
    <div v-if="!isAuthenticated" class="nav-links">
      <router-link to="/register" class="nav-link">Регистрация</router-link>
      <router-link to="/login" class="nav-link">Вход</router-link>
    </div>
    <div v-else class="nav-links">
      <button @click="logout" class="nav-button">Выход</button>
      <router-link to="/cart" class="nav-link">Корзина</router-link>
      <router-link to="/orders" class="nav-link">Мои заказы</router-link>
    </div>

    <h2>Каталог товаров</h2>
    <div v-if="products.length === 0">Загрузка товаров...</div>
    <div v-else class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
          :src="getProductImageUrl(product)"
          alt="Товар"
          class="product-image"
        />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price }} ₽</p>
        <button v-if="isAuthenticated" @click="addToCart(product.id)">
          Добавить в корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    products() {
      return this.$store.state.products;
    },
  },
  mounted() {
    this.FETCH_PRODUCTS();
  },
  methods: {
    ...mapActions(["FETCH_PRODUCTS", "ADD_TO_CART", "LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push("/");
    },
    addToCart(productId) {
      this.ADD_TO_CART(productId);
    },
    getProductImageUrl(product) {
      if (!product.image) {
        return "https://via.placeholder.com/300x200?text=Нет+изображения";
      }
      return `http://lifestealer86.ru/${product.image}`;
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.nav-links {
  display: flex;
  gap: 15px;
  padding: 10px;
  border-radius: 5px;
}

.nav-link {
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #1976d2;
}

.nav-button {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #d32f2f;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 4px;
}

button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #45a049;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
