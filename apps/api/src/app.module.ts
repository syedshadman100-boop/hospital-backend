import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { HospitalModule } from './modules/hospital/hospital.module';
import { DepartmentModule } from './modules/department/department.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { StaffModule } from './modules/staff/staff.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { QueueModule } from './modules/queue/queue.module';
import { BillingModule } from './modules/billing/billing.module';
import { MedicalRecordModule } from './modules/medical-record/medical-record.module';
import { LabModule } from './modules/lab/lab.module';
import { PharmacyModule } from './modules/pharmacy/pharmacy.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CmsModule } from './modules/cms/cms.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    HospitalModule,
    DepartmentModule,
    DoctorModule,
    PatientModule,
    StaffModule,
    AppointmentModule,
    QueueModule,
    BillingModule,
    MedicalRecordModule,
    LabModule,
    PharmacyModule,
    NotificationModule,
    CmsModule,
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
