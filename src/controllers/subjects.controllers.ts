import { NextFunction, Request, Response } from 'express';
import { CreateSubjectDto } from '@dtos/subject.dto';
import { Subject } from '@interfaces/subject.interface';
import subjectsService from '@services/subjects.service';

class SubjectsController {
  public subjectsService = new subjectsService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subjectData: CreateSubjectDto = req.body;
      const createSubject: Subject = await this.subjectsService.create(subjectData);

      res.status(201).json({ data: createSubject, success: true });
    } catch (error) {
      next(error);
    }
  };

  public readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubjects: Subject[] = await this.subjectsService.readAll();

      res.status(200).json(findAllSubjects);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code: string = req.params.code;
      const deleteSubjectData: Subject = await this.subjectsService.delete(code);

      res.status(200).json({ data: deleteSubjectData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code: string = req.params.code;
      const subjectData: CreateSubjectDto = req.body;

      const updateProjectData: Subject = await this.subjectsService.update(code, subjectData);

      res.status(200).json({ data: updateProjectData, success: true });
    } catch (error) {
      next(error);
    }
  };

  public readByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subjectName: string = req.params.name;
      const subjectFound: Subject = await this.subjectsService.findSubjectByName(subjectName);

      res.status(200).json(subjectFound);
    } catch (error) {
      next(error);
    }
  };


}

export default SubjectsController;
