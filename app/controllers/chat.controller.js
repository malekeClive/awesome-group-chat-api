const Chat = require('../models/chat.model');
const { errorFormat, successFormat } = require('../helpers/clientResponseHandlers');

exports.getChatById = async (req, res) => {
  try {
    const userId = res.locals.user.user_id;
    const result = await Chat.getChatById(userId);

    const chats = result.map(chat => {
      return {
        roomId: chat.room_id,
        userId: chat.user_id,
        username: chat.username,
        description: chat.description
      }
    });

    res.status(200).send(successFormat(200, "get all chat", chats));
  } catch (error) {
    res.status(406).send(errorFormat(error));
  }
}