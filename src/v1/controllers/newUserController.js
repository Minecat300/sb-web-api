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

/* CREATE */
export const createNewEmployee = async (req, res) => {
    try {
        const employee = await addNewEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create employee" });
    }
};

/* GET ALL */
export const getNewEmployees = async (req, res) => {
    try {
        const employees = await getAllNewEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch employees" });
    }
};

/* GET BY ID */
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
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

/* GET BY STATUS */
export const getNewEmployeesByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const employees = await getNewEmployeeByStatus(status);

        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch employees by status" });
    }
};

/* GET BY USERNAME */
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
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

/* UPDATE */
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
        res.status(500).json({ error: "Failed to update employee" });
    }
};

/* DELETE */
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
        res.status(500).json({ error: "Failed to delete employee" });
    }
};

/* ACTIVATE */
export const activateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        if (existing.status === "active") {
            return res.status(400).json({ error: "Employee already active" });
        }

        await activateNewEmployee(id);

        const updated = await getNewEmployeeById(id);

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to activate employee" });
    }
};

/* DEACTIVATE */
export const deactivateNewEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;

        const existing = await getNewEmployeeById(id);
        if (!existing) {
            return res.status(404).json({ error: "Employee not found" });
        }

        if (existing.status === "inactive") {
            return res.status(400).json({ error: "Employee already inactive" });
        }

        await deactivateNewEmployee(id);

        const updated = await getNewEmployeeById(id);

        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to deactivate employee" });
    }
};