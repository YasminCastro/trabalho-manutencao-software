import { CreateStudentDto } from '@dtos/student.dto';
import { HttpException } from '@exceptions/HttpException';
import studentModel from '@models/student.model';
import { isEmpty } from '@utils/util';
import { Student } from '@/interfaces/student.interface';

class StudentsService {
  public students = studentModel;

  public async createStudent(studentData: CreateStudentDto): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    const findStudent: Student = await this.students.findOne({ registration: studentData.registration });
    if (findStudent) throw new HttpException(409, `This registration ${studentData.registration} already exists`);

    const createUserData: Student = await this.students.create(studentData);

    return createUserData;
  }

  public async findAllStudents(): Promise<Student[]> {
    const students: Student[] = await this.students.find();
    return students;
  }

  public async deleteStudent(registration: string): Promise<Student> {
    const deleteUserByRegistration: Student = await this.students.findOneAndDelete({registration:registration});
    if (!deleteUserByRegistration) throw new HttpException(409, "Student doesn't exist");

    return deleteUserByRegistration;
  }

  public async updateStudent(registration: string, studentData: CreateStudentDto): Promise<Student> {
    if (isEmpty(studentData)) throw new HttpException(400, "studentData is empty");

    if (studentData.email) {
      const findStudent: Student = await this.students.findOne({ email: studentData.email });
      if (findStudent && findStudent.registration != registration) throw new HttpException(409, `This email ${studentData.email} already exists`);
    }
  
    const updateUserByRegistration: Student = await this.students.findOneAndUpdate({registration}, studentData)
    if (!updateUserByRegistration) throw new HttpException(409, "Student doesn't exist");

    return updateUserByRegistration;
  }

  public async findStudentByName(studentName: string): Promise<Student[]> {
    if (isEmpty(studentName)) throw new HttpException(400, "studentName is empty");

    const findStudent: Student[] = await this.students.find({name: studentName})

    return findStudent;
  }

  public async findStudentByRegistration(registration: string): Promise<Student> {
    if (isEmpty(registration)) throw new HttpException(400, "registration is empty");

    const findStudent: Student = await this.students.findOne({registration})
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    return findStudent;
  }

  public async findStudentsByCourse(course: string): Promise<Student[]> {
    if (isEmpty(course)) throw new HttpException(400, "course is empty");

    const studentsFound: Student[] = await this.students.find({course})
    if (!studentsFound) throw new HttpException(409, `Students not found for the cours ${course}`);

    return studentsFound;
  }

}

export default StudentsService;
