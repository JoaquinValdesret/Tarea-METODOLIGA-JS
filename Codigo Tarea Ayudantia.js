// Tarea: completar CRUD simulado de alumnos usando arrays
const readline = require("readline");

const ASIGNATURA = "Metodologias de Desarrollo";
//Arreglo alumnos
const alumnos = [
  { id: 1, nombre: "Ana Perez", email: "ana@correo.com", seccion: "A" },
  { id: 2, nombre: "Luis Soto", email: "luis@correo.com", seccion: "B" },
  { id: 3, nombre: "Marta Diaz", email: "marta@correo.com", seccion: "A" },
];
// Crea al alumno usando push
let siguienteId = 4;
function crearAlumno(nombre, email, seccion) {
  const nuevoAlumno = {
    id: siguienteId,
    nombre: nombre,
    email: email,
    seccion: seccion
  };
  
  alumnos.push(nuevoAlumno); // lo agrega al final del array

  siguienteId++; // suma para que el id no sea el mismo
  return nuevoAlumno;
}
// 2 lista de alumnos, devuele el arreglo completo
function listarAlumnos() {
  return alumnos; 
}
// 3 Obtener el alumno por Id
function obtenerAlumnoPorId(id) {
//Retornar informacion del alumno por Id
  return alumnos.find(alumno => alumno.id === id) || null;
}

// Actualizar alumnos por id
function actualizarAlumno(id, datosActualizados) {
  const alumno = obtenerAlumnoPorId(id);
  //si no exite retorna null
  if (!alumno) return null;
  // Editar los campos nombre, email y seccion
  if (datosActualizados.nombre) alumno.nombre = datosActualizados.nombre;
  if (datosActualizados.email) alumno.email = datosActualizados.email;
  if (datosActualizados.seccion) alumno.seccion = datosActualizados.seccion;
// deveulve el alumno actualizado
  return alumno;
}
// Eliminar alumno por id
function eliminarAlumno(id) {
    //busca el id 
  const indice = alumnos.findIndex(alumno => alumno.id === id);
  // resta 1 para coincidir con el index
  if (indice === -1) return false;

  alumnos.splice(indice, 1);
  return true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

function toNumber(valor) {
  const numero = Number(valor);
  return Number.isNaN(numero) ? null : numero;
}

function mostrarMenu() {
  console.log("\n=== MENU TAREA CRUD ===");
  console.log("Asignatura:", ASIGNATURA);
  console.log("1) Listar alumnos");
  console.log("2) Crear alumno");
  console.log("3) Buscar alumno por id");
  console.log("4) Editar alumno");
  console.log("5) Eliminar alumno");
  console.log("0) Salir");
}

async function ejecutarMenu() {
  let continuar = true;

  while (continuar) {
    mostrarMenu();
    const opcion = await preguntar("Selecciona una opcion: ");

    switch (opcion) {
      case "1": {
        const lista = listarAlumnos();
        console.table(lista);
        break;
      }

      case "2": {
        const nombre = await preguntar("Nombre: ");
        const email = await preguntar("Email: ");
        const seccion = await preguntar("Seccion: ");
        const nuevo = crearAlumno(nombre, email, seccion);
        console.log("Alumno creado:", nuevo);
        break;
      }

      case "3": {
        const id = toNumber(await preguntar("ID a buscar: "));
        if (id === null) { console.log("ID invalido."); break; }
        const alumno = obtenerAlumnoPorId(id);
        console.log(alumno ? "Encontrado:" : "No encontrado.", alumno);
        break;
      }

      case "4": {
        const id = toNumber(await preguntar("ID a editar: "));
        if (id === null) { console.log("ID invalido."); break; }
        
        const nombre = await preguntar("Nuevo nombre (Enter para mantener): ");
        const email = await preguntar("Nuevo email (Enter para mantener): ");
        const seccion = await preguntar("Nueva seccion (Enter para mantener): ");

        const datos = {};
        if (nombre) datos.nombre = nombre;
        if (email) datos.email = email;
        if (seccion) datos.seccion = seccion;

        const actualizado = actualizarAlumno(id, datos);
        console.log(actualizado ? "Actualizado:" : "Error: Alumno no existe.", actualizado);
        break;
      }

      case "5": {
        const id = toNumber(await preguntar("ID a eliminar: "));
        if (id === null) { console.log("ID invalido."); break; }
        const exito = eliminarAlumno(id);
        console.log(exito ? "Eliminado correctamente." : "Error: Alumno no encontrado.");
        break;
      }
      case "0": {
        continuar = false;
        console.log("Saliendo del programa...");
        break;
      }

      default:
        console.log("Opcion no valida.");
    }
  }
  rl.close();
}

ejecutarMenu();
