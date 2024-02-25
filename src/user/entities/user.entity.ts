// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm'
// import { v4 as uuidV4 } from 'uuid'

// @Entity({ name: 'users' })
// export class UserEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string

//   @Column({ name: 'name', nullable: false })
//   name: string

//   @Column({ name: 'cpf' })
//   cpf: string

//   @Column({ name: 'email', nullable: false })
//   email: string

//   @Column({ name: 'date_birth' })
//   dateBirth: string

//   @Column({ name: 'password', nullable: false })
//   password: string

//   @Column({ name: 'phone' })
//   phone: string

//   @Column({ name: 'type_user', nullable: false })
//   typeUser: number

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date

//   @UpdateDateColumn({ name: 'updated_at' })
//   updatedAt: Date

//   constructor() {
//     if (!this.id) {
//       this.id = uuidV4()
//     }
//   }
// }
