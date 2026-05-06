import { 
    addNewEmployee,
    getAllNewEmployees,
    activateNewEmployee,
    deactivateNewEmployee,
    deleteNewEmployee,
    updateNewEmployee,
    getNewEmployeeById,
    getNewEmployeeByStatus,
    getNewEmployeeByUsername
} from "../Repository/newUserRepository.js";

export const createNewEmployee = async (req, res) => {
    try {
        const { username, email, status } = req.body;
        const newEmployee = await addNewEmployee({ username, email, status });
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNewEmployees = async (req, res) => {
    try {
        const employees = await getAllNewEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNewEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await getNewEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNewEmployeesByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const employees = await getNewEmployeeByStatus(status);
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getNewEmployeeByUsernameController = async (req, res) => {
    try {
        const { username } = req.params;
        const employee = await getNewEmployeeByUsername(username);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, status } = req.body;
        const updatedEmployee = await updateNewEmployee(id, { username, email, status });
        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await deleteNewEmployee(id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(deletedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const activateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedEmployee = await activateNewEmployee(id);
        if (!activatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(activatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deactivateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        const deactivatedEmployee = await deactivateNewEmployee(id);
        if (!deactivatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(deactivatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
