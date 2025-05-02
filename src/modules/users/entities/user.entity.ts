import { Entity, Column, BeforeInsert, Index } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '@modules/users/enums/user-role.enum';

@Entity('users')
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 100 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Exclude()
    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin?: Date;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    // Helper method to get full name
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
} 