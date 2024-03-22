<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  subMsg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <header>
    <div class="divLogo">
      <img alt="Click190 Logo" class="logo"
        src="../assets/logo_horizontal-q1yxs8eexmfu9fw80r6cm0oh7ygbfd478vcpnoy5tw.png" />
    </div>

    <div class="greetings">
      <h1 class="green">{{ msg }}</h1>
      <h2>
        {{ subMsg }}
      </h2>
      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/Register">Cadastro</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 20px;
  margin-bottom: 10px;
}

nav a:first-of-type {
  border: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  margin: 0 auto 2rem;
  width: 15vw;
  height: 10vh;
}

.divLogo {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1200px) {
  header {
    display: flex;
    place-items: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .greetings h1,
  .greetings h2 {
    text-align: center;
  }
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h2 {
  font-size: 1.6rem;
}

.greetings h1,
.greetings h2 {
  text-align: center;
}


@media (max-width: 1200px) {
  .logo {
    width: 18vw;
    height: 10vh;
    margin: 0 auto;
  }

  h1 {
    font-weight: 500;
    font-size: 1.8rem;
    position: relative;
    top: 10px;
  }

  h2 {
    font-size: 1rem;
  }

  nav {
    width: 100%;
    font-size: 14px;
    text-align: center;
    margin-top: 1.4rem;
  }

  .greetings h1,
  .greetings h2 {
    margin-top: 10px;
  }
}

@media (max-height: 900px) and (max-width: 700px) {
  .logo {
    width: 40vw;
    height: 10vh;
    margin-top: 10px;
  }

  h1 {
    font-size: 1.2rem;
    top: -5px;
  }

  h2 {
    font-size: 1rem;
  }

  nav a {
    font-size: 16px;
    text-align: center;

  }

  .greetings h1,
  .greetings h2 {
    margin-top: 10px;
  }
}
</style>
