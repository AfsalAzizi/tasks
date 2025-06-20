import { Request, Response } from "express";
import pool from "../config/database";
import { CreateTaskDTO, UpdateTaskDTO } from "../types/task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, status }: CreateTaskDTO = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *",
      [title, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      error: "Error creating task",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    console.log("Attempting to fetch tasks...");
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    console.log(`Successfully fetched ${result.rows.length} tasks`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      error: "Error fetching tasks",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status }: UpdateTaskDTO = req.body;
    const result = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      error: "Error updating task",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      error: "Error deleting task",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
