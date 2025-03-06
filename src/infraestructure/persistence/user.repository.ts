import { Model } from 'mongoose'
import { IUser, User } from '../models/user.model'

export class UserRepository {
	private userModel: Model<IUser>

	constructor(userModel: Model<IUser> = User) {
		this.userModel = userModel
	}

	async create(userData: Partial<IUser>): Promise<IUser> {
		try {
			const user = new this.userModel(userData)
			return await user.save()
		} catch (error) {
			throw new Error(`Error creating user: ${error.message}`)
		}
	}

	async findById(userId: string): Promise<IUser | null> {
		try {
			return await this.userModel.findById(userId).exec()
		} catch (error) {
			throw new Error(`Error finding user by ID: ${error.message}`)
		}
	}

	async findByEmail(email: string): Promise<IUser | null> {
		try {
			return await this.userModel.findOne({ email }).exec()
		} catch (error) {
			throw new Error(`Error finding user by email: ${error.message}`)
		}
	}

	async update(
		userId: string,
		updateData: Partial<IUser>
	): Promise<IUser | null> {
		try {
			return await this.userModel
				.findByIdAndUpdate(userId, updateData, {
					new: true,
					runValidators: true
				})
				.exec()
		} catch (error) {
			throw new Error(`Error updating user: ${error.message}`)
		}
	}

	async delete(userId: string): Promise<IUser | null> {
		try {
			return await this.userModel.findByIdAndDelete(userId).exec()
		} catch (error) {
			throw new Error(`Error deleting user: ${error.message}`)
		}
	}

	async findAll(page: number = 1, limit: number = 10): Promise<IUser[]> {
		try {
			const skip = (page - 1) * limit
			return await this.userModel.find().skip(skip).limit(limit).exec()
		} catch (error) {
			throw new Error(`Error fetching users: ${error.message}`)
		}
	}
}
