import { connect, model } from 'mongoose';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import * as bcrypt from 'bcrypt';

const UserModel = model('User', UserSchema);
const ProjectModel = model('Project', ProjectSchema);
const TaskModel = model('Task', TaskSchema);


(async () => {
  await connect('mongodb://localhost:27017/project_mgmt');
  console.log('Connected to MongoDB');

  await UserModel.deleteMany({});
  await ProjectModel.deleteMany({});
  await TaskModel.deleteMany({});

  const hashed = await bcrypt.hash('Test@123', 10);
  const user = await new User({ email: 'test@example.com', password: hashed }).save();

  for (let i = 0; i < 2; i++) {
    const project = await new Project({
      title: `Project ${i + 1}`,
      description: 'Sample project',
      user: user._id,
    }).save();

    for (let j = 0; j < 3; j++) {
      await new Task({
        title: `Task ${j + 1} for ${project.title}`,
        description: 'Demo task',
        project: project._id,
      }).save();
    }
  }

  console.log('✅ Database seeded!');
  process.exit();
})();
