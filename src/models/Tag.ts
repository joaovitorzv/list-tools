import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from 'typeorm';

import Tool from './Tool';

@Entity('Tags')
class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Tool, tool => tool.tag)
  @JoinColumn({
    name: 'tag_id',
    referencedColumnName: 'tag_id'
  })
  tools: Tool[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;