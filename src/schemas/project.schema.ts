import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Category, CategorySchema } from './category.schema';
import { Status, StatusSchema } from './status.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({
  collection: 'projects',
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Project {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'En planificación' })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], default: [] })
  users: string[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Task' }], default: [] })
  tasks: string[];

  @Prop({
    type: [StatusSchema],
    default: [
      { name: 'En planificación', color: '#FFC107' },
      { name: 'En desarrollo', color: '#17A2B8' },
      { name: 'En pruebas', color: '#28A745' },
      { name: 'Finalizado', color: '#6C757D' },
    ],
  })
  statuses: Status[];

  @Prop({
    type: [CategorySchema],
    default: [{ name: 'General', color: '#17A2B8' }],
  })
  categories: Category[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
