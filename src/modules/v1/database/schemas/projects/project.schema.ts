import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ProjectStage, ProjectStageSchema } from './project-stage.schema'
import { ProjectTag, ProjectTagSchema } from './project-tag.schema'
import { ProjectMember, ProjectMemberSchema } from './project-member.schema'

export type ProjectDocument = Project & Document

@Schema({ timestamps: true })
export class Project {
	@Prop({ required: true, trim: true, minlength: 2, maxlength: 100 })
	name: string

	@Prop({ trim: true, maxlength: 500 })
	description: string

	@Prop({ type: Types.ObjectId, ref: 'User' })
	createdBy?: Types.ObjectId

	@Prop({ type: [ProjectStageSchema] })
	stages: ProjectStage[]

	@Prop({ type: [ProjectTagSchema] })
	tags: ProjectTag[]

	@Prop({ type: [ProjectMemberSchema] })
	members: ProjectMember[]

	@Prop({
		type: String,
		enum: ['open', 'in progress', 'done', 'blocked'],
		default: 'open'
	})
	status: string

	@Prop({ type: Date })
	startDate: Date

	@Prop({ type: Date })
	endDate: Date

	@Prop({
		type: Number,
		default: 0,
		min: 0,
		max: 100
	})
	progress: number
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
