import Post from "../models/post.js";
export const createPost = async (req , res) => {
    const {content} = req.body;
    const {userId} = req.user;
    if(!content){
        return res.status(400).json({ message: "Nội dung bài viết là bắt buộc!" });
    }
    try{
        const newPost = new Post ({
            userId ,
            content,
        });
        await newPost.save();
        return res.status(201).json({ message: "Bài viết đã được tạo thành công!", post: newPost });
    }catch(err){
        console.error("Lỗi khi tạo bài viết:", err);
        return res.status(500).json({ message: "Lỗi server khi tạo bài viết." });
    }
}