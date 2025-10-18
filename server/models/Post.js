const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required:true },
  body: { type: String, required:true },
  excerpt: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true },
  coverImage: {
    url: String,
    public_id: String, // if using Cloudinary
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
}, { timestamps:true });

module.exports = mongoose.model('Post', PostSchema);
