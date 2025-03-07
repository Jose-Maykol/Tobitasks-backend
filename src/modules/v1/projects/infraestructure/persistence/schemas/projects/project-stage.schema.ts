import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProjectStageDocument = ProjectStage & Document

@Schema()
export class ProjectStage {
	@Prop({ required: true, trim: true })
	name: string

	@Prop({ required: true, min: 0 })
	order: number

	@Prop({ required: true, match: /^#([0-9A-F]{3}){1,2}$/i })
	color: string
}

export const ProjectStageSchema = SchemaFactory.createForClass(ProjectStage)
