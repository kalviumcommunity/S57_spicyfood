const mongoose= require('mongoose')

const data = new mongoose.Schema({

    Dish_Name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true

    },
    Ingridents:{
        type:String,
        require:true

    },
    Origin:{
        type:String,
        require:true
    },
    Image:{
        type:String,
        require:true
    },

});
const dataset = mongoose.model('dataset',data);
module.exports = dataset