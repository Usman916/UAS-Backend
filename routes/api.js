// import PatientController
const PatientController = require('../controllers/PatientController');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Patient API');
});

// patient routes
router.get('/patients', PatientController.index);
router.post('/patients', PatientController.store);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);
router.get('/patients/:id', PatientController.show);

// export router
module.exports = router;