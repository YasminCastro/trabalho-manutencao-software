import { model, Schema, Document } from 'mongoose';
import { Student } from '@interfaces/student.interface';

const studentSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
});

const studentModel = model<Student & Document>('Student', studentSchema);

export default studentModel;
