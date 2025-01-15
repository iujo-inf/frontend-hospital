<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 border-nav" :style="{ marginLeft: sideMenuWidth, transition: 'margin-left 0.3s ease' }">
        <div class="container-fluid">
            <div>
                <a class="navbar-brand ms-5" href="#">{{ title }}</a>
            </div>
            <div class='d-flex align-items-center gap-2'>
                <div class="search-container">
                    <input
                        class="form-control rounded-pill ps-5"
                        type="search"
                        placeholder="Buscar..."
                        aria-label="Search"
                        v-model="searchQuery"
                    >
                    <img
                        src="/iconos/busqueda.svg" 
                        alt="Search" 
                        class="search-icon"
                    >
                </div>
                <button class="btn btn-light rounded-circle me-5 d-flex align-items-center justify-content-center">
                    <img src="/iconos/user.svg" alt="User" width="25" height="25" class="userIcon">
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        title: {
            type: String,
            default: 'Inicio'  // valor por defecto si no se proporciona un título
        },
        sideMenuWidth: { // Propiedad para el ancho del sideMenu
            type: String,
            default: '240px' // Ancho por defecto
        }
    },
    data() {
        return {
            searchQuery: '' // Asegúrate de tener un modelo para la búsqueda
        }
    },
    methods: {
        toggleSideMenu() {
            this.$emit('toggle-menu')
        }
    }
}
</script>

<style scoped>
.search-container {
    position: relative;
    width: 300px;  /* ajusta según necesites */
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    filter: invert(48%) sepia(0%) saturate(0%) hue-rotate(147deg) brightness(89%) contrast(93%);
}
.border-nav {
    border-bottom: 1px solid #f5f9fb;
}
.btn {
    width: 40px;
    height: 40px;
}
.form-control:focus {
    border-color: #3c6cff;
    border-width: 2px;
    box-shadow: none;
    outline: 0;
}
.userIcon { 
    filter: invert(48%) sepia(0%) saturate(0%) hue-rotate(147deg) brightness(89%) contrast(93%);
}
</style>