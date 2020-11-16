//comando para establecer la conexion
var socket = io();

//conetion
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
//desconection
socket.on('disconnect', function() {
    console.log('desconectado del servidor');
});

//crear referencia de los elemnto para mostrar en pantalla

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');
//lo mismop para los escritorios
let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

//crear 2 array uno lblticket y otro lblescritorio
let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4]



//llamo el estado actual del socket.js 
//2 para mostarr la cola llamo en socketr en estasdoactual los ultimos4

socket.on('estadoActual', function(data) {

    //console.log(data);
    //aqui llamop a actulizaHTML y mando la dta+ultio4
    actualizaHTML(data.ultimos4);
});
//primero en socket emitimos , para q se actualice automaticamente al dar atender ticket
socket.on('ultimos4', function(data) {
    //console.log(data);

    //para q reprodusca el sonido
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);


})

// funtion para actualizar el html por q lo tengo q llamr varias veces
function actualizaHTML(ultimos4) {
    // el ultimos4.length es para barrerlo de forma independiente
    for (let i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero); // lo q concatena es ticket de la posision i e igual a escritorio
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }


}