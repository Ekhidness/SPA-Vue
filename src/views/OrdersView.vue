<template>
  <div class="orders">
    <button @click="goHome">Назад</button>

    <h2>Оформленные заказы</h2>

    <div v-if="orders.length === 0">У вас нет заказов</div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>Заказ #{{ order.id }}</h3>
        <p>Товары: {{ order.products.join(", ") }}</p>
        <p>Сумма: {{ order.order_price }} ₽</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrdersView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    orders() {
      return this.$store.state.orders;
    },
  },
  mounted() {
    this.FETCH_ORDERS();
  },
  methods: {
    ...mapActions(["FETCH_ORDERS"]),
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.orders {
  padding: 20px;
}
.order-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
button {
  margin-bottom: 20px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
