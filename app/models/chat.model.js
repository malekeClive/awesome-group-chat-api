const sql = require('../../db');
const { promisify } = require('util');
const { create } = require('../Repositories/chatRepository');

// chat object constructor
const Chat = function(chat) {
  this.roomName = chat.roomName;
  this.userId   = chat.userId;
  this.roleId   = chat.roleId;
  this.member   = chat.member;
}

Chat.create = async (newRoom) => {
  try {
    const room = await create(newRoom);
    return room;
  } catch (error) {
    return error;
  }
}

Chat.joinRoom = async (userId, roomId, roleId) => {
  try {
    const query = promisify(sql.query).bind(sql);
    const isDataExist = await query('SELECT user_id, room_id FROM user_room_role WHERE user_id = ? AND room_id = ? LIMIT 1', [ userId, roomId ]);
    if (isDataExist.length > 0) {
      throw new Error('You already joined!');
    }

    await query('INSERT INTO user_room_role (user_id, room_id, role_id) VALUES (?, ?, ?)', [userId, roomId, roleId]);
    const success = { status: "OK", message: "Successfully joined new room" };
    return success;
  } catch (error) {
    return error;
  }
}

Chat.selectAll = async userId => {
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

module.exports = Chat;
