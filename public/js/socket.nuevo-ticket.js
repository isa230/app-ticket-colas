// logic para nuevo ticket

//comamndo par aestablecer comucicacion
var socket = io();

//jquier tiene una herramienta q cuando se va ausar muchaves el mismo html se hace una referencia 
var label = $('#lblNuevoTicket');


//conetion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
//desconection
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

//estado actual de los tickets, esto es apra q se refleje en la pagina 
socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
})


//generar listener a buuton de nuevo tivket , con jquieri

$('button').on('click', function() {
    //coneccion de backen fronten
    socket.emit('siguienteTicket', null, function(siguienteTicket) { //callback saber quien sigue de los tiket esto se muestra el el lblnuevo ticket esta en html de nuevo tivket

        label.text(siguienteTicket);

    });
});