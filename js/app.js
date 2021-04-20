// 1. Creando la base de datos
let bbdd;
document.addEventListener('DOMContentLoaded', () => {
    crmDB();
    setTimeout(() => {
        crearCliente();
    }, 4000);
});

function crmDB() {
    let db;
    if (!window.indexedDB) {
        window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
    }
    
    // var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let crmDB = null;
    // Crear Base de DAtos version 1.0
    crmDB = window.indexedDB.open("crm", 1); // al ir a chrome para revisar si esta creado, se debe de
    //  presionar el botón Refresh para que aparezca la nueva base de datos
    
    // Si hay un error
    crmDB.onerror = function(event) {
        console.log('Hubo un error de BD:' + event.target.errorCode);
    }
    // Si se creo bien
    crmDB.onsuccess = function(event) {   
        bbdd = crmDB.result;
        console.log('Se creo la BD ' + bbdd);
    }
    // Configuración de la base de datos
    // Se ejecuta una vez
    crmDB.onupgradeneeded = function(event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        })
        console.log(db);
        // Definir la Columnas
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('email', 'email', {unique: true});
        objectStore.createIndex('telefono', 'telefono', {unique: false});

        console.log('Columnas Creadas');
    }
}

// Transacciones
function crearCliente() {
    let transaction = bbdd.transaction(['crm'], 'readwrite');

    transaction.oncomplete = function() {
        console.log('Transaccion completada');  
    }

    transaction.onerror = function() {
        console.log('Hubo un  error en la transaccion');// si email duplicado, gatilla esta función
    }
    // Escribir un objeto en la base de datos
    const objectStore = transaction.objectStore('crm');
    const nuevoCliente = {
        telefono: 1111111,
        nombre: 'Humberto',
        email: 'hvg.informatico@gmail.com'
    }

    // Agregar un registro
    // put Actualizar registro
    // delete Eliminar registro
    const peticion = objectStore.add(nuevoCliente);

    console.log(peticion);
}

