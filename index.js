const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const libros = require('./v1/routes/libro.route');
const users = require('./v1/routes/usuario.route');
const auth = require('./v1/routes/auth.route')



app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/v1/libro', libros)
app.use('/v1/user',users)
app.use('/v1/login', auth)


async function main() {
    try {   
        app.listen(process.env.PORT || 3000,()=>{
                console.log("Server running in port " + process.env.PORT);
            })
    } catch (error) {
        throw new Error(error);    
    }
}
 
main();
module.exports=app