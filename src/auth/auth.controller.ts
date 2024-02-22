import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const user = await this.authService.createUser(name, email, password);
    return { user };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.authService.validateEmail(email, password);
    if (!user) {
      return { message: 'Correo o contraseña incorrectos' };
    }
    const token = await this.authService.generateJwtToken(user);
    return {
      message: 'Sesión iniciada correctamente',
      user: {
        email: user.email,
        name: user.name,
      },
      token: token.access_token,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout() {
    return { message: 'Sesión cerrada correctamente' };
  }
}
