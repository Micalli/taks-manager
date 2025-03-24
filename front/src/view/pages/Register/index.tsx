import { Mail, Lock, UserPlus, User } from "lucide-react";
import { Button } from "../../../components/Button";
import { useRegisterController } from "./useRegisterController";
import { Input } from "../../../components/Input";

export function Register() {
  const { errors, handleSubmit, isPending, register } = useRegisterController();
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <UserPlus className="w-12 h-12 text-indigo-400" />
          </div>

          <h2 className="text-2xl font-bold text-center text-white mb-8">
            Criar conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                disabled={isPending}
                placeholder="Bruno"
                {...register("name")}
                error={errors.name?.message}
                leftIcon={<User size={20} />}
              />
            </div>

            <div>
              <Input
                type="email"
                disabled={isPending}
                placeholder="seu@email.com"
                {...register("email")}
                error={errors.email?.message}
                leftIcon={<Mail size={20} />}
              />
            </div>

            <div>
              <Input
                type="password"
                disabled={isPending}
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
                leftIcon={<Lock size={20} />}
              />
            </div>

            <div>
              <Input
                type="password"
                disabled={isPending}
                placeholder="••••••••"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                leftIcon={<Lock size={20} />}
              />
            </div>

            <Button type="submit" disabled={isPending} isLoading={isPending}>
              Criar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href='/login'
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium focus:outline-none"
            >
              Já tem uma conta? Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
