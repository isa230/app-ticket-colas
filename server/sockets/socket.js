const { io } = require('../app');

const { TicketControl } = require('../classes/ticket-control');


//nueva estancia
// la t en minuscula para varia 
const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => { // llam al callback q puse en socket.js esto par aq lo ,uestre en la pagina y en dat

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);

    });

    //emitir evento estado actual 

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        //creo una funcion en ticket-control getultimo4, y llamo la funtion
        ultimos4: ticketControl.getUltimos4(),
    });

    // ahora configurar atender ticket
    client.on('atenderTicket', (data, callback) => {


        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'escritorio es necesario'
            });
        }
        //ahora llamr la funcion de atender tike de controljs
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        //retonermos el atenderTicket,patra q erl fronet lo trabajenm
        callback(atenderTicket);

        // actulizar /notificar cambio en los ultimos 4,,,, el broadcastr es par aq el mms les llegue a los 4 o los q sea
        client.broadcast.emit('ultimos4', { //se manda la data que son

            ultimos4: ticketControl.getUltimos4()

        })





    });



});