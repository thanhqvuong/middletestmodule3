import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Tham chiếu đến model User
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Tạo chỉ mục cho userId nếu muốn tối ưu hóa tìm kiếm
postSchema.index({ userId: 1 });

const Post = mongoose.model("Post", postSchema);
export default Post;
