import type { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

function swaggerDocs(app: Express, port: number): void {
  const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Project Hoc Nodejs",
        version: "1.0.0",
        description: "API xac thuc nguoi dung voi JWT",
      },
      servers: [{ url: `${BASE_URL}/api` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          ErrorResponse: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
          LoginRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string" },
            },
          },
          RefreshTokenRequest: {
            type: "object",
            required: ["refreshToken"],
            properties: {
              refreshToken: { type: "string" },
            },
          },
          RegisterRequest: {
            type: "object",
            required: ["username", "email", "password"],
            properties: {
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
            },
          },
          ResetPasswordRequest: {
            type: "object",
            required: ["email", "newPassword", "confirmPassword"],
            properties: {
              email: { type: "string", format: "email" },
              newPassword: { type: "string" },
              confirmPassword: { type: "string" },
            },
          },
          UserProfileUpdateRequest: {
            type: "object",
            properties: {
              username: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
            },
          },
          ChangeEmailRequest: {
            type: "object",
            required: ["newEmail"],
            properties: {
              newEmail: { type: "string", format: "email" },
            },
          },
          ChangePasswordRequest: {
            type: "object",
            required: ["newPassword", "confirmPassword"],
            properties: {
              newPassword: { type: "string" },
              confirmPassword: { type: "string" },
            },
          },
          UserCreateRequest: {
            type: "object",
            required: ["username", "email", "password"],
            properties: {
              username: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              role: { type: "string" },
              phone: { type: "string" },
              address: { type: "string" },
            },
          },
        },
      },
      paths: {
        "/auth/register": {
          post: {
            tags: ["Authentication"],
            summary: "Dang ky tai khoan",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RegisterRequest" },
                },
              },
            },
            responses: {
              201: { description: "Dang ky thanh cong" },
              400: { description: "Du lieu khong hop le" },
            },
          },
        },
        "/auth/login": {
          post: {
            tags: ["Authentication"],
            summary: "Dang nhap",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginRequest" },
                },
              },
            },
            responses: {
              200: { description: "Dang nhap thanh cong" },
              400: { description: "Sai email hoac mat khau" },
            },
          },
        },
        "/auth/refresh-token": {
          post: {
            tags: ["Authentication"],
            summary: "Lam moi access token",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RefreshTokenRequest" },
                },
              },
            },
            responses: {
              200: { description: "Lay access token moi" },
              401: { description: "Refresh token thieu" },
            },
          },
        },
        "/auth/reset-password": {
          post: {
            tags: ["Authentication"],
            summary: "Dat lai mat khau",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
                },
              },
            },
            responses: {
              200: { description: "Dat lai mat khau thanh cong" },
            },
          },
        },
        "/profile/get-profile": {
          get: {
            tags: ["Profile"],
            summary: "Lay thong tin nguoi dung",
            security: [{ bearerAuth: [] }],
            responses: {
              200: { description: "Lay profile thanh cong" },
              401: { description: "Chua xac thuc" },
            },
          },
        },
        "/profile/update": {
          put: {
            tags: ["Profile"],
            summary: "Cap nhat thong tin ca nhan",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserProfileUpdateRequest" },
                },
              },
            },
            responses: {
              200: { description: "Cap nhat thanh cong" },
            },
          },
        },
        "/profile/change-password": {
          post: {
            tags: ["Profile"],
            summary: "Doi mat khau",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ChangePasswordRequest" },
                },
              },
            },
            responses: {
              200: { description: "Doi mat khau thanh cong" },
            },
          },
        },
        "/profile/change-email": {
          post: {
            tags: ["Profile"],
            summary: "Doi email",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ChangeEmailRequest" },
                },
              },
            },
            responses: { 200: { description: "Doi email thanh cong" } },
          },
        },
        "/profile/upload-avatar": {
          post: {
            tags: ["Profile"],
            summary: "Upload avatar",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      avatar: { type: "string", format: "binary" },
                    },
                    required: ["avatar"],
                  },
                },
              },
            },
            responses: { 200: { description: "Upload avatar thanh cong" } },
          },
        },
        "/profile/avatar": {
          get: {
            tags: ["Profile"],
            summary: "Lay avatar nguoi dung",
            security: [{ bearerAuth: [] }],
            responses: { 200: { description: "Lay avatar thanh cong" } },
          },
        },
        "/users": {
          get: {
            tags: ["Users"],
            summary: "Lay danh sach nguoi dung admin",
            security: [{ bearerAuth: [] }],
            responses: { 200: { description: "Danh sach nguoi dung" } },
          },
          post: {
            tags: ["Users"],
            summary: "Tao nguoi dung moi admin",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserCreateRequest" },
                },
              },
            },
            responses: { 201: { description: "Tao nguoi dung thanh cong" } },
          },
        },
        "/users/{id}": {
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          get: {
            tags: ["Users"],
            summary: "Lay nguoi dung theo ID admin",
            security: [{ bearerAuth: [] }],
            responses: { 200: { description: "Thong tin nguoi dung" } },
          },
          put: {
            tags: ["Users"],
            summary: "Cap nhat nguoi dung theo ID admin",
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserCreateRequest" },
                },
              },
            },
            responses: { 200: { description: "Cap nhat thanh cong" } },
          },
          delete: {
            tags: ["Users"],
            summary: "Xoa nguoi dung theo ID admin",
            security: [{ bearerAuth: [] }],
            responses: { 200: { description: "Xoa thanh cong" } },
          },
        },
      },
    },
    apis: [],
  };

  const swaggerSpec = swaggerJsdoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger: ${BASE_URL}/docs`);
}

export default swaggerDocs;
