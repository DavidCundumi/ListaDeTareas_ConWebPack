export class Tarea {
    static recuperarlocalStorag({ id, tarea, completado, creado }) {
        const nuevaTarea = new Tarea(tarea);
        nuevaTarea.id = id;
        nuevaTarea.completado = completado;
        nuevaTarea.creado = creado;
        return nuevaTarea;
    }


    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();//Me recupera las horas minutos segundos etc para que se vea de la siguiente manera como un id 7546136878
        this.completado = false;
        this.creado = new Date();
    }
    toString() {
        console.log("La tarea es : " + this.tarea + ", el ID de la tarea es : " + this.id + ", el estado de la tarea es : " + this.completado + " y la fecha de creacion de la tarea es : " + this.creado);
    }
}
