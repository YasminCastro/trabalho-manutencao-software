import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { StudentClass } from '@/interfaces/studentClass.interface';
import StudentSubjectModel from '@/models/studentsClasses.model';
import TeachersClassesModel from '@/models/teacherClasses.model';
import StudentModel from '@/models/student.model';
import TeacherModel from '@/models/teacher.model';
import SubjectModel from '@/models/subject.model';
import { CreateStudentClassesDto } from '@/dtos/studentClasses.dto';
import { TeacherClass } from '@/interfaces/teacherClass.interface';
import { CreateTeacherClassesDto } from '@/dtos/teacherClasses.dto';

class ClassesService {
  public studentsClassesModel = StudentSubjectModel;
  public teachersClassesModel = TeachersClassesModel;
  public studentModel = StudentModel;
  public teacherModel = TeacherModel;
  public subjectModel = SubjectModel;
  

  public async createStudentClass(studentData: CreateStudentClassesDto): Promise<StudentClass> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    const findStudent: StudentClass = await this.studentModel.findById(studentData.studentId)
    if (!findStudent) throw new HttpException(409, `Student not found.`);

    const findSubject: StudentClass = await this.subjectModel.findById(studentData.subjectId)
    if (!findSubject) throw new HttpException(409, `Subject not found.`);

    const findStudentSubject: StudentClass = await this.studentsClassesModel.findOne({studentId: studentData.studentId, subjectId: studentData.subjectId})
    if (findStudentSubject) throw new HttpException(409, `Student already registrate in this class.`);

    const createUserData: StudentClass = await this.studentsClassesModel.create(studentData);

    return createUserData;
  }

  public async findAllStudentsClass(): Promise<StudentClass[]> {
    const classes: StudentClass[] = await this.studentsClassesModel.find();
    return classes;
  }

  public async deleteStudentClass(id: string): Promise<StudentClass> {
    const deleteClassById: StudentClass = await this.studentsClassesModel.findByIdAndDelete(id)
    if (!deleteClassById) throw new HttpException(409, "Student doesn't exist");

    return deleteClassById;
  }

  public async updateStudentClass(id: string, classData: CreateStudentClassesDto): Promise<StudentClass> {
    if (isEmpty(classData)) throw new HttpException(400, "classData is empty");

    const findClass: StudentClass = await this.studentsClassesModel.findById(id)
    if (!findClass) throw new HttpException(409, `Class not found.`);
  
    const updateClass: StudentClass = await this.studentsClassesModel.findByIdAndUpdate(id, classData)
    if (!updateClass) throw new HttpException(409, "Class doesn't exist");

    return updateClass;
  }

  public async findStudentClassById(id: string): Promise<StudentClass> {
    if (isEmpty(id)) throw new HttpException(400, "id is empty");

    const classFound: StudentClass = await this.studentsClassesModel.findById(id)
    return classFound;
  }

  public async findStudentClassByStudentId(studentId: string): Promise<StudentClass[]> {
    if (isEmpty(studentId)) throw new HttpException(400, "Student Id is empty");

    const classesFound: StudentClass[] = await this.studentsClassesModel.find({studentId})
    if (!classesFound) throw new HttpException(409, "Student id doesn't exist");

    return classesFound;
  }

  public async createTeacherClass(teacherData: CreateTeacherClassesDto): Promise<TeacherClass> {
    if (isEmpty(teacherData)) throw new HttpException(400, "teacherData is empty");

    const findTeacher: TeacherClass = await this.teacherModel.findById(teacherData.teacherId)
    if (!findTeacher) throw new HttpException(409, `Teacher not found.`);

    const findSubject: TeacherClass = await this.subjectModel.findById(teacherData.subjectId)
    if (!findSubject) throw new HttpException(409, `Subject not found.`);

    const findTeacherSubject: TeacherClass = await this.teachersClassesModel.findOne({teacherId: teacherData.teacherId, subjectId: teacherData.subjectId})
    if (findTeacherSubject) throw new HttpException(409, `Teacher already registrate in this class.`);

    const createTeacherClass: TeacherClass = await this.teachersClassesModel.create(teacherData);

    return createTeacherClass;
  }

  public async findAllTeachersClass(): Promise<TeacherClass[]> {
    const classes: TeacherClass[] = await this.teachersClassesModel.find();
    return classes;
  }

  public async deleteTeacherClass(id: string): Promise<TeacherClass> {
    const deleteClassById: TeacherClass = await this.teachersClassesModel.findByIdAndDelete(id)
    if (!deleteClassById) throw new HttpException(409, "Teacher doesn't exist");

    return deleteClassById;
  }

  public async updateTeacherClass(id: string, classData: CreateTeacherClassesDto): Promise<TeacherClass> {
    if (isEmpty(classData)) throw new HttpException(400, "classData is empty");

    const findClass: TeacherClass = await this.teachersClassesModel.findById(id)
    if (!findClass) throw new HttpException(409, `Class not found.`);
  
    const updateClass: TeacherClass = await this.teachersClassesModel.findByIdAndUpdate(id, classData)
    if (!updateClass) throw new HttpException(409, "Class doesn't exist");

    return updateClass;
  }

  public async findTeacherClassById(id: string): Promise<TeacherClass> {
    if (isEmpty(id)) throw new HttpException(400, "id is empty");

    const classFound: TeacherClass = await this.teachersClassesModel.findById(id)
    return classFound;
  }

  public async findTeacherClassByTeacherId(teacherId: string): Promise<TeacherClass[]> {
    if (isEmpty(teacherId)) throw new HttpException(400, "Teacher Id is empty");

    const classesFound: TeacherClass[] = await this.teachersClassesModel.find({teacherId})
    if (!classesFound) throw new HttpException(409, "Teacher id doesn't exist");

    return classesFound;
  }

}

export default ClassesService;
