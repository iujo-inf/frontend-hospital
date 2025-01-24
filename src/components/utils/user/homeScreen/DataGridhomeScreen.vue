<template>
  <body>
    <div class="left">
    <h1 class="leftStop">Bienvenido a MediPluss</h1>
      <div>
      <a><img src="logohispital.jpg" alt=" "></a>
    </div>
    <h4>integra tu gestion hospitalaria 
      en una sola plataforma</h4>
  </div>  
  <div class="login-container">
   <div class="logo">
    <h1><img src="logo.png" ></h1> 
    </div>
    
    <h2>Ingresa Tu Cuenta</h2>
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
</body>
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
    background-image:url('../homeScreen/logos/medicos.jpg');
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 0 10px;
}
.left{
    background-color: blue;
    padding: 180px;
    color: #f0f0f0;
    width: 600px;
    margin-top: 0%;
}
.leftStop{
  margin-top: 0%;
}

.login-container {
    background-color: #fff;
    padding: 110px;
    text-align: center;
    width: 500px;
}
a{
  justify-items: center;
}
h1{
  background-image: url('../homeScreen/logos/logo.png');
}

.logo{
    justify-content: center;
    width: 200px;
}

h2 {
  font-size: small;
    margin-bottom: 200px;
}

label {
    
    margin-bottom: 10px;
    text-align: left;
    left: 0%;
    pointer-events: none;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

p {
    text-decoration: none;
    color: #007bff;
 }

 
</style>