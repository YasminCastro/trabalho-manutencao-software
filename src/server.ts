import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import StudentsRoute from '@routes/students.route';
import StudentsSubjectsRoute from '@routes/students_subjects.route';
import SubjectsRoute from '@routes/subjects.route';
import TeachersRoute from '@routes/teachers.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new StudentsRoute(), new SubjectsRoute(), new TeachersRoute(), new StudentsSubjectsRoute()]);

app.listen();
