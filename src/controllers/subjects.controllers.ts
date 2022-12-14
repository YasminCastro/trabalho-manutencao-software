import { NextFunction, Request, Response } from 'express';
import { CreateSubjectDto } from '@dtos/subject.dto';
import { Subject } from '@interfaces/subject.interface';
import subjectsService from '@services/subjects.service';

class SubjectsController {
  public studentService = new subjectsService();

  public insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subjectData: CreateSubjectDto = req.body;
      const createSubject: Subject = await this.studentService.createSubject(subjectData);

      res.status(201).json({ data: createSubject, success: true });
    } catch (error) {
      next(error);
    }
  };

  public readSubjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubjects: Subject[] = await this.studentService.findAllSubjects();

      res.status(200).json(findAllSubjects);
    } catch (error) {
      next(error);
    }
  };

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


}

export default SubjectsController;
