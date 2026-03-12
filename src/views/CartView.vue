<template>
  <div class="cart">
    <h1>Корзина</h1>

    <div v-if="cartItems.length === 0">
      <p>Корзина пуста</p>
      <router-link to="/">Перейти в каталог</router-link>
    </div>

    <div v-else>
      <div
        v-for="item in groupedItems"
        :key="item.product_id"
        class="cart-item"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>Цена: {{ item.price }} ₽</p>
        <p>Количество: {{ item.count }}</p>
        <div class="cart-controls">
          <button @click="decreaseQuantity(item.product_id)">-</button>
          <button @click="increaseQuantity(item.product_id)">+</button>
          <button @click="removeFromCart(item.product_id)">Удалить</button>
        </div>
      </div>

      <button @click="placeOrder" class="checkout-btn">Оформить заказ</button>
      <router-link to="/" class="back-link">Вернуться в каталог</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    cartItems() {
      return this.$store.state.cart;
    },
    groupedItems() {
      const grouped = {};
      this.cartItems.forEach((item) => {
        if (!grouped[item.product_id]) {
          grouped[item.product_id] = {
            product_id: item.product_id,
            name: item.name,
            description: item.description,
            price: item.price,
            count: 0,
          };
        }
        grouped[item.product_id].count++;
      });
      return Object.values(grouped);
    },
  },
  mounted() {
    this.FETCH_CART();
  },
  methods: {
    ...mapActions([
      "FETCH_CART",
      "ADD_TO_CART",
      "REMOVE_FROM_CART",
      "PLACE_ORDER",
    ]),
    increaseQuantity(productId) {
      this.ADD_TO_CART(productId);
    },
    decreaseQuantity(productId) {
      const item = this.cartItems.find((i) => i.product_id === productId);
      if (item) {
        this.REMOVE_FROM_CART(item.id);
      }
    },
    removeFromCart(productId) {
      const items = this.cartItems.filter((i) => i.product_id === productId);
      items.forEach((item) => {
        this.REMOVE_FROM_CART(item.id);
      });
    },
    placeOrder() {
      this.PLACE_ORDER()
        .then(() => {
          this.$router.push("/orders");
        })
        .catch(() => {
          alert("Ошибка оформления заказа");
        });
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 20px;
}

.cart h1 {
  margin-bottom: 20px;
}

.cart-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.cart-controls {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.cart-controls button {
  padding: 6px 12px;
  cursor: pointer;
}

.checkout-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.checkout-btn:hover {
  background: #45a049;
}

.back-link {
  display: inline-block;
  margin-top: 15px;
  color: #2196f3;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
