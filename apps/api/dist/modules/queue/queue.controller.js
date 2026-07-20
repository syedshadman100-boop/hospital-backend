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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const queue_service_1 = require("./queue.service");
const queue_dto_1 = require("./dto/queue.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let QueueController = class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }
    getTodayQueue(doctorId, date) {
        const queueDate = date || new Date().toISOString().split('T')[0];
        return this.queueService.getOrCreateQueue(doctorId, queueDate);
    }
    async addToken(doctorId, dto, date) {
        const queueDate = date || new Date().toISOString().split('T')[0];
        const queue = await this.queueService.getOrCreateQueue(doctorId, queueDate);
        return this.queueService.addToken(queue.id, dto);
    }
    callNext(queueId) {
        return this.queueService.callNextToken(queueId);
    }
    completeToken(tokenId) {
        return this.queueService.completeToken(tokenId);
    }
    cancelToken(tokenId) {
        return this.queueService.cancelToken(tokenId);
    }
    getQueueStatus(queueId) {
        return this.queueService.getQueueStatus(queueId);
    }
    updateQueueStatus(queueId, body) {
        return this.queueService.updateQueueStatus(queueId, body.status);
    }
    getMyToken(queueId, patientId) {
        return this.queueService.getMyToken(patientId, queueId);
    }
};
exports.QueueController = QueueController;
__decorate([
    (0, common_1.Get)(':doctorId/today'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get or create today\'s queue for a doctor' }),
    (0, swagger_1.ApiQuery)({ name: 'date', type: String, required: false, description: 'YYYY-MM-DD, defaults to today' }),
    __param(0, (0, common_1.Param)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getTodayQueue", null);
__decorate([
    (0, common_1.Post)(':doctorId/token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist', 'Nurse'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add a token to the doctor\'s queue' }),
    __param(0, (0, common_1.Param)('doctorId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, queue_dto_1.AddTokenDto, String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "addToken", null);
__decorate([
    (0, common_1.Put)(':queueId/next'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Nurse'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Call next token in queue' }),
    __param(0, (0, common_1.Param)('queueId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "callNext", null);
__decorate([
    (0, common_1.Put)('token/:tokenId/complete'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Nurse'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete current token' }),
    __param(0, (0, common_1.Param)('tokenId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "completeToken", null);
__decorate([
    (0, common_1.Put)('token/:tokenId/cancel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist', 'Nurse'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a queue token' }),
    __param(0, (0, common_1.Param)('tokenId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "cancelToken", null);
__decorate([
    (0, common_1.Get)(':queueId/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get queue status with waiting info' }),
    __param(0, (0, common_1.Param)('queueId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getQueueStatus", null);
__decorate([
    (0, common_1.Put)(':queueId/status'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Super Admin', 'Hospital Admin', 'Doctor'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update queue status (running/break/completed/emergency)' }),
    __param(0, (0, common_1.Param)('queueId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "updateQueueStatus", null);
__decorate([
    (0, common_1.Get)(':queueId/my-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get patient\'s own token info in a queue' }),
    (0, swagger_1.ApiQuery)({ name: 'patientId', type: String, description: 'UUID of the patient' }),
    __param(0, (0, common_1.Param)('queueId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getMyToken", null);
exports.QueueController = QueueController = __decorate([
    (0, swagger_1.ApiTags)('Queue'),
    (0, common_1.Controller)('queue'),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
//# sourceMappingURL=queue.controller.js.map