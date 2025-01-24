<template>
  <div class="container mt-5">
    <div class="form-container">
      <h2>Agregar Solicitud de Análisis</h2>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="estado">Estado</label>
            <input type="text" id="estado" name="estado">
          </div>
          <div class="form-group">
            <label for="detalle">Detalle</label>
            <input type="text" id="detalle" name="detalle">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="peso">Peso</label>
            <input type="text" id="peso" name="peso">
          </div>
           <div class="form-group">
            <label for="cantidad">Cantidad</label>
            <input type="text" id="cantidad" name="cantidad">
          </div>
        </div>
          <div class="form-row">
          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="text" id="precio" name="precio">
          </div>
        </div>
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
  name: 'AddAnalysisRequest',
};
</script>

<style scoped>
/* Estilos generales */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Para centrar verticalmente en la pantalla */
}

.form-container {
  background-color: #FFFFFF;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* Ancho más adaptable */
  max-width: 800px; /* Ancho máximo para pantallas grandes */
}

h2 {
  text-align: left;
  margin-top: 0px;
  margin-bottom: 20px;
  color: #343C6A;
}

.form-row {
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se ajusten en pantallas pequeñas */
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  min-width: 200px; /* Ancho mínimo para los campos */
  margin-right: 10px;
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
  width: calc(100% - 10px);
  padding: 8px;
  border: 0px;
  border-radius: 4px;
  background-color: #D9D9D942;
  box-sizing: border-box; /* Incluir padding y border en el ancho */
}

input:focus {
  border: 2px solid #343C6A;
  outline: none;
}

.form-buttons {
  display: flex;
  justify-content: flex-end; /* Alinear los botones a la derecha */
  width: 100%;
}

.cancel-button {
  background-color: #e0e0e0;
  color: #666666;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px; /* Espacio entre los botones */
}

.save-button {
  background-color: #2D60FF;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column; /* Apilar los campos en pantallas pequeñas */
  }
  .form-group {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%; /* Ocupar todo el ancho en pantallas pequeñas */
  }
}
</style>