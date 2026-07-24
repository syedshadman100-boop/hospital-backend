import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    login(dto: LoginDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    refresh(dto: RefreshTokenDto): Promise<import("./dto/auth.dto").TokenResponseDto>;
    getProfile(req: any): Promise<any>;
}
