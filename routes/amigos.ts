import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod'

const router = Router()

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn',  'error']
})

const amigosSchema = z.object({
    nome: z.string().min(3,
        { message: "Nome deve ter, no mínimo 3 caracteres"}),
    proximidade: z.enum(['1', '2', '3', '4'], 
        { message: "Insira um número válido" }),
    idade: z.number().positive(
        { message: "Insira uma idade válida"}
    )
})

router.get('/amigos', async (req, res) =>{
    try{ 
        const amigos = await prisma.amigos.findMany({
            orderBy: { id: 'desc'}
        })
        res.status(200).json(amigos)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

router.post('/amigos', async (req, res) =>{
    const result = amigosSchema.safeParse(req.body)

    if(!result.success) {
        res.status(400).json({ erro: result.error.issues })
        return
    }

    const { nome, idade, proximidade } = result.data
    try {
        const amigos = await prisma.amigos.create({
            data: { nome, idade, proximidade }
        })
        res.status(201).json(amigos)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.delete('/amigos/:id', async (req, res) =>{
    const { id } = req.params

    try {
        const amigos = await prisma.amigos.delete({
            where: { id: Number(id)}
        })
        res.status(200).json(amigos)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

export default router