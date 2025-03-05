import mongoose, { Schema, Types } from 'mongoose'

interface ISubtask {
	_id: Types.ObjectId
	title: string
	completed: boolean
	dueDate?: Date
	createdAt: Date
	updatedAt: Date
}

interface ITask extends Document {
	projectId: Types.ObjectId
	createdBy: Types.ObjectId
	title: string
	description: string
	/* status: 'open' | 'in progress' | 'done' | 'blocked' */
	stageId: Types.ObjectId
	tags: Types.ObjectId[]
	assignedTo: Types.ObjectId[]
	subtasks: ISubtask[]
	/* comments: IComment[] */
	/* watchers: Types.ObjectId[] */
	/* dependencies: Types.ObjectId[] */
	timeEstimate?: number
	timeSpent?: number
	sortOrder: number
	dueDate?: Date
	priority: 'low' | 'medium' | 'high'
	createdAt: Date
	updatedAt: Date
}

const SubtaskSchema = new Schema<ISubtask>(
	{
		title: {
			type: String,
			required: [true, 'Subtask title is required'],
			trim: true,
			maxlength: [200, 'Subtask title cannot exceed 200 characters']
		},
		completed: {
			type: Boolean,
			default: false
		},
		dueDate: {
			type: Date
		}
	},
	{
		timestamps: true
	}
)

const TaskSchema = new Schema<ITask>(
	{
		projectId: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: [true, 'Project reference is required']
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		title: {
			type: String,
			required: [true, 'Task title is required'],
			trim: true,
			minlength: [2, 'Task title must be at least 2 characters long'],
			maxlength: [200, 'Task title cannot exceed 200 characters']
		},
		description: {
			type: String,
			trim: true,
			maxlength: [1000, 'Description cannot exceed 1000 characters']
		},
		stageId: {
			type: Schema.Types.ObjectId,
			ref: 'Project.stages',
			required: [true, 'Stage reference is required']
		},
		tags: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Project.tags'
			}
		],
		assignedTo: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Project.members'
			}
		],
		subtasks: [SubtaskSchema],
		/* 
    comments: [CommentSchema],
    watchers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dependencies: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
     */
		timeEstimate: { type: Number },
		timeSpent: { type: Number },
		sortOrder: {
			type: Number,
			required: [true, 'Sort order is required']
		},
		dueDate: {
			type: Date
		},
		priority: {
			type: String,
			enum: {
				values: ['low', 'medium', 'high'],
				message: '{VALUE} is not a valid priority'
			},
			default: 'medium'
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

export const Task = mongoose.model<ITask>('Task', TaskSchema)
