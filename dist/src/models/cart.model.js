"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    items: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
//# sourceMappingURL=cart.model.js.map