// comment.service.js

import Comment from '../models/comment.model.js';
import Question from '../models/question.model.js';
import User from '../models/user.model.js';

/**
 * 获取题目评论列表
 * @param {string} questionId - 题目ID
 * @param {Object} options - 查询选项
 * @param {number} options.current - 页码，默认为1
 * @param {number} options.pageSize - 每页数量，默认为10
 * @param {string} options.sortBy - 排序字段，默认为createdAt
 * @param {string} options.sortOrder - 排序方式，默认为desc
 * @returns {Promise<Object>} - 包含评论列表和总数的对象
 */
export const getQuestionComments = async (questionId, options = {}) => {
  const {
    current = 1,
    pageSize = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  // 验证题目是否存在
  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error('题目不存在');
  }

  // 构建查询条件 - 只获取顶级评论（parentId为null）
  const query = { 
    questionId, 
    status: 'active',
    parentId: null 
  };

  // 构建排序条件
  const sort = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
  // 置顶评论优先显示
  if (sortBy !== 'isTop') {
    sort.isTop = -1; // 置顶的先显示
  }

  // 计算分页
  const skip = (current - 1) * pageSize;

  // 执行查询
  const [comments, total] = await Promise.all([
    Comment.find(query)
      .populate('userId', 'nickname avatar')
      .populate({
        path: 'parentId',
        populate: {
          path: 'userId',
          select: 'nickname'
        }
      })
      .sort(sort)
      .limit(pageSize)
      .skip(skip)
      .select('-__v -ipAddress -userAgent'),
    Comment.countDocuments(query),
  ]);

  // 获取每个评论的回复
  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      const replies = await Comment.find({
        parentId: comment._id,
        status: 'active'
      })
        .populate('userId', 'nickname avatar')
        .sort({ createdAt: 1 })
        .limit(5) // 限制显示的回复数量
        .select('-__v -ipAddress -userAgent');

      return {
        ...comment.toObject(),
        replies,
        replyCount: await Comment.countDocuments({
          parentId: comment._id,
          status: 'active'
        })
      };
    })
  );

  return {
    list: commentsWithReplies,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

/**
 * 创建评论
 * @param {string} questionId - 题目ID
 * @param {string} userId - 用户ID
 * @param {Object} commentData - 评论数据
 * @param {string} commentData.content - 评论内容
 * @param {string} [commentData.parentId] - 父评论ID（回复时使用）
 * @param {string} [commentData.ipAddress] - IP地址
 * @param {string} [commentData.userAgent] - 用户代理
 * @returns {Promise<Object>} - 创建的评论对象
 */
export const createComment = async (questionId, userId, commentData) => {
  // 验证题目是否存在
  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error('题目不存在');
  }

  // 验证用户是否存在
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('用户不存在');
  }

  // 如果是回复，验证父评论是否存在且属于同一题目
  if (commentData.parentId) {
    const parentComment = await Comment.findById(commentData.parentId);
    if (!parentComment) {
      throw new Error('父评论不存在');
    }
    if (parentComment.questionId.toString() !== questionId) {
      throw new Error('父评论不属于该题目');
    }
  }

  try {
    const newComment = new Comment({
      content: commentData.content,
      questionId,
      userId,
      parentId: commentData.parentId || null,
      ipAddress: commentData.ipAddress,
      userAgent: commentData.userAgent,
    });

    await newComment.save();
    
    // 返回带用户信息的评论
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'nickname avatar')
      .select('-__v -ipAddress -userAgent');

    return populatedComment;
  } catch (error) {
    throw error;
  }
};

/**
 * 更新评论
 * @param {string} commentId - 评论ID
 * @param {string} userId - 用户ID
 * @param {Object} updateData - 更新数据
 * @param {string} updateData.content - 新的评论内容
 * @returns {Promise<Object>} - 更新后的评论对象
 */
export const updateComment = async (commentId, userId, updateData) => {
  // 检查评论是否存在
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('评论不存在');
  }

  // 检查是否是评论作者
  if (comment.userId.toString() !== userId) {
    throw new Error('只能修改自己的评论');
  }

  // 检查评论状态
  if (comment.status !== 'active') {
    throw new Error('该评论无法修改');
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content: updateData.content },
      { new: true, runValidators: true }
    )
      .populate('userId', 'nickname avatar')
      .select('-__v -ipAddress -userAgent');

    return updatedComment;
  } catch (error) {
    throw error;
  }
};

/**
 * 删除评论
 * @param {string} commentId - 评论ID
 * @param {string} userId - 用户ID
 * @param {boolean} isAdmin - 是否是管理员
 * @returns {Promise<boolean>} - 删除成功返回true
 */
export const deleteComment = async (commentId, userId, isAdmin = false) => {
  // 检查评论是否存在
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('评论不存在');
  }

  // 检查权限：评论作者或管理员可以删除
  if (comment.userId.toString() !== userId && !isAdmin) {
    throw new Error('没有权限删除该评论');
  }

  try {
    // 软删除：将状态设为deleted
    await Comment.findByIdAndUpdate(commentId, { status: 'deleted' });
    
    // 同时删除该评论下的所有回复
    await Comment.updateMany(
      { parentId: commentId },
      { status: 'deleted' }
    );

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * 点赞评论
 * @param {string} commentId - 评论ID
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} - 点赞结果
 */
export const likeComment = async (commentId, userId) => {
  // 检查评论是否存在
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('评论不存在');
  }

  if (comment.status !== 'active') {
    throw new Error('该评论无法点赞');
  }

  try {
    // 这里可以扩展为记录用户点赞历史，现在简单处理
    // 实际项目中建议创建一个UserCommentLike表来记录用户点赞关系
    
    // 增加点赞数
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    return {
      liked: true,
      likes: updatedComment.likes
    };
  } catch (error) {
    throw error;
  }
};

/**
 * 踩评论
 * @param {string} commentId - 评论ID
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} - 踩的结果
 */
export const dislikeComment = async (commentId, userId) => {
  // 检查评论是否存在
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('评论不存在');
  }

  if (comment.status !== 'active') {
    throw new Error('该评论无法踩');
  }

  try {
    // 增加踩数
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    return {
      disliked: true,
      dislikes: updatedComment.dislikes
    };
  } catch (error) {
    throw error;
  }
};

/**
 * 置顶/取消置顶评论
 * @param {string} commentId - 评论ID
 * @param {boolean} isTop - 是否置顶
 * @returns {Promise<Object>} - 更新后的评论对象
 */
export const topComment = async (commentId, isTop) => {
  // 检查评论是否存在
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('评论不存在');
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { isTop },
      { new: true }
    )
      .populate('userId', 'nickname avatar')
      .select('-__v -ipAddress -userAgent');

    return updatedComment;
  } catch (error) {
    throw error;
  }
};

/**
 * 获取评论回复列表
 * @param {string} parentId - 父评论ID
 * @param {Object} options - 查询选项
 * @returns {Promise<Object>} - 回复列表
 */
export const getCommentReplies = async (parentId, options = {}) => {
  const {
    current = 1,
    pageSize = 10,
  } = options;

  const query = { 
    parentId, 
    status: 'active' 
  };

  const skip = (current - 1) * pageSize;

  const [replies, total] = await Promise.all([
    Comment.find(query)
      .populate('userId', 'nickname avatar')
      .sort({ createdAt: 1 })
      .limit(pageSize)
      .skip(skip)
      .select('-__v -ipAddress -userAgent'),
    Comment.countDocuments(query),
  ]);

  return {
    list: replies,
    pagination: {
      total,
      current,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
};

export default {
  getQuestionComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
  topComment,
  getCommentReplies,
};
