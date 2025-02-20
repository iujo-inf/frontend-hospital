<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input doctor="text" class="form-control mb-3"
                placeholder="Buscar por  name, doctor" v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="citas" width="45" height="45" class="iconColor">
                    <b>Programar Cita</b>
                </button>
            </div>
        </div>
        
        <!---------------- Modal Agregar/Editar Cita ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Programar' }} Cita</h2>
                <form @submit.prevent="saveappointments">
                    <span class="h3-oval">
                        <h3>Paciente</h3>
                    </span>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Nombres</label>
                            <input type="text" id="name" v-model="currentappointments.name" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="lastName">Apellidos</label>
                            <input type="text" id="lastName" v-model="currentappointments.lastName" required class="form-control">
                        </div>                                            
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="idCard">Cédula</label>
                            <input type="text" id="idCard" v-model="currentappointments.idCard" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="age">Edad</label>
                            <input type="number" id="age" v-model="currentappointments.age" required class="form-control">
                        </div>                                            
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="sexology">Sexo</label>
                            <select id="status" v-model="currentappointments.sexology" required class="form-control">
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">Nº de Teléfono</label>
                            <input type="tel" id="phoneNumber" v-model="currentappointments.phoneNumber" required class="form-control">
                        </div>                                            
                    </div>
                    <span class="h3-oval">
                        <h3>Datos de la Cita</h3>
                    </span>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="doctor">Médico</label>
                            <input type="text" id="doctor" v-model="currentappointments.doctor" required class="form-control">
                        </div>   
                        <div class="form-group">
                            <label for="date">Fecha de Cita</label>
                            <input type="date" id="date" v-model="currentappointments.date" required class="form-control">
                        </div>   
                    </div>
                    <div class="form-row">                        
                        <div class="form-group">
                            <label for="time">Hora</label>
                            <input type="time" id="time" v-model="currentappointments.time" required class="form-control">
                        </div> 
                        <div class="form-group">
                            <label for="Area">Área</label>
                            <input type="text" id="area" v-model="currentappointments.area" required class="form-control">
                        </div>                       
                    </div>
                    <div class="form-group button-group">
                        <button type="button" @click="closeModal" class="btn btn-secondary btn-lg">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-lg">{{ isEditing ? 'Actualizar' : 'Programar Cita' }}</button>
                    </div>
                </form>
            </div>
        </div>
        <!---------------- Modal Agregar/Editar Cita ---------------->

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Estado</th>
                    <th>name</th>
                    <th>doctor</th>
                    <th>Fecha</th>
                    <th>Area</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="appointments in filteredappointments" :key="appointments.id">
                    
                    <td>
                        <span :class="['status-oval', appointments.status === 'Pendiente' ? 'available' : 'out-of-stock']">
                        {{ appointments.status}}
                        </span>
                    </td>
                    <td>{{ appointments.name }}</td>
                    <td>{{ appointments.doctor }}</td>
                    <td>{{ appointments.date }}</td>
                    <td>{{ appointments.area }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editAppointments(appointments.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteAppointments(appointments.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridAppointments',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentappointments: {
                id: null,
                date: '',
                doctor: '',
                status: '',
                name: '',
                lastName: '',
                idCard:'',
                age:'',
                sexology:'',
                phoneNumber:'',
                area: ''
            },
            appointments: [
                { id: 1, status: 'Pendiente', date: '2024-02-19', name: 'María', lastName: 'Celeste', doctor: "Simón", area: 'Consultoria N13' },
                { id: 2, status: 'Atendido', date: '2024-05-26', name:'Deigelys',lastName: 'Figueroa', doctor: "José", area: 'Consultoria N14' },
                { id: 3, status: 'Pendiente', date: '2025-01-01', name: 'Ariadna', lastName: 'Aguero', doctor: "Miguel", area: 'Consultoria N16' },
                { id: 4, status: 'Atendido', date: '2025-01-05', name: 'Diego', lastName: 'Rodriguez', doctor: "Luis", area: 'Consultoria N1' },
                { id: 5, status: 'Pendiente', date: '2025-01-14', name: 'Daniel',lastName: 'Munoz', doctor: "Andrea", area: 'Consultoria N4' },
                { id: 5, status: 'Atendido', date: '2025-01-22', name: 'Francisco',lastName: 'Chirinos', doctor: "Kelvin", area: 'Consultoria N55' },
            ],
        };
    },
    computed: {
        filteredappointments() {
            return this.appointments.filter(appointments => {
                const fullName = `${appointments.status} ${appointments.doctor} ${appointments.name} ${appointments.area}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentappointments = {
                id: null,
                date: '',
                doctor: '',
                status: '',
                name: '',
                area: ''
            };
            this.showModal = true;
        },        
        editAppointments(id) {
            const appointmentsToEdit = this.appointments.find(appointments => appointments.id === id);
            if (appointmentsToEdit) {
                this.currentappointments = { ...appointmentsToEdit };
                this.isEditing = true;
                this.showModal = true;
            }
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        saveappointments() {
            if (this.isEditing) {
                const index = this.appointments.findIndex(appointments => appointments.id === this.currentappointments.id);
                if (index !== -1) {
                    this.appointments.splice(index, 1, { ...this.currentappointments });
                }
            } else {
                const newId = Math.max(...this.appointments.map(b => b.id)) + 1;
                this.appointments.push({
                    id: newId,
                    ...this.currentappointments
                });
            }
            this.closeModal();
        },
        
        deleteAppointments(id) {
            if (confirm(`¿Está seguro que desea eliminar la cita con ID: ${id}?`)) {
                this.appointments = this.appointments.filter(appointments => appointments.id !== id);
            }
        }
    },
};
</script>

<style scoped>
.iconColor {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

.table {
    margin-top: 20px;
}

.grid-view {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 700px;
    justify-content: center;
}

.modal-title {
    text-align: left;
    margin-bottom: 20px;
    color: #333;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.form-group {
    flex: 0 0 48%;
}

.form-group label {
    text-align: left;
    display: block;
    margin: 0 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.btn-secondary {
    margin-right: 10px;
}

.positive {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    background-color: red;
}

.negative {
    color: rgb(255, 255, 255);
    border-radius: 25px;
    background-color: green;
}

.status-oval {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.h3-oval{
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  color: #000000;
  text-align: center;
  font-size: 14px;
  background-color: rgb(155, 170, 255);
}

.status-oval.available {
  border: 2px solid green;
  background-color: white;
  color: green;
}

.status-oval.out-of-stock {
  border: 2px solid red;
  background-color: white;
  color: red;
}
</style>