import { Router } from 'express';
import ClassesController from '@/controllers/classes.controller';
import { CreateClassesDto } from '@/dtos/classes.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ClassesRoute implements Routes {
  public path = '/classes';
  public router = Router();
  public classesController = new ClassesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  
    this.router.post(`${this.path}`, validationMiddleware(CreateClassesDto, 'body'), this.classesController.create);
    // this.router.get(`${this.path}`,  this.studentsController.readStudents);
    // this.router.delete(`${this.path}/:registration`,  this.studentsController.deleteStudent);
    // this.router.put(`${this.path}/:registration`,  this.studentsController.updateStudent);

    // this.router.get(`${this.path}/name/:name`,  this.studentsController.getStudentByName);
    // this.router.get(`${this.path}/registration/:registration`,  this.studentsController.getStudentByRegistration);
    // this.router.get(`${this.path}/course/:course`,  this.studentsController.getStudentsByCourses);

    
  }
}

export default ClassesRoute;
