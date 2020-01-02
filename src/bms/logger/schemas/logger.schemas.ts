import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
// mongoose.set('useCreateIndex', true);
export const LoggerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    method: { type: String, required: true },
    url: { type: String, required: true },
});
