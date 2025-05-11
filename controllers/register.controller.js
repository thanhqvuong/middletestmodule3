import User from "../models/account.js";

export const RegisterUser = async (req, res) => {
    const { userName, email, password } = req.body;

    // Kiểm tra thông tin đăng ký
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }

    try {
        // Kiểm tra sự tồn tại của username và email
        const [existingUsername, existingEmail] = await Promise.all([
            User.findOne({ userName }),
            User.findOne({ email }),
        ]);

        if (existingUsername) {
            return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
        }

        if (existingEmail) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // Tạo một đối tượng user mới, mật khẩu đã được mã hóa trong schema
        const newUser = new User({ userName, email, password });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        // Trả về thông báo thành công
        return res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        console.error("Lỗi Đăng Ký", err);
        return res.status(500).json({ message: "Lỗi server", error: err.message });
    }
};
