import {
  body,
  param,
  validationResult,
  ValidationChain,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

const idValidationRules: ValidationChain[] = [
  param("taskId").isUUID().withMessage("ID inválido, deve ser um UUID válido"),
];

const taskValidationRules: ValidationChain[] = [
  body("title")
    .isString()
    .withMessage("O título deve ser uma string")
    .isLength({ min: 3 })
    .withMessage("O título deve ter pelo menos 3 caracteres"),

  body("description")
    .optional()
    .isString()
    .withMessage("A descrição deve ser uma string"),
];

const taskValidationAuth: ValidationChain[] = [
  body("email")
    .isString()
    .withMessage("O email deve ser uma string")
    .isEmail()
    .withMessage("Email inválido"),

  body("password")
    .isString()
    .withMessage("A senha deve ser uma string")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
];

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateTaskCreate = [
  ...taskValidationRules,
  handleValidationErrors,
];
export const validateTaskUpdate = [
  ...idValidationRules,
  ...taskValidationRules,
  handleValidationErrors,
];

export const validateTaskId = [...idValidationRules, handleValidationErrors];

export const validateSingInUp = [...taskValidationAuth, handleValidationErrors];
