import express, { Router } from 'express'
import routeAmigos from 'routes/amigos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(express.json())
app.use("/amigos", routeAmigos)


app.get('/', (req, res) =>{
    res.send('Table de amigos do Bauer (não é carência e sim falta de ideias)')
})

app.listen(port, () => {
    console.log(`Servidor rodando na port: ${port}`)
})


