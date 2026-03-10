<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>
