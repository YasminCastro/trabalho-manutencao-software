import { CreateStudentDto } from '@dtos/student.dto';
import { HttpException } from '@exceptions/HttpException';
import teacherModel from '@models/teacher.model';
import { isEmpty } from '@utils/util';
import { Student } from '@/interfaces/student.interface';
import { Teacher } from '@/interfaces/teacher.interface';
import { CreateTeacherDto } from '@/dtos/teacher.dto';

class StudentsService {
  public teacher = teacherModel;

  public async create(teacherData: CreateTeacherDto): Promise<Teacher> {
    if (isEmpty(teacherData)) throw new HttpException(400, "teacherData is empty");

    const findTeacher: Teacher = await this.teacher.findOne({ email: teacherData.email });
    if (findTeacher) throw new HttpException(409, `This email ${teacherData.email} already exists`);

    const createTeacherData: Teacher = await this.teacher.create(teacherData);

    return createTeacherData;
  }

  public async findAllStudents(): Promise<Student[]> {
    const students: Student[] = await this.teacher.find();
    return students;
  }

  public async deleteStudent(registration: string): Promise<Student> {
    const deleteUserByRegistration: Student = await this.teacher.findOneAndDelete({registration:registration});
    if (!deleteUserByRegistration) throw new HttpException(409, "Student doesn't exist");

    return deleteUserByRegistration;
  }

  public async updateStudent(registration: string, studentData: CreateStudentDto): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    if (studentData.email) {
      const findStudent: Student = await this.teacher.findOne({ email: studentData.email });
      if (findStudent && findStudent.registration != registration) throw new HttpException(409, `This email ${studentData.email} already exists`);
    }
  
    const updateUserByRegistration: Student = await this.teacher.findOneAndUpdate({registration}, studentData)
    if (!updateUserByRegistration) throw new HttpException(409, "Student doesn't exist");

    return updateUserByRegistration;
  }

  public async findStudentByName(studentName: string): Promise<Student[]> {
    if (isEmpty(studentName)) throw new HttpException(400, "studentName is empty");

    const findStudent: Student[] = await this.teacher.find({name: studentName})

    return findStudent;
  }

  public async findStudentByRegistration(registration: string): Promise<Student> {
    if (isEmpty(registration)) throw new HttpException(400, "registration is empty");

    const findStudent: Student = await this.teacher.findOne({registration})
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    return findStudent;
  }

  public async findStudentsByCourse(course: string): Promise<Student[]> {
    if (isEmpty(course)) throw new HttpException(400, "course is empty");

    const studentsFound: Student[] = await this.teacher.find({course})
    if (!studentsFound) throw new HttpException(409, `Students not found for the cours ${course}`);

    return studentsFound;
  }

}

export default StudentsService;
