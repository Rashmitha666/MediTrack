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
  let connection;
  try 
  {
    connection = await getConnection();

    let query, params;
    if (arguments.length === 0) 
    {
      query = 'SELECT * FROM Patients';
      params = [];
    } 
    else 
    {
      query = 'SELECT * FROM Patients WHERE Id = ?';
      params = [patientId];
    }

    const [rows] = await connection.execute(query, params);
    console.log('Result fetched');

    return arguments.length === 0 ? rows : rows[0];
  } 
  catch (error) 
  {
    console.error('Error fetching patient data:', error);
    throw error;
  } 
  finally 
  {
    if (connection) 
    {
      await connection.end(); 
    }
  }
}
async function deletePatientData(patientId) 
{
  const connection = await getConnection();

  try 
  {
    const query = 'Delete FROM Patients WHERE Id = ?';
    const [rows] = await connection.execute(query, [patientId]);
    console.log('Deleted Successfully',rows.deleteId);

  } 
  catch (error) 
  {
    console.error('Error Deleting patient data:', error);
  } 
  finally 
  {
    connection.end();
  }
}


async function authenticateUser(username, inputPassword) 
{
  const connection = await getConnection();

  try 
  {
      
      const [rows] = await connection.execute('SELECT password FROM logins WHERE username = ?', [username]);

      if (rows.length === 0) 
      {
          return { success: false, message: 'User not found' }; 
      }

      const storedPassword = rows[0].password;

      if (storedPassword === inputPassword) 
      {
          return { success: true, message: 'Login successful' }; 
      } 
      else 
      {
          return { success: false, message: 'Incorrect password' }; 
      }
  } 
  catch (error) 
  {
      console.error('Database error:', error);
      return { success: false, message: 'An error occurred while authenticating' };

  } 
  finally 
  {
      if (connection) 
      {
          await connection.end();
      }
  }
}

async function viewDoctorData(doctorId) 
{
  let connection;
  try 
  {
    connection = await getConnection();

    let query, params;
    if (arguments.length === 0) 
    {
      query = "SELECT * FROM doctor";
      params = [];
    } 
    else 
    {
      query = 'SELECT * FROM doctor WHERE Id = ?';
      params = [doctorId];
    }

    const [rows] = await connection.execute(query, params);
    console.log('Result fetched');

    

    return arguments.length === 0 ? rows : rows[0];
  } 
  catch (error) 
  {
    console.error('Error fetching doctor data:', error);
    throw error;
  } 
  finally 
  {
    if (connection) 
    {
      await connection.end(); 
    }
  }
}
async function checkDoctorDate(appointmentDate) 
{
  let connection;
  try 
  {
    connection = await getConnection();

    let query, params;

    query = 'SELECT * FROM doctor WHERE appointment_date = ?';
    params = [appointmentDate];
    

    const [rows] = await connection.execute(query, params);
    console.log('Result fetched');

    return rows;
  } 
  catch (error) 
  {
    console.error('Error fetching doctor date:', error);
    throw error;
  } 
  finally 
  {
    if (connection) 
    {
      await connection.end(); 
    }
  }
}

export {viewPatientData, insertPatientData, deletePatientData, authenticateUser, viewDoctorData
        , checkDoctorDate
} 
