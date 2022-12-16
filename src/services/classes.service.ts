import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Classes } from '@/interfaces/classes.interface';
import StudentSubjectModel from '@/models/classes.model';
import StudentModel from '@/models/student.model';
import SubjectModel from '@/models/subject.model';
import { CreateClassesDto } from '@/dtos/classes.dto';

class ClassesService {
  public classesModel = StudentSubjectModel;
  public studentModel = StudentModel;
  public subjectModel = SubjectModel;
  

  public async create(studentData: CreateClassesDto): Promise<Classes> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    const findStudent: Classes = await this.studentModel.findById(studentData.studentId)
    if (!findStudent) throw new HttpException(409, `Student not found.`);

    const findSubject: Classes = await this.subjectModel.findById(studentData.subjectId)
    if (!findSubject) throw new HttpException(409, `Subject not found.`);

    const findStudentSubject: Classes = await this.classesModel.findOne({studentId: studentData.studentId, subjectId: studentData.subjectId})
    if (findStudentSubject) throw new HttpException(409, `Student already registrate in this class.`);

    const createUserData: Classes = await this.classesModel.create(studentData);

    return createUserData;
  }

  // public async findAllStudents(): Promise<Student[]> {
  //   const students: Student[] = await this.studentsSubjects.find();
  //   return students;
  // }

  // public async deleteStudent(registration: string): Promise<Student> {
  //   const deleteUserByRegistration: Student = await this.studentsSubjects.findOneAndDelete({registration:registration});
  //   if (!deleteUserByRegistration) throw new HttpException(409, "Student doesn't exist");

  //   return deleteUserByRegistration;
  // }

  // public async updateStudent(registration: string, studentData: CreateStudentDto): Promise<Student> {
  //   if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

  //   if (studentData.email) {
  //     const findStudent: Student = await this.studentsSubjects.findOne({ email: studentData.email });
  //     if (findStudent && findStudent.registration != registration) throw new HttpException(409, `This email ${studentData.email} already exists`);
  //   }
  
  //   const updateUserByRegistration: Student = await this.studentsSubjects.findOneAndUpdate({registration}, studentData)
  //   if (!updateUserByRegistration) throw new HttpException(409, "Student doesn't exist");

  //   return updateUserByRegistration;
  // }

  // public async findStudentByName(studentName: string): Promise<Student[]> {
  //   if (isEmpty(studentName)) throw new HttpException(400, "studentName is empty");

  //   const findStudent: Student[] = await this.studentsSubjects.find({name: studentName})

  //   return findStudent;
  // }

  // public async findStudentByRegistration(registration: string): Promise<Student> {
  //   if (isEmpty(registration)) throw new HttpException(400, "registration is empty");

  //   const findStudent: Student = await this.studentsSubjects.findOne({registration})
  //   if (!findStudent) throw new HttpException(409, "Student doesn't exist");

  //   return findStudent;
  // }

  // public async findStudentsByCourse(course: string): Promise<Student[]> {
  //   if (isEmpty(course)) throw new HttpException(400, "course is empty");

  //   const studentsFound: Student[] = await this.studentsSubjects.find({course})
  //   if (!studentsFound) throw new HttpException(409, `Students not found for the cours ${course}`);

  //   return studentsFound;
  // }

}

export default ClassesService;
