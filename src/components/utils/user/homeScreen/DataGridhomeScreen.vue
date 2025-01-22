<template>
  <div class="login-container">
    <h1>Inicio de Sesión</h1>
    <form @submit.prevent="handleSubmit">
      <label for="username">Usuario:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required>
      <router-link class="nav-link d-flex align-items-center" to="/">
     <span  class="btn btn-primary">Iniciar Sesión</span>
      </router-link>
    </form>
    <p>¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      // Lógica para enviar los datos al servidor y manejar la respuesta
      this.$axios.post('/api/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        // Manejar la respuesta exitosa (e.g., almacenar el token, redirigir)
        console.log(response.data);
      })
      .catch(error => {
        // Manejar los errores (e.g., mostrar un mensaje de error)
        console.error(error);
      });
    }
  }
}
</script>
<style>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}
header {
    text-align: center;
}
form {
    border: 1px solid #ccc;
    padding: 20px;
}
</style>