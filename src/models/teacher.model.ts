import { model, Schema, Document } from 'mongoose';
import { Teacher } from '@interfaces/teacher.interface';

const teachersSchema: Schema = new Schema({
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
  formation: {
    type: String,
    required: true,
  },
  title: {
    type: String
  },
  income: {
    type: Number,
    required: true,
  },
});

const teachersModel = model<Teacher & Document>('Teachers', teachersSchema);

export default teachersModel;
