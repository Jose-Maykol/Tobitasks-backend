import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateProjectDto {
	@IsString()
	@IsNotEmpty({ message: 'El nombre es requerido.' })
	@MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres.' })
	name: string

	@IsString()
	@IsNotEmpty({ message: 'La descripción es requerida.' })
	@MaxLength(255, {
		message: 'La descripción no debe superar los 255 caracteres.'
	})
	description: string
}
