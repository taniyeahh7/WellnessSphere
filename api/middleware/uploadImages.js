const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

//setting up multer to store the image in our local disk before uploading to cloud
const multerStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../public/images"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
	},
});

//function to check the file format
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb({ message: "Unsupported file format" }, false);
	}
};

//setting up multer for uploading images
const uploadPhoto = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: { fieldSize: 2000000 }, //file size is 2MB
});

//function to resize the image
const productImgResize = async (req, res, next) => {
	if (!req.files) return next();
	await Promise.all(
		req.files.map(async (file) => {
			await sharp(file.path)
				.resize(300, 300)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(`public/images/products/${file.filename}`);
			fs.unlinkSync(`public/images/products/${file.filename}`);
		})
	);
	next();
};

//function to resize the image
const blogImgResize = async (req, res, next) => {
	if (!req.files) return next();
	await Promise.all(
		req.files.map(async (file) => {
			await sharp(file.path)
				.resize(300, 300)
				.toFormat("jpeg")
				.jpeg({ quality: 90 })
				.toFile(`public/images/blogs/${file.filename}`);
			fs.unlinkSync(`public/images/blogs/${file.filename}`);
		})
	);
	next();
};

module.exports = {
	uploadPhoto,
	productImgResize,
	blogImgResize,
};
