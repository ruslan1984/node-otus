import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'character varying' })
  name: string;

  @Column({ type: 'character varying' })
  text: string;
}
