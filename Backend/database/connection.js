const mongose = require('mongoose')

const createMongoConnection = () =>{
    mongose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
}
const getMongoConnection = () =>{
    return mongose.connection;
}
const onError = (err) =>{
    console.log("Error while connecting to the DATABASE");
}
const onSuccess = () => {
    console.log("database connection is established");
}
module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}