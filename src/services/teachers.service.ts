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

  public async findAllTeachers(): Promise<Teacher[]> {
    const teachers: Teacher[] = await this.teacher.find();
    return teachers;
  }

  public async delete(id: string): Promise<Teacher> {
    const deleteTeacherById: Teacher = await this.teacher.findByIdAndDelete(id)
    if (!deleteTeacherById) throw new HttpException(409, "Teacher doesn't exist");

    return deleteTeacherById;
  }

  public async update(id: string, teacherData: CreateTeacherDto): Promise<Teacher> {
    if (isEmpty(teacherData)) throw new HttpException(400, "teacherData is empty");

    if (teacherData.email) {
      const findTeacher: Teacher = await this.teacher.findOne({ email: teacherData.email });
      if (findTeacher && findTeacher._id != id) throw new HttpException(409, `This email ${teacherData.email} already exists`);
    }
  
    const updateUserById: Teacher = await this.teacher.findByIdAndUpdate(id, teacherData)
    if (!updateUserById) throw new HttpException(409, "Teacher doesn't exist");

    return updateUserById;
  }

  public async findTeacherByName(teacherName: string): Promise<Teacher[]> {
    if (isEmpty(teacherName)) throw new HttpException(400, "teacherName is empty");

    const findTeacher: Teacher[] = await this.teacher.find({name: teacherName})

    return findTeacher;
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
