import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PolicyStatus {
    PENDING = 'PENDING',
    VALIDATED = 'VALIDATED',
    ISSUED = 'ISSUED',
    REJECTED = 'REJECTED',
}

@Entity('policy_requests')
export class PolicyRequest {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    folio!: string;

    @Column()
    customerName!: string;

    @Column()
    customerEmail!: string;

    @Column()
    product!: string;

    @Column('decimal', { precision: 12, scale: 2 })
    insuredAmount!: number;

    @Column({
        type: 'varchar',
        length: 20,
        default: PolicyStatus.PENDING,
    })

    status!: PolicyStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}