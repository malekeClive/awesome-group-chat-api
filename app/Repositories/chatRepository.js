const { promisify } = require('util');
const sql = require('../../db');

const getChatByUserId = async (userId) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("SELECT room_id, user_id, description FROM chat WHERE user_id = ?", [userId]);
  } catch (error) {
    console.log(error);
    return error;
  }
}

const store = async ( chat ) => {
  try {
    const query = promisify(sql.query).bind(sql);
    return await query("INSERT INTO chat(room_id, user_id, description) VALUES(?,?,?) ", [chat.roomId, chat.uId, chat.msg]);
  } catch (error) {
    console.log(error);
    return error;
  }
}


module.exports = { store, getChatByUserId };