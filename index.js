const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const libros = require('./v1/routes/libro.route')


app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/v1/libro', libros)


async function main() {
    try {
        console.log('Database online');    
        app.listen(process.env.PORT || 3030,()=>{
                console.log("Server running in port " + process.env.PORT);
            })
    } catch (error) {
        throw new Error(error);    
    }
}
 
main();