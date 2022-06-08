import { Tarea, ListaTareas, crearTareaHTML } from './classes/index.js';
import "./styles.css";
/*
import { funcionTarea } from '/Curso-JavaScript/ListaDeTareas_WebPackAux/src/js/ListaDeTareasAux.js';

*/
export const Tareas = new ListaTareas();
Tareas.Tareas.forEach(tarea => crearTareaHTML(tarea));
