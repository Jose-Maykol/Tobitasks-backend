import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from './category.schema';
import { Status } from './status.schema';

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

  @Prop({ required: true })
  description: string;

  @Prop({ type: Status, required: true })
  status: Status;

  @Prop({ type: Category, required: true })
  category: Category;

  @Prop({ enum: ['Facil', 'Media', 'Difícil'], required: true })
  difficulty: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
