import {Schema, Types, model, models} from 'mongoose';


interface IAccount {
    userid: Types.ObjectId;
    name: string;
    image?: string;
    password?: string;
    provider: string;
    providerAccountId: string;
}

const accountSchema = new Schema<IAccount>({
    userid:{type:Schema.Types.ObjectId, ref:'User', required:true},
    name:{type:String, required:true},
    image:{type:String},
    password:{type:String},
    provider:{type:String, required:true},
    providerAccountId:{type:String, required:true},
},
    {timestamps:true}
);

const Account = models?.account || model<IAccount>('account', accountSchema);

export default Account;