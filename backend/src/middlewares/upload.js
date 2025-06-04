import multer from 'multer';

const storage = multer.memoryStorage(); // Armazena arquivos em memória
const upload = multer({ storage });

export default upload;
