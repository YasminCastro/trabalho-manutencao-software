import { NextFunction, Request, Response } from 'express';
import { CreateStudentClassesDto } from '@/dtos/studentClasses.dto';
import studentsService from '@services/students.service';
import ClassesService from '@/services/classes.service';
import { StudentClass } from '@/interfaces/studentClass.interface';

class ClassesController {
  public studentService = new studentsService();
  public classesService = new ClassesService();

  public createStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: CreateStudentClassesDto = req.body;
      const createClasseData: StudentClass = await this.classesService.createClass(studentData);

      res.status(201).json({ data: createClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public findAllStudentsClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStudentsClassesData: StudentClass[] = await this.classesService.findAllClass();

      res.status(200).json(findAllStudentsClassesData);
    } catch (error) {
      next(error);
    }
  };

  public deleteStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteClasseData: StudentClass = await this.classesService.deleteClass(id);

      res.status(200).json({ data: deleteClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public updateStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classData: CreateStudentClassesDto = req.body;

      const updateClassData: StudentClass = await this.classesService.updateClass(id, classData);

      res.status(200).json({ data: updateClassData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getStudentClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classFound: StudentClass = await this.classesService.findClassById(id);

      res.status(200).json(classFound);
    } catch (error) {
      next(error);
    }
  };

  public getStudentClassByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId: string = req.params.studentId;
      const classesFound: StudentClass[] = await this.classesService.findClassByStudentId(studentId);

      res.status(200).json(classesFound);
    } catch (error) {
      next(error);
    }
  };


  public createTeacherClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: CreateStudentClassesDto = req.body;
      const createClasseData: StudentClass = await this.classesService.createClass(studentData);

      res.status(201).json({ data: createClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

}

export default ClassesController;
