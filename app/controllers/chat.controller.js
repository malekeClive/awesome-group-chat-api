const jwt = require('jsonwebtoken');
const Chat = require('../models/chat.model');
const User = require('../models/user.model');

exports.create = async (req, res) => {
  // validate body
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty!"
    });
  }

  const getUserData = jwt.verify(req.headers.authorization.split(' ')[1], 'THISISMUSTBESECRET');

  try {
    const userId = await User.find(getUserData.data[0].email);

    const form = new Chat({
      roomName: req.body.roomName,
      member: 10,
      userId: userId[0].user_id,
      roleId: 1
    });

    Chat.create(form, (err, data) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        res.status(200).send(data);
      }
    });

  } catch (error) {
    console.log(error);
  }
}

exports.getAll = async (req, res) => {
  try {
    const getUserData = jwt.verify(req.headers.authorization.split(' ')[1], 'THISISMUSTBESECRET');
    const userId      = await User.find(getUserData.data[0].email);
    const result      = await Chat.getAll(userId);

    const newRooms = result.map(room => {
      return {
        roomId: room.room_id,
        roomName: room.room_name,
        member: room.member
      }
    });

    res.status(200).send({
      status: "OK",
      data: newRooms
    })
  } catch (error) {
    console.log(error);
    res.status(406).send({
      status: "FAILED",
      message: error
    });
  }
}