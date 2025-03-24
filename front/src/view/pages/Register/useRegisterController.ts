import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authService } from "../../../app/services/authService";
import { SingnupParams } from "../../../app/services/authService/singnup";
import { useAuth } from "../../../app/contexts/hooks/useAuth";
import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string().nonempty("Nome é obrigatório"),
    email: z
      .string()
      .nonempty("E=mail é obrigatório")
      .email("Informe um e-mail válido"),
    password: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(6, "Senha deve conter pelo menos 6 digitos"),

    confirmPassword: z
      .string()
      .nonempty("Senha é obrigatória")
      .min(6, "Senha deve conter pelo menos 6 digitos"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], 
  });



type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const { singnin } = useAuth();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SingnupParams) => {
      return authService.singnup(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      singnin(accessToken);

      toast.success("Conta criada com sucesso!");
    } catch  {
      toast.error("Ocorreu um erro ao criar a sua conta!");
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    isPending,
  };
}
