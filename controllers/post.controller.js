import Post from "../models/post.js"; // Đảm bảo import đúng

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user; // Có từ middleware verifyApiKey

    if (!user || !user._id) {
      return res.status(401).json({ message: "Người dùng không hợp lệ." });
    }

    if (!content) {
      return res.status(400).json({ message: "Nội dung không được để trống." });
    }

    const newPost = new Post({
      userId: user._id,
      content: content,
    });

    await newPost.save(); // 👈 nhớ await

    res.status(201).json({
      message: "Tạo bài viết thành công!",
      post: newPost,
    });
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error); // 👈 debug ở đây
    res.status(500).json({ message: "Lỗi server khi tạo bài viết." });
  }
};
