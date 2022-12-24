"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_1 = require("../middlewares/auth");
const admin_route_1 = __importDefault(require("./admin.route"));
function route(app) {
    app.use("/auth", auth_route_1.default);
    app.use(auth_1.checkAuth);
    app.use("/user", user_route_1.default);
    app.use('/admin', admin_route_1.default);
    app.use((err, req, res, next) => {
        console.log(err.message);
        res.status(500).render('error/500');
    });
}
exports.default = route;
//# sourceMappingURL=index.route.js.map