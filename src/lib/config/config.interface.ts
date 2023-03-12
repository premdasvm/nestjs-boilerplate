import { ConfigType } from "@nestjs/config";
import { app, database, jwt } from "./configs";

export interface IConfig {
	app: ConfigType<typeof app>;
	database: ConfigType<typeof database>;
	jwt: ConfigType<typeof jwt>;
}
