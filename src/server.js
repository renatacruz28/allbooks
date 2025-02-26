const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/data/database.json')
const publicRoutes = require('./routes/publicRoutes')
const authenticationMiddleware = require('./middleware/authenticationMiddleware')


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

server.use('/public', publicRoutes)


server.use(/^(?!\/(public|livros|autores|categorias)).*$/, authenticationMiddleware);

server.use(router)

server.listen(8000, () => {
  console.log("API disponível em http://localhost:8000")
})
