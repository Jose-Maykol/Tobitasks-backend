import mongoose from 'mongoose'

const connectDb = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/tobitasks')
	} catch (error) {
		process.exit(1)
	}
}

export default connectDb
