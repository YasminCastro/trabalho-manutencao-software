import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Class } from '@/interfaces/classes.interface';
import StudentSubjectModel from '@/models/classes.model';
import StudentModel from '@/models/student.model';
import SubjectModel from '@/models/subject.model';
import { CreateClassesDto } from '@/dtos/classes.dto';

class ClassesService {
  public classesModel = StudentSubjectModel;
  public studentModel = StudentModel;
  public subjectModel = SubjectModel;
  

  public async createClass(studentData: CreateClassesDto): Promise<Class> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    const findStudent: Class = await this.studentModel.findById(studentData.studentId)
    if (!findStudent) throw new HttpException(409, `Student not found.`);

    const findSubject: Class = await this.subjectModel.findById(studentData.subjectId)
    if (!findSubject) throw new HttpException(409, `Subject not found.`);

    const findStudentSubject: Class = await this.classesModel.findOne({studentId: studentData.studentId, subjectId: studentData.subjectId})
    if (findStudentSubject) throw new HttpException(409, `Student already registrate in this class.`);

    const createUserData: Class = await this.classesModel.create(studentData);

    return createUserData;
  }

  public async findAllClass(): Promise<Class[]> {
    const classes: Class[] = await this.classesModel.find();
    return classes;
  }

  public async deleteClass(id: string): Promise<Class> {
    const deleteClassById: Class = await this.classesModel.findByIdAndDelete(id)
    if (!deleteClassById) throw new HttpException(409, "Student doesn't exist");

    return deleteClassById;
  }

  public async updateClass(id: string, classData: CreateClassesDto): Promise<Class> {
    if (isEmpty(classData)) throw new HttpException(400, "classData is empty");

    const findClass: Class = await this.classesModel.findById(id)
    if (!findClass) throw new HttpException(409, `Class not found.`);
  
    const updateClass: Class = await this.classesModel.findByIdAndUpdate(id, classData)
    if (!updateClass) throw new HttpException(409, "Class doesn't exist");

    return updateClass;
  }

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
