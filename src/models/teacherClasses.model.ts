import { model, Schema, Document } from 'mongoose';
import { TeacherClass } from '@/interfaces/teacherClass.interface';

const teachersClassesSchema: Schema = new Schema({
  teacherId: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  weekDays: {
    type: Array,
    required: true,
  },
 
});


const teachersClassesModel = model<TeacherClass & Document>('TeachersClasses', teachersClassesSchema);

export default teachersClassesModel;
