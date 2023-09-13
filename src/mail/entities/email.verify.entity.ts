import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmailVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;

  @Column()
  timestamp: Date;
}
