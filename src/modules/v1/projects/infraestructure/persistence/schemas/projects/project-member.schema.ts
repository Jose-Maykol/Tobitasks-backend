import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProjectMemberDocument = ProjectMember & Document

@Schema()
export class ProjectMember {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({
		required: true,
		lowercase: true,
		trim: true,
		match: /^\S+@\S+\.\S+$/
	})
	email: string

	@Prop({ required: true, trim: true })
	role: string
}

export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember)
