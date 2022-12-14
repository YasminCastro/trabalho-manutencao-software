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

  // public readStudents = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllUsersData: Teacher[] = await this.studentService.findAllStudents();

  //     res.status(200).json(findAllUsersData);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const deleteUserData: Teacher = await this.studentService.deleteStudent(registration);

  //     res.status(200).json({ data: deleteUserData, success: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

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
