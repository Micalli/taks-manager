import { ListFilter } from "lucide-react";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";
import { useTasksController } from "./useTasksController";
import { Spinner } from "../../../components/Spinner";
import { Header } from "../../../components/Header";

export function Tasks() {
  const {
    selectedFilter,
    handleSubmit,
    isFetching,
    tasks,
    handleChangeFilter,
    handleEditTask,
    handleDeleteTask,
    handleToggleTask,
  } = useTasksController();
  type Filter = {
    label: string;
    value: undefined | "active" | "done";
  }[];

  const filters: Filter = [
    {
      label: "Todas",
      value: undefined,
    },
    {
      label: "Ativas",
      value: "active",
    },
    {
      label: "Completadas",
      value: "done",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto p-6">
        <Header />

        <TaskForm onSubmit={handleSubmit} loading={isFetching} />

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <ListFilter className="text-gray-400" size={20} />
            <div className="flex justify-center gap-2 bg-gray-800 rounded-lg p-1 shadow-md flex-wrap w-full sm:w-auto">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleChangeFilter(filter.value)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    filter.value === selectedFilter
                      ? "bg-indigo-500 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {isFetching && (
            <div className="flex justify-center mt-20">
              <Spinner className="w-10 h-10" />
            </div>
          )}
          {!isFetching && tasks.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              Nenhuma tarefa ainda. Adicione sua  tarefa acima!
            </p>
          )}

          {!isFetching && tasks.length > 0 && (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  loading={isFetching}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
