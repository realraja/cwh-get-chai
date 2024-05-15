const { default: mongoose } = require("mongoose")

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log('database connection successful');
    } catch (error) {
        console.log('error===>',error);
    }
}

export default connectDB;