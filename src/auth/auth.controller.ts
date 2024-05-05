import { Controller, Post, Body, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { RequestResetPasswordDto } from './dto/requestResetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { Auth } from '../common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { User } from 'src/user/schema/user.schema';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { IUserRequest } from 'src/common/interfaces/requestUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: RegisterDto) {
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('request-reset-password')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.authService.requestResetPassword(requestResetPasswordDto);
  }
  @Patch('reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }
  @Patch('change-password')
  @Auth(Role.User)
  changePassword(
    @Body() changePassword: ChangePasswordDto,
    @ActiveUser() user: IUserRequest,
  ) {
    return this.authService.changePassword(changePassword, user.email);
  }

  @Patch('change-email')
  @Auth(Role.User)
  changeEmail(
    @Body() changeEmail: ChangeEmailDto,
    @ActiveUser() user: IUserRequest,
  ) {
    return this.authService.changeEmail(changeEmail, user.email);
  }

  @Delete('delete-account')
  @Auth(Role.User)
  deleteAccount(
    @Body() deleteAccount: DeleteAccountDto,
    @ActiveUser() user: User,
  ) {
    return this.authService.deleteAccount(deleteAccount, user.email);
  }
}
