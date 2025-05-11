import User from "../models/account.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra đầu vào
  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
  }

  try {
    // Tìm user theo email + lấy password để kiểm tra
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác!" });
    }

    // Tạo apiKey
    const randomString = crypto.randomUUID();
    const apiKey = `mern-${user._id}-${user.email}-${randomString}`;

    // Cập nhật apiKey mới cho user
    user.apiKey = apiKey;
    await user.save();

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      apiKey: apiKey,
    });

  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    return res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." });
  }
};
