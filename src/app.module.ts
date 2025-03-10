import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProjectsModule } from './modules/v1/projects/projects.module'
import { RouterModule } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URI')
			})
		}),
		RouterModule.register([
			{
				path: 'v1',
				children: [
					{
						module: ProjectsModule,
						path: 'projects'
					}
				]
			}
		]),
		ProjectsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
