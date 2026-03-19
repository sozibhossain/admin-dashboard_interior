import { ArrowRight, Plus } from "lucide-react";
import type { Task } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

type TaskTabProps = {
  tasks: Task[];
  onCreateTask: () => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
};

export function TaskTab({ tasks, onCreateTask, onStatusChange }: TaskTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onCreateTask}>
          <Plus className="mr-2 h-5 w-5" /> Add New Task
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <Card className="p-4">
            <p className="text-body-16 text-[#6a5f49]">No tasks yet.</p>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card
              key={task._id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0">
                <p className="text-title-24 truncate text-[#2f2615]">{task.taskName || "-"}</p>
                <p className="text-body-16 text-[#4f4638]">{task.description || "-"}</p>
                <p className="text-body-16 text-[#6a5f49]">
                  Date: {formatDate(task.taskDate)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge
                  className={
                    task.status === "completed"
                      ? "bg-[#e6f2de] text-[#567938]"
                      : task.status === "in-progress"
                        ? "bg-[#f5e8cc] text-[#8a6500]"
                        : "bg-[#ece4d6] text-[#715f3d]"
                  }
                >
                  {task.status || "not-started"}
                </Badge>
                <Select
                  value={task.status}
                  onChange={(event) =>
                    onStatusChange(
                      task._id,
                      event.target.value as
                        | "not-started"
                        | "in-progress"
                        | "completed",
                    )
                  }
                  className="h-10"
                >
                  <option value="not-started">not-started</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </Select>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-[#8a6500]/25 bg-[#efe5d4] text-[#8a6500]"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
