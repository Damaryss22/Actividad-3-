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
exports.Exam2AuditLog = void 0;
const typeorm_1 = require("typeorm");
let Exam2AuditLog = class Exam2AuditLog {
    logId;
    exam2p_entity;
    exam2p_recordId;
    exam2p_action;
    exam2p_user;
    exam2p_timestamp;
    exam2p_detail;
};
exports.Exam2AuditLog = Exam2AuditLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exam2AuditLog.prototype, "logId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exam2AuditLog.prototype, "exam2p_entity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Exam2AuditLog.prototype, "exam2p_recordId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exam2AuditLog.prototype, "exam2p_action", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exam2AuditLog.prototype, "exam2p_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Exam2AuditLog.prototype, "exam2p_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Exam2AuditLog.prototype, "exam2p_detail", void 0);
exports.Exam2AuditLog = Exam2AuditLog = __decorate([
    (0, typeorm_1.Entity)('exam2_audit_log')
], Exam2AuditLog);
//# sourceMappingURL=exam2-audit-log.entity.js.map