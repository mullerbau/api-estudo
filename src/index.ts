import express, { Router } from 'express'
import routeJogadores from 'routes/jogadores'
import routeTimes from '@routesamigos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(express.json())
app.use("/jogadores", routeJogadores)
app.use("/times", routeTimes)

app.get('/', (req, res) =>{
    res.send('Brasileirinho de Futebooooooooolis!')
})


