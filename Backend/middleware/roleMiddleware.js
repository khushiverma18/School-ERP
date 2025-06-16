// isAdmin, isTeacher, isStudent, isParent – chaar role check karne ke liye helpers
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};

export const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === "Teacher") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Teachers only" });
  }
};

export const isStudent = (req, res, next) => {
  if (req.user && req.user.role === "Student") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Students only" });
  }
};

export const isParent = (req, res, next) => {
  if (req.user && req.user.role === "Parent") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Parents only" });
  }
};

// Agar multiple roles allow karne hain, e.g. Admin aur Teacher dono access kar sakte
export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
  };
};
