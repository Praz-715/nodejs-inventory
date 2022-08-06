import mongoose from 'mongoose';
export const MONGO_URI = 'mongodb+srv://rizky:ramadhan@cluster0.ahsa7.mongodb.net/inventory?retryWrites=true&w=majority';

export const database = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
