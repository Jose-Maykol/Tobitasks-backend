import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './infraestructure/config/database'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Conexión a la base de datos
connectDb()

app.use('/api', (req: Request, res: Response, next: NextFunction) => {
	console.log(`Request URL: ${req.originalUrl}`)
	next()
})

// Rutas
app.get('/api', (req: Request, res: Response) => {
	res.json({ message: 'TobiTaks API' })
})

// Manejo de errores
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send('Something went wrong!')
})

// Inicializa el servidor
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/api`)
})
