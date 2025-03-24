export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt'>;

export interface AuthFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends AuthFormData {
  confirmPassword: string;
}