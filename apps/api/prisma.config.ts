import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "mysql://root@localhost:3307/hospital",
  },
});
