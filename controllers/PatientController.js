// import Model patient
const Patient = require("../models/Patient");

class PatientController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const Patients = await Patient.all();

    if (Patients) {
      const data = {
        message: "Menampilkkan semua Patients",
        data: Patients,
      };

      return res.status(200).json(data);
    }

    const data = {
      message: "Data Patients konsong",
    };

    return res.status(404).json(data);
  }

  async store(req, res) {
    const { nama, phone, alamat, status, masuk, keluar } =req.body;

    if (!nama || !phone || !alamat || !status || !masuk || !keluar) {
      const data = {
        message: "Semua data harus dikirim",
      };

      return res.status(422).send(data);
    }

    // handle phone harus angka (integer)
    if (!Number.isInteger(phone)) {
      const data = {
        message: "Phone harus berupa angka",
      };

      return res.status(422).send(data);
    }

     // Handle format alamat harus benar
    if (!/\S+@\S+\.\S+/.test(alamat)) {
      const data = {
        message: "Format alamat tidak valid",
      };

      return res.status(422).send(data);
    }

    const Patients = await Patient.create(req.body);

    const data = {
      message: "Menambahkan data Patient",
      data: Patients,
    };

    return res.status(200).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const Patient = await Patient.find(id);

    if (Patient) {
      const Patient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit data Patients`,
        data: Patient,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: `Data tidak ditemukan`,
      };

      return res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const Patient = await Patient.find(id);

    if (Patient) {
      const Patient = await Patient.delete(id);
      const data = {
        message: `Menghapus data Patient`,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Id tidak ditemukan`,
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const Patient = await Patient.find(id);

    if (Patient) {
      const data = {
        message: `menampilkan data dengan id ${id}`,
        data: Patient,
      };

      res.status(200).send(data);
    } else {
      const data = {
        message: `data dengan id ${id} tidak ditemukan`,
      };

      res.status(400).send(data);
    }
  }
}

// Membuat object PatientController
const object = new PatientController();

// Export object PatientController
module.exports = object;
