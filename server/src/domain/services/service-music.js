const magic = require('../../utils/magic');
const enum_ = require('../../utils/enum');
const ormMusic = require('../orm/orm-music');

exports.GetAll = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    let respOrm = await ormMusic.GetAll(limit, skip);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success GetAll Musics'),
        (data = respOrm),
        (statuscode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};

exports.Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const Question = req.body.question;
    const Answer = req.body.answer;

    if (Question && Answer) {
      let respOrm = await ormMusic.Create(Question, Answer, req);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'music created'), (data = respOrm), (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'All fields are required'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.Delete = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;
    if (id) {
      let respOrm = await ormMusic.Delete(id);
      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'music deleted'), (statuscode = enum_.CODE_OK), (data = respOrm);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.Update = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { id } = req.params;

    const updatedMusic = {
      question: req.body.question,
      answer: req.body.answer,
      _id: id,
    };

    if (id && updatedMusic) {
      let respOrm = await ormMusic.Update(id, updatedMusic, req);

      if (respOrm.err) {
        (status = 'Failure'),
          (errorcode = respOrm.err.code),
          (message = respOrm.err.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'music updated'), (statuscode = enum_.CODE_OK), (data = updatedMusic);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD), //este error no cuadra
        (message = 'id does not exist'),
        (statuscode = enum_.CODE_UNPROCESSABLE_ENTITY);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
  }
};

exports.GetById = async (req, res) => {
  let status = 'Success';
  let errorcode = '';
  let message = '';
  let data = '';
  let statuscode = 0;
  let response = {};
  try {
    const { id } = req.params;
    let respOrm = await ormMusic.GetById(id);
    if (respOrm.err) {
      (status = 'Failure'),
        (errorcode = respOrm.err.code),
        (message = respOrm.err.message),
        (statuscode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = 'Success getting the music'),
        (data = respOrm),
        (statuscode = data ? enum_.CODE_OK : enum_.CODE_NO_CONTENT);
    }
    response = await magic.ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    magic.LogDanger('error: ', error);
    response = await magic.ResponseService('Failure', enum_.CODE_BAD_REQUEST, error, '');
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
  }
};
