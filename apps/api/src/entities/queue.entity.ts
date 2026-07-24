import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('queues')
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'hospital_id' })
  hospitalId!: string;

  @Column({ name: 'doctor_id' })
  doctorId!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column({ default: 'active' })
  status!: string;

  @Column({ name: 'current_token_number', default: 0 })
  currentTokenNumber!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

@Entity('queue_tokens')
export class QueueTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'queue_id' })
  queueId!: string;

  @Column({ name: 'patient_id' })
  patientId!: string;

  @Column({ name: 'appointment_id', nullable: true })
  appointmentId?: string;

  @Column({ name: 'token_number' })
  tokenNumber!: number;

  @Column({ default: 'waiting' })
  status!: string;

  @Column({ default: 'normal' })
  priority!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
