import request from "supertest";
import { app } from "../../../index";
import { prisma } from "src/config/_mocks_/prisma";

describe("GET /tasks", () => {
  it("deve retornar status 401 se não estiver autenticado", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(401);
  });

  it("deve retornar uma lista de tarefas se autenticado", async () => {
    const mockTasks = [
      {
        id: "d1d7005f-106f-4eed-b734-5e276d12d848",
        userId: "4611ec9c-47dd-4bd7-9fa7-ddc6ed1e8c78",
        title: "testeMock",
        description: "testeMock",
        status: "active",
        createdAt: "2025-03-23T00:43:18.111Z",
      },
    ];

    prisma.task.findMany = jest.fn().mockResolvedValue(mockTasks);

    const response = await request(app)
      .get("/tasks")
      .set(
        "Authorization",
        "Bearer [Token válido]"
      );

    if (response.status !== 200) {
      console.error("Erro na resposta:", response.body);
    }
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockTasks[0]),
      ])
    );
  });
});

describe("POST /tasks", () => {
  const validTask = {
    title: "Nova Tarefa",
    description: "Descrição da tarefa",
    status: "active",
    userId: "4611ec9c-47dd-4bd7-9fa7-ddc6ed1e8c78",
  };

  it("deve criar uma tarefa com sucesso", async () => {

    prisma.task.create.mockResolvedValue({
      id: "ea82024f-fbab-4f92-8a5f-020794e22052",
      ...validTask,
      createdAt: new Date().toISOString().split(".")[0],
    });

    const response = await request(app)
      .post("/tasks")
      .set(
        "Authorization",
        "Bearer [Token válido]"
      )
      .send(validTask);

    console.log("📌 Resposta recebida:", response.error);


    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      createdAt: expect.any(String),
      ...validTask,
    });
  });

  it("deve retornar 400 se faltar algum campo", async () => {
    const response = await request(app)
      .post("/tasks")
      .set(
        "Authorization",
        "Bearer [Token válido]"
      )
      .send({ descrption: "Tarefa Sem Titulo" });

    expect(response.status).toBe(400);
  });

  it("deve retornar 401 se o usuário não estiver autenticado", async () => {
    const response = await request(app).post("/tasks").send(validTask);
    expect(response.status).toBe(401);
  });
});
