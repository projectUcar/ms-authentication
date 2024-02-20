import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 20 * 60, // Expira en 20 minutos (ajusta según tus necesidades)
    },
  });

  passwordResetSchema.method('remove', async function () {
    await this.model('PasswordReset').deleteOne({ _id: this._id });
  });

  export default mongoose.model('PasswordReset', passwordResetSchema);
