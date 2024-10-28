<template>
  <q-page class="bg-page">
    <q-table
      class="box centered-table"
      :rows="actividades"
      :columns="columns"
      row-key="id"
      title="Lista de Actividades"
    >
      <template v-slot:body-cell-acciones="props">
        <q-btn
          label="Editar"
          color="primary"
          @click="abrirModalEditar(props.row)"
          class="action-btn"
        />
        <q-btn
          label="Eliminar"
          color="negative"
          @click="abrirModalEliminar(props.row.id)"
          class="action-btn q-ml-sm"
        />
      </template>
    </q-table>

    <!-- Modal de edición -->
    <q-dialog v-model="modalEditar" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Actividad</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="submitForm">
            <q-input
              filled
              v-model="actividadEditada.actividad"
              label="Actividad"
              type="textarea"
              required
            />
            <q-input
              filled
              v-model="actividadEditada.fecha"
              label="Fecha"
              type="date"
              required
            />
            <q-select
              filled
              v-model="actividadEditada.estado"
              label="Estado"
              :options="['Completado', 'Pendiente']"
              required
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="cerrarModal" />
          <q-btn flat label="Guardar cambios" color="primary" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de confirmación de eliminación -->
    <q-dialog v-model="modalEliminar" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmación de Eliminación</div>
          <div>¿Estás seguro de que deseas eliminar esta actividad?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="cerrarModalEliminar" />
          <q-btn flat label="Eliminar" color="negative" @click="confirmarEliminacion" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useActividadesStore } from '../stores/Actividades';
import { Notify } from 'quasar'; // Importa Notify

const store = useActividadesStore();
const actividades = store.actividades;

const columns = [
  { name: 'actividad', required: true, label: 'Actividad', align: 'left', field: row => row.actividad },
  { name: 'fecha', label: 'Fecha', align: 'left', field: row => row.fecha },
  { name: 'estado', label: 'Estado', align: 'left', field: row => row.estado },
  { name: 'acciones', label: 'Acciones', align: 'center' }
];

const modalEditar = ref(false);
const modalEliminar = ref(false);
const actividadIdAEliminar = ref(null); // Variable para guardar el ID de la actividad a eliminar
const actividadEditada = ref({
  id: null,
  actividad: '',
  fecha: '',
  estado: 'Pendiente'
});

// Función para abrir el modal de edición
const abrirModalEditar = (actividad) => {
  actividadEditada.value = { ...actividad };
  modalEditar.value = true;
};

// Función para cerrar el modal de edición
const cerrarModal = () => {
  modalEditar.value = false;
};

// Función para abrir el modal de confirmación de eliminación
const abrirModalEliminar = (id) => {
  actividadIdAEliminar.value = id; // Guarda el ID de la actividad que se va a eliminar
  modalEliminar.value = true; // Abre el modal de confirmación
};

// Función para cerrar el modal de confirmación de eliminación
const cerrarModalEliminar = () => {
  modalEliminar.value = false;
  actividadIdAEliminar.value = null; // Limpia el ID
};

// Función para confirmar la eliminación de una actividad
const confirmarEliminacion = () => {
  const id = actividadIdAEliminar.value; // Obtiene el ID guardado
  store.eliminar(id); // Llama a la función de eliminar en el store de Pinia
  modalEliminar.value = false; // Cierra el modal
  Notify.create({
    message: 'Actividad eliminada exitosamente.',
    color: 'negative',
    position: 'bottom', // Cambiado a 'bottom'
    timeout: 3000
  });
};

// Función para enviar el formulario de edición
const submitForm = () => {
  store.editarActividad(actividadEditada.value.id, { ...actividadEditada.value });
  modalEditar.value = false; // Cierra el modal
  Notify.create({
    message: 'Actividad editada exitosamente.',
    color: 'positive',
    position: 'bottom', // Cambiado a 'bottom'
    timeout: 3000
  });
};
</script>


<style>
.bg-page {
  background-color: #799cbe;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.centered-table {
  max-width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(182, 9, 9, 0.2);
  border-radius: 16px ;
  overflow: hidden;
  align-items: center;
}

.box {
  padding: 20px;
  color: #333;
}

.action-btn {
  border: none;
  padding: 6px 12px;
  font-weight: 500;
}

.action-btn[color="primary"] {
  background-color: #007bff;
  color: white;
}

.action-btn[color="primary"]:hover {
  background-color: #0056b3;
}

.action-btn[color="negative"] {
  background-color: #ff4d4d;
  color: white;
}

.action-btn[color="negative"]:hover {
  background-color: #cc0000;
}


</style>
