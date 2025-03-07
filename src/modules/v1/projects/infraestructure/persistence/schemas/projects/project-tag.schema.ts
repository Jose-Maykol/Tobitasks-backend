import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProjectTagDocument = ProjectTag & Document

@Schema()
export class ProjectTag {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true, match: /^#([0-9A-F]{3}){1,2}$/i })
	color: string
}

export const ProjectTagSchema = SchemaFactory.createForClass(ProjectTag)
