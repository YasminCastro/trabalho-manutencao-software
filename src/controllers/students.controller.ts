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

      res.status(201).json({ data: createStudentData, created: true });
    } catch (error) {
      next(error);
    }
  };

}

export default StudentsController;
