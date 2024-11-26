import { Injectable } from '@nestjs/common';
import { LoginInputDto, RegisterInputDto } from './dto/auth.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginInputDto: LoginInputDto) {
    const findUser = await this.userRepository.findOne({
      where: { username: loginInputDto.username },
    });
    if (!findUser) return null;
    if (await bcrypt.compare(loginInputDto.password, findUser.hashPassword)) {
      const { hashPassword, ...user } = findUser;
      return this.jwtService.sign(user);
    }
    return null;
  }

  async registerUser(registerInputDto: RegisterInputDto): Promise<UserEntity> {
    const hashPassword = await bcrypt.hash(registerInputDto.password, 10);
    const user: UserEntity = {
      id: uuidv4(),
      username: registerInputDto.username,
      email: registerInputDto.email,
      hashPassword: hashPassword,
      carts: [],
    };
    return this.userRepository.save(user);
  }

  async checkUser(token: string | null): Promise<boolean> {
    if (!token) {
      return false;
    }
    const data = this.jwtService.decode(token) as {
      email: string;
      username: string;
    } | null;
    if (!data || !data.username) {
      return false;
    }
    const { username } = data;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return !!user;
  }

  unpackJwt(token: string) {
    return this.jwtService.decode(token);
  }
}
