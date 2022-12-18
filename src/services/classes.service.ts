import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { StudentClass } from '@/interfaces/studentClass.interface';
import StudentSubjectModel from '@/models/studentsClasses.model';
import StudentModel from '@/models/student.model';
import SubjectModel from '@/models/subject.model';
import { CreateStudentClassesDto } from '@/dtos/studentClasses.dto';

class ClassesService {
  public classesModel = StudentSubjectModel;
  public studentModel = StudentModel;
  public subjectModel = SubjectModel;
  

  public async createClass(studentData: CreateStudentClassesDto): Promise<StudentClass> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    const findStudent: StudentClass = await this.studentModel.findById(studentData.studentId)
    if (!findStudent) throw new HttpException(409, `Student not found.`);

    const findSubject: StudentClass = await this.subjectModel.findById(studentData.subjectId)
    if (!findSubject) throw new HttpException(409, `Subject not found.`);

    const findStudentSubject: StudentClass = await this.classesModel.findOne({studentId: studentData.studentId, subjectId: studentData.subjectId})
    if (findStudentSubject) throw new HttpException(409, `Student already registrate in this class.`);

    const createUserData: StudentClass = await this.classesModel.create(studentData);

    return createUserData;
  }

  public async findAllClass(): Promise<StudentClass[]> {
    const classes: StudentClass[] = await this.classesModel.find();
    return classes;
  }

  public async deleteClass(id: string): Promise<StudentClass> {
    const deleteClassById: StudentClass = await this.classesModel.findByIdAndDelete(id)
    if (!deleteClassById) throw new HttpException(409, "Student doesn't exist");

    return deleteClassById;
  }

  public async updateClass(id: string, classData: CreateStudentClassesDto): Promise<StudentClass> {
    if (isEmpty(classData)) throw new HttpException(400, "classData is empty");

    const findClass: StudentClass = await this.classesModel.findById(id)
    if (!findClass) throw new HttpException(409, `Class not found.`);
  
    const updateClass: StudentClass = await this.classesModel.findByIdAndUpdate(id, classData)
    if (!updateClass) throw new HttpException(409, "Class doesn't exist");

    return updateClass;
  }

  public async findClassById(id: string): Promise<StudentClass> {
    if (isEmpty(id)) throw new HttpException(400, "id is empty");

    const classFound: StudentClass = await this.classesModel.findById(id)
    return classFound;
  }

  public async findClassByStudentId(studentId: string): Promise<StudentClass[]> {
    if (isEmpty(studentId)) throw new HttpException(400, "Student Id is empty");

    const classesFound: StudentClass[] = await this.classesModel.find({studentId})
    if (!classesFound) throw new HttpException(409, "Student id doesn't exist");

    return classesFound;
  }

}

export default ClassesService;
