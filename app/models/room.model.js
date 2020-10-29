const sql = require('../../db');
const { promisify } = require('util');
const { create, join, selectUserInRoom, selectRooms } = require('../Repositories/roomRepository');
const { modelErrorHandler } = require('../helpers/serverResponseHandlers');

// Room object constructor
const Room = function(room) {
  this.room_name  = room.room_name;
  this.user_id    = room.user_id;
  this.role_id    = room.role_id;
  this.member     = room.member;
}

Room.create = async newRoom => {
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
    return await selectRooms(userId);
  } catch (error) {
    return error;
  }
}

module.exports = Room;
