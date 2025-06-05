import multer from 'multer';

// Limite de 2MB para imagens
const MAX_SIZE = 2 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Aceita apenas imagens JPEG e PNG
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Bloqueia arquivos com nomes suspeitos
    if (/\.(exe|sh|bat|js|php|py|pl|rb)$/i.test(file.originalname)) {
      return cb(new Error('Tipo de arquivo não permitido!'), false);
    }
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens JPEG ou PNG são permitidas!'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE,
    files: 1, // Limita a 1 arquivo por vez
  },
  fileFilter,
}).single('imagem'); // Garante que só um campo 'imagem' será aceito

// Middleware para tratar erros de upload
export function uploadComTratamento(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .json({ msg: 'Arquivo muito grande! Máximo 2MB.' });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res
          .status(400)
          .json({ msg: 'Apenas 1 arquivo pode ser enviado.' });
      }
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: err.message });
    }
    next();
  });
}

export default upload;
