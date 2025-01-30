<template>
  <body>
    <div class="left">
      <h1 class="leftStop">Bienvenido a MediPluss</h1>
      <div class="logo-center">
        <a><img src="logohospital.jpg" alt="Logo Hospital"></a>
      </div>
      <div class="footer-text">
        <h4>Integra tu gestión hospitalaria en una sola plataforma</h4>
      </div>
    </div>  
    <div class="login-container">
      <div class="logo">
        <h1><img src="logo.png" alt="Logo MediPluss"></h1> 
      </div>
      <h2>Ingresa Tu Cuenta</h2>
      <form @submit.prevent="handleSubmit">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required>
        <router-link class="nav-link" to="/home">
          <button class="btn btn-primary">Iniciar Sesión</button>
        </router-link>
      </form>
      <p>¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      username: ' ',
      password: ' ',
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
  background-image: url('../homeScreen/logos/medicos.jpg');
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  margin: 0;
  padding: 0;
}

.left {
  background-color: #2563eb;
  padding: 165px;
  color: #f0f0f0;
  width: 600px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.leftStop {
  margin-top: 0;
  text-align: center;
  width: 100%;
}

.logo-center {
  text-align: center;
  margin: 2rem 0;
}

.logo-center img {
  max-width: 200px;
  height: auto;
}

.footer-text {
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
}

.login-container {
  background-color: #fff;
  padding: 110px;
  text-align: center;
  width: 500px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo img {
  max-width: 200px;
  height: auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.btn {
  width: 100%;
  background-color: #2563eb;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1d4ed8;
}

p {
  margin-top: 1rem;
  color: #666;
}

p a {
  color: #2563eb;
  text-decoration: none;
}

p a:hover {
  text-decoration: underline;
}
</style>