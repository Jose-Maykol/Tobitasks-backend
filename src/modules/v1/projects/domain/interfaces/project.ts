// Definiciones a nivel de dominio

export interface IProjectStage {
	_id: string
	name: string
	order: number
	color: string
}

export interface IProjectTag {
	_id: string
	name: string
	color: string
}

export interface IProjectMember {
	_id: string
	name: string
	email: string
	role: string
}

export interface IProject {
	name: string
	description: string
	createdBy?: string
	stages: IProjectStage[]
	tags: IProjectTag[]
	members: IProjectMember[]
	status: string
	startDate: Date
	endDate: Date
	progress: number
	createdAt: Date
	updatedAt: Date
}
