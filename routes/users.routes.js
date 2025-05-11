import express from 'express';
import { RegisterUser } from '../controllers/register.controller.js'; // Đảm bảo rằng đường dẫn đúng
import { LoginUser } from '../controllers/login.controller.js';

const UsersRouter = express.Router();

// Định nghĩa route cho đăng ký người dùng
UsersRouter.post('/register', RegisterUser); // Sử dụng controller RegisterUser
UsersRouter.post('/login' , LoginUser)

export default UsersRouter;
