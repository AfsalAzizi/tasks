export interface Task {
  id: number;
  title: string;
  status: "pending" | "completed";
  created_at: Date;
}

export interface CreateTaskDTO {
  title: string;
  status: "pending" | "completed";
}

export interface UpdateTaskDTO {
  status: "pending" | "completed";
}
