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
}

export default StudentsService;
