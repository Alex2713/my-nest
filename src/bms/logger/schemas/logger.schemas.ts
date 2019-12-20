import * as mongoose from 'mongoose';

export const LoggerSchema = new mongoose.Schema({
    _id: String,
    username: String,
    userid: String,
    method: String,
    url: String,
});
