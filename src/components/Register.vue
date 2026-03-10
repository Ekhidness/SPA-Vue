<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    <label>ФИО</label>
    <input
      type="text"
      required
      v-model="form.fio"
      :class="{ error: errors.fio }"
    />
    <span v-if="errors.fio" class="error-text">{{ errors.fio }}</span>

    <label>Email</label>
    <input
      type="email"
      required
      v-model="form.email"
      :class="{ error: errors.email }"
    />
    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

    <label>Пароль</label>
    <input
      type="password"
      required
      v-model="form.password"
      :class="{ error: errors.password }"
    />
    <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

    <hr />
    <button type="submit">Зарегистрироваться</button>
    <button type="button" @click="goHome">Назад</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fio: "",
        email: "",
        password: "",
      },
      errors: {
        fio: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.errors = { fio: "", email: "", password: "" };
      this.$store
        .dispatch("REGISTER_REQUEST", this.form)
        .then(() => this.$router.push("/login"))
        .catch((error) => {
          if (
            error.response &&
            error.response.error &&
            error.response.error.errors
          ) {
            this.errors = error.response.error.errors;
          }
        });
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.register input,
button {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
}
.error {
  border: 1px solid red;
}
.error-text {
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
}
hr {
  margin: 10px 0;
}
</style>
