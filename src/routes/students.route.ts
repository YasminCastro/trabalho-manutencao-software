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
    
  }
}

export default StudentsRoute;
