<template>
  <div class="gardenny-login">
    <div>
      <h1 class="title">Gardenny</h1>
    </div>
    <div class="form-container" :class="wrongData ? 'wrong' : ''">
      <h2 class="login-title">Login</h2>
      <form class="login-form" @submit.prevent="onSubmit" autocomplete="off">
        <label
          for="username"
          class="username-text"
          :class="wrongData ? 'wrong' : ''"
          >Username
        </label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="username"
          :class="wrongData ? 'wrong' : ''"
        />
        <label
          for="password"
          class="password-text"
          :class="wrongData ? 'wrong' : ''"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="**********"
          :class="wrongData ? 'wrong' : ''"
        />
        <p class="message">{{ errorMessage }}</p>
        <div class="button-container">
          <button
            class="button"
            type="submit"
            :disabled="username.length < 3 || password.length < 3"
            :class="
              username.length < 3 || password.length < 3 ? 'disabled' : ''
            "
          >
            Login
          </button>
        </div>
      </form>
    </div>
    <router-link to="/register">
      <p class="signup">Don’t have an account? Sign up!</p>
    </router-link>

    <img
      class="plants-footer"
      src="https://i.ibb.co/r0gfz0j/group-Plants.png"
      alt="group-Plants"
      border="0"
    />
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { UserLogin } from "@/types/interface";

export default defineComponent({
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      wrongData: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["userLogin"]),

    async onSubmit() {
      if (this.username !== "" && this.password !== "") {
        const userData: UserLogin = {
          username: this.username,
          password: this.password,
        };

        try {
          await this.userLogin(userData);
          this.$router.push("/home");
          this.wrongData = false;
        } catch {
          this.wrongData = true;
          this.errorMessage = "Wrong username or password, try again";
          this.username = "";
          this.password = "";
        }
      }
    },
  },
});
</script>

<style lang="scss">
@import "../../styles/_variables";

@media screen and (orientation: landscape) {
  .gardenny-login {
    width: 100vh;
    height: 100vw;
  }
}

.gardenny-login {
  background-color: $pink;
  width: 100vw;
  height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 72px;
  margin-top: 10px;
  color: #fff;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.login-title {
  text-align: center;
  width: 200px;
  border-bottom: 3px solid $darkPurple;

  font-size: 48px;
  color: $darkPurple;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 370px;
  margin: 20px;
  margin-top: 1px;
  padding-top: 5px;
  border-radius: 20px;
  border: 2px solid $darkPurple;
  &.wrong {
    height: 360px;
  }
}

.login-form {
  text-align: center;
  display: flex;
  flex-direction: column;
  font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  font-size: 24px;

  input {
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 20px;
    padding-left: 20px;
    width: 220px;
    height: 50px;
    border-radius: 20px;
    border: 1px solid $darkPurple;
    outline-color: $darkViolet;
    &.wrong {
      border: 2px solid red;
    }
  }

  label {
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 27px;
    text-align: start;
    padding-bottom: 10px;
    padding-top: 10px;
    &.wrong {
      color: red;
    }
  }
  .button {
    font-size: 36px;
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    margin-top: 20px;
    width: 159px;
    height: 48px;
    border-radius: 30px;
    background-color: $hotPink;
    border: none;
    color: #ffff;
  }

  .disabled {
    background-color: rgba($color: $hotPink, $alpha: 0.5);
  }
}
.signup {
  bottom: 110px;
  font-size: 28px;
  font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  &:hover {
    color: $hotPink;
  }
}
a {
  text-decoration: none;
  color: $darkViolet;
}
.plants-footer {
  width: 230px;
}
.error-message {
  font-size: 20px;
  font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  color: red;
}
</style>
