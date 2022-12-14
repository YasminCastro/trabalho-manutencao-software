import { Router } from 'express';
import SubjectsController from '@controllers/subjects.controllers';
import { CreateSubjectDto } from '@dtos/subject.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class SubjectsRoute implements Routes {
  public path = '/subjects';
  public router = Router();
  public subjectsController = new SubjectsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {  
    this.router.post(`${this.path}`, validationMiddleware(CreateSubjectDto, 'body'), this.subjectsController.create);
    this.router.get(`${this.path}`,  this.subjectsController.readAll);
    this.router.put(`${this.path}/:code`,  this.subjectsController.update);
    this.router.delete(`${this.path}/:code`,  this.subjectsController.delete);
    this.router.get(`${this.path}/:name`,  this.subjectsController.readByName);    
  }
}

export default SubjectsRoute;
