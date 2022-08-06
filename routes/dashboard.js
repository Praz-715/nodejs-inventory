import express from 'express';
import shortId from 'burst-short-mongo-id'
import { BarangModel, JenisBarangModel, SatuanBarangModel } from '../models/BarangModel.js'
const router = express.Router();

router.get('/', function (req, res) {
  res.render('dashboard/dashboard', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});


router.get('/master/databarang', async function (req, res) {
  const { jsonTrue } = req.query
  const barang = await BarangModel.find({ softDelete: 0 }).populate('jenis satuan')
  if (jsonTrue) {
    // console.log('BARANGGG',barang)
    res.status(200).json({ data: barang })
  }
  else {
    const jenis = await JenisBarangModel.find({ softDelete: 0 })
    const satuan = await SatuanBarangModel.find({ softDelete: 0 })
    res.render('dashboard/master/databarang', {
      layout: 'layouts/dashboard-layout', extractScripts: true, jenis, satuan
    });
  }
});
router.get('/master/jenisbarang', async function (req, res) {
  const { jsonTrue } = req.query
  const jenisBarang = await JenisBarangModel.find({ softDelete: 0 })
  if (jsonTrue) {
    res.status(200).json({ data: jenisBarang })
  }
  else {
    res.render('dashboard/master/jenisbarang', {
      layout: 'layouts/dashboard-layout', extractScripts: true
    });
  }
});
router.get('/master/satuanbarang', async function (req, res) {
  const { jsonTrue } = req.query
  const satuanBarang = await SatuanBarangModel.find({ softDelete: 0 })
  if (jsonTrue) {
    res.status(200).json({ data: satuanBarang })
  }
  else {
    res.render('dashboard/master/satuanbarang', {
      layout: 'layouts/dashboard-layout', extractScripts: true, satuanBarang
    });
  }
});



router.get('/transaksi/barangmasuk', function (req, res) {
  res.render('dashboard/transaksi/barangmasuk', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});
router.get('/transaksi/barangkeluar', function (req, res) {
  res.render('dashboard/transaksi/barangkeluar', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});


router.get('/laporan/stokbarang', function (req, res) {
  res.render('dashboard/laporan/stokbarang', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});
router.get('/laporan/barangmasuk', function (req, res) {
  res.render('dashboard/laporan/barangmasuk', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});
router.get('/laporan/barangkeluar', function (req, res) {
  res.render('dashboard/laporan/barangkeluar', {
    layout: 'layouts/dashboard-layout', extractScripts: true
  });
});














// POST //
router.post('/master/satuanbarang', async (req, res) => {
  const { namaSatuan } = req.body
  if (namaSatuan) {
    const response = await SatuanBarangModel({ namaSatuan }).save()
    console.log(`Tambah satuan ${namaSatuan} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
  else {
    res.json({ msg: "failed" })
  }
})
router.post('/master/jenisbarang', async (req, res) => {
  const { namaJenis } = req.body
  if (namaJenis) {
    const response = await JenisBarangModel({ namaJenis }).save()
    console.log(`Tambah jenis ${namaJenis} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
  else {
    res.json({ msg: "failed" })
  }
})
router.post('/master/databarang', async (req, res) => {
  const { namaBarang, jenisBarang, satuanBarang, stokBarang, stokBarangMinimal } = req.body
  if (namaBarang) {
    console.log({ namaBarang, jenisBarang, satuanBarang, stokBarang })

    let barang = new BarangModel({ namaBarang, jenis:jenisBarang, satuan:satuanBarang, stok: stokBarang, stokMinimal: stokBarangMinimal })
    barang.kodeBarang = shortId(barang._id)
    // barang({ namaBarang, jenisBarang, satuanBarang, stok: stokBarang, kodeBarang: '999' })
    console.log(barang)
    await barang.save()
    console.log(`Tambah data ${namaBarang} berhasil response : `, barang)
    res.json({ msg: "success", barang })
  }
  else {
    res.json({ msg: "failed" })
  }
})









// PUT //

router.put('/master/satuanbarang', async (req, res) => {
  const { id, namaSatuan } = req.body
  if (id && namaSatuan) {
    const response = await SatuanBarangModel.findByIdAndUpdate(id, { namaSatuan })
    console.log(`Edit satuan ${namaSatuan} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
})
router.put('/master/jenisbarang', async (req, res) => {
  const { id, namaJenis } = req.body
  if (id && namaJenis) {
    const response = await JenisBarangModel.findByIdAndUpdate(id, { namaJenis })
    console.log(`Edit jenis ${namaJenis} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
})



// DELETE //
router.delete('/master/satuanbarang', async (req, res) => {
  const { id } = req.body
  if (id) {
    const response = await SatuanBarangModel.findByIdAndUpdate(id, { softDelete: 1 })
    console.log(`Delete satuan ${id} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
})
router.delete('/master/jenisbarang', async (req, res) => {
  const { id } = req.body
  if (id) {
    const response = await SatuanBarangModel.findByIdAndUpdate(id, { softDelete: 1 })
    console.log(`Delete jenis ${id} berhasil response : `, response)
    res.json({ msg: "success", response })
  }
})


export default router;
