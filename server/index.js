const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const DB_upload = require('./DB_upload')
const port = process.env.PORT || 3001;


//Cuando force esta en false se mantiene la persistencia de datos, incluso cuando se cierre el servidor.
//Cuando esta en true los datos se borran si el servidor se cierra.
conn
  .sync({ force: false })
  .then(async() => {
      await DB_upload();
      server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      })
}).catch(error => console.error(error))

module.exports = server;
