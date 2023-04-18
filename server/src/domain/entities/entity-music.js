module.exports = (db) => {
    const musicSchema = new db.Schema(
      {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String },
      },
      {
        timestamps: true,
      },
    );
    return db.model('music', musicSchema);
  };
  