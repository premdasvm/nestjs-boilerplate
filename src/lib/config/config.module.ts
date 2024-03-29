import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import {
	app,
	appConfigValidationSchema,
	database,
	databaseConfigValidationSchema,
	facebookOauth,
	googleOauth,
	jwt,
	jwtConfigValidationSchema,
} from "./configs";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [
				app,
				database,
				jwt,
				googleOauth,
				facebookOauth,
			],
			cache: true,
			isGlobal: true,
			expandVariables: true,
			validationSchema: Joi.object({
				...appConfigValidationSchema,
				...databaseConfigValidationSchema,
				...jwtConfigValidationSchema,
			}),
			validationOptions: {
				abortEarly: true,
				debug: true,
			},
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class NestConfigModule { }
