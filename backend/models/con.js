import mongoose from "mongoose"
// Connect to the MongoDB database
const conDb=(uri)=>{ mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(console.log("db connected !")).catch(e=>{console.log(e)})}
  

  export default conDb