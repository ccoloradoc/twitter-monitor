const UserStream = require('commons').UserStream;
const TwitterService = require('commons').Twitter;

const twitterService = new TwitterService();

console.log('>> Service up')

let welcomeText =
// `Creemos que un elemento fundamental para mejorar la situación política de nuestro país es cerrar la brecha de comunicación entre mandatarios(gobierno) y mandantes(ciudadanos).
//
// Nuestro portal te ayuda de manera sencilla a encontrar a tu diputado y su información de contacto, así como obtener un resumen de su desempeño y una comparación con otros miembros de la cámara.
//
// Te invitamos a visitar nuestro portal (https://contactolegislativo.com) y si te gusta ayúdanos a la difusión de este proyecto a través de tus redes sociales.
//
// Gracias por seguirnos!
// #ContactoLegislativo`;

`Hola,
¿Alguna vez te preguntaste que tanto trabaja tu diputado? Nosotros sí, y al tratar de averiguarlo nos perdimos en muchos portales de gobierno.

Como no queríamos que te pasara lo mismo creamos #ContactoLegislativo, un portal en el cual puedes encontrar de manera sencilla a tu diputado, su información de contacto y un resumen de su desempeño.

Te invitamos a visitar nuestro portal (https://contactolegislativo.com) y si te gusta ayúdanos a la difusión de este proyecto a través de tus redes sociales.

Gracias por seguirnos!
#ContactoLegislativo`;

let userStream = new UserStream();

userStream.start();

userStream.on('follow', (data) => {
  console.log(`>> Sending message...`)
  twitterService.directMessage(data.source.id, welcomeText).then(data =>{
    console.log(`>> DM Sent successfully to @${data.event.message_create.target.recipient_id}`)
  });
});
