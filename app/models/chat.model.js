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

Chat.getAll = userId => {
  try {
    const uId = userId[0].user_id;
    const query = promisify(sql.query).bind(sql);
    const rooms = query('SELECT room.room_id, room.room_name, room.member FROM user_room_role INNER JOIN room ON room.room_id = user_room_role.room_id AND user_room_role.user_id = ?;', [uId]);
    return rooms;
  } catch (error) {
    return error;
  }
}

module.exports = Chat;