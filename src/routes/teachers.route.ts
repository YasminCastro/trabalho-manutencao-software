import { Router } from 'express';
import TeachersController from '@controllers/teachers.controller';
import { CreateTeacherDto } from '@dtos/teacher.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TeachersRoute implements Routes {
  public path = '/teachers';
  public router = Router();
  public teachersControllers = new TeachersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  
    this.router.post(`${this.path}`, validationMiddleware(CreateTeacherDto, 'body'), this.teachersControllers.insert);
    this.router.get(`${this.path}`,  this.teachersControllers.readAll);
    this.router.delete(`${this.path}/:id`,  this.teachersControllers.delete);
    this.router.put(`${this.path}/:id`,  this.teachersControllers.update);

    this.router.get(`${this.path}/name/:name`,  this.teachersControllers.findTeacherByName);
    // this.router.get(`${this.path}/registration/:registration`,  this.teachersControllers.getStudentByRegistration);
    // this.router.get(`${this.path}/course/:course`,  this.teachersControllers.getStudentsByCourses);

    
  }
}

export default TeachersRoute;
