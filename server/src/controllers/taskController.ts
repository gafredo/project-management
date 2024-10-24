import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error retrieving tasks: ' + error.message });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error retrieving users tasks: ' + error.message });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      projectId,
      points,
      authorUserId,
      assignedUserId,
    } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        assignedUserId,
        authorUserId,
        description,
        dueDate,
        points,
        priority,
        projectId,
        startDate,
        status,
        tags,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: 'Error creating task:' + error.message });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: 'Error updating task: ' + error.message });
  }
};
