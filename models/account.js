import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto"; // Để tạo apiKey

const usersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Vui lòng nhập email hợp lệ'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Chọn password khi cần so sánh
  },
  apiKey: {
    type: String,
    default: '', // Lưu apiKey cho mỗi người dùng
  }
}, { timestamps: true });

// Hash password trước khi lưu vào DB
usersSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Phương thức tạo apiKey cho người dùng
usersSchema.methods.generateApiKey = function() {
  const randomString = crypto.randomUUID();  // Tạo chuỗi ngẫu nhiên
  this.apiKey = `mern-${this._id}-${this.email}-${randomString}`;
};

// Tạo apiKey cho người dùng khi tạo mới
usersSchema.pre("save", function(next) {
  if (!this.apiKey) {  // Nếu chưa có apiKey thì tạo
    this.generateApiKey();
  }
  next();
});

const User = mongoose.model('User', usersSchema);
export default User;
