import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  pid: String,
  name: String,
});

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);