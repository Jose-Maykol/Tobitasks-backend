import express from 'express'
import { ProjectService } from 'src/application/services/project.service'
import { container } from 'src/config/di/inversify.config'

const router = express.Router()

const projectService = container.get<ProjectService>('ProjectService')

router.post('/', async (req, res) => {
	console.log('Creating project...')
	console.log(req.body)
	const newProject = await projectService.create(req.body)
	res.status(201).json(newProject)
})

export default router
