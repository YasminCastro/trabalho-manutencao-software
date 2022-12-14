import { CreateSubjectDto } from '@dtos/subject.dto';
import { HttpException } from '@exceptions/HttpException';
import subjectModel from '@models/subject.model';
import { isEmpty } from '@utils/util';
import { Subject } from '@/interfaces/subject.interface';

class SubjectsService {
  public subject = subjectModel;

  public async createSubject(subjectData: CreateSubjectDto): Promise<Subject> {
    if (isEmpty(subjectData)) throw new HttpException(400, "subjectData is empty");

    const findSubject: Subject = await this.subject.findOne({ code: subjectData.code });
    if (findSubject) throw new HttpException(409, `This code ${subjectData.code} already exists`);

    const createSubjectData: Subject = await this.subject.create(subjectData);

    return createSubjectData;
  }

  // public async findAllStudents(): Promise<Student[]> {
  //   const students: Student[] = await this.students.find();
  //   return students;
  // }

  // public async deleteStudent(registration: string): Promise<Student> {
  //   const deleteUserByRegistration: Student = await this.students.findOneAndDelete({registration:registration});
  //   if (!deleteUserByRegistration) throw new HttpException(409, "Student doesn't exist");

  //   return deleteUserByRegistration;
  // }

  // public async updateStudent(registration: string, studentData: CreateStudentDto): Promise<Student> {
  //   if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

  //   if (studentData.email) {
  //     const findStudent: Student = await this.students.findOne({ email: studentData.email });
  //     if (findStudent && findStudent.registration != registration) throw new HttpException(409, `This email ${studentData.email} already exists`);
  //   }
  
  //   const updateUserByRegistration: Student = await this.students.findOneAndUpdate({registration}, studentData)
  //   if (!updateUserByRegistration) throw new HttpException(409, "Student doesn't exist");

  //   return updateUserByRegistration;
  // }

  // public async findStudentByName(studentName: string): Promise<Student[]> {
  //   if (isEmpty(studentName)) throw new HttpException(400, "studentName is empty");

  //   const findStudent: Student[] = await this.students.find({name: studentName})

  //   return findStudent;
  // }


}

export default SubjectsService;
