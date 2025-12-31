const { ApiError } = require("../utils");

module.exports=function isAdmin(req, res, next) {
  // At this point, authenticate middleware MUST have run
  // So req.user must exist
  if (!req.user) {
    throw new ApiError(401, "Not authenticated");
  }

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }

  next();
}


