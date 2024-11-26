import {AxiosResponse} from "axios";
import $api from "../http/api";
import {RegisterInputDto} from "../components/assets/utils/RegisterInputDto";
import {LoginInputDto} from "../components/assets/utils/LoginInputDto";

export default class AuthService{
    static async register(registerInputDto: RegisterInputDto) : Promise<AxiosResponse<void>>{
        return $api.post('/auth/register', registerInputDto);
    }

    static async login(loginInputDto: LoginInputDto): Promise<AxiosResponse<string>>{
        return $api.post('/auth/login', loginInputDto)
    }

    static async checkUser(token: string): Promise<AxiosResponse<boolean>>{
        return $api.post(`/auth/check?token=${token}`);
    }
}