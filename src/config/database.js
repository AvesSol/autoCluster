const mongoose = require("mongoose");

exports.connectDB  = () =>{
   mongoose.connect(`mongodb+srv://avessolanki043:ea8Qbd6ls6Zw6N9Q@myautocluster.v2e7uem.mongodb.net/MyautoCluster`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(()=>{console.log("Successfully Connected ")}).catch((e)=>{console.log("Error While Connecting to Database ", e)});
};


// module.exports = connectDB; 