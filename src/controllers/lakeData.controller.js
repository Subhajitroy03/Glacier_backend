const { LakeReportRepository } = require("../repository");
const prisma = require("../../prisma/client");
const { ApiError, ApiSuccess } = require("../utils");

const lakeRepo = new LakeReportRepository(prisma);

async function getAllLakeData(req, res, next) {
  try {
    const records = await lakeRepo.findMany({
      where: {
        verificationStatus: "VERIFIED",
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
            department: true,
            photo: true,
          },
        },
        verifiedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            position: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(
      new ApiSuccess({
        message: "Verified lake data fetched successfully",
        data: records,
      })
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllLakeData,
};
