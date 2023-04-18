const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');
const { deleteFile } = require('../../middlewares/delete-file');

exports.GetAll = async (limit = 0, skip = 0) => {
  try {
    return await conn.db.connMongo.Music.find().populate('music').skip(skip).limit(limit);
  } catch (error) {
    magic.LogDanger('Cannot getAll music', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Create = async (title, description, req) => {
  try {
    const data = await new conn.db.connMongo.Music({
      title: title,
      description: description,
    });
    if (req.file) {
      data.image = req.file.path;
    } else {
      data.image =
        'https://res.cloudinary.com/drprserzu/image/upload/v1670867991/mindker/dirhbvxwym6mywamacog.png';
    }
    data.save();
    return data;
  } catch (error) {
    magic.LogDanger('Cannot Create music', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetById = async (id) => {
  try {
    return await conn.db.connMongo.Music.findById(id).populate('music');
  } catch (error) {
    magic.LogDanger('Cannot get the music by its ID', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.GetByTitle = async (title) => {
  try {
    const array = await conn.db.connMongo.Music.findOne({ title: title }).populate(
      'music',
    );
    const arrayObject = await new Array(array);
    return await arrayObject;
  } catch (error) {
    magic.LogDanger('Cannot get the music by its title', error);
    return await { err: { code: 123, message: error } };
  }
};

exports.Delete = async (id) => {
    try {
      const musicToDelete = await conn.db.connMongo.music.findById(id);
      if (musicToDelete.questionFile) {
        await deleteFile(musicToDelete.questionFile);
      }
      return await conn.db.connMongo.music.findByIdAndDelete(id);
    } catch (error) {
      magic.LogDanger('Cannot Delete music', error);
      return await { err: { code: 123, message: error } };
    }
  };