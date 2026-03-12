<template>
  <div class="home">
    <h2>Каталог товаров</h2>
    <div v-if="products.length === 0">Загрузка товаров...</div>
    <div v-else class="products">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
          :src="getProductImageUrl(product)"
          alt="Товар"
          class="product-image"
        />
        <div class="product-content">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">Цена: {{ product.price }} ₽</p>
        </div>
        <button
          v-if="isAuthenticated"
          @click="addToCart(product.id)"
          class="add-to-cart-btn"
        >
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
    ...mapActions(["FETCH_PRODUCTS", "ADD_TO_CART"]),
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

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  min-height: 380px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 4px;
}

.product-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-description {
  flex: 1;
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.product-price {
  margin: 0;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.add-to-cart-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
  font-size: 14px;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: #45a049;
}
</style>
