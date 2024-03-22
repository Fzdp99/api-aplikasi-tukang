module.exports = {
  async admin(req, res, next) {
    if (req.user.role !== "admin") {
      res.status(401).json({ message: "Anda tidak memiliki akses!" });
      return;
    } else {
      next();
    }
  },
};
