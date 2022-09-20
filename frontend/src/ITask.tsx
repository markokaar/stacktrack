interface ITask {
  id: number;
  name: string;
  description: string;
  priority: string;
  status: "LIST" | "DONE" | "TRASH";
}

export default ITask;
