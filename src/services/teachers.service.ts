import { HttpException } from '@exceptions/HttpException';
import teacherModel from '@models/teacher.model';
import { isEmpty } from '@utils/util';
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

    const parsedName = teacherName.toLocaleLowerCase()

    const findTeacher: Teacher[] = await this.teacher.find({name: parsedName})

    return findTeacher;
  }

  public async findTeachersByFormation(formation: string): Promise<Teacher[]> {
    if (isEmpty(formation)) throw new HttpException(400, "formation is empty");

    const parsedFormation = formation.toLocaleLowerCase()

    const teachersFound: Teacher[] = await this.teacher.find({formation: parsedFormation})
    if (!teachersFound) throw new HttpException(409, "No teacher if that formation.");

    return teachersFound;
  }

  public async findTeachersByTitle(title: string): Promise<Teacher[]> {
    if (isEmpty(title)) throw new HttpException(400, "title is empty");

    const parsedTitle = title.toLocaleLowerCase()

    const teachersFound: Teacher[] = await this.teacher.find({ title:parsedTitle })
    if (!teachersFound) throw new HttpException(409, `Teachers not found for the title ${title}`);

    return teachersFound;
  }

}

export default StudentsService;
