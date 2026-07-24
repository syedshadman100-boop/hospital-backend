import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(filters: UserFilterDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getStats(user: any): Promise<{
        total: number;
        byRole: {
            roleId: any;
            roleName: any;
            count: any;
        }[];
    }>;
    findOne(id: string): Promise<any>;
    create(dto: CreateUserDto): Promise<any>;
    update(id: string, dto: UpdateUserDto): Promise<any>;
    deactivate(id: string): Promise<any>;
}
