const Room = require('../models/room.model');
const { errorFormat, successFormat } = require('../helpers/responseHandlers');

exports.create = async (req, res) => {
  // validate body
  if (!req.body) res.status(400).send(errorFormat("Content cannot be empty!"));
  
  const userId  = res.locals.user.user_id;

  const form = new Room({
    room_name: req.body.roomName,
    member: 10,
    user_id: userId,
    role_id: 1
  });
  
  try {
    const room = await Room.create(form);
    res.status(200).send(successFormat("Successfully created new room", room));
  } catch (error) {
    res.status(406).send(errorFormat(error));
  }
}

exports.joinNewRoom = async (req, res) => {
  try {
    // validation 
    const userId  = res.locals.user.user_id;
    const data    = req.body;

    if (!data.roomId) res.status(400).send(errorFormat("Content cannot be empty!"));

    const room    = { user_id: userId.toString() , room_id: data.roomId, role_id: '2' }
    const result  = await Room.joinRoom(room);

    if (result.error) throw result;

    res.status(200).send(successFormat("Successfully joined new room", result));
  } catch (error) {
    console.log(error.code);
    if (error.code === 406) res.status(error.code).send(errorFormat(error.message));

    console.log("Asdasdqe");
    res.status(404).send(errorFormat(error));
  }
}

exports.selectAll = async (req, res) => {
  try {
    const userId      = res.locals.user.user_id;
    const result      = await Room.selectAll(userId);

    const newRooms = result.map(room => {
      return {
        roomId: room.room_id,
        roomName: room.room_name,
        member: room.member
      }
    });

    res.status(200).send(successFormat("get all user room", newRooms));
  } catch (error) {
    res.status(406).send(errorFormat(error));
  }
}