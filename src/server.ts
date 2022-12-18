import App from '@/app';
import IndexRoute from '@routes/index.route';
import StudentsRoute from '@routes/students.route';
import ClassesRoute from '@/routes/classes.route';
import SubjectsRoute from '@routes/subjects.route';
import TeachersRoute from '@routes/teachers.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new StudentsRoute(), new SubjectsRoute(), new TeachersRoute(), new ClassesRoute()]);

app.listen();
