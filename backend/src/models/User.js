import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Modelo de usuário
const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório.'],
    },

    email: {
      type: String,
      required: [true, 'O email é obrigatório.'],
      unique: true, // impede duplicidade no banco
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de e-mail inválido.'], // regex para validar formato de e-mail
    },

    senha: {
      type: String,
      required: [true, 'A senha é obrigatória.'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres.'],
      select: false, // por segurança, não retorna por padrão
    },

    tipo: {
      type: String,
      enum: ['user'], // você pode expandir para ['user', 'admin', 'empresa'] depois
      default: 'user',
    },
  },
  {
    timestamps: true, // cria campos createdAt e updatedAt automaticamente
  }
);

// Middleware: antes de salvar, faz o hash da senha
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next(); // só hash se for nova ou modificada

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método: verifica se a senha fornecida é igual à hashada
userSchema.methods.verificaSenha = async function (senhaTexto) {
  return await bcrypt.compare(senhaTexto, this.senha);
};

// Método: gera token JWT para o usuário atual
userSchema.methods.gerarTokenJWT = function () {
  return jwt.sign(
    { id: this._id, email: this.email, tipo: this.tipo },
    process.env.JWT_SECRET, // importante usar variável de ambiente
    { expiresIn: '7d' } // exemplo: 7 dias de validade
  );
};

// Remove a senha do JSON ao retornar o usuário
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
