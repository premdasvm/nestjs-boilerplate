import { BaseEntity } from "@common/database";
import { HelperService } from "@common/helpers/helpers.utils";
import { Exclude } from "class-transformer";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string;

	@Column({ unique: true })
	mobileNumber: string;

	@Column({ nullable: true })
	email?: string;

	@Exclude()
	@Column()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.password) {
			this.password = await HelperService.hashString(this.password);
		}
	}
}
