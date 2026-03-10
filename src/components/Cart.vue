<template>
  <div class="cart">
    <button @click="goHome">Назад</button>

    <h2>Корзина</h2>

    <div v-if="cartItems.length === 0">Корзина пуста</div>

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
        <button @click="decreaseQuantity(item.product_id)">-</button>
        <button @click="increaseQuantity(item.product_id)">+</button>
        <button @click="removeFromCart(item.product_id)">Удалить</button>
      </div>

      <button @click="placeOrder">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Cart",
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
    goHome() {
      this.$router.push("/");
    },
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
.cart-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
button {
  margin: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
