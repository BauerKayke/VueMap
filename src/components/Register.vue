<template>
  <form @submit.prevent="checkForm">
    <div class="userDiv">
      <label for="user">Usuário</label>
      <input type="text" name="user" v-model="user" placeholder="Digite seu nome de usuário" />
      <div class="error" v-if="errorsUser.length > 0">
        <p v-for="(error, index) in errorsUser" :key="index">{{ error }}</p>
      </div>
    </div>
    <div class="emailDiv">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="email" placeholder="Digite seu email" />
      <div class="error" v-if="errorsEmail.length > 0">
        <p v-for="(error, index) in errorsEmail" :key="index">{{ error }}</p>
      </div>
    </div>

    <div class="senhaDiv">
      <label for="senha">Senha</label>
      <input type="password" name="senha" v-model="senha" placeholder="Digite sua senha" />
      <div class="error" v-if="errorsSenha.length > 0">
        <p v-for="(error, index) in errorsSenha" :key="index">{{ error }}</p>
      </div>
    </div>
    <button type="submit">Entrar</button>
  </form>
</template>

<script>
export default {
  name: 'FormularioLogin',
  data() {
    return {
      email: '',
      senha: '',
      user: '',
      errorsSenha: [],
      errorsEmail: [],
      errorsUser: [],
      lastUserId: parseInt(localStorage.getItem('lastUserId') || 0),
    };
  },

  methods: {
    checkForm() {
      this.errorsSenha = [];
      this.errorsEmail = [];
      this.errorsUser = [];
      this.checkUser();
      if (!this.user) {
        this.errorsUser.push('O nome de usuário é obrigatório!');
      } else if (this.user.length <= 3) {
        this.errorsUser.push('O nome de usuário precisa ter mais de três caracteres');
      }
      if (!this.email) {
        this.errorsEmail.push('O email é obrigatório!');
      } else if (!this.validEmail(this.email)) {
        this.errorsEmail.push('Utilize um e-mail válido.');
      }
      if (!this.senha) {
        this.errorsSenha.push('A senha é obrigatória!');
      } else if (this.senha.length < 3) {
        this.errorsSenha.push('A senha precisa ter mais de três caracteres');
      }

      if (!this.errorsEmail.length && !this.errorsSenha.length && !this.errorsUser.length) {
        const userId = ++this.lastUserId;
        localStorage.setItem('lastUserId', userId);
        localStorage.setItem(
          `user_${userId}`,
          JSON.stringify({
            id: userId,
            user: this.user,
            email: this.email,
            senha: this.senha,
          }),
        );
        this.$router.replace('/');
      }
    },
    validEmail(email) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    },
    checkUser() {
      for (let i = 1; i <= this.lastUserId; i++) {
        const userData = JSON.parse(localStorage.getItem(`user_${i}`));
        if (userData) {
          if (userData.email === this.email) {
            this.errorsEmail.push('Este email já está cadastrado!');
          }
          if (userData.user === this.user) {
            this.errorsUser.push('Este usuário já está cadastrado');
          }
        }
      }
    }
  },

};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.error {
  color: red;
  font-weight: bold;
}

label {
  font-size: 20px;
  font-weight: bold;
  width: 5vw;
  display: inline-block;
}

input {
  width: 20vw;
  height: 5vh;
  margin: 2vh;
  border-radius: 3px;
  font-size: 18px;
  padding: 5px;
}

button {
  height: 4vh;
  width: 8vw;
  border-radius: 3px;
  margin-top: 2vh;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-size: 18px;
  font-weight: bold;
}

button:hover {
  background-color: rgba(0, 189, 126, 0.829);
}

@media(min-width: 1200px) {
  input {
    margin: 1.5vh;
  }
}

@media(max-width:1200px) {
  label {
    width: 8vw;
  }
}

@media (max-width: 768px) {

  label {
    font-size: 16px;
    width: 7vw;
  }

  input {
    width: 25vw;
  }

  button {
    width: 15vw;
  }
}

@media (max-height:900px)and (max-width: 700px) {
  label {
    font-size: 16px;
    width: 7vw;
  }

  input {
    display: block;
    width: 50vw;
    margin: 0.5vh;
    font-size: 12px;
  }

  button {
    width: 30vw;
  }
}

@media (max-width: 500px) {
  label {
    font-size: 14px;
    width: auto;
  }
}
</style>
