import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt: Date;

    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

    @Column({ type: 'varchar', length: 300 })
    lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}