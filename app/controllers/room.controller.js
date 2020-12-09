const Room = require('../models/room.model');
const { errorFormat, successFormat } = require('../helpers/clientResponseHandlers');

exports.create = async (req, res) => {
  const { roomName } = req.body;

  // validate body
  if (!roomName) {
    throw errorFormat(406, "Empty");
  } else if (roomName.length === 0) {
    throw errorFormat(400, "Content cannot be empty!");
  }
  
  const userId  = res.locals.user.user_id;

  const roomForm = new Room({
    room_name: roomName,
    member: 10,
    user_id: userId,
    role_id: 1
  });
  
  try {
    const room = await Room.create(roomForm);
    res.status(200).send(successFormat(200, "Successfully created new room", room));
  } catch (error) {
    if (!error.code) {
      res.status(500).send(errorFormat(500, error.message));
      return;
    }

    res.status(error.code).send(errorFormat(error.code, error));
  }
}

exports.joinNewRoom = async (req, res) => {
  try {
    // validation 
    const userId      = res.locals.user.user_id;
    const { roomId }  = req.body;

    if (!roomId) {
      throw errorFormat(406, "Empty");
    } else if (roomId.length === 0) {
      throw errorFormat(400, "Content cannot be empty!");
    }

    const room        = { user_id: userId.toString() , room_id: roomId, role_id: '2' };
    const joinNewRoom = await Room.joinRoom(userId, room);

    if (joinNewRoom.error) throw joinNewRoom;

    res.status(200).send(successFormat("Successfully joined new room", joinNewRoom));
  } catch (error) {
    if (error.code === 406) {
      res.status(error.code).send(errorFormat(error.message));
      return;
    } 

    res.status(404).send(errorFormat(error));
  }
}

exports.selectAll = async (req, res) => {
  try {
    const userId  = res.locals.user.user_id;
    const rawRoomList  = await Room.selectAll(userId);

    const roomList = rawRoomList.map(room => {
      return {
        roomId: room.room_id,
        roomName: room.room_name,
        member: room.member
      }
    });

    res.status(200).send(successFormat(200, "get all user room", roomList));
  } catch (error) {
    res.status(406).send(errorFormat(error));
  }
}