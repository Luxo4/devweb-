import { neon } from '@neondatabase/serverless';
import { engine } from 'express-handlebars';
import jwt from 'jsonwebtoken' ; 
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import express from 'express';


const sql = neon('postgresql://neondb_owner:plmJ8TFBK5aG@ep-white-star-a8n6tz92.eastus2.azure.neon.tech/neondb?sslmode=require');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', async (req, res) => {
  const listaProductos = await sql('SELECT * FROM product'); // Obtener productos
  res.render('home', { lista: listaProductos }); // Pasar la lista de productos a la vista
});

app.get('/main_ad', async (req, res) => {
  const listaProductos = await sql('SELECT * FROM product'); // Obtener productos
  res.render('main_ad', { lista: listaProductos }); // Pasar la lista de productos a la vista
});

app.get('/historial', (req, res) => {
  res.render('historial');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/product', (req, res) => {
  res.render('product');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/ventas', (req, res) => {
  res.render('ventas');
});

app.post('/product', async (req, res) => {
  const name = req.body.name;   // Campo 'name' del formulario
  const price = req.body.price; // Campo 'price' del formulario

  try {
    const query = 'INSERT INTO product (name, price) VALUES ($1, $2)';
    await sql(query, [name, price]);

    // Asegúrate de redirigir a la ruta correcta
    res.redirect('/main_ad'); // Verifica que sea /main_ad
  } catch (err) {
    console.error('Error al guardar el producto:', err);
    res.status(500).send('Error al guardar el producto');
  }
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const query = 'INSERT INTO register (username, email, password) VALUES ($1, $2, $3)';
    await sql(query, [username, email, password]);

    res.redirect('/');
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).send('Error en el registro');
  }
});

app.listen(3000, (err) => {
  if (err) {
      console.error('no hay tuki:C', err);
  } else {
      console.log('tuki tuki');
  }
});
