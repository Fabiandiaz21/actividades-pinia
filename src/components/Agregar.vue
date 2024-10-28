<template>
  <q-page class="form-page">
    <q-form @submit.prevent="submitForm" class="form-container">
      <q-input filled v-model="nuevaActividad.actividad" label="Actividad" type="textarea" class="form-input" />
      <q-input filled v-model="nuevaActividad.fecha" label="Fecha" type="date" class="form-input" />
      <q-select
        filled
        v-model="nuevaActividad.estado"
        label="Estado"
        :options="['Completado', 'Pendiente']"
        class="form-input"
      />
      <q-btn label="Agregar" color="primary" type="submit" class="submit-btn" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useActividadesStore } from '../stores/actividades';

const store = useActividadesStore();
const nuevaActividad = ref({
  actividad: '',
  fecha: '',
  estado: 'Pendiente'
});

const submitForm = () => {
  store.agregarActividad({ ...nuevaActividad.value });
  nuevaActividad.value = { actividad: '', fecha: '', estado: 'Pendiente' }; // Resetea el formulario
};
</script>

<style scoped>
.form-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #799cbe;
  
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.form-input {
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
  font-weight: bold;
  background-color: #007bff;
  color: #ffffff;
}
</style>
