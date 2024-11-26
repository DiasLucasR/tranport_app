import { RegisterDataProps } from "../types/AuthTypes";
import ApiService from "./ApiService"

export class AuthService {
    private static api = new ApiService();

   static login(login: string, password: string): Promise<any> {
        return this.api.post('auth/login', { login, password });
    }
    static register(data : RegisterDataProps): Promise<any> {
        return this.api.post('auth/register', data);
    }

}