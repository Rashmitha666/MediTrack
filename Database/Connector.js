const mysql = require('mysql2/promise');

async function getConnection() 
{
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nothing',
    database: 'meditrack'
  });

  return connection;
}

async function insertPatientData(patientData) 
{
  const connection = await getConnection();

  try 
  {
    const query = 'INSERT INTO Patients (id, name, age, gender, phoneNumber) VALUES (?, ?, ?, ?, ?)';
    const [results] = await connection.execute(query, [patientData.id, patientData.name, patientData.age, patientData.gender, patientData.phoneNumber]);
    console.log('Inserted patient with ID:', results.insertId);
  } 
  catch (error) 
  {
    console.error('Error inserting patient data:', error);
  } 
  finally 
  {
    connection.end();
  }
}

async function viewPatientData(patientId) 
{
  const connection = await getConnection();

  try 
  {
    const query = 'SELECT * FROM Patients WHERE Id = ?';
    const [rows] = await connection.execute(query, [patientId]);
    console.log('Result fetched');

    return rows[0];
  } 
  catch (error) 
  {
    console.error('Error fetching patient data:', error);
  } 
  finally 
  {
    connection.end();
  }
}
export {viewPatientData, insertPatientData} 
