import { sql } from "@vercel/postgres";

export async function fetchProjectsAndTasks() {
  const projects = await sql`SELECT * FROM projects;`;
  const tasks = await sql`SELECT * FROM tasks;`;
  return { projects: projects.rows, tasks: tasks.rows };
}

export async function createProject(name: string) {
  await sql`INSERT INTO projects (name) VALUES (${name});`;
}