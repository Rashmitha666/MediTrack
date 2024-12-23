var mysql = require('mysql2');


var connection = mysql.createConnection(
{
  host     : 'localhost',     
  user     : 'root',          
  password : 'nothing',      
  database : 'sakila'          
});


connection.connect(function(err) 
{
  if (err) 
  {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});


s_query = 'SELECT * from city';
connection.query(s_query, function (error, results, fields) 
{
  if (error) 
    throw error;
  console.log('The solution is: ', results);
});


connection.end();
