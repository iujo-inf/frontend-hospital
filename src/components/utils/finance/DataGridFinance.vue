<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input type="text" class="form-control" placeholder="Buscar por descripción" v-model="searchQuery" />
      <button class="btn btn-primary add-transaction-btn" @click="showModal = true">
        <span>Agregar Transacción</span>
      </button>
    </div>
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
            <button class="btn btn-primary btn-sm mr-2" @click="editTransaction(transaction)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="deleteTransaction(transaction.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditing ? 'Editar Transacción' : 'Agregar Transacción' }}</h5>
          <button type="button" class="close close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label>Fecha</label>
              <input type="date" class="form-control" v-model="newTransaction.date" />
            </div>
            <div class="form-group">
              <label>Categoría</label>
              <input type="text" class="form-control" v-model="newTransaction.category" />
            </div>
            <div class="form-group">
              <label>Cuentas</label>
              <input type="text" class="form-control" v-model="newTransaction.accounts" />
            </div>
            <div class="form-group">
              <label>Descripción</label>
              <input type="text" class="form-control" v-model="newTransaction.description" />
            </div>
            <div class="form-group">
              <label>Monto</label>
              <input type="number" class="form-control" v-model="newTransaction.amount" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="saveTransaction">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'; 

export default {
  name: 'DataGridFinance',
  data() {
    return {
      searchQuery: '',
      transactions: [
        { id: uuidv4(), date: '2024-03-08', category: 'Compra', accounts: 'Banco', description: 'Compra de suministros de oficina', amount: 150.00 },
        { id: uuidv4(), date: '2024-03-07', category: 'Venta', accounts: 'Caja', description: 'Venta de producto A', amount: 200.00 },
      ],
      showModal: false,
      isEditing: false, 
      newTransaction: {
        date: '',
        category: '',
        accounts: '',
        description: '',
        amount: null,
      },
      editingTransaction: null, 
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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
    editTransaction(transaction) {
      this.isEditing = true;
      this.showModal = true;
      this.editingTransaction = { ...transaction }; 
      this.newTransaction = { ...transaction }; 
    },
    deleteTransaction(id) {
      const confirmDelete = confirm(`¿Estás seguro de eliminar la transacción con ID: ${id}?`);
      if (confirmDelete) {
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
      }
    },
    saveTransaction() {
      if (!this.newTransaction.date || !this.newTransaction.category || !this.newTransaction.accounts || !this.newTransaction.description || !this.newTransaction.amount) {
        alert('Todos los campos son obligatorios.');
        return;
      }

      if (this.isEditing) {
        const index = this.transactions.findIndex(t => t.id === this.editingTransaction.id);
        if (index !== -1) {
          this.transactions.splice(index, 1, { ...this.editingTransaction, ...this.newTransaction });
        }
      } else {
        this.transactions.push({ id: uuidv4(), ...this.newTransaction });
      }

      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.newTransaction = {
        date: '',
        category: '',
        accounts: '',
        description: '',
        amount: null,
      };
      this.editingTransaction = null;
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

.add-transaction-btn {
  display: inline-block;
  white-space: nowrap;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
}

.add-transaction-btn:hover {
  background-color: #0056b3;
  cursor: pointer;
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
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.close-btn {
  color: red;
  font-size: 24px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.close-btn:hover {
  color: darkred;
}
</style>