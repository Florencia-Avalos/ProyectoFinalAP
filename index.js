import 'dotenv/config.js';
import Express from 'express';

import { DbTest } from './database.js';
import { articulo } from './models/Articulo.js';

const server = Express();

// Plantilla
server.set('view engine', 'ejs');
server.use(Express.static('public'));

server.use(Express.json());
server.use(Express.urlencoded({ extended: true }));

server.get('/',async (req, res) => {
    const articulos = await articulo.findAll()

  res.render('inicio', {articulos:articulos});
});

server.get('/agregar', (req, res) => {
  res.render('agregar');
});

server.post('/agregar', async (req, res) => {
    const { nom_art, img_art, desc_art } = req.body; // Obtén los valores del formulario
  
    try {
      // Crea una instancia de Articulo con los valores del formulario
      const nuevoArticulo = await articulo.create({
        nom_art: nom_art,
        img_art: img_art,
        desc_art: desc_art
      });
  
      console.log(nuevoArticulo);
  
      if (nuevoArticulo) {
        res.redirect('/')
      } else {
        res.send('No se pudo cargar el artículo');
      }
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
      res.status(500).send('Error al guardar el artículo'); // Devuelve un error 500 en caso de fallo
    }
  });

  server.get('/eliminar/:id', async(req, res) => {
    const {id} = req.params

    try {
      const borrarArticulo = await articulo.destroy({
        where: {
          cod_art:id
        }
      });
  
      if (borrarArticulo) {
        res.redirect('/')
      } else {
        res.send('No se pudo borrar el artículo');
      }
    } 
     catch (error) {
      res.send ('se produjo un error al eliminar' + error)
    }

    

  });

  server.get('/editar/:id', async (req, res) => {
    const {id} = req.params

    try {
      const editarArticulo = await articulo.findOne({
        where: {
          cod_art:id
        }
      });
  
      if (editarArticulo) {
        res.render('editar', {editarArticulo:editarArticulo})
      } else {
        res.send('No se encontró el articulo');
      }

      
    } 
     catch (error) {
      res.send ('se produjo un error al eliminar' + error)
    }
  });

  server.post('/editar/:id', async (req, res) => {
    const {id} = req.params
    const { nom_art, img_art, desc_art } = req.body;

    try {
      const articuloActualizado = await articulo.update(

        {
          nom_art: nom_art,
          img_art: img_art,
          desc_art: desc_art

        },{
          where: {
            cod_art:id
          }

        }

      );
  
      if (articuloActualizado) {
        res.redirect('/')
      } else {
        res.send('No se pudo actualizar el articulo');
      }

    } 
     catch (error) {
      res.send ('se produjo un error al editar' + error)
    }
  });

DbTest();

server.listen(process.env['PORT'], () => {
  console.log('Corriendo en el server' + process.env['PORT']);
});