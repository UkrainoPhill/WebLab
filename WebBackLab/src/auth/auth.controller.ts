import {Body, Controller, HttpException, Inject, Post, Query} from '@nestjs/common';
import {ApiBody, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {LoginInputDto, RegisterInputDto} from './dto/auth.dto';
import {AuthService} from './auth.service';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {InjectRepository} from "@nestjs/typeorm";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService)
        private authService: AuthService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    @Post('login')
    @ApiBody({ type: LoginInputDto })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 404, description: 'No User' })
    async login(@Body() loginInputDto: LoginInputDto) {
        const user = await this.authService.validateUser(loginInputDto);
        if (!user) throw new HttpException('No User', 404);
        return user;
    }

    @Post('register')
    @ApiBody({ type: RegisterInputDto })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'User Exists' })
    async register(@Body() registerInputDto: RegisterInputDto) {
        if (await this.userRepository.findOne({ where: { username: registerInputDto.username, email: registerInputDto.email } })) {
            throw new HttpException('User Exists', 400);
        }
        await this.authService.registerUser(registerInputDto);
        return;
    }

    @Post('check')
    @ApiQuery({ type: String, name: 'token' })
    async checkUser(@Query('token') token : string | null): Promise<boolean>{
        return await this.authService.checkUser(token);
    }
}