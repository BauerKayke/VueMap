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
console.log('Oi')
export default {
  name: 'FormularioLogin',
  data() {
    return {
      email: '',
      senha: '',
      errorsSenha: [],
      errorsEmail: [],
      errors: [],
      userAuth: false
    }
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
        const users = Object.keys(localStorage).filter(key => key.startsWith('user_')).map(key => JSON.parse(localStorage.getItem(key)));
        this.foundUser(users);
        const token = 'Click190';
        localStorage.setItem('token', token);
        this.$router.push('/map');
      }
    },
    validEmail(email) {
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    },
    foundUser(users) {
      const userFind = users.find(user => user.email === this.email && user.senha === this.senha);
      if (userFind) {
        localStorage.setItem('user', userFind.user);
        return true
      } else {
        this.errorsEmail = this.email ? ['Email inválido.'] : ['Email é obrigatório.'];
        this.errorsSenha = this.senha ? ['Senha inválida.'] : ['Senha é obrigatória.'];

      }
    },
  }
}
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
  /* Defina um tamanho fixo para todas as labels */
  display: inline-block;
}

input {
  width: 15vw;
  height: 4vh;
  margin: 2vh;
  border-radius: 3px;
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
  height: 4vh;
  width: 8vw;
  border-radius: 3px;
  margin-top: 2vh;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 1100px) {
  label {
    font-size: 18px;
    font-weight: bold;
    width: 6vw;
    display: inline-block;
  }

  input {
    width: 15vw;
    height: 4vh;
    margin: 2vh;
    border-radius: 3px;
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
    height: 4vh;
    width: 8vw;
    border-radius: 3px;
    margin-top: 1vh;
    background-color: hsla(160, 100%, 37%, 1);
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
