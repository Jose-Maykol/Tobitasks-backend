import mongoose, { Document, Schema, Types } from 'mongoose'

interface IProjectStage {
	_id: Types.ObjectId
	name: string
	order: number
	color: string
}

interface IProjectTag {
	_id: Types.ObjectId
	name: string
	color: string
}

interface IProjectMember {
	_id: Types.ObjectId
	name: string
	email: string
	role: string
}

export interface IProject extends Document {
	name: string
	description: string
	createdBy?: Types.ObjectId
	stages: IProjectStage[]
	tags: IProjectTag[]
	members: IProjectMember[]
	status: string
	startDate: Date
	endDate: Date
	progress: number
	createdAt: Date
	updatedAt: Date
	/* attachments: IAttachment[] */
}

// Project Schema
const ProjectStageSchema = new Schema<IProjectStage>({
	name: {
		type: String,
		required: [true, 'Stage name is required'],
		trim: true
	},
	order: {
		type: Number,
		required: [true, 'Stage order is required'],
		min: [0, 'Order must be a non-negative number']
	},
	color: {
		type: String,
		required: [true, 'Stage color is required'],
		match: [/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color format']
	}
})

const ProjectTagSchema = new Schema<IProjectTag>({
	name: {
		type: String,
		required: [true, 'Tag name is required'],
		trim: true
	},
	color: {
		type: String,
		required: [true, 'Tag color is required'],
		match: [/^#([0-9A-F]{3}){1,2}$/i, 'Invalid color format']
	}
})

const ProjectMemberSchema = new Schema<IProjectMember>({
	name: {
		type: String,
		required: [true, 'Member name is required'],
		trim: true
	},
	email: {
		type: String,
		required: [true, 'Member email is required'],
		lowercase: true,
		trim: true,
		match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
	},
	role: {
		type: String,
		required: [true, 'Member role is required'],
		trim: true
	}
})

const ProjectSchema = new Schema<IProject>(
	{
		name: {
			type: String,
			required: [true, 'Project name is required'],
			trim: true,
			minlength: [2, 'Project name must be at least 2 characters long'],
			maxlength: [100, 'Project name cannot exceed 100 characters']
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, 'Description cannot exceed 500 characters']
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		stages: [ProjectStageSchema],
		tags: [ProjectTagSchema],
		members: [ProjectMemberSchema],
		status: {
			type: String,
			enum: ['open', 'in progress', 'done', 'blocked'],
			default: 'open'
		},
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		progress: {
			type: Number,
			default: 0,
			min: [0, 'Progress must be a non-negative number'],
			max: [100, 'Progress cannot exceed 100']
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

export const Project = mongoose.model<IProject>('Project', ProjectSchema)
