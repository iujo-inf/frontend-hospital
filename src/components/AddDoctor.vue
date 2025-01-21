<template>
    <div class="add-doctor-container">
      <h1>Agregar Paciente</h1>
      <div class="profile-picture">
        <div class="circle">
          <span class="add-icon">+</span>
        </div>
      </div>
      <form @submit.prevent="saveDoctor">
        <div class="form-row">
          <div class="form-group">
            <label>Nombres*</label>
            <input type="text" placeholder="Ingrese nombres" v-model="doctor.first_name" />
          </div>
          <div class="form-group">
            <label>Apellidos*</label>
            <input type="text" placeholder="Ingrese apellidos" v-model="doctor.last_name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Cédula*</label>
            <input type="text" placeholder="Ingrese cédula" v-model="doctor.cedula" />
          </div>
          <div class="form-group">
            <label>Fecha de Nacimiento*</label>
            <input type="date" v-model="doctor.birth_date" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Sexo*</label>
            <select v-model="doctor.gender">
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nro de Teléfono*</label>
            <input type="text" placeholder="Ingrese teléfono" v-model="doctor.phone_number" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Ciudad</label>
            <input type="text" placeholder="Ingrese ciudad" v-model="doctor.city" />
          </div>
          <div class="form-group">
            <label>Estado</label>
            <input type="text" placeholder="Ingrese estado" v-model="doctor.state" />
          </div>
        </div>
        <div class="form-buttons">
          <button type="button" class="cancel-button" @click="cancelForm">Cancelar</button>
          <button type="submit" class="save-button">Guardar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddDoctor",
    data() {
      return {
        doctor: {
          first_name: "",
          last_name: "",
          cedula: "",
          birth_date: "",
          gender: "",
          phone_number: "",
          city: "",
          state: "",
        },
      };
    },
    methods: {
      saveDoctor() {
        console.log("Información del paciente guardada:", this.doctor);
      },
      cancelForm() {
        this.doctor = {
          first_name: "",
          last_name: "",
          cedula: "",
          birth_date: "",
          gender: "",
          phone_number: "",
          city: "",
          state: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .add-doctor-container {
    width: 60%;
    margin: 0 auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: left;
    color: #2e2e5c;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .profile-picture {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    position: relative;
  }
  
  .circle {
    width: 100px;
    height: 100px;
    background: #e8e8e8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .add-icon {
    font-size: 20px;
    color: #00d4ff;
    position: absolute;
    bottom: -8px;
    right: 40%;
    background: #ffffff;
    border: 2px solid #00d4ff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  form {
    margin-top: 20px;
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .form-group {
    width: 48%;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-size: 14px;
    color: #2e2e5c;
    margin-bottom: 5px;
  }
  
  input,
  select {
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;
  }
  
  input::placeholder {
    color: #cccccc;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .cancel-button {
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #555;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .cancel-button:hover {
    background: #e0e0e0;
  }
  
  .save-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .save-button:hover {
    background: #0056b3;
  }
  </style>