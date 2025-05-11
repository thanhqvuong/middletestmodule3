import Post from "../models/post.js";

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ message: "Nội dung không được để trống." });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại." });
    }

    // Kiểm tra quyền sở hữu: userId trong post phải trùng user từ middleware
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Không có quyền cập nhật bài viết này." });
    }

    post.content = content;
    post.updatedAt = new Date();

    await post.save();

    return res.status(200).json({
      message: "Cập nhật bài viết thành công!",
      post,
    });
  } catch (err) {
    console.error("Lỗi khi cập nhật bài viết:", err);
    return res.status(500).json({ message: "Lỗi server khi cập nhật bài viết." });
  }
};
