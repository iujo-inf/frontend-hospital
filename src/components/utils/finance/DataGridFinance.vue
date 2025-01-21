<template>
    <div class="container mt-5">
      <input
        type="text"
        class="form-control mb-3"
        placeholder="Buscar por descripción"
        v-model="searchQuery"
      />
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Cuentas</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredTransactions" :key="transaction.id">
            <td>{{ formatDate(transaction.date) }}</td>
            <td>{{ transaction.category }}</td>
            <td>{{ transaction.accounts }}</td>
            <td>{{ transaction.description }}</td>
            <td>{{ formatCurrency(transaction.amount) }}</td>
            <td>
              <button class="btn btn-primary btn-sm mr-2" @click="editTransaction(transaction.id)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="deleteTransaction(transaction.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataGridFinance',
    data() {
      return {
        searchQuery: '',
        transactions: [
          { id: 1, date: '2024-03-08', category: 'Compra', accounts: 'Banco', description: 'Compra de suministros de oficina', amount: 150.00 },
          { id: 2, date: '2024-03-07', category: 'Venta', accounts: 'Caja', description: 'Venta de producto A', amount: 200.00 },
        ],
      };
    },
    computed: {
      filteredTransactions() {
        return this.transactions.filter(transaction => {
          return transaction.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      },
    },
    methods: {
      formatCurrency(value) {
        return `$${parseFloat(value).toFixed(2)}`;
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      editTransaction(id) {
        alert(`Editar transacción con ID: ${id}`);
      },
      deleteTransaction(id) {
        const confirmDelete = confirm(`¿Estás seguro de eliminar la transacción con ID: ${id}?`);
        if (confirmDelete) {
          this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        }
      },
    },
  };
  </script>
  
  <style scoped>

  .table {
    margin-top: 20px;
  }
  .btn-sm {
    margin-right: 10px;
  }
  </style>