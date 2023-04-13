import { BaseEntity } from "@common/database";
import { HelperService } from "@common/helpers/helpers.utils";
import { AuthMethod, Roles } from "@common/types";
import { Exclude } from "class-transformer";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string;

	@Column({ unique: true, nullable: true })
	mobileNumber?: string;

	@Column({ unique: true, nullable: true })
	email?: string;

	@Exclude()
	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: Roles,
		default: Roles.EMPLOYEE,
	})
	role: Roles;

	@Column({
		type: "enum",
		enum: AuthMethod,
		default: AuthMethod.EMAIL_PASSWORD,
	})
	authMethod: AuthMethod;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		if (this.password) {
			this.password = await HelperService.hashString(this.password);
		}
	}
}
