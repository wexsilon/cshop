import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  emailVerfied: boolean;

  @Column({ default: false })
  isAdmin: boolean;
}
