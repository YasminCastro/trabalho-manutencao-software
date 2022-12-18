import { model, Schema, Document } from 'mongoose';
import { TeacherClass } from '@/interfaces/teacherClass.interface';

const teachersClassesSchema: Schema = new Schema({
  studentId: {
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
  n1: {
    type: Number,
    default: 0
  },
  n2: {
    type: Number,
    default: 0
  },
  absences: {
    type: Number,
    default: 0
  }
});


const teachersClassesModel = model<TeacherClass & Document>('TeachersClasses', teachersClassesSchema);

export default teachersClassesModel;
