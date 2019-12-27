import * as mongoose from 'mongoose';

export const PermissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    method: { type: String, required: true },
    remark: String,
    status: { type: Number, default: 1 },
});
