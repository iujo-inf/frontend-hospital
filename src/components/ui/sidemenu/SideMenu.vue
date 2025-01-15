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
                    <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('usuarios')">
                        <img src="/iconos/user.svg" alt="Usuarios" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Usuario</span>
                        <img v-if="isOpen" 
                            src="/iconos/angulo-derecho.svg" 
                            :class="{ 'submenu-icon-rotated': submenuStates.usuarios }"
                            class="submenu-icon ms-auto" 
                            width="12" 
                            height="12"
                        >
                    </a>
                    <ul class="submenu" v-show="submenuStates.usuarios && isOpen">
                        <li><a class="nav-link submenu-link" href="#"><span>Pacientes</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Proveedores</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Clientes</span></a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('citas')">
                        <img src="/iconos/calendar-clock.svg" alt="Citas" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Citas</span>
                        <img v-if="isOpen" 
                            src="/iconos/angulo-derecho.svg" 
                            :class="{ 'submenu-icon-rotated': submenuStates.citas }"
                            class="submenu-icon ms-auto" 
                            width="12" 
                            height="12"
                        >
                    </a>
                    <ul class="submenu" v-show="submenuStates.citas && isOpen">
                        <li><a class="nav-link submenu-link" href="#"><span>Programar Citas</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Facturación</span></a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('emergencia')">
                        <img src="/iconos/ambulancia.svg" alt="Emergencia" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Emergencia</span>
                        <img v-if="isOpen" 
                            src="/iconos/angulo-derecho.svg" 
                            :class="{ 'submenu-icon-rotated': submenuStates.emergencia }"
                            class="submenu-icon ms-auto" 
                            width="12" 
                            height="12"
                        >
                    </a>
                    <ul class="submenu" v-show="submenuStates.emergencia && isOpen">
                        <li><a class="nav-link submenu-link" href="#"><span>Listado de Emergencias</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Facturación</span></a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('farmacia')">
                        <img src="/iconos/tratamiento.svg" alt="Farmacia" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Farmacia</span>
                        <img v-if="isOpen" 
                            src="/iconos/angulo-derecho.svg" 
                            :class="{ 'submenu-icon-rotated': submenuStates.farmacia }"
                            class="submenu-icon ms-auto" 
                            width="12" 
                            height="12"
                        >
                    </a>
                    <ul class="submenu" v-show="submenuStates.farmacia && isOpen">
                        <li><a class="nav-link submenu-link" href="#"><span>Inventario</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Facturación</span></a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('almacen')">
                        <img src="/iconos/plataforma-rodante-alternativa.svg" alt="Almacén" width="17" height="17" class="iconColor">
                        <span v-show="isOpen" class="ms-3">Almacén</span>
                        <img v-if="isOpen" 
                            src="/iconos/angulo-derecho.svg" 
                            :class="{ 'submenu-icon-rotated': submenuStates.almacen }"
                            class="submenu-icon ms-auto" 
                            width="12" 
                            height="12"
                        >
                    </a>
                    <ul class="submenu" v-show="submenuStates.almacen && isOpen">
                        <li><a class="nav-link submenu-link" href="#"><span>Productos</span></a></li>
                        <li><a class="nav-link submenu-link" href="#"><span>Entradas/Salidas</span></a></li>
                    </ul>
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
            submenuStates: {
                usuarios: false,
                citas: false,
                emergencia: false,
                farmacia: false,
                almacen: false
            },
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
        },
        toggleSubmenu(submenu) {
            this.submenuStates[submenu] = !this.submenuStates[submenu];
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

.submenu {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
}

.submenu-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    display: flex;
    justify-content: flex-start; /* Cambiado a flex-start para alinear a la izquierda */
    padding-left: 3.5rem; /* Añade padding a la izquierda para indentar el submenú */
}

.submenu-icon {
    transition: transform 0.3s ease;
}

.submenu-icon-rotated {
    transform: rotate(90deg);
}

.submenu .nav-link {
    padding: 0.5rem 1rem;
    color: #666;
}

.submenu .nav-link:hover {
    background-color: #f0f0f0;
    color: #2d60ff;
}

/* Nuevo estilo para alinear el texto del submenu a la derecha */
.submenu .nav-link span {
    text-align: left; /* Cambiado a left */
    width: 100%;
}
</style>