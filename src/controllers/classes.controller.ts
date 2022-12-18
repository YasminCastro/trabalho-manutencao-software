import { NextFunction, Request, Response } from 'express';
import { CreateStudentClassesDto } from '@/dtos/studentClasses.dto';
import StudentsService from '@services/students.service';
import ClassesService from '@/services/classes.service';
import { StudentClass } from '@/interfaces/studentClass.interface';
import { TeacherClass } from '@/interfaces/teacherClass.interface';
import { CreateTeacherClassesDto } from '@/dtos/teacherClasses.dto';

class ClassesController {
  public studentService = new StudentsService();
  public classesService = new ClassesService();

  public createStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: CreateStudentClassesDto = req.body;
      const createClasseData: StudentClass = await this.classesService.createStudentClass(studentData);

      res.status(201).json({ data: createClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public findAllStudentsClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStudentsClassesData: StudentClass[] = await this.classesService.findAllStudentsClass();

      res.status(200).json(findAllStudentsClassesData);
    } catch (error) {
      next(error);
    }
  };

  public deleteStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const deleteClasseData: StudentClass = await this.classesService.deleteStudentClass(id);

      res.status(200).json({ data: deleteClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public updateStudentClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classData: CreateStudentClassesDto = req.body;

      const updateClassData: StudentClass = await this.classesService.updateStudentClass(id, classData);

      res.status(200).json({ data: updateClassData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getStudentClassById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const classFound: StudentClass = await this.classesService.findStudentClassById(id);

      res.status(200).json(classFound);
    } catch (error) {
      next(error);
    }
  };

  public getStudentClassByStudentId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId: string = req.params.studentId;
      const classesFound: StudentClass[] = await this.classesService.findStudentClassByStudentId(studentId);

      res.status(200).json(classesFound);
    } catch (error) {
      next(error);
    }
  };

  public createTeacherClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherData: CreateTeacherClassesDto = req.body;
      const createClasseData: TeacherClass = await this.classesService.createTeacherClass(teacherData);

      res.status(201).json({ data: createClasseData, success: true });
    } catch (error) {
      next(error);
    }
  };

}

export default ClassesController;
