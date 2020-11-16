// Comando para establecer conexion
var socket = io();

//conetion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
//desconection
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});


//obetener elemento los parametros por el url 
const querystring = window.location.search; // est lo hice yo par q funcione el has
let searchParams = new URLSearchParams(querystring);
// el .has es para preguntar si existe el escritorio en el navegador
if (!searchParams.has('escritorio')) {
    // si no existe me voy a salida
    window.location = 'index.html';
    throw new Error("El escritorio es necesario");
}
// si vienen
let escritorio = searchParams.get('escritorio');
let label = $('small'); //etiqueta
console.log(escritorio);
// para q se me muestre en la pantalla el scritorio mas el numero
// es una etiqueta small que esta en nmla pagina web, asi q la confi asi, pero esta en el h1, si no lo pongo me sales atendiendo y hago un string
$('h1').text('Escritorio' + escritorio);
// ahora llamar el socket llamando al lister de buttons, es el evento clic del botonico
//como se va a usar mucho vamos hacer una etiqueta arriva, llamemos a socket
$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay ticket') {
            label.text(resp); // para q diga q no hay mas tikect
            alert(resp);
            return;
        }

        label.text('ticket' + resp.numero); //para mostrar nuemro en atendiendo...

    });

})