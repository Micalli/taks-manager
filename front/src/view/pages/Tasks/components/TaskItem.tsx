import { useState } from "react";
import { Check, Trash2, Edit2, X, Save } from "lucide-react";
import { Task } from "../../../../types";
import { formatDate } from '../../../../app/utils/formatDate';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  loading?: boolean;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  loading,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className=" relative flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 group flex-wrap sm:flex-nowrap">
      <button
        onClick={() => onToggle(task.id)}
        disabled={task.status === "done"}
        className={`w-8 h-8  rounded-full border-2 flex items-center justify-center transition-colors
    ${
      task.status === "done"
        ? "bg-green-500 border-green-500 text-white"
        : "border-gray-600 hover:border-green-500"
    }`}
      >
        {task.status === "done" && <Check size={14} />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2 flex-wrap sm:flex-nowrap">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[100px]"
            autoFocus
          />
          <button
            onClick={handleEdit}
            disabled={loading}
            className="p-1 text-green-400 hover:text-green-300 "
          >
            <Save size={18} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="p-1 text-gray-400 hover:text-gray-300"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-gray-200 break-words ${
              task.status === "done" ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>

          <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="p-1 text-indigo-400 hover:text-indigo-300  z-10"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              disabled={loading}
              className="p-1 text-red-400 hover:text-red-300  z-10"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="text-xs text-gray-400 absolute right-4 group-hover:opacity-0 transition-all sm:opacity-100 opacity-0 ">
            Criado em {formatDate(new Date(task.createdAt))}
          </div>
        </>
      )}
    </div>
  );
}
