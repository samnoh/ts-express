import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
    name: string;
    userId: string;
    email: string;
    password: string;
};

const userSchema = new mongoose.Schema(
    {
        name: String,
        userId: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
