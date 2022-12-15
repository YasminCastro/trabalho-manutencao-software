import { NextFunction, Request, Response } from 'express';
import { CreateTeacherDto } from '@dtos/teacher.dto';
import { Teacher } from '@interfaces/teacher.interface';
import TeachersService from '@services/teachers.service';

class TeachersController {
  public teacherService = new TeachersService();

  public insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherData: CreateTeacherDto = req.body;
      const createTeacherData: Teacher = await this.teacherService.create(teacherData);

      res.status(201).json({ data: createTeacherData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTeachersData: Teacher[] = await this.teacherService.findAllTeachers();

      res.status(200).json(findAllTeachersData);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteUserData: Teacher = await this.teacherService.delete(id);

      res.status(200).json({ data: deleteUserData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const teacherData: CreateTeacherDto = req.body;

      const updateTeacherData: Teacher = await this.teacherService.update(id, teacherData);

      res.status(200).json({ data: updateTeacherData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public findTeacherByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name: string = req.params.name;
      const teachersFound: Teacher[] = await this.teacherService.findTeacherByName(name);

      res.status(200).json(teachersFound);
    } catch (error) {
      next(error);
    }
  };

  public findTeachersByFormation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const formation: string = req.params.formation;
      const teachersFound: Teacher[] = await this.teacherService.findTeachersByFormation(formation);

      res.status(200).json(teachersFound);
    } catch (error) {
      next(error);
    }
  };

  public findeTeachersByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const title: string = req.params.title;
      const teachersFound: Teacher[] = await this.teacherService.findTeachersByTitle(title);

      res.status(200).json(teachersFound);
    } catch (error) {
      next(error);
    }
  };

}

export default TeachersController;
