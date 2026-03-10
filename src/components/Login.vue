<template>
  <form class="login" @submit.prevent="login">
    <h1>Логин</h1>
    <label>Почта</label>
    <input
      type="email"
      required
      v-model="form.email"
      :class="{ error: errors.email }"
    />
    <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

    <label>Password</label>
    <input
      type="password"
      required
      v-model="form.password"
      :class="{ error: errors.password }"
    />
    <span v-if="errors.password" class="error-text">{{ errors.password }}</span>

    <hr />
    <button type="submit">Login</button>
    <button type="button" @click="goHome">Назад</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.errors = { email: "", password: "" };
      const userData = {
        email: this.form.email,
        password: this.form.password,
      };

      this.$store
        .dispatch("AUTH_REQUEST", userData)
        .then(() => this.$router.push("/"))
        .catch((error) => {
          if (error.response && error.response.error) {
            const serverError = error.response.error;
            if (serverError.message === "Authentication failed") {
              this.errors.email = "Неверный email или пароль";
              this.errors.password = "Неверный email или пароль";
            } else if (serverError.errors) {
              this.errors = serverError.errors;
            }
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
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.login input,
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
