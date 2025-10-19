const Post = require('../models/Post');
const cloudinary = require('../utils/cloudinary');

// Create post
exports.createPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const post = new Post({ title, body, tags: tags ? tags.split(',').map(t=>t.trim()) : [], author: req.user._id });

  // If file uploaded in req.file (multer) -> upload to cloudinary
  if (req.file) {
    const result = await cloudinary.uploader.upload_stream({ folder:'mern-blog' }, (error, result) => {
      // handled below (we'll use promise wrapper in real code)
    });
  }

  await post.save();
  res.status(201).json(post);
};

// Read all posts with pagination
exports.getPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Post.countDocuments();
  const posts = await Post.find()
    .populate('author','name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res.json({ posts, page, pages: Math.ceil(total/limit) });
};

// Get single post
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author','name email');
  if (!post) return res.status(404).json({ message:'Post not found' });
  res.json(post);
};

// Update post (only author or admin)
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message:'Not found' });
  if (!post.author.equals(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message:'Forbidden' });

  const { title, body, tags } = req.body;
  post.title = title ?? post.title;
  post.body = body ?? post.body;
  post.tags = tags ? tags.split(',').map(t=>t.trim()) : post.tags;

  await post.save();
  res.json(post);
};

// Delete post
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message:'Not found' });
  if (!post.author.equals(req.user._id) && req.user.role !== 'admin') return res.status(403).json({ message:'Forbidden' });

  // optionally delete image from Cloudinary
  await post.remove();
  res.json({ message:'Deleted' });
};
