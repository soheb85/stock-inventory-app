import mongoose from 'mongoose';

const PartnerTransactionSchema = new mongoose.Schema({
  tid: { type: String, required: true },
  partner: {
    pid: String,
    name: String
  },
  items: [
    {
      item: String,
      quantity: Number
    }
  ],
  status: {
    type: String,
    enum: ['IN', 'OUT'],
    default: 'OUT'  // Default status is OUT
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.models.PartnerTransaction || mongoose.model('PartnerTransaction', PartnerTransactionSchema);
