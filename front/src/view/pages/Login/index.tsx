import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <LogIn className="w-12 h-12 text-indigo-400" />
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Bem vindo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register("email")}
              leftIcon={<Mail size={20} />}
            />
            <Input
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
              leftIcon={<Lock size={20} />}
            />

            <Button type="submit" disabled={isPending} isLoading={isPending}>
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium focus:outline-none"
            >
              Precisa de uma conta? Cadastre-se
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
