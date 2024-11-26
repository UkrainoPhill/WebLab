import {ApiProperty} from "@nestjs/swagger";

export class LoginInputDto{
    @ApiProperty({ description: 'Unique user name', example: 'SupaNigga' })
    username: string;
    @ApiProperty({ description: 'User password', example: 'GigaNigga' })
    password: string;
}

export class RegisterInputDto{
    @ApiProperty({ description: 'Unique user name', example: 'SupaNigga' })
    username: string;
    @ApiProperty({ description: 'User password', example: 'GigaNigga' })
    password: string;
    @ApiProperty({ description: 'User email', example: 'GigaNigga@example.com' })
    email: string;
}