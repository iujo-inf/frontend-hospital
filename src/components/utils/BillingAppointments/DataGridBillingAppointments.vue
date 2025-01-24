<template>
    <div class="container mt-5">
      <!-- Barra de búsqueda -->
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control search-bar"
          placeholder="Buscar"
          v-model="searchQuery"
        />
      </div>
  
      <!-- Tabla de ventas -->
      <div class="table-container">
        <table class="table table-hover sales-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>N° de Factura</th>
              <th>Tipo de Venta</th>
              <th>Producto</th>
              <th>Monto</th>
              <th>Factura</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sale in filteredSales" :key="sale.id">
              <td>{{ sale.date }}</td>
              <td>{{ sale.client }}</td>
              <td>{{ sale.invoiceNumber }}</td>
              <td>{{ sale.saleType }}</td>
              <td>{{ sale.product }}</td>
              <td>{{ sale.amount }}</td>
              <td>
                <button class="btn btn-outline-primary btn-sm">Descargar</button>
              </td>
              <td>
                <span class="actions-icon">•••</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SalesTable",
    data() {
      return {
        searchQuery: "",
        sales: [
          {
            id: 1,
            date: "22/12/2024",
            client: "Débora Mayurel",
            invoiceNumber: "00004",
            saleType: "Farmacia",
            product: "Ibuprofeno",
            amount: "110.00 Bs.",
          },
          // Agrega más ventas si es necesario
        ],
      };
    },
    computed: {
      filteredSales() {
        return this.sales.filter((sale) => {
          const searchString = `${sale.client} ${sale.product}`.toLowerCase();
          return searchString.includes(this.searchQuery.toLowerCase());
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .container {
    max-width: 1200px;
    margin: auto;
  }
  
  /* Barra de búsqueda */
  .search-bar {
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
  }
  
  /* Tabla */
  .table-container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
  }
  
  .sales-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .sales-table thead {
    background: #f8fafc;
    color: #333;
  }
  
  .sales-table th,
  .sales-table td {
    padding: 12px 15px;
    text-align: left;
  }
  
  .sales-table tbody tr:hover {
    background: #f1f4f9;
  }
  
  .sales-table .actions-icon {
    color: #888;
    font-size: 20px;
    cursor: pointer;
  }
  
  .sales-table .actions-icon:hover {
    color: #555;
  }
  
  /* Botón de descarga */
  .btn-outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
    border-radius: 5px;
  }
  
  .btn-outline-primary:hover {
    background: #0d6efd;
    color: white;
  }
  </style>
  