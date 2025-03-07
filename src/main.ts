import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	/* 	app.use(bodyParser.json({ limit: '5mb' })) */
	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('api')
	app.enableCors()
	await app.listen(process.env.PORT ?? 3000)
}

bootstrap().catch((err) => console.error(err))
