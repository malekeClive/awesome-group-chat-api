const { store, getChatByUserId }  = require('../Repositories/chatRepository');
const { modelErrorHandler } = require('../helpers/serverResponseHandlers');

const Chat = function(chat) {
  this.room_id = chat.roomId;
  this.user_id = chat.userId;
  this.description = chat.description;
}

Chat.create = async (chat) => {
  try {
    return await store(chat);
  } catch (error) {
    return error;
  }
}

Chat.getChatById = async (userId) => {
  try {
    return await getChatByUserId(userId);
  } catch (error) {
    return error;
  }
}

module.exports = Chat;