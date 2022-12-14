import { model, Schema, Document } from 'mongoose';
import { Subject } from '@interfaces/subject.interface';

const subjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  workload: {
    type: Number,
    required: true,
  },

});

const subjectModel = model<Subject & Document>('Subjects', subjectSchema);

export default subjectModel;
