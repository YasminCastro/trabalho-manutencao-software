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

  public async findClassById(id: string): Promise<Class> {
    if (isEmpty(id)) throw new HttpException(400, "id is empty");

    const classFound: Class = await this.classesModel.findById(id)
    return classFound;
  }

  public async findClassByStudentId(studentId: string): Promise<Class[]> {
    if (isEmpty(studentId)) throw new HttpException(400, "Student Id is empty");

    const classesFound: Class[] = await this.classesModel.find({studentId})
    if (!classesFound) throw new HttpException(409, "Student id doesn't exist");

    return classesFound;
  }

}

export default ClassesService;
