export declare class UserEntity {
    id: string;
    hospitalId?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    isActive: boolean;
    isSuperAdmin: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
