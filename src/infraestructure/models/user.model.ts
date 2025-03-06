import mongoose, { Schema } from 'mongoose'

export interface IUser extends Document {
	username: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
			trim: true,
			minlength: [3, 'Username must be at least 3 characters long'],
			maxlength: [50, 'Username cannot exceed 50 characters']
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [6, 'Password must be at least 6 characters long']
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret.password
				return ret
			}
		},
		toObject: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret.password
				return ret
			}
		}
	}
)

export const User = mongoose.model<IUser>('User', UserSchema)
