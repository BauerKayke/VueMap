<template>
  <form @submit.prevent="checkForm">
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
      errorsSenha: [],
      errorsEmail: [],
      errors: [],
      userAuth: false,
    };
  },
  methods: {
    checkForm() {
      this.errorsSenha = [];
      this.errorsEmail = [];
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

      if (!this.errorsEmail.length && !this.errorsSenha.length) {
        this.users = Object.keys(localStorage)
          .filter((key) => key.startsWith('user_'))
          .map((key) => JSON.parse(localStorage.getItem(key)));
        if (this.foundUser()) {
          const token = 'Click190';
          localStorage.setItem('token', token);
          this.$router.push('/map');
        }


      }
    },
    validEmail(email) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    },
    foundUser() {
      this.users = Object.keys(localStorage)
        .filter((key) => key.startsWith('user_'))
        .map((key) => JSON.parse(localStorage.getItem(key)));
      const userFind = this.users.find((user) => user.email === this.email && user.senha === this.senha);
      if (userFind) {
        localStorage.setItem('user', userFind.user);
        return true;
      } else {
        this.errorsEmail = this.email ? ['Email inválido.'] : ['Email é obrigatório.'];
        this.errorsSenha = this.senha ? ['Senha inválida.'] : ['Senha é obrigatória.'];
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

label {
  font-size: 20px;
  font-weight: bold;
  width: 4vw;
  display: inline-block;
}

input {
  width: 20vw;
  height: 5vh;
  margin: 2vh;
  border-radius: 4px;
  font-size: 18px;
  padding: 5px;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

button {
  height: 5vh;
  width: 8vw;
  border-radius: 4px;
  margin-top: 2vh;
  background-color: #00bd7e;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

button:hover {
  background-color: rgba(0, 189, 126, 0.829);
}

@media (max-width: 1200px) {
  label {
    font-size: 16px;
    width: 4vw;
  }

  input {
    width: 30vw;
    height: 4vh;
    font-size: 18px;
  }

  button {
    height: 4vh;
    margin-top: 1vh;
    font-size: 16px;
  }
}

@media (max-width: 700px) {
  input {
    width: 30vw;
    font-size: 14px;
    display: block;
  }

  button {
    width: 15vw;
    font-size: 14px;
  }
}
</style>
