import { Tarea } from '/Curso-JavaScript/ListaDeTareas_WebPack/src/classes/Tarea.class.js';
import { Tareas } from '../index.js';
/*
import { Tarea } from '/Curso-JavaScript/ListaDeTareas_WebPackAux/src/classes/Tarea.class.js';
export const funcionTarea = () => {
    const Btnenviar = document.querySelector("#enviar"),
        Tare1 = document.querySelector("#tarea"),
        lista = [];

    const ArrayDeTareas = (tarea) => {
        lista.push(tarea);
        for (let i in lista) {
            console.log(lista[i].toString());
        }
    }
    Btnenviar.addEventListener("click", () => {
        let tarea,
            aux;
        (Tare1.value == "")
            ? alert("Debe ingrese una tarea")
            : (tarea = Tare1.value, aux = new Tarea(tarea), Tare1.value = "", ArrayDeTareas(aux))


    });
}

*/


//referencias del HTML

const divTareaLista = document.querySelector(".todo-list");
const ingresarTarea = document.querySelector(".new-todo");
const btnBorrarCompletados = document.querySelector(".clear-completed");
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
export const crearTareaHTML = (tarea) => {
    const htmlTarea = `
        <li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(tarea.completado) ? 'checked' : ''} >
                    <label>${tarea.tarea}</label>
                    <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`
    const div = document.createElement("div");
    div.innerHTML = htmlTarea;
    divTareaLista.append(div.firstElementChild);
    return div.firstElementChild;
}

//evento
//En este caso estamos recuperando lo que se ingrese en el imput pero no desde un boton sino que se ingresan los datos y cuando el usuario oprime una tecla puede ser cualquira y la suelta recupera lo que este dentro del imputo
//con el event sabremos que letra poresiono el usuario

ingresarTarea.addEventListener("keyup", (event) => {
    let tarea = ingresarTarea.value;
    let obj;
    // console.log(event);
    if (event.keyCode === 13 && tarea == "") {
        alert("Debe ingresar una tarea")
    } else if (event.keyCode === 13 && tarea != "") {
        obj = new Tarea(tarea);
        crearTareaHTML(obj);
        ingresarTarea.value = '';
        Tareas.agregarTarea(obj);
        Tareas.mostrarTareas();
    }
});
//<input class="toggle" type="checkbox">
divTareaLista.addEventListener("click", (event) => {
    //Con el target identifico como tal la etiqueta completa es decir todo el objeto y sus caracteristicas de la etiqueta o atributo html al que se ledio click y con ellocalName me dirijo especificamente a la etiqueda es decir si le di clik a un umpit boton label etc
    const nombreElemento = event.target.localName;
    console.log(nombreElemento);
    //con el parentElement me dirigo directamente a la etiqueda madre es decir a la etiquete del atributo del onderlist es decir cuando se crea una nueva tarea la etiqueta madre que envuelde toda esa tarea es la etiqueta ul y es la que posee el id de la tarea
    const todoElemento = event.target.parentElement.parentElement
    //de esta forma recuperamos el id de la etiqueta li es decir el id de la tarea que se creeo
    const tareaID = todoElemento.getAttribute("data-id");
    console.log(tareaID);
    if (nombreElemento.includes("input")) {//se verifica si al momento de dar click fu a un impot y asi sabremos que se le dio click al chek out para marcar como completada una tarea
        Tareas.marcarCompletado(tareaID);//se llama la funcion para marcar la tarea cmo completata o descompletada
        todoElemento.classList.toggle("completed");//L estoy agragando la clase de completado a el elemnto li
    } else if (nombreElemento.includes("button")) {
        Tareas.eliminarTarea(tareaID);
        todoElemento.remove();
        //otra posble eliminacion de la tarea en el html es esta:
        //divTareaLista.removeChild(todoElemento);
        Tareas.mostrarTareas();
    }

});

btnBorrarCompletados.addEventListener("click", () => {
    Tareas.eliminarTodosLosCompletados();
    //como el ul (under list) a la final es una lista de datos porque se pueden agregar elemntos a el, tiene el mismo principio que un arreglo por lo tanto se toma la etiqueta madre es decir el ul porque dentro estan los atributos es decir los li y con el metodo children se puede manejar como un arrgelo
    for (let i = divTareaLista.children.length - 1; i >= 0; i--) {
        const elemnto = divTareaLista.children[i];
        if (elemnto.classList.contains("completed")) {
            divTareaLista.removeChild(elemnto);
        }
    }
    Tareas.mostrarTareas();

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTareaLista.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }


    }



});

