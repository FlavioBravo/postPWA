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

  const suscripcion = req.body;

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
router.post('/push', (req, res) => {

  const key = push.getKey();
  res.json('key publico');
  
});

module.exports = router;