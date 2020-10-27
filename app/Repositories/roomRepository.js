const { promisify } = require('util');
const sql = require('../../db');

const create = async newRoom => {
  try {
    const room = { room_name: newRoom.room_name, member: newRoom.member }
    await sql.beginTransaction();
    await sql.query('INSERT INTO room SET ?', room);
    await sql.query('SELECT @roomId:=Max(room_id) FROM room');
    await sql.query('INSERT INTO user_room_role(user_id, room_id, role_id) VALUES(?,@roomId,?)', [ newRoom.user_id, newRoom.role_id ]);
    await sql.commit();

    return { userId: newRoom.user_id, roomName: newRoom.room_name };
  } catch (error) {
    await sql.rollback((err) => {
      return err;
    });
    return error;
  }
}

const join = async (room) => {
  try {
    const query = promisify(sql.query).bind(sql);
    await query('INSERT INTO user_room_role (user_id, room_id, role_id) VALUES (?, ?, ?)', [room.user_id, room.room_id, room.role_id]);
    
    const result = { roomId: room.room_id };
    return result;
  } catch (error) {
    return error;
  }
}

const selectUserInRoom = async (userId, roomId) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query('SELECT user_id, room_id FROM user_room_role WHERE user_id = ? AND room_id = ? LIMIT 1', [ userId, roomId ]);
  } catch (error) {
    return error;
  }
}

module.exports = { create, join, selectUserInRoom };
