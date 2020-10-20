const Chat = require('../models/chat.model');

exports.create = async (req, res) => {
  // validate body
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty!"
    });
  }
  
  const userId  = res.locals.user.user_id;

  try {
    const form = new Chat({
      roomName: req.body.roomName,
      member: 10,
      userId: userId,
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

exports.joinNewRoom = async (req, res) => {
  try {
    // validation 
    const userId = res.locals.user.user_id;
    const data = req.body;
    if (!data.roomId) {
      res.status(400).send({
        message: "Cannot be empty!"
      });
    }

    const result = await Chat.joinRoom(userId, data.roomId, 2);

    res.status(200).send({
      status: "OK",
      message: result
    });
  } catch (error) {
    res.status(406).send({
      status: "FAILED",
      message: error
    });
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const userId      = res.locals.user.user_id;
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