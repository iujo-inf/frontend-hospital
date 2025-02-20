<template>
  <div class="side-menu" :class="{ 'side-menu-minimized': !isOpen }">
    <div class="side-menu-content p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <img src="/logos/logo.png" v-show="isOpen" alt="Toggle" width="220" height="40">
        <button class="btn ms-1" @click="toggleMenu">
          <img :src="isOpen ? '/iconos/angulo-derecho.svg' : '/iconos/menu-hamburguesa.svg'" alt="Toggle" width="18"
            height="18" :class="{ 'rotate-icon': isOpen }">
        </button>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link d-flex align-items-center" to="/home" exact-active-class="active">
            <img src="/iconos/home.svg" alt="Inicio" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Inicio</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('usuarios')"
            :class="{ 'active': isInUsuariosSection }">
            <img src="/iconos/user.svg" alt="Usuarios" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Usuario</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.usuarios }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.usuarios && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/usuarios/pacientes" exact-active-class="active">
                <span>Pacientes</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/usuarios/doctor" exact-active-class="active">
                <span>Doctores</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/usuarios/clientes" exact-active-class="active">
                <span>Clientes</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/usuarios/proveedores" exact-active-class="active">
                <span>Proveedores</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('citas')"
            :class="{ 'active': isInCitasSection }">
            <img src="/iconos/calendar-clock.svg" alt="Citas" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Citas</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg" :class="{ 'submenu-icon-rotated': submenuStates.citas }"
              class="submenu-icon ms-auto" width="12" height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.citas && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/cita" exact-active-class="active">
                <span>Programar Citas</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/citas/facturacion" exact-active-class="active">
                <span>Facturación</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('emergencia')"
            :class="{ 'active': isInEmergenciaSection }">
            <img src="/iconos/ambulancia.svg" alt="Emergencia" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Emergencia</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.emergencia }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.emergencia && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/emergencia/listado" exact-active-class="active">
                <span>Listado de Emergencias</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/emergencia/facturacion" exact-active-class="active">
                <span>Facturación</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('farmacia')"
            :class="{ active: isInFarmaciaSection }">
            <img src="/iconos/tratamiento.svg" alt="Farmacia" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Farmacia</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.farmacia }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.farmacia && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/farmacia/inventario" exact-active-class="active">
                <span>Inventario</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/farmacia/facturacion" exact-active-class="active">
                <span>Facturación</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('laboratorio')"
            :class="{ 'active': isInLaboratorioSection }">
            <img src="/iconos/tubo-de-analisis-de-sangre-alt.svg" alt="Laboratorio" width="17" height="17"
              class="iconColor">
            <span v-show="isOpen" class="ms-3">Laboratorio</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.laboratorio }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.laboratorio && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/laboratorio/listado" exact-active-class="active">
                <span>Listado de Laboratorios</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/laboratorio/facturacion" exact-active-class="active">
                <span>Facturación</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('almacen')"
            :class="{ 'active': isInAlmacenSection }">
            <img src="/iconos/plataforma-rodante-alternativa.svg" alt="Almacén" width="17" height="17"
              class="iconColor">
            <span v-show="isOpen" class="ms-3">Almacén</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.almacen }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <ul class="submenu" v-show="submenuStates.almacen && isOpen">
            <li>
              <router-link class="nav-link submenu-link" to="/almacen/productos" exact-active-class="active">
                <span>Productos</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('finanzas')"
            :class="{ active: isInFinanzasSection }">
            <img src="/iconos/mano-sosteniendo-usd.svg" alt="Finanzas" width="17" height="17" class="iconColor">
            <span v-show="isOpen" class="ms-3">Finanzas</span>
            <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
              :class="{ 'submenu-icon-rotated': submenuStates.finanzas }" class="submenu-icon ms-auto" width="12"
              height="12">
          </a>
          <!-- Submenu del submenu de compras -->
          <ul class="submenu" v-show="submenuStates.finanzas && isOpen">
            <li class="nav-item">
              <a id="cont-submenu" class="nav-link submenu-link d-flex align-items-center" href="#" @click.prevent="toggleSubmenu('compras')"
                :class="{ 'active': isInComprasSection }">
                <span v-show="isOpen" class="ms-3">Compras</span>
                <img v-if="isOpen" src="/iconos/angulo-derecho.svg"
                  :class="{ 'submenu-icon-rotated': submenuStates.compras }" class="submenu-icon ms-auto" width="12"
                  height="12">
              </a>
              <ul class="submenu" v-show="submenuStates.compras && isOpen">
                <li>
                  <router-link class="nav-link submenu-link" to="/compras/solicitar-compra" exact-active-class="active">
                    <span><i>Solicitar Compra</i></span>
                  </router-link>
                </li>
                <li>
                  <router-link class="nav-link submenu-link" to="/compras/solicitudes-de-compras"
                    exact-active-class="active">
                    <span><i>Solicitudes de Compra</i></span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/ventas" exact-active-class="active">
                <span>Ventas</span>
              </router-link>
            </li>
            <li>

              <router-link class="nav-link submenu-link" to="/finanzas/reportes" exact-active-class="active">

              <router-link class="nav-link submenu-link" to="/compras" exact-active-class="active">
                <span>Compras</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link submenu-link" to="/reportes" exact-active-class="active">

                <span>Reportes</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideMenu",
    data() {
      return {
        isOpen: true,
        submenuStates: {
          usuarios: false,
          citas: false,
          emergencia: false,
          farmacia: false,
          laboratorio: false,
          almacen: false,
          finanzas: false,
          compras: false,
        },
        currentIcons: {
          home: "/iconos/home.svg",
          user: "/iconos/user.svg",
        },
        hoverIcons: {
          home: "/iconos_acolor/home-hover.svg",
          user: "/iconos_acolor/user-hover.svg",
        },
      };
    },
    computed: {
      isInUsuariosSection() {
        const path = this.$route.path;
        return path.startsWith("/usuarios") || path.startsWith("/usuarios/clientes");
      },
      isInFarmaciaSection() {
        const path = this.$route.path;
        return path.startsWith("/farmacia");
      },
      isInFinanzasSection() {
        const path = this.$route.path;
        return path.startsWith("/finanzas") ||
          path.startsWith("/ventas") ||
          path.startsWith("/reportes");
      },

      isInComprasSection() {
        const path = this.$route.path;
        return path.startsWith("/compras");
      },
      isInCitasSection() {
        const path = this.$route.path;
        return path.startsWith("/citas") || path.startsWith("/cita");
      },
      isInEmergenciaSection() {
        const path = this.$route.path;
        return path.startsWith("/emergencia");
      },
      isInLaboratorioSection() {
        const path = this.$route.path;
        return path.startsWith("/laboratorio");
      },
      isInAlmacenSection() {
        const path = this.$route.path;
        return path.startsWith("/almacen");
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler(newRoute) {
          // Actualizar estados de submenús basado en la ruta actual
          const path = newRoute.path;

          // Resetear todos los estados
          Object.keys(this.submenuStates).forEach(key => {
            this.submenuStates[key] = false;
          });

          // Activar el submenú correspondiente
          if (path.startsWith("/usuarios") || path.startsWith("/usuarios/clientes")) {
            this.submenuStates.usuarios = true;
          } else if (path.startsWith("/citas") || path.startsWith("/cita")) {
            this.submenuStates.citas = true;
          } else if (path.startsWith("/emergencia")) {
            this.submenuStates.emergencia = true;
          } else if (path.startsWith("/farmacia")) {
            this.submenuStates.farmacia = true;
          } else if (path.startsWith("/laboratorio")) {
            this.submenuStates.laboratorio = true;
          } else if (path.startsWith("/almacen")) {
            this.submenuStates.almacen = true;
          } else if (path.startsWith("/finanzas") ||
            path.startsWith("/ventas") ||
            path.startsWith("/reportes")) {
            this.submenuStates.finanzas = true;
          } 

    };
  },
  computed: {
    isInUsuariosSection() {
      const path = this.$route.path;
      return path.startsWith("/usuarios") || path.startsWith("/usuarios/clientes");
    },
    isInFarmaciaSection() {
      const path = this.$route.path;
      return path.startsWith("/farmacia");
    },
    isInFinanzasSection() {
      const path = this.$route.path;
      return path.startsWith("/finanzas") || 
             path.startsWith("/ventas") || 
             path.startsWith("/compras") ||
             path.startsWith("/reportes");
    },
    isInCitasSection() {
      const path = this.$route.path;
      return path.startsWith("/citas") || path.startsWith("/cita");
    },
    isInEmergenciaSection() {
      const path = this.$route.path;
      return path.startsWith("/emergencia");
    },
    isInLaboratorioSection() {
      const path = this.$route.path;
      return path.startsWith("/laboratorio");
    },
    isInAlmacenSection() {
      const path = this.$route.path;
      return path.startsWith("/almacen");
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        const path = newRoute.path;
        
        // Resetear todos los estados
        Object.keys(this.submenuStates).forEach(key => {
          this.submenuStates[key] = false;
        });

        // Activar el submenú correspondiente
        if (path.startsWith("/usuarios") || path.startsWith("/usuarios/clientes")) {
          this.submenuStates.usuarios = true;
        } else if (path.startsWith("/citas") || path.startsWith("/cita")) {
          this.submenuStates.citas = true;
        } else if (path.startsWith("/emergencia")) {
          this.submenuStates.emergencia = true;
        } else if (path.startsWith("/farmacia")) {
          this.submenuStates.farmacia = true;
        } else if (path.startsWith("/laboratorio")) {
          this.submenuStates.laboratorio = true;
        } else if (path.startsWith("/almacen")) {
          this.submenuStates.almacen = true;
        } else if (path.startsWith("/finanzas") || 
                   path.startsWith("/ventas") || 
                   path.startsWith("/compras") ||
                   path.startsWith("/reportes")) {
          this.submenuStates.finanzas = true;

        }
      }
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
        this.$emit("menu-toggled", this.isOpen);
      },
      toggleSubmenu(submenu) {
        this.submenuStates[submenu] = !this.submenuStates[submenu];
      },
    },
  };
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
    width: 240px;
    background-color: white;
    box-shadow: none;
    transition: width 0.3s ease;
    z-index: 1000;
    border-right: 1px solid #f5f9fb;
  }

  .side-menu-minimized {
    width: 80px;
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
    transition: background-color 0.3s ease, color 0.3s ease;
    font-weight: medium;
  }

  .nav-link:hover {
    background-color: #e0e0e0;
    color: #2d60ff;
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
    justify-content: flex-start;
    padding-left: 3.5rem;
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

  .submenu .nav-link span {
    text-align: left;
    width: 100%;
  }

  .submenu-icon {
    margin-left: auto;
  }

  .nav-link.active {
    background-color: #e8efff !important;
    color: #2d60ff !important;
  }

  .nav-link.active .iconColor {
    filter: invert(32%) sepia(95%) saturate(1029%) hue-rotate(211deg) brightness(97%) contrast(108%);
  }

  .submenu .nav-link.active {
    background-color: #e8efff !important;
    color: #2d60ff !important;
    font-weight: 500;
  }

  .nav-link.active:hover {
    background-color: #e8efff !important;
    color: #2d60ff !important;
  }

  /* Nuevo estilo para el menú padre cuando está activo */
  .nav-item .nav-link.active {
    background-color: #e8efff !important;
    color: #2d60ff !important;
  }

  /* Estilos para que se vea bien el submenu dentro del submenu */
  #cont-submenu {
    position: relative;
    left: -1rem;
  }
</style>