const mongoose = require('mongoose');

const connectDBAndListen = async (app) => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB, Server running on port " + process.env.PORT)
        })
    } catch (error) {
        console.log(error);
    }   
}

module.exports = connectDBAndListen;