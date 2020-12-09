const { store, getChatByUserId }  = require('../Repositories/chatRepository');
const { modelErrorHandler } = require('../helpers/serverResponseHandlers');

const Chat = function(chat) {
  this.roomId       = chat.roomId;
  this.userId       = chat.userId;
  this.username     = chat.username;
  this.description  = chat.description;
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