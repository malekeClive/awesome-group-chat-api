const { promisify } = require('util');
const sql = require('../../db');

const create = async newRoom => {
  try {
    await sql.beginTransaction();
    await sql.query('INSERT INTO room(room_name, member) VALUES(?,?)', [ newRoom.roomName, newRoom.member ]);
    await sql.query('SELECT @roomId:=Max(room_id) FROM room');
    await sql.query('INSERT INTO user_room_role(user_id, room_id, role_id) VALUES(?,@roomId,?)', [ newRoom.userId, newRoom.roleId ]);
    const result = await sql.commit();
    return result;
  } catch (error) {
    await sql.rollback((err) => {
      return err;
    });
    return error;
  }
}

module.exports = { create };
