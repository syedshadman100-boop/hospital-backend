"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const hospital_module_1 = require("./modules/hospital/hospital.module");
const department_module_1 = require("./modules/department/department.module");
const doctor_module_1 = require("./modules/doctor/doctor.module");
const patient_module_1 = require("./modules/patient/patient.module");
const staff_module_1 = require("./modules/staff/staff.module");
const appointment_module_1 = require("./modules/appointment/appointment.module");
const queue_module_1 = require("./modules/queue/queue.module");
const billing_module_1 = require("./modules/billing/billing.module");
const medical_record_module_1 = require("./modules/medical-record/medical-record.module");
const lab_module_1 = require("./modules/lab/lab.module");
const pharmacy_module_1 = require("./modules/pharmacy/pharmacy.module");
const notification_module_1 = require("./modules/notification/notification.module");
const cms_module_1 = require("./modules/cms/cms.module");
const role_module_1 = require("./modules/role/role.module");
const user_module_1 = require("./modules/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            hospital_module_1.HospitalModule,
            department_module_1.DepartmentModule,
            doctor_module_1.DoctorModule,
            patient_module_1.PatientModule,
            staff_module_1.StaffModule,
            appointment_module_1.AppointmentModule,
            queue_module_1.QueueModule,
            billing_module_1.BillingModule,
            medical_record_module_1.MedicalRecordModule,
            lab_module_1.LabModule,
            pharmacy_module_1.PharmacyModule,
            notification_module_1.NotificationModule,
            cms_module_1.CmsModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map