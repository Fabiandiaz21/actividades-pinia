// stores/actividades.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useActividadesStore = defineStore('actividades', () => {
  const actividades = ref([]);

  const agregarActividad = (nuevaActividad) => {
    nuevaActividad.id = Date.now(); // Asigna un ID único
    actividades.value.push(nuevaActividad);
  };

  const editarActividad = (id, actividadActualizada) => {
    const index = actividades.value.findIndex(a => a.id === id);
    if (index !== -1) {
      actividades.value[index] = { ...actividadActualizada, id };
    } else {
      console.log(`Actividad con ID ${id} no encontrada para editar.`); // Mensaje si no se encontró la actividad
    }
  };

  const eliminar = (id) => {
    console.log(`Eliminando actividad con ID: ${id}`); // Mensaje de depuración
    console.log('Actividades antes de eliminar:', actividades.value); // Muestra el estado actual del array
    const index = actividades.value.findIndex(a => a.id === id);
    if (index !== -1) {
      const actividadEliminada = actividades.value[index]; // Guarda la actividad eliminada
      actividades.value.splice(index, 1); // Eliminar la actividad usando splice
      console.log(`Actividad eliminada:`, actividadEliminada); // Mensaje de confirmación
    } else {
      console.log(`Actividad con ID ${id} no encontrada`); // Mensaje si no se encontró la actividad
    }
  };

  return { actividades, agregarActividad, editarActividad, eliminar };
});
