import { getConnection, getPool } from '../data/db.js';

export async function addNewEmployee(employee) {
    const pool = await getPool();
    const conn = await pool.getConnection();

    try {
        const { first_name, last_name, display_name, username, email, start_date, department } = employee;
        const [result] = await conn.query(
            `INSERT INTO new_employees (first_name, last_name, display_name, username, email, start_date, department, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [first_name, last_name, display_name, username, email, start_date, department, 'pending']
        );
        return { id: result.insertId, ...employee };
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getAllNewEmployees() {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM new_employees WHERE status = 'pending'`);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }   
}

export async function activateNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`UPDATE new_employees SET status = 'active' WHERE id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function deactivateNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`UPDATE new_employees SET status = 'inactive' WHERE id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {        
        conn.release();
    }
}

export async function deleteNewEmployee(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        await conn.query(`DELETE FROM new_employees WHERE id = ?`, [id]);
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function updateNewEmployee(id, employee) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const { first_name, last_name, display_name, username, email, start_date, department } = employee;
        await conn.query(
            `UPDATE new_employees SET first_name = ?, last_name = ?, display_name = ?, username = ?, email = ?, start_date = ?, department = ? WHERE id = ?`,
            [first_name, last_name, display_name, username, email, start_date, department, id]
        );
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeById(id) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM new_employees WHERE id = ?`, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeByStatus(status) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM new_employees WHERE status = ?`, [status]);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}

export async function getNewEmployeeByUsername(username) {
    const pool = await getPool();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM new_employees WHERE username = ?`, [username]);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        conn.release();
    }
}