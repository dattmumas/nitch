
import { fetchProjectsAndTasks } from "@/lib/db";

export default async function ProjectsPage() {
    const { projects, tasks } = await fetchProjectsAndTasks();
    
    
    return (
        <div>
          <ul>
            {projects.map((project: any) => (
              <li key={project.id}>
                {project.name}
                <ul>
                  {tasks
                    .filter((task: any) => task.project_id === project.id)
                    .map((task: any) => (
                      <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }

