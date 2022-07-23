import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
  res.render('dashboard/dashboard', {
    layout: 'layouts/dashboard-layout',
  });
});

export default router;
