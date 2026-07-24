"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueTokenEntity = exports.QueueEntity = void 0;
const typeorm_1 = require("typeorm");
let QueueEntity = class QueueEntity {
};
exports.QueueEntity = QueueEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QueueEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hospital_id' }),
    __metadata("design:type", String)
], QueueEntity.prototype, "hospitalId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'doctor_id' }),
    __metadata("design:type", String)
], QueueEntity.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], QueueEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], QueueEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_token_number', default: 0 }),
    __metadata("design:type", Number)
], QueueEntity.prototype, "currentTokenNumber", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QueueEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], QueueEntity.prototype, "updatedAt", void 0);
exports.QueueEntity = QueueEntity = __decorate([
    (0, typeorm_1.Entity)('queues')
], QueueEntity);
let QueueTokenEntity = class QueueTokenEntity {
};
exports.QueueTokenEntity = QueueTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'queue_id' }),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "queueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_id' }),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "patientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appointment_id', nullable: true }),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_number' }),
    __metadata("design:type", Number)
], QueueTokenEntity.prototype, "tokenNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'waiting' }),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'normal' }),
    __metadata("design:type", String)
], QueueTokenEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], QueueTokenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], QueueTokenEntity.prototype, "updatedAt", void 0);
exports.QueueTokenEntity = QueueTokenEntity = __decorate([
    (0, typeorm_1.Entity)('queue_tokens')
], QueueTokenEntity);
//# sourceMappingURL=queue.entity.js.map