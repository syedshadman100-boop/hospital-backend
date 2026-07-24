export declare class QueueEntity {
    id: string;
    hospitalId: string;
    doctorId: string;
    date: Date;
    status: string;
    currentTokenNumber: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class QueueTokenEntity {
    id: string;
    queueId: string;
    patientId: string;
    appointmentId?: string;
    tokenNumber: number;
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
}
