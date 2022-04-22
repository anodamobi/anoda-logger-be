import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TUserAuth } from '../interfaces/interfaces';

@Controller({
    path: 'auth',
})

export class AuthController {
    constructor (
    private readonly authService: AuthService,
    ) {}

  @Get('/google/login')
  @UseGuards(AuthGuard('google'))
    async googleLogin (@Req() req)  {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect (@Req() req): Promise<TUserAuth>  {
      return this.authService.googleLogin(req.user, req.ip);
  }

}
