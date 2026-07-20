export declare class CreateAppointmentDto {
    patientId: string;
    doctorId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    consultationType?: string;
    reason?: string;
}
export declare class UpdateAppointmentDto {
    status?: string;
    cancelReason?: string;
    notes?: string;
}
export declare class AppointmentFilterDto {
    doctorId?: string;
    patientId?: string;
    status?: string;
    consultationType?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}
export declare class PublicCreateAppointmentDto {
    doctorId: string;
    appointmentDate: string;
    timeSlot: string;
    fullName: string;
    phone: string;
    email: string;
    age: number;
    gender: string;
    reason?: string;
}
