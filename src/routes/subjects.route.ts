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
    this.router.post(`${this.path}`, validationMiddleware(CreateSubjectDto, 'body'), this.subjectsController.insert);
    this.router.get(`${this.path}`,  this.subjectsController.readSubjects);
 

    
  }
}

export default SubjectsRoute;
