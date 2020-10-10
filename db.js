const mysql = require('mysql');

// local mysql db connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'group_chat'
});

connection.connect((err) => {
  if (err) throw err;
});

module.exports = connection;

// const bulkInsertData = (sql, arrData) => {
//   try {
//     connection.query(sql, [arrData], (err) => {
//       if (err) throw err;
//       connection.end();
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const insertUser = "INSERT INTO user (username, email, password) VALUES ?";
// const userData = [
//   ['clive', 'clive@gmail.com', '1234qwer'],
//   ['john', 'john@gmail.com', '1234qwer'],
//   ['jane', 'jane@gmail.com', '1234qwer'],
//   ['foo', 'foo@gmail.com', '1234qwer'],
//   ['foobar', 'foobar@gmail.com', '1234qwer'],
// ];

// const creatingRoom = async (strRoomName, intMember, intUserId, intRoleId) => {
//   try {
//     await connection.beginTransaction();
//     await connection.query('INSERT INTO room(room_name, member) VALUES(?,?)', [ strRoomName, intMember ]);
//     await connection.query('SELECT @roomId:=Max(room_id) FROM room');
//     await connection.query('INSERT INTO user_room_role(user_id, room_id, role_id) VALUES(?,@roomId,?)', [ intUserId, intRoleId ]);
//     await connection.commit();
//   } catch (error) {
//     await connection.rollback((err) => {
//       console.log(err);
//     });
//   }
// }

// creatingRoom("sekut", 5, 4, 1);
// bulkInsertData(insertUser, userData);
