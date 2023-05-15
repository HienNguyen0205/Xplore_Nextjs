import mongoose from 'mongoose';

const connectdb = async () => mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://conghien007pro:Conghien007pro.@web.ul4ej4c.mongodb.net/Xplore?retryWrites=true&w=majority');

export default connectdb;