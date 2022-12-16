import { Router } from 'express';
import StudentsSubjectsController from '@controllers/students_subjects.controller';
import { CreateStudentSubjectDto } from '@dtos/student_subject.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StudentsSubjectsRoute implements Routes {
  public path = '/students-subjects';
  public router = Router();
  public studentsSubjectsController = new StudentsSubjectsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  
    this.router.post(`${this.path}`, validationMiddleware(CreateStudentSubjectDto, 'body'), this.studentsSubjectsController.create);
    // this.router.get(`${this.path}`,  this.studentsController.readStudents);
    // this.router.delete(`${this.path}/:registration`,  this.studentsController.deleteStudent);
    // this.router.put(`${this.path}/:registration`,  this.studentsController.updateStudent);

    // this.router.get(`${this.path}/name/:name`,  this.studentsController.getStudentByName);
    // this.router.get(`${this.path}/registration/:registration`,  this.studentsController.getStudentByRegistration);
    // this.router.get(`${this.path}/course/:course`,  this.studentsController.getStudentsByCourses);

    
  }
}

export default StudentsSubjectsRoute;
