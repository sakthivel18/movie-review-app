const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
    {
      name:{type:String},
      description: { type: String},
      user: {
       type: mongoose.Schema.Types.ObjectId,
       
       ref: 'User',
             },
        likedBy:{
            type: Map,
            of: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
     },
    {
      timestamps: true,
    })
  


const movieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },

    directorName:{
        type:String,
        required:[true,"directorName is required"]
    },

    genre:{
        type:String,
        required:[true,"genre is required"]
    },

    author:{
        type:Schema.Types.ObjectId,ref:'User'
      
    },
    
    rating:{
        type:Number,
        required:[false],
        default:0.0
    },

    description:{
        type:String,
        required:[true,"description of the movie is necessary"]
    },

    reviews:[reviewSchema],
    //array of objects ->author,comment(author's)    
    
}, {timestamps: true});


module.exports = mongoose.model('Movie', movieSchema);