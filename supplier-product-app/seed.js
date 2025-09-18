// =======================
//  SEED DATA
//  Tạo dữ liệu mẫu cho Supplier và Product
// =======================

const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');
require('dotenv').config();

// 1. Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected for seeding"))
    .catch(err => console.log(err));

// 2. Dữ liệu mẫu
const seedSuppliers = [
    { name: "Công ty TNHH ABC", address: "Hà Nội", phone: "0123456789" },
    { name: "Nhà cung cấp XYZ", address: "TP. Hồ Chí Minh", phone: "0987654321" },
    { name: "Công ty Thương mại 123", address: "Đà Nẵng", phone: "0111222333" }
];

const seedProducts = [
    { name: "Sản phẩm A", price: 100000, quantity: 50 },
    { name: "Sản phẩm B", price: 200000, quantity: 30 },
    { name: "Sản phẩm C", price: 150000, quantity: 20 }
];

// 3. Hàm seed
const seedDB = async() => {
    try {
        // Xóa dữ liệu cũ
        await Supplier.deleteMany({});
        await Product.deleteMany({});

        console.log("🗑️ Đã xóa dữ liệu cũ");

        // Tạo supplier trước
        const suppliers = await Supplier.insertMany(seedSuppliers);
        console.log("✅ Đã tạo suppliers mẫu");

        // Gán supplierId cho sản phẩm ngẫu nhiên
        for (let product of seedProducts) {
            const randomSupplier = suppliers[Math.floor(Math.random() * suppliers.length)];
            product.supplierId = randomSupplier._id;
        }

        // Tạo products
        await Product.insertMany(seedProducts);
        console.log("✅ Đã tạo products mẫu");

        mongoose.connection.close();
        console.log("🔌 Đóng kết nối MongoDB");
    } catch (err) {
        console.error(err);
    }
};

// 4. Gọi hàm
seedDB();