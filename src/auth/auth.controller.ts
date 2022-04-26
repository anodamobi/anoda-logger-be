import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller({
    path: 'auth',
})

export class AuthController {
    constructor (
    private readonly authService: AuthService,
    ) {}

  @Get()
  @UseGuards(AuthGuard('api-key'))
    async googleAuthRedirect ()  {
        return this.authService.authenticate();
    }

}
