import { Post } from '../database/models/Post.js';
import { Like } from '../database/models/Like.js';
import { Comment } from '../database/models/Comment.js';
import { User } from "../database/models/User.js";

export const createPost = async (req, res) => {
    const content = req.body.content;
    const user_id = req.userId;

    try {
        const newPost = await Post.create({ content, user_id });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: Like, as: 'likes' },
                { model: Comment, as: 'comments' },
                { model: User, as: 'user' }
            ]
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const likePost = async (req, res) => {
    const post_id = req.params.postId;
    const user_id = req.userId;

    try {
        const existingLike = await Like.findOne({ where: { post_id, user_id } });
        if (existingLike) {
            await Like.destroy({ where: { post_id, user_id } });
            return res.status(200).json({ message: 'Like removed' });
          }

        const newLike = await Like.create({ post_id, user_id });
        res.status(201).json(newLike);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getLikes = async (req, res) => {
    const post_id = req.params.postId;
  
    try {
      const likes = await Like.count({ where: { post_id } });
      res.status(200).json({ likes });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

export const commentPost = async (req, res) => {
    const post_id = req.params.postId;
    const content  = req.body.content;
    const user_id = req.userId;

    try {
        const newComment = await Comment.create({ content, post_id, user_id });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getComments = async (req, res) => {
    const post_id = req.params.postId;

    try {
        const comments = await Comment.findAll({ 
            where: { post_id },
            include: [
                { model: User, as: 'user', attributes: ['id', 'nickname'] }
            ]
        });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}