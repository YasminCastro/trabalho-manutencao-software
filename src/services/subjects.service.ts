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

  // public async deleteStudent(registration: string): Promise<Student> {
  //   const deleteUserByRegistration: Student = await this.students.findOneAndDelete({registration:registration});
  //   if (!deleteUserByRegistration) throw new HttpException(409, "Student doesn't exist");

  //   return deleteUserByRegistration;
  // }

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

  // public async findStudentByName(studentName: string): Promise<Student[]> {
  //   if (isEmpty(studentName)) throw new HttpException(400, "studentName is empty");

  //   const findStudent: Student[] = await this.students.find({name: studentName})

  //   return findStudent;
  // }


}

export default SubjectsService;
