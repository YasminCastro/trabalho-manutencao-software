import { Router } from 'express';
import ClassesController from '@/controllers/classes.controller';
import { CreateStudentClassesDto } from '@/dtos/studentClasses.dto';
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
  
    this.router.post(`${this.path}/student`, validationMiddleware(CreateStudentClassesDto, 'body'), this.classesController.createStudentClass);
    this.router.get(`${this.path}/student`,  this.classesController.findAllStudentsClasses);
    this.router.delete(`${this.path}/student/:id`,  this.classesController.deleteStudentClass);
    this.router.put(`${this.path}/student/:id`,  this.classesController.updateStudentClass);
    this.router.get(`${this.path}/student/:id`,  this.classesController.getStudentClassById);
    this.router.get(`${this.path}/student/studentId/:studentId`,  this.classesController.getStudentClassByStudentId); 
    
    this.router.post(`${this.path}/teacher`, validationMiddleware(CreateStudentClassesDto, 'body'), this.classesController.createStudentClass);
    

  }
}

export default ClassesRoute;
