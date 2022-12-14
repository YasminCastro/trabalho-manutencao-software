import { CreateSubjectDto } from '@dtos/subject.dto';
import { HttpException } from '@exceptions/HttpException';
import subjectModel from '@models/subject.model';
import { isEmpty } from '@utils/util';
import { Subject } from '@/interfaces/subject.interface';

class SubjectsService {
  public subject = subjectModel;

  public async create(subjectData: CreateSubjectDto): Promise<Subject> {
    if (isEmpty(subjectData)) throw new HttpException(400, "subjectData is empty");

    const findSubject: Subject = await this.subject.findOne({ code: subjectData.code });
    if (findSubject) throw new HttpException(409, `This code ${subjectData.code} already exists`);

    const createSubjectData: Subject = await this.subject.create(subjectData);

    return createSubjectData;
  }

  public async readAll(): Promise<Subject[]> {
    const subjects: Subject[] = await this.subject.find();
    return subjects;
  }

  public async delete(code: string): Promise<Subject> {
    const deleteSubjectByCode: Subject = await this.subject.findOneAndDelete({code});
    if (!deleteSubjectByCode) throw new HttpException(409, "Subject doesn't exist");

    return deleteSubjectByCode;
  }

  public async update(code: string, projectData: CreateSubjectDto): Promise<Subject> {
    if (isEmpty(projectData)) throw new HttpException(400, "projectData is empty");

    if (projectData.code) {
      const findSubject: Subject = await this.subject.findOne({ code: projectData.code });
      if (findSubject && findSubject.code != code) throw new HttpException(409, `This code ${projectData.code} is already exists`);
    }
  
    const updateSubjectByCode: Subject = await this.subject.findOneAndUpdate({code}, projectData)
    if (!updateSubjectByCode) throw new HttpException(409, "Project doesn't exist");

    return updateSubjectByCode;
  }

  public async findSubjectByName(subjectName: string): Promise<Subject> {
    if (isEmpty(subjectName)) throw new HttpException(400, "studentName is empty");

    const subjectFound: Subject = await this.subject.findOne({name: subjectName})

    return subjectFound;
  }


}

export default SubjectsService;
