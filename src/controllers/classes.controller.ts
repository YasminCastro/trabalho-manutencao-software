import { NextFunction, Request, Response } from 'express';
import { CreateClassesDto } from '@/dtos/classes.dto';
import { Student } from '@interfaces/student.interface';
import studentsService from '@services/students.service';
import ClassesService from '@/services/classes.service';
import { Classes } from '@/interfaces/classes.interface';

class ClassesController {
  public studentService = new studentsService();
  public studentsSubjectsService = new ClassesService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: CreateClassesDto = req.body;
      const createStudentData: Classes = await this.studentsSubjectsService.create(studentData);

      res.status(201).json({ data: createStudentData, success: true });
    } catch (error) {
      next(error);
    }
  };

  // public readStudents = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllUsersData: Student[] = await this.studentService.findAllStudents();

  //     res.status(200).json(findAllUsersData);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const deleteUserData: Student = await this.studentService.deleteStudent(registration);

  //     res.status(200).json({ data: deleteUserData, success: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const studentData: CreateStudentDto = req.body;

  //     const updateUserData: Student = await this.studentService.updateStudent(registration, studentData);

  //     res.status(200).json({ data: updateUserData, success: true });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentByName = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const studentName: string = req.params.name;
  //     const studentsFound: Student[] = await this.studentService.findStudentByName(studentName);

  //     res.status(200).json(studentsFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentByRegistration = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const registration: string = req.params.registration;
  //     const studentFound: Student = await this.studentService.findStudentByRegistration(registration);

  //     res.status(200).json(studentFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getStudentsByCourses = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const course: string = req.params.course;
  //     const studentFound: Student[] = await this.studentService.findStudentsByCourse(course);

  //     res.status(200).json(studentFound);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

}

export default ClassesController;
