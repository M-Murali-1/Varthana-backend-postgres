const yup = require("yup");

// Schema for the validation of the inserting data.
const validateEmployeeInsertionSchema = yup
  .object({
    name: yup.string().required("Name is required..!"),
    username: yup.string().required("Username is required..!"),
    phone_number: yup
      //   .number()
      .string()
      .required("Phone number is required..!")
      .typeError("Phone number must be number")
      .test(
        "len",
        "Phone number should be exactly 10 digits",
        (val) => val && val.toString().length === 10
      ),
    email_id: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required..!"),
    password: yup
      .string()
      .required("Password is required..!")
      .min(6, "Password must be at least 6 characters long..!"),
    confirm_password: yup
      .string()
      .required("Confirm_password is require..!")
      .oneOf([yup.ref("password"), null], "Password is not matching..!"),
    Role: yup.string().required("Role is required..!"),
    address: yup.string().optional(),
  })
  .noUnknown(true, "Invalid data is provided in the request");

const validateEmployeeInsertion = async (req, res, next) => {
  try {
    req.body = await validateEmployeeInsertionSchema.validate(req.body, {
      abortEarly: false,
      strict: true,
    });
    console.log(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: "Required Fields are missing or invalid keys provided",
      error: err.errors.join(" , "),
    });
  }
};

// Schema for the Login details validation.
const validateEmployeeLoginSchema = yup
  .object({
    email_id: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required..!"),
    password: yup
      .string()
      .required("Password is required..!")
      .min(6, "Password must be at least 6 characters long..!"),
  })
  .noUnknown(true, "Invalid data is provided in the request");

const validateEmployeeLogin = async (req, res, next) => {
  try {
    req.body = await validateEmployeeLoginSchema.validate(req.body, {
      abortEarly: false,
      strict: true,
    });
    console.log(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: "Required Fields are missing or invalid data is provided",
      error: err.errors.join(" , "),
    });
  }
};

// Schema for finding the employee validations
const validateEmployeeFindSchema = yup
  .object({
    name: yup.string().required("Name is required..!"),
    phone_number: yup
      //   .number()
      .string()
      .required("Phone number is required..!")
      .typeError("Phone number must be number")
      .test(
        "len",
        "Phone number should be exactly 10 digits",
        (val) => val && val.toString().length === 10
      ),
    email_id: yup
      .string()
      .email("Enter a valid email address")
      .required("Email is required..!"),
  })
  .noUnknown(true, "Invalid data is provided in the request body");

const validateEmployeeFind = async (req, res, next) => {
  try {
    req.body = await validateEmployeeFindSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: "Required Fields are missing or invalid keys provided",
      error: err.errors.join(" , "),
    });
  }
};

// Schema for updating the password validations
const validateEmployeePasswordUpdateSchema = yup
  .object({
    password: yup
      .string()
      .required("Password is required..!")
      .min(6, "Password must be at least 6 characters long..!"),
    confirm_password: yup
      .string()
      .required("Confirm_password is require..!")
      .oneOf([yup.ref("password"), null], "Password is not matching..!"),
  })
  .noUnknown(true, "Invalid data is provided in the request body");

const validateEmployeePasswordUpdate = async (req, res, next) => {
  try {
    req.body = await validateEmployeePasswordUpdateSchema.validate(req.body, {
      abortEarly: false,
      strict: true,
    });
    console.log(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      message: "Required Fields are missing or invalid keys provided",
      error: err.errors.join(" , "),
    });
  }
};

module.exports = {
  validateEmployeeInsertion,
  validateEmployeeLogin,
  validateEmployeeFind,
  validateEmployeePasswordUpdate,
};
