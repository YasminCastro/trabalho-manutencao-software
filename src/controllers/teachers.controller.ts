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

  // public updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const studentData: CreateStudentDto = req.body;

  //     const updateUserData: Teacher = await this.studentService.updateStudent(registration, studentData);

  //     res.status(200).json({ data: updateUserData, success: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentByName = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const studentName: string = req.params.name;
  //     const studentsFound: Teacher[] = await this.studentService.findStudentByName(studentName);

  //     res.status(200).json(studentsFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentByRegistration = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const studentFound: Teacher = await this.studentService.findStudentByRegistration(registration);

  //     res.status(200).json(studentFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentsByCourses = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const course: string = req.params.course;
  //     const studentFound: Teacher[] = await this.studentService.findStudentsByCourse(course);

  //     res.status(200).json(studentFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

}

export default TeachersController;
