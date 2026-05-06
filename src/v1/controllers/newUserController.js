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
        const employeeData = req.body;

        const newEmployee = await addNewEmployee(employeeData);

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

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await updateNewEmployee(id, req.body);

        const updated = await getNewEmployeeById(id);

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await deleteNewEmployee(id);

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const activateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await activateNewEmployee(id);

        res.status(200).json({ message: "Employee activated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deactivateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await deactivateNewEmployee(id);

        res.status(200).json({ message: "Employee deactivated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};