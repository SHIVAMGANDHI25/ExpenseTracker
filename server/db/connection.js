const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI ||"mongodb+srv://gandhishivam122:1234@cluster1.kstgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1" )
        .then(db => {
            console.log("Database Connected");
            return db;
        }).catch(err => {
            console.log("Connection Error");
        })

module.exports = conn;