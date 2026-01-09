"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const usuario_model_1 = require("./entities/usuario.model");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [usuario_model_1.User],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map