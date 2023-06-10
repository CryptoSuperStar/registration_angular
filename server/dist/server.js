"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const registrationFields_1 = __importDefault(require("./routes/registrationFields"));
const register_1 = __importDefault(require("./routes/register"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/registration-fields', registrationFields_1.default);
app.use('/api/register', register_1.default);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
