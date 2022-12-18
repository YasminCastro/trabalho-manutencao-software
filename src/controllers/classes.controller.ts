import { NextFunction, Request, Response } from 'express';
import { CreateClassesDto } from '@/dtos/classes.dto';
import studentsService from '@services/students.service';
import ClassesService from '@/services/classes.service';
import { Class } from '@/interfaces/classes.interface';

class ClassesController {
  public studentService = new studentsService();
  public classesService = new ClassesService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: CreateClassesDto = req.body;
      const createClasseData: Class = await this.classesService.createClass(studentData);

      res.status(201).json({ data: createClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStudentsClassesData: Class[] = await this.classesService.findAllClass();

      res.status(200).json(findAllStudentsClassesData);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteClasseData: Class = await this.classesService.deleteClass(id);

      res.status(200).json({ data: deleteClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classData: CreateClassesDto = req.body;

      const updateClassData: Class = await this.classesService.updateClass(id, classData);

      res.status(200).json({ data: updateClassData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classFound: Class = await this.classesService.findClassById(id);

      res.status(200).json(classFound);
    } catch (error) {
      next(error);
    }
  };

  public getClassByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId: string = req.params.studentId;
      const classesFound: Class[] = await this.classesService.findClassByStudentId(studentId);

      res.status(200).json(classesFound);
    } catch (error) {
      next(error);
    }
  };

}

export default ClassesController;
