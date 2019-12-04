// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');


const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

// Store the subscription
router.post('/subscribe', (req, res) => {

  const suscripcion = req.body.body;

  push.addSubscription( suscripcion );
  res.json('subscribe');

});

// Get the public key
router.get('/key', (req, res) => {

  const key = push.getKey();
  res.json(key);
  
});

// Send a notification PUSH to the people
// Es algo que se controla del lado del server, no del api REST
router.post('/push', async (req, res) => {

  /*const notificacion = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  }*/

  const notificacion = {
    "notification": {
      "title": req.body.titulo,
      "body": req.body.cuerpo,
      "icon": "https://i.pinimg.com/originals/2d/17/2e/2d172e46ce83cf2fb78912e49af923e6.png",
      "openUrl": "/",
      "vibrate": "[125,75,125,275,200,275,125,75,125,275,200,600,200,600]",
      "data": {
        "url": "/",
        "id": "PWA"
      }
    }
  };

    push.sendPush( notificacion );

  res.json( notificacion );
  
});

module.exports = router;