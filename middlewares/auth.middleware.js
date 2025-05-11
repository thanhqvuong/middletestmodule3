import User from "../models/account.js";

export const verifyApiKey = async (req, res, next) => {
  const authKey = req.query.apiKey; // Lấy apiKey từ query

  if (!authKey) {
    return res.status(401).json({ message: "Thiếu apiKey trong query" });
  }

  console.log("authKey received:", authKey);

  // Phân tích authKey: mern-$userId$-$email$-$randomstring...
  const parts = authKey.split("-");
  console.log("Parts:", parts);

  if (parts.length < 4 || parts[0] !== "mern") {
    return res.status(401).json({ message: "apiKey không hợp lệ" });
  }

  const userId = parts[1];
  const email = parts[2];
  
  // Lấy phần còn lại làm randomString
  const randomStringFromApiKey = parts.slice(3).join("-");

  console.log("userId:", userId, "email:", email, "randomStringFromApiKey:", randomStringFromApiKey);

  try {
    // Tìm người dùng bằng userId và email
    const authenticatedUser = await User.findOne({ _id: userId, email });

    if (!authenticatedUser) {
      console.log("Không tìm thấy người dùng!");
      return res.status(403).json({ message: "Không xác thực được người dùng" });
    }

    // Tạo apiKey từ thông tin người dùng
    const generatedApiKey = `mern-${authenticatedUser._id}-${authenticatedUser.email}-${authenticatedUser.apiKey}`;

    console.log("generatedApiKey:", generatedApiKey);

    // Kiểm tra rằng generatedApiKey và authKey khớp nhau
    if (generatedApiKey !== authKey) {
      console.log("apiKey không hợp lệ");
      return res.status(403).json({ message: "apiKey không hợp lệ" });
    }

    // Lưu thông tin người dùng vào request để sử dụng ở controller
    req.user = authenticatedUser;
    next(); // Chuyển tiếp request cho middleware/controller kế tiếp
  } catch (err) {
    console.error("Lỗi xác thực apiKey:", err);
    return res.status(500).json({ message: "Lỗi server khi xác thực apiKey" });
  }
};
