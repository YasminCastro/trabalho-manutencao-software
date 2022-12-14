import { Router } from 'express';
import StudentsController from '@controllers/students.controller';
import { CreateStudentDto } from '@dtos/student.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class StudentsRoute implements Routes {
  public path = '/students';
  public router = Router();
  public studentsController = new StudentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  
    this.router.post(`${this.path}`, validationMiddleware(CreateStudentDto, 'body'), this.studentsController.insertStudent);
    this.router.get(`${this.path}`,  this.studentsController.readStudents);
    this.router.delete(`${this.path}/:registration`,  this.studentsController.deleteStudent);
    this.router.put(`${this.path}/:registration`,  this.studentsController.updateStudent);

    this.router.get(`${this.path}/name/:name`,  this.studentsController.getStudentByName);
    this.router.get(`${this.path}/registration/:registration`,  this.studentsController.getStudentByRegistration);
    this.router.get(`${this.path}/course/:course`,  this.studentsController.getStudentsByCourses);

    
  }
}

export default StudentsRoute;
