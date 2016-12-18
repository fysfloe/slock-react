import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  title: { type: 'String', required: true },
  number: { type: 'Number', required: true },
  desc: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Step', stepSchema);
