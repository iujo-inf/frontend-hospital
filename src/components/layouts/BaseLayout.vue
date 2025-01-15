<template>
  <div class="layout">
    <SideMenu ref="sideMenu" @menu-toggled="updateSideMenuWidth"/>
    <div class="content flex-grow-1">
      <NavBar :title="pageTitle" :sideMenuWidth="sideMenuWidth" @toggle-menu="toggleSideMenu"/>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/ui/navbar/NavBar.vue'
import SideMenu from '@/components/ui/sidemenu/SideMenu'

export default {
  name: 'BaseLayout',
  components: {
    NavBar,
    SideMenu
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Inicio'
    }
  },
  data() {
    return {
      sideMenuWidth: '240px' // Ancho inicial del side menu
    }
  },
  methods: {
    toggleSideMenu() {
      this.$refs.sideMenu.toggleMenu();
    },
    updateSideMenuWidth(isOpen) {
      this.sideMenuWidth = isOpen ? '240px' : '80px'; // Actualiza el ancho del sideMenu
    }
  }
}
</script>

<style scoped>
.layout {
  background-color: #f5f7fa;
  min-height: 100vh;
  width: 100%;
}
.content {
    transition: margin-left 0.3s ease; /* Transición suave para el margen */
}

.side-menu {
    width: 240px; /* Ancho del side menu */
}

.side-menu-minimized {
    width: 80px; /* Ancho del side menu minimizado */
}
</style>