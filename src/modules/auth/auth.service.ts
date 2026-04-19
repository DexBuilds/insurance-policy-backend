import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    let role = 'user';
    
    if (loginDto.email === 'admin@insurance.com' && loginDto.password === 'admin123') {
        role = 'admin';
    } else if (loginDto.email === 'supervisor@insurance.com' && loginDto.password === 'super123') {
        role = 'supervisor';
    } else if (loginDto.email !== 'user@insurance.com' || loginDto.password !== 'user123') {
       throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: loginDto.email, role: role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}