// import database
const db = require("../config/database");

// membuat class Model patient
class patient {
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from patients";
    
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, (err, result) => {
        resolve(result.insertId);
      });
    });

    const patients = this.find(id);
    return patients;
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data,id], (err, result) => {
        resolve(result);
      });
    });

    const patient = await this.find(id);
    return patient;
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, result) => {
        const [patient] = result;
        resolve(patient);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, result) => {
        resolve(result);
      });
    });
  }
}

// export class Patient
module.exports = Patient;
