const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    try {
        // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Kiểm tra xem username và password có bị trống không
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username and password are required');
        }

        const user = new User({
            userId: req.body.username + req.body.password,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role
        });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};


const login = async (req, res) => {
    try {
        // Kiểm tra xem username và password có được cung cấp hay không
        if (!req.body.username || !req.body.password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send('User not found');
        }

        if (req.body.password === user.password) {
            const accessToken = jwt.sign({ username: user.username }, 'secretkey');
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).send('Password incorrect');
        }
    } catch (error) {
        res.status(500).send('Error during login');
    }
};


const getUser = async (req, res) => {
    try {
        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const user = await User.findOne({ username: req.user.username });
        if (user) {
            res.json({ 
                userId: user.userId,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role
            }); // Trả về thông tin người dùng
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;

        // Lấy thông tin người dùng từ token JWT được gửi kèm trong yêu cầu
        const token = req.headers['authorization'];


        // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cập nhật thông tin người dùng
        await User.findByIdAndUpdate(userId, updatedUser);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

module.exports = {
    signup,
    login,
    getUser,
    updateUser
};
