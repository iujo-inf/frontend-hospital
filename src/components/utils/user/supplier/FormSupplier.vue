<template>
    <div class="container mt-5 d-flex justify-content-center align-items-center">
        <div class="form-container">

            <!-- titulo del formulario -->
            <h2>{{ isEditing ? 'Editar Proveedor' : 'Agregar Proveedor' }}</h2>

            <!-- Foto del proveedor -->
            <div class="profile-picture">
                <div class="add-photo-icon">+</div>
            </div>

            <!-- Formulario -->
            <form>
                <!-- Por cada form-row en el formulario agregar 2 form-group para cada input -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="rif">RIF*</label>
                        <input type="text" id="rif" name="rif" v-model="supplier.rif" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="address">Direccion*</label>
                        <input type="text" id="address" name="address" v-model="supplier.address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="bussinessName">Razon social*</label>
                        <input type="text" id="businessName" name="businessName" v-model="supplier.businessName" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-buttons">
                        <button type="button" class="cancel-button" @click="cancel">Cancelar</button>
                    <button type="button" class="save-button" @click="saveSupplier">Guardar</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
export default {
  name: 'FormSupplier',
  props: {
    id: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      supplier: {
        id: this.id,
        rif: '',
        address: '',
        businessName: ''
      }
    }
  },
  methods: {
        cancel() {
            //////////
        },
        saveSupplier() {
            if (this.supplier.id) {
                // Actualizar proveedor existente
                this.updateSupplier();
            } else {
                // Agregar nuevo proveedor
                this.addSupplier();
            }
        },
        addSupplier() {
            // Lógica para agregar nuevo proveedor
            console.log('Agregar proveedor:', this.supplier);
        },
        updateSupplier() {
            // Lógica para actualizar proveedor existente
            console.log('Actualizar proveedor:', this.supplier);
        }
    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.form-container {
    background-color: #FFFFFF;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 600px;
}

h2 {
    text-align: left;
    margin-top: 0px;
    margin-bottom: 20px;
    color: #343C6A;
}

.profile-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.add-photo-icon {
    width: 100px;
    height: 100px;
    background-color: #e0e0e0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #16DBCC;
    cursor: pointer;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.form-group {
    flex: 1;
    margin-right: 10px; /* Ajusta este valor para agregar más espacio */
}

.form-group:last-child {
    margin-right: 0;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #00000078;
}

input {
    width: calc(90% - 10px); /* Ajusta el ancho para evitar desbordamiento */
    padding: 8px;
    border: 0px;
    border-radius: 4px;
    background-color: #D9D9D942;
}

input:focus {
    border: 2px solid #343C6A; 
    outline: none; 
}


.form-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.cancel-button {
    background-color: #e0e0e0;
    color: #666666;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.save-button {
    background-color:#2D60FF;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

</style>