const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://siddhartha6916:OffPWKN5xhGfytYW@nasa-project.a021j1s.mongodb.net/nasa-db?retryWrites=true&w=majority'

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,  // Use IPv4, skip trying IPv6
}

mongoose.connection.once('open',()=>{
  console.log('Mongoose Database Connected'); 
})

mongoose.connection.on('error',(err)=>{
  console.error(err);
})

async function mongoConnect() {
  await mongoose.connect(MONGO_URL,options)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}