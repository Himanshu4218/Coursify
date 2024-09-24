import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username is required")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const userPasswordSchema = Yup.object({
  currePassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .notOneOf(
      [Yup.ref("currentPassword")],
      "New password cannot be the same as the current password"
    )
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const userDetailsSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

export const addCategorySchema = Yup.object({
  categoryName: Yup.string()
    .required("Name is required")
    .min(1, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters long"),

  categoryImage: Yup.string()
    .url("Image must be a valid URL")
    .required("Image is required"),

  categoryDescription: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(300, "Description must be less than 300 characters long"),
});

export const addCourseSchema = Yup.object({
  skills: Yup.array().min(1, "At least one skill is required."),
  category: Yup.string().required("Category is required"),
  contentLang: Yup.string()
    .max(20, "Content language must be at most 20 characters")
    .required("Content language is required"),
  courseName: Yup.string()
    .max(20, "Course name must be at most 20 characters")
    .required("Course name is required"),
  coursePrice: Yup.string().required("Course price is required"),
  courseImage: Yup.string()
    .url("Image must be a valid URL")
    .required("Image is required"),
  courseDescription: Yup.string().required("Course description is required"),
});
