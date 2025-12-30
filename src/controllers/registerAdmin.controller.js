const { adminRepository } = require('../repository');
const { ApiError } = require('../utils/ApiError');
const { ApiSuccess } = require('../utils/ApiSuccess');
const bcrypt = require('bcrypt');

const adminRepo = new adminRepository();

async function registerAdmin(req, res, next) {
  try {
    const creatorAdmin = req.admin; 

    if (!creatorAdmin) {
      throw new ApiError(403, "Only admins can create admins");
    }

    const { email, password, name, position, department, photo } = req.body;

    if (!email || !password || !name || !position || !department) {
      throw new ApiError(400, "Invalid input data");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminRepo.create({
      email,
      password: hashedPassword,
      name,
      position,
      department,
      photo,
      createdById: creatorAdmin.id
    });

    res.status(201).json(
      new ApiSuccess({
        message: "Admin registered successfully",
        data: newAdmin
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = { registerAdmin };
