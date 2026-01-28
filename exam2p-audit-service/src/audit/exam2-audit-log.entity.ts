import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exam2_audit_log')
export class Exam2AuditLog {

  @PrimaryGeneratedColumn()
  logId: number;

  @Column({ nullable: true })
  exam2p_entity: string;

  @Column({ nullable: true })
  exam2p_recordId: number;

  @Column({ nullable: true })
  exam2p_action: string; // "CREATE" | "UPDATE" | "DELETE"

  @Column({ nullable: true })
  exam2p_user: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  exam2p_timestamp: Date;

  @Column({ nullable: true })
  exam2p_detail: string;
}
