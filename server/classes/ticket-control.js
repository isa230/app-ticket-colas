//
const fs = require('fs');
// par aeso me voy a crear otra classe llamada tickets

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;


    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate(); // guardar para un caso q se valla la luz o otro no pierda nada , lo ideal es una BD pero lo guardaremo en un archivo de tex
        //creamos un arreglo para todos los ticket pendientes d
        this.tickets = [];
        //este array va llevar todo los tickets q no an sido atendidos
        // para llenar hay dos cosa 1 cuando se reicia el conteo se tiene q limpiar por eso lo llamo en reicionde conte
        // luego en donde ce inia el dia
        //luego en grabarArchivo par asaver cuales son los tickesy pendienter 
        // este es para la pantalla puvblica los ultiomos 4 de
        this.ultimos4 = [];

        let data = require('../data/data.json'); // como es una archivo json lo puedo hacer asi


        // cada dia se reinicie el sistema
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {

            this.reiniciarConteo();

        }


    }

    // funcion para siguiente numero esto despues de reiniciarConteo
    siguiente() {

            this.ultimo += 1;
            //cuando creamos el sigueite creamos una nueva istancia y agregarlo alun arreglo de ticket
            let ticket = new Ticket(this.ultimo, null);
            this.tickets.push(ticket);
            //luego en la data hoy en cero para q se reicinie


            this.grabarArchivo();

            return `Ticket ${this.ultimo}`;

        }
        //funtion for the state actual from the ticket
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    //creacion de la funcion de escritorio solo voy a llamar a this.ultimo4
    getUltimos4() {
        return this.ultimos4;
    }

    //atender numeros en esperado de
    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {

            return 'No hay mas tickets';

            /*return status(400).json({
                ok: false,
                error: {
                    message: 'No hay Tickets'
                }*/
        }

        let numeroTicket = this.tickets[0].numero; // mromper js q todo los datos son pasadopor referncia 
        //luego borrar elnumero ya atendido
        this.tickets.shift();
        //declar estancia de nuevo ticket q voy a  atender este recibe el numero del tickert 
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        // ponerlo al inicio del array con unshift y mando el valor
        this.ultimos4.unshift(atenderTicket);
        //borrar los q ya van saliendo de
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // esto borra el ultimo numero
        }

        console.log('ultimos 4');
        console.log(this.ultimos4);

        // luego guardar en el bd de text
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];


        console.log('Se inicio el Sitema');
        this.grabarArchivo();


    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimo4
        };
        //tengo los datos ,pero debo mandarlo como un striong, ahora guardarlo para eso usar faysisten
        let jsonDataString = JSON.stringify(jsonData);
        //ya inportado fs lo guardo en la ruta y lo q quiero guardad esta despues de la coma
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}


module.exports = {

    TicketControl

}