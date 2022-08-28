const connection = require("./db_connection.js");

const query = async (searchTerm) => {

  let sql = "SELECT * FROM allsongs WHERE title  LIKE  '%" + searchTerm + "%'" + 
   " OR artist LIKE '%" + searchTerm + "%' OR album LIKE '%" + searchTerm + "%' OR genre LIKE '%" + searchTerm + "%' OR albumartist LIKE '%" + searchTerm + "%'";
   console.log(sql);
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const handleSearch = async (searchTerm) => {
  // query the database and select all the song rows
  let response = null;
  try {
    response = await query(searchTerm);
    response = response.map((v) => Object.assign({}, v)); //convert each row in result to a js object and put them in an array called response
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = { handleSearch };
