import mongoose from "mongoose";

// describe properties required to create user
interface UserParams {
    email: string;
    password: string;
}

// properties of the user model
interface UserModel extends mongoose.Model<UserDocument> {
    register(params: UserParams): UserDocument;
}

// propeties of user document
interface UserDocument extends mongoose.Document<any> {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

//we need to do this to help typescript understand the user model, so we can use this function to create user now
userSchema.statics.register = (params: UserParams) => {
    return new User(params);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
