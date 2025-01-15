<template>
    <div class="side-menu" :class="{ 'side-menu-minimized': !isOpen }">
        <div class="side-menu-content p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <img src="/logos/logo.png" v-show="isOpen" 
                    alt="Toggle"
                    width="220"
                    height="40"
                >
                <button class="btn ms-1" @click="toggleMenu">
                    <img :src="isOpen ? '/iconos/angulo-derecho.svg' : '/iconos/menu-hamburguesa.svg'"
                        alt="Toggle"
                        width="18"
                        height="18"
                        :class="{ 'rotate-icon': isOpen }"
                    >
                </button>
            </div>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/home.svg" alt="Inicio" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Inicio</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/user.svg" alt="Pacientes" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Usuario</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/calendar-clock.svg" alt="Doctores" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Citas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/ambulancia.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Emergencia</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/tratamiento.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Farmacia</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/tubo-de-analisis-de-sangre-alt.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Laboratorio</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/plataforma-rodante-alternativa.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Almacén</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/carrito-de-compras.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Compras</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/factura-punto-de-venta.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Ventas</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/factura-punto-de-venta.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Facturación</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#">
                        <img src="/iconos/mano-sosteniendo-usd.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Finanzas</span>
                    </a>
                </li>
            </ul>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideMenu',
    data() {
        return {
            isOpen: true,  // Comienza expandido
            currentIcons: {
                home: '/iconos/home.svg',
                user: '/iconos/user.svg',
                // Agrega los demás íconos aquí
            },
            hoverIcons: {
                home: '/iconos_acolor/home-hover.svg',
                user: '/iconos_acolor/user-hover.svg',
                // Agrega los demás íconos de hover aquí
            }
        }
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
            this.$emit('menu-toggled', this.isOpen); // Emitir el estado actual
        }
    }
}
</script>

<style scoped>
.iconColor { 
    filter: invert(48%) sepia(0%) saturate(0%) hue-rotate(147deg) brightness(89%) contrast(93%);
}
.side-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px; /* Ancho del side menu */
    background-color: white;
    box-shadow:none;
    transition: width 0.3s ease;
    z-index: 1000;
    border-right: 1px solid #f5f9fb;
}

.side-menu-minimized {
    width: 80px; /* Ancho del side menu minimizado */
}

.side-menu-minimized .side-menu-content {
    padding: 1rem !important;
}

.side-menu-content {
    height: 100%;
    overflow-y: auto;
}

.nav-link {
    color: #333;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    transition: background-color 0.2s;
    white-space: nowrap;
}

.nav-link:hover {
    background-color: #f8f9fa;
    color: #3c6cff;
}

.nav-link img {
    min-width: 24px;
}
.rotate-icon {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}
.nav-link {
    transition: background-color 0.3s ease, color 0.3s ease; /* Transición suave */
    font-weight: medium;
}
.nav-link:hover {
    background-color: #e0e0e0; /* Cambia el color de fondo al hacer hover */
    color: #2d60ff; /* Cambia el color del texto al hacer hover */
}

.nav-link:hover .iconColor {
    fill: #2d60ff;
}
img {
    transition: transform 0.3s ease;
}
</style>