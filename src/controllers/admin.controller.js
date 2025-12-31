const { adminRepository } = require('../repository');
const {officialRepository} = require('../repository');
const { ApiError } = require('../utils/ApiError');
const { ApiSuccess } = require('../utils/ApiSuccess');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminRepo = new adminRepository();

async function registerAdmin(req, res, next) {
  try {
    const creatorAdmin = req.user;
  
    const { email, password, name, position, department, photo } = req.body;

    if (!email || !password || !name || !position || !department) {
      throw new ApiError(400, "Invalid input data");
    }
    const normalizedEmail = email.toLowerCase();
    const existingAdmin = await adminRepo.findUnique({
      email: normalizedEmail
    });
    if (existingAdmin) {
      throw new ApiError(409, "Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await adminRepo.create({
      email: normalizedEmail,
      password: hashedPassword,
      name,
      position,
      department,
      photo,
      createdById: creatorAdmin.id
    });
    delete newAdmin.password; //jate admin password response a na jay ..onek kichu bhabte hoy bhai

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
async function adminSignIn(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const admin = await adminRepo.findUnique({ email: email.toLowerCase() });
    if (!admin) {
      throw new ApiError(401, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }
    const payload = { id: admin.id, email: admin.email, role: admin.role };
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'});

    /// cookie ta k secure korte use korchi
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    //jate admin password response a na jay ..onek kichu bhabte hoy bhai
    delete admin.password;
    res.status(200).json(
      new ApiSuccess({
        message: "Admin signed in successfully",
        data: admin
      })
    );
  } catch (error) {
    next(error);
  }
}

async function adminSignOut(req, res, next) {
  try {
    res.clearCookie('authToken');
    res.status(200).json(
      new ApiSuccess({
        message: "Admin signed out successfully"
      })
    );
  } catch (error) {
    next(error);
  } 
}

async function verifyOfficial(req, res, next) {
  try{
    const officialId = req.body.officialId;
    const user = req.user;
    const official = await officialRepository.findUnique({id:officialId});
    if(!official){
      throw new ApiError(404,"Official not found");
    }
    if(official.isVerified){
      throw new ApiError(409,"Official is already verified");
    }
    const verifiedOfficial = await officialRepository.update({id:officialId},{isVerified:true, verifiedById:user.id});
    res.status(200).json(
      new ApiSuccess({
        message:"Official verified successfully",
        data:verifiedOfficial
      })
    );
  }catch(error){
    next(error);
  }
}

module.exports = { registerAdmin, adminSignIn,adminSignOut,verifyOfficial};
