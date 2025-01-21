<template>
    <div class="container mt-5 d-flex justify-content-center align-items-center">
        <div class="form-container">

            <!-- Título del formulario -->
            <h2>Agregar Emergencia</h2>

            <!-- Formulario -->
            <form>
                <!-- Fecha y Hora -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="fecha">Fecha</label>
                        <input type="date" id="fecha" name="fecha">
                    </div>
                    <div class="form-group">
                        <label for="hora">Hora</label>
                        <input type="time" id="hora" name="hora">
                    </div>
                </div>

                <!-- Sección Paciente -->
                <div class="section-title">Paciente</div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombres">Nombres*</label>
                        <input type="text" id="nombres" name="nombres" required>
                    </div>
                    <div class="form-group">
                        <label for="apellidos">Apellidos*</label>
                        <input type="text" id="apellidos" name="apellidos" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cedula">Cédula*</label>
                        <input type="text" id="cedula" name="cedula" required>
                    </div>
                    <div class="form-group">
                        <label for="edad">Edad</label>
                        <input type="number" id="edad" name="edad">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="sexo">Sexo</label>
                        <input type="text" id="sexo" name="sexo">
                    </div>
                    <div class="form-group">
                        <label for="telefono">Nro de Teléfono</label>
                        <input type="tel" id="telefono" name="telefono">
                    </div>
                </div>

                <!-- Sección Datos de la Emergencia -->
                <div class="section-title">Datos de la Emergencia</div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="medico">Médico</label>
                        <input type="text" id="medico" name="medico">
                    </div>
                    <div class="form-group">
                        <label for="detalles">Detalles</label>
                        <input type="text" id="detalles" name="detalles">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="resultado">Resultado</label>
                        <input type="text" id="resultado" name="resultado">
                    </div>
                </div>

                <!-- Botones -->
                <div class="form-row">
                    <div class="form-buttons">
                        <button type="button" class="cancel-button">Cancelar</button>
                        <button type="submit" class="save-button">Guardar</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    name: 'FormEmergency',
};
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

.section-title {
    background-color: #D9D9D9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    font-weight: bold;
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
