export declare class CreateQueueDto {
    doctorId: string;
}
export declare class AddTokenDto {
    patientId: string;
    appointmentId?: string;
    priority?: string;
}
export declare class UpdateTokenDto {
    status: string;
}
