import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  collection: 'tasks',
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  /* @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  owner: string; */

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Status', required: true })
  status: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  category: string;

  @Prop({ enum: ['Facil', 'Media', 'Difícil'], default: 'Media' })
  difficulty: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  /* @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date; */
}

export const TaskSchema = SchemaFactory.createForClass(Task);
