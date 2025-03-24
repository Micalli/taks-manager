import { ClipboardList } from "lucide-react";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../app/contexts/hooks/useAuth";

export function Header() {
  const { singnout, user } = useAuth();

  return (
    <div className="flex  justify-between items-center gap-3 mb-8">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-8 h-8 text-indigo-400" />
        <h1 className="sm:text-2xl text-xl font-bold text-white">
          Task Manager
        </h1>
      </div>
      <div className="text-white font-medium flex items-center gap-2">
        <span className="font-thin">Olá, </span>
        {user?.name.split(" ")[0]}!
        <button onClick={() => singnout()}>
          <ExitIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
