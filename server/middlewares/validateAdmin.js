// middleware/adminOnly.js
export function validateAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }
  next();
}
