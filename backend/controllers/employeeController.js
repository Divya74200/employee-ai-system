import Employee from "../models/Employee.js";


// ADD EMPLOYEE
export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    } = req.body;

    if (
      !name ||
      !email ||
      !department ||
      !performanceScore ||
      !experience
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const employeeExists = await Employee.findOne({ email });

    if (employeeExists) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EMPLOYEES
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// SEARCH EMPLOYEE
export const searchEmployees = async (req, res) => {
  try {
    const department = req.query.department;

    const employees = await Employee.find({
      department,
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.department =
      req.body.department || employee.department;

    employee.skills = req.body.skills || employee.skills;

    employee.performanceScore =
      req.body.performanceScore ||
      employee.performanceScore;

    employee.experience =
      req.body.experience || employee.experience;

    const updatedEmployee = await employee.save();

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await employee.deleteOne();

    res.json({
      message: "Employee removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};