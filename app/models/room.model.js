const sql = require('../../db');
const { promisify } = require('util');
const { create, join } = require('../Repositories/roomRepository');

// Room object constructor
const Room = function(room) {
  this.room_name = room.room_name;
  this.user_id   = room.user_id;
  this.role_id   = room.role_id;
  this.member   = room.member;
}

Room.create = async (newRoom) => {
  try {
    const room = await create(newRoom);
    return room;
  } catch (error) {
    return error;
  }
}

Room.joinRoom = async (room) => {
  try {
    const result = await join(room);
    // ERRRRRRRRRRRRRRRRRRRR BELUM KEHANDLE
    if (result.code === 'ER_NO_REFERENCED_ROW_2') {
      throw {
        error: true, 
        code: 406,
        message: "Room not found" 
      };
    }
    
    return result
  } catch (error) {
    return error;
  }
}

Room.selectAll = async userId => {
  try {
    const query = promisify(sql.query).bind(sql);
    const rooms = await query('SELECT room.room_id, room.room_name, room.member FROM user_room_role INNER JOIN room ON room.room_id = user_room_role.room_id AND user_room_role.user_id = ?;', userId);
    return rooms;
  } catch (error) {
    return error;
  }
}

const isAlreadyJoined = async (userId, roomId) => {
  const isDataExist = await query('SELECT user_id, room_id FROM user_room_role WHERE user_id = ? AND room_id = ? LIMIT 1', [ userId, roomId ]);
}

module.exports = Room;
