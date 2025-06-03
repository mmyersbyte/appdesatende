import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Schema da Empresa
const empresaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório.'],
    },

    email: {
      type: String,
      required: [true, 'O email é obrigatório.'],
      unique: true, // Garante que cada empresa tenha um e-mail único
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de e-mail inválido.'],
    },

    senha: {
      type: String,
      required: [true, 'A senha é obrigatória.'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres.'],
      select: false, // Senha não aparece por padrão em queries
    },

    tipo: {
      type: String,
      enum: ['empresa'], // Define que esse schema é apenas para 'empresa'
      default: 'empresa',
    },
  },
  {
    timestamps: true, // Cria campos createdAt e updatedAt automaticamente
  }
);

// Middleware: gera o hash da senha antes de salvar
empresaSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next(); // Só hash se nova ou modificada

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método: verifica se a senha fornecida bate com o hash
empresaSchema.methods.verificaSenha = async function (senhaTexto) {
  return await bcrypt.compare(senhaTexto, this.senha);
};

// Método: gera um token JWT contendo dados essenciais da empresa
empresaSchema.methods.gerarTokenJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      tipo: this.tipo,
    },
    process.env.JWT_SECRET, // chave secreta usada para assinar o token
    { expiresIn: '7d' } // validade do token
  );
};

// Remove o campo senha ao retornar o objeto como JSON
empresaSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

const Empresa = mongoose.model('Empresa', empresaSchema);

export default Empresa;
