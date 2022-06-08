import { Tarea } from './Tarea.class.js';
export class ListaTareas {
    constructor() {
        this.cargarLocalStorage();
    }

    agregarTarea(tarea) {
        this.Tareas.push(tarea);
        this.guardarTareasEnLocalStorag();
    }
    eliminarTarea(id) {
        this.Tareas = this.Tareas.filter(tarea => tarea.id != id);//la idea es que me genere una nueva lista de tareas excluyendo al la tarea que tenga el id del parametro de entrada
        this.guardarTareasEnLocalStorag();
    }
    marcarCompletado(id) {
        for (let tarea of this.Tareas) {
            if (tarea.id == id) {
                tarea.completado = !tarea.completado
                this.guardarTareasEnLocalStorag();
                break;
            }
        }
    }
    eliminarTodosLosCompletados() {
        this.Tareas = this.Tareas.filter(tarea => tarea.completado != true);
        this.guardarTareasEnLocalStorag();
    }
    mostrarTareas() {
        for (let i in this.Tareas) {
            console.log(this.Tareas[i].toString());
        }
    }
    guardarTareasEnLocalStorag() {
        localStorage.setItem('Tarea', JSON.stringify(this.Tareas))
    }
    cargarLocalStorage() {
        (localStorage.getItem("Tarea")
            ? this.Tareas = JSON.parse(localStorage.getItem('Tarea'))
            : this.Tareas = [])
        this.Tareas = this.Tareas.map(obj => Tarea.recuperarlocalStorag(obj));
    }

}