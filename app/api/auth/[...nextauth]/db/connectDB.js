const { default: mongoose } = require("mongoose")

const connectDB = async() =>{
    try {
        const {connection} = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'getMeChaiApp'
        });
        console.log('database connection successful',connection.host);
    } catch (error) {
        console.log('error===>',error);
    }
}

export default connectDB;