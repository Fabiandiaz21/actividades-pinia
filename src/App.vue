<template>
  <q-layout view="hHh lpR fFf" class="bg-main">
    <q-header elevated class="header">
      <q-toolbar class="toolbar-centered">
        <q-toolbar-title class="title-centered">
          <span class="title-text">Lista de Actividades</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center" class="tabs">
        <q-route-tab to="/Actividades" label="Actividades" />
        <q-route-tab to="/Agregar" label="Agregar" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  
</template>

<style scoped>
.bg-main {
  background-color: #f4f7fa;
}

.header {
  background-color: #1c3d5a; /* Azul oscuro */
  color: #ffffff;
  height: 98px;
}

.toolbar-centered {
  justify-content: center; /* Centra el contenido de la barra de herramientas */
}

.title-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.avatar {
  background-color: transparent;
}

.title-text {
  font-size: 24px;
  font-weight: bold;
  color: #e53935; /* Rojo */
  margin-left: 8px;
}

.eye-icon {
  font-size: 30px;
  color: #80d4ff; /* Azul claro */
  margin-left: 10px;
  opacity: 0.8;
}

.tabs .q-tab {
  font-weight: 500;
  color: #80d4ff;
}

.tabs .q-tab--active .q-tab__label {
  color: #e53935; /* Rojo para la pestaña activa */
  font-weight: bold;
}

.tabs .q-tab__label {
  font-size: 16px;
}

.tabs .q-tab:hover {
  background-color: #ff6f61; /* Rojo claro en hover */
}

.q-tab__indicator {
  background-color: #80d4ff; /* Azul claro */
}
</style>
