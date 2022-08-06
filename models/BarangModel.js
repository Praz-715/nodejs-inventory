import mongoose from 'mongoose'


const satuanSchema = new mongoose.Schema({
    namaSatuan: { type: String, required: true },
    softDelete: {type : Boolean, default: 0}
}, { timestamps: true });


const jenisSchema = new mongoose.Schema({
    namaJenis: { type: String, required: true },
    softDelete: {type : Boolean, default: 0}
}, { timestamps: true });

const BarangSchema = new mongoose.Schema({
    softDelete: {type : Boolean, default: 0},
    namaBarang: { type: String, required: true },
    kodeBarang: {
        type: String, index: {
            unique: true,
            dropDups: true
        },
        // default: shortId(mongoose.Types.ObjectId())
    },
    jenis: { type: mongoose.Schema.Types.ObjectId, ref: 'jenis' },
    satuan: { type: mongoose.Schema.Types.ObjectId, ref: 'satuan' },
    stok: { type: Number, dafault: 0 },
    stokMinimal: { type: Number, dafault: 10 }
}, { timestamps: true });

export const SatuanBarangModel = mongoose.model("satuan", satuanSchema);
export const JenisBarangModel = mongoose.model("jenis", jenisSchema);
export const BarangModel =  mongoose.model("barang", BarangSchema);