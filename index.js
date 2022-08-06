import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import { database, MONGO_URI } from './utils/db.js';
import path from 'path';

// import local
import dashboard from './routes/dashboard.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// SetUp EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/favicon.ico', express.static('images/favicon.ico'));

// SetUp Flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use('/public', express.static(path.join(path.resolve(), 'public')));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));
// Connect Database
database();

app.use('/', dashboard);

app.get('/service-worker.js',(req,res)=>{
  console.log('PATH JOIN',path.join(path.resolve(), 'public/pwa/service-worker.js'))
  res.sendFile(path.join(path.resolve(), 'public/pwa/service-worker.js'))
})
// app.use('/auth', authentication);

// app.use('/', landing);

// app.use('/', (req, res) => {
//   res.render('404', { layout: 'layouts/buangan' });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

//Run app, then load http://localhost:3000 in a browser to see the output.
