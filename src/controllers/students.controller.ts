import { NextFunction, Request, Response } from 'express';
import { CreateStudentDto } from '@dtos/student.dto';
import { Student } from '@interfaces/student.interface';
import studentsService from '@services/students.service';

class StudentsController {
  public studentService = new studentsService();

  public insertStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateStudentDto = req.body;
      const createStudentData: Student = await this.studentService.createStudent(userData);

      res.status(201).json({ data: createStudentData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public readStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Student[] = await this.studentService.findAllStudents();

      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registration: string = req.params.registration;
      const deleteUserData: Student = await this.studentService.deleteStudent(registration);

      res.status(200).json({ data: deleteUserData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registration: string = req.params.registration;
      const studentData: CreateStudentDto = req.body;

      const updateUserData: Student = await this.studentService.updateStudent(registration, studentData);

      res.status(200).json({ data: updateUserData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getStudentByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentName: string = req.params.name;
      const studentsFound: Student[] = await this.studentService.findStudentByName(studentName);

      res.status(200).json(studentsFound);
    } catch (error) {
      next(error);
    }
  };

  public getStudentByRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registration: string = req.params.registration;
      const studentFound: Student = await this.studentService.findStudentByRegistration(registration);

      res.status(200).json(studentFound);
    } catch (error) {
      next(error);
    }
  };

  public getStudentsByCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course: string = req.params.course;
      const studentFound: Student[] = await this.studentService.findStudentsByCourse(course);

      res.status(200).json(studentFound);
    } catch (error) {
      next(error);
    }
  };

}

export default StudentsController;
