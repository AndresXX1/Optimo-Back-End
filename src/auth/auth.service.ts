import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RequestResetPasswordDto } from './dto/requestResetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { v4 as uuidv4 } from 'uuid';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ChangeEmailDto } from './dto/changeEmail.dto';
import { DeleteAccountDto } from './dto/deleteAccount.dto';
import { MailerService } from 'src/mailer/mailer.service';

import { IRequestMail } from 'src/common/interfaces/requestMail.interface';
import { Status } from 'src/common/enums/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('email already exists');
    }

    await this.userService.createUser({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, 10),
    });
    return {
      email: registerDto.email,
      name: registerDto.name,
      phone: registerDto?.phone,
    };
  }
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    if (user.status === Status.Banned) {
      throw new UnauthorizedException(`User ${email} is banned`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`password is wrong`);
    }
    const payload = { email: user.email, role: user.role, name: user.name };

    return { access_Token: await this.jwtService.signAsync(payload) };
  }
  async requestResetPassword(requestResetPassword: RequestResetPasswordDto) {
    const { email } = requestResetPassword;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    user.resetPasswordToken = uuidv4();
    const mail: IRequestMail = {
      recipients: { name: user.name, address: email },
      subject: 'Reset Password',
      html: `<p>Hola,</p><p>Se le ha enviado un token para restablecer su contraseña. Por favor, siga las instrucciones para actualizar su contraseña. <strong>${user.resetPasswordToken}</strong></p><p>Si usted no solicitó este cambio, por favor ignore este correo electrónico.</p><p>Saludos,</p><p>El equipo de soporte</p>`,
    };
    this.mailerService.sendEmail(mail);
    return user.save();
  }

  async resetPassword(resetPassword: ResetPasswordDto) {
    const { password, resetPasswordToken } = resetPassword;

    const user = await this.userService.findUserByToken(resetPasswordToken);

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    const mail: IRequestMail = {
      recipients: { name: user.name, address: user.email },
      subject: 'Reset Password',

      html: ` <p>Hola,</p><p>Su contraseña ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte</p>`,
    };
    this.mailerService.sendEmail(mail);
    await user.save();
    return { message: 'success' };
  }

  async changePassword(changePassword: ChangePasswordDto, email: string) {
    const user = await this.userService.findByEmailWithPassword(email);
    const { newPassword, oldestPassword } = changePassword;
    if (await bcrypt.compare(oldestPassword, user.password)) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      const mail: IRequestMail = {
        recipients: { name: user.name, address: user.email },
        subject: 'Reset Password',

        html: ` <p>Hola,</p><p>Su contraseña ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte</p>`,
      };
      this.mailerService.sendEmail(mail);
      return { message: 'success' };
    } else {
      throw new BadRequestException('Old password is incorrect');
    }
  }

  async changeEmail(changeEmail: ChangeEmailDto, email: string) {
    const user = await this.userService.findByEmailWithPassword(email);
    const { newEmail, password } = changeEmail;
    if (await bcrypt.compare(password, user.password)) {
      user.email = newEmail;
      await user.save();
      const mail: IRequestMail = {
        recipients: { name: user.name, address: user.email },
        subject: 'Change Email',

        html: ` <p>Hola,</p><p>Su Email ha sido cambiada exitosamente. Si usted no realizó este cambio, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte</p>`,
      };
      this.mailerService.sendEmail(mail);
      return { message: 'success' };
    } else {
      throw new BadRequestException('password is incorrect');
    }
  }
  async deleteAccount(deleteAccount: DeleteAccountDto, email: string) {
    const user = await this.userService.findByEmailWithPassword(email);
    const { password } = deleteAccount;
    if (await bcrypt.compare(password, user.password)) {
      this.userService.deleteAccount(user.id);
      const mail: IRequestMail = {
        recipients: { name: user.name, address: user.email },
        subject: 'Delete Account',

        html: ` <p>Hola,</p><p>Su Cuenta ha sido eliminada exitosamente. Si usted no realizó esta acción, por favor contacte con nosotros inmediatamente.</p><p>Saludos,</p><p>El equipo de soporte</p>`,
      };
      this.mailerService.sendEmail(mail);
      return { message: 'success' };
    } else {
      throw new BadRequestException('password is incorrect');
    }
  }
}
