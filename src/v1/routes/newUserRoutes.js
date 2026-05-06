import express from "express";

import { 
    createNewEmployee,
    activateNewEmployeeController,
    deactivateNewEmployeeController,
    getNewEmployee,
    getNewEmployeeByUsernameController,
    getNewEmployeesByStatus,
    getNewEmployees,
    updateNewEmployeeController,
    deleteNewEmployeeController,
    getAllActiveNewEmployees,
    getAllInactiveNewEmployees,
    getAllPendingNewEmployees
} from "../controllers/newUserController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

//POST | localhost:3868/api/v1/new-employees
router.post('/', authenticateToken, authorizeRole('management', 'admin'), createNewEmployee);

//GET | localhost:3868/api/v1/new-employees
router.get('/', authenticateToken, authorizeRole('management', 'admin'), getNewEmployees);

//GET | localhost:3868/api/v1/new-employees/active
router.get('/active', authenticateToken, authorizeRole('management', 'admin'), getAllActiveNewEmployees);

//GET | localhost:3868/api/v1/new-employees/inactive
router.get('/inactive', authenticateToken, authorizeRole('management', 'admin'), getAllInactiveNewEmployees);

//GET | localhost:3868/api/v1/new-employees/pending
router.get('/pending', authenticateToken, authorizeRole('management', 'admin'), getAllPendingNewEmployees);

//GET | localhost:3868/api/v1/new-employees/:id
router.get('/:id', authenticateToken, authorizeRole('management', 'admin'), getNewEmployee);

//GET | localhost:3868/api/v1/new-employees/status/:status
router.get('/status/:status', authenticateToken, authorizeRole('management', 'admin'), getNewEmployeesByStatus);

//GET | localhost:3868/api/v1/new-employees/username/:username
router.get('/username/:username', authenticateToken, authorizeRole('management', 'admin'), getNewEmployeeByUsernameController);

//PUT | localhost:3868/api/v1/new-employees/:id
router.put('/:id', authenticateToken, authorizeRole('management', 'admin'), updateNewEmployeeController);

//PUT | localhost:3868/api/v1/new-employees/activate/:id
router.put('/activate/:id', authenticateToken, authorizeRole('management', 'admin'), activateNewEmployeeController);

//PUT | localhost:3868/api/v1/new-employees/deactivate/:id
router.put('/deactivate/:id', authenticateToken, authorizeRole('management', 'admin'), deactivateNewEmployeeController);

//DELETE | localhost:3868/api/v1/new-employees/:id
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteNewEmployeeController);

export default router;