const sql = require('../../db');
const { promisify } = require('util');
const { create, join, selectUserInRoom } = require('../Repositories/roomRepository');
const { modelErrorHandler } = require('../helpers/serverResponseHandlers');

// Room object constructor
const Room = function(room) {
  this.room_name  = room.room_name;
  this.user_id    = room.user_id;
  this.role_id    = room.role_id;
  this.member     = room.member;
}

Room.create = async (newRoom) => {
  try {
    return await create(newRoom);
  } catch (error) {
    return error;
  }
}

Room.joinRoom = async (userId, room) => {
  try {
    const isUserExist = await selectUserInRoom(userId, room.room_id);
    if (isUserExist.length > 0) throw modelErrorHandler(406, "You already joined");

    const result  = await join(room);
    if (result.code === 'ER_NO_REFERENCED_ROW_2') throw modelErrorHandler(422, "Room not found")
    
    return result;
  } catch (error) {
    return error;
  }
}

Room.selectAll = async userId => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query('SELECT room.room_id, room.room_name, room.member FROM user_room_role INNER JOIN room ON room.room_id = user_room_role.room_id AND user_room_role.user_id = ?;', userId);
  } catch (error) {
    return error;
  }
}

module.exports = Room;
