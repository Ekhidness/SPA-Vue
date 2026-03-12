<template>
  <div class="orders">
    <h1>Оформленные заказы</h1>

    <div v-if="orders.length === 0">
      <p>У вас нет заказов</p>
      <router-link to="/">Перейти в каталог</router-link>
    </div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="order-item">
        <h3>Заказ #{{ order.id }}</h3>
        <p><strong>Сумма заказа:</strong> {{ order.order_price }} ₽</p>
      </div>
      <router-link to="/" class="back-link">Вернуться в каталог</router-link>
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
  },
};
</script>

<style scoped>
.orders {
  padding: 20px;
}

.orders h1 {
  margin-bottom: 20px;
}

.order-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
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
