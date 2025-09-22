const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      // console.log(req.user);
      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
      }
      // console.log(req.user);
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Role check failed", error: error.message });
    }
  };
};
module.exports = roleMiddleware;
