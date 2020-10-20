const sql = require('../../db');
const { promisify } = require('util');

// chat object constructor
const Chat = function(chat) {
  this.roomName = chat.roomName;
  this.userId   = chat.userId;
  this.roleId   = chat.roleId;
  this.member   = chat.member;
}

Chat.create = async (newChat, result) => {
  try {
    await sql.beginTransaction();
    await sql.query('INSERT INTO room(room_name, member) VALUES(?,?)', [ newChat.roomName, newChat.member ]);
    await sql.query('SELECT @roomId:=Max(room_id) FROM room');
    await sql.query('INSERT INTO user_room_role(user_id, room_id, role_id) VALUES(?,@roomId,?)', [ newChat.userId, newChat.roleId ]);
    await sql.commit();
    const success = { status: "OK", message: "New chat room created" };
    result(null, success);
  } catch (error) {
    await sql.rollback((err) => {
      console.log(err);
      result(err, null);
    });
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

Chat.getAll = async userId => {
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
