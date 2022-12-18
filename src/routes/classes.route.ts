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
    this.router.get(`${this.path}`,  this.classesController.read);
    this.router.delete(`${this.path}/:id`,  this.classesController.delete);
    this.router.put(`${this.path}/:id`,  this.classesController.update);
    this.router.get(`${this.path}/:id`,  this.classesController.getClassById);
    this.router.get(`${this.path}/studentId/:studentId`,  this.classesController.getClassByStudentId);    
  }
}

export default ClassesRoute;
