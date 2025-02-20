<template>
  <img class="background-image" src="/logos/medicos.jpg" alt="Fondo médicos">
  <div class='bodyAuth'>
    
    <div class="left">
      <h1 class="leftStop">Bienvenido a MediPluss</h1>
      <div class="logo-center">
        <a><img src="/logos/logohospital.jpg" alt="Logo Hospital"></a>
      </div>
      <div class="footer-text">
        <h4>Integra tu gestión hospitalaria en una sola plataforma</h4>
      </div>
    </div>  
    <div class="login-container">
      <div class="logo">
        <h1><img src="/logos/logo.png" alt="Logo MediPluss"></h1> 
      </div>
      <h2>Ingresa Tu Cuenta</h2>
      <form @submit.prevent="handleSubmit">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
      <p>¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      baseURL: 'https://backend-hospital-mediplus.onrender.com/api/user/login'
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(this.baseURL, {
          email: this.email,
          password: this.password
        });

        // Guardar datos en sessionStorage
        const userData = response.data.data.user;
        const employeeData = response.data.data.employee;
        const token = response.data.data.token;

        // Datos del usuario
        sessionStorage.setItem('firstName', userData.firstName);
        sessionStorage.setItem('lastName', userData.lastName);
        sessionStorage.setItem('role_id', userData.role_id);
        sessionStorage.setItem('user_id', userData.id);
        
        // Datos del empleado
        sessionStorage.setItem('organizational_unit_id', employeeData.organizational_unit_id);
        sessionStorage.setItem('department_id', employeeData.organizational_unit.departament.id);
        
        // Token
        sessionStorage.setItem('token', token);

        // Mostrar mensaje de éxito
        await Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: `Bienvenido ${userData.firstName} ${userData.lastName}`,
          timer: 1500
        });

        // Redireccionar a home
        this.$router.push('/home');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: error.response?.data?.message || 'Error al iniciar sesión'
        });
      }
    }
  }
}
</script>
<style>
/* .bodyAuth {
  background-image: url('/logos/medicos.jpg'); 
  background-image: url('../../../assets/logos/medicos.jpg'); 
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  margin: 0;
  padding: 0;
} */
.bodyAuth {
  position: relative; /* Para el posicionamiento absoluto del hijo */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  z-index: 1;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0; /* Asegura que la imagen esté detrás de todo */
}

.left {
  position: relative; /* Para que aparezca sobre la imagen */
  z-index: 2;
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
  position: relative; /* Para que aparezca sobre la imagen */
  z-index: 2;
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