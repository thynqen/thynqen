const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["admin", "manager", "user"]).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    password: z.string().min(8),
  }),
});

module.exports = { registerSchema, loginSchema };