<template>
  <div class="gardenny-register">
    <div class="form-container" :class="wrongData ? 'wrong' : ''">
      <h2 class="register-title">Register</h2>
      <form
        class="register-form"
        @submit.prevent="onSubmit"
        novalidate="true"
        autocomplete="off"
      >
        <label for="name" class="name-text" :class="wrongData ? 'wrong' : ''"
          >Your Name:
        </label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="name"
          :class="wrongData ? 'wrong' : ''"
        />
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
        <label
          for="repeatPassword"
          class="repeatPassword-text"
          :class="wrongData ? 'wrong' : ''"
        >
          Repeat Password
        </label>
        <input
          type="password"
          id="repeatPassword"
          v-model="repeatPassword"
          placeholder="**********"
          :class="wrongData ? 'wrong' : ''"
        />
        <p class="message">{{ errorMessage }}</p>
        <div class="button-container">
          <button
            class="button"
            type="submit"
            :disabled="
              name === '' ||
              username === '' ||
              password === '' ||
              repeatPassword === ''
            "
            :class="
              name === '' ||
              username === '' ||
              password === '' ||
              repeatPassword === ''
                ? 'disabled'
                : ''
            "
          >
            Register
          </button>
        </div>
      </form>
    </div>
    <router-link to="login">
      <p class="login">Already Have an User? Log In!</p>
    </router-link>

    <img
      class="plants-footer"
      src="https://i.ibb.co/r0gfz0j/group-Plants.png"
      alt="group-Plants"
      border="0"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { UserRegister } from "@/types/interface";

export default defineComponent({
  name: "Register",
  components: {},
  data() {
    return {
      name: "",
      username: "",
      password: "",
      repeatPassword: "",
      wrongData: false,
      errorMessage: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(["userRegisterAction"]),

    async onSubmit() {
      if (
        this.name !== "" &&
        this.username !== "" &&
        this.password !== "" &&
        this.repeatPassword !== "" &&
        this.password === this.repeatPassword
      ) {
        const newUserData: UserRegister = {
          name: this.name,
          username: this.username,
          password: this.password,
        };
        try {
          this.userRegisterAction(newUserData);
          this.$router.push("/login");
          this.name = "";
          this.username = "";
          this.password = "";
          this.repeatPassword = "";
        } catch (error) {
          this.wrongData = true;
        }
      } else if (this.name.length >= 20) {
        this.wrongData = true;
        this.errorMessage = "The name is too long, max 20 characters";
      } else if (this.username.length >= 20) {
        this.wrongData = true;
        this.errorMessage = "The username is too long, max 20 characters";
      } else if (this.password !== this.repeatPassword) {
        this.errorMessage = "The passwords don't match";
        this.wrongData = true;
      } else if (this.password.length >= 20 || this.password.length < 4) {
        this.wrongData = true;
        this.errorMessage =
          "The password must have between 4 and 20 characters";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";

@media screen and (orientation: landscape) {
  .gardenny-register {
    width: 100vh;
    height: 100vw;
  }
}
.headerTitle {
  display: none;
}
.headerTitleModal {
  display: none;
}

.gardenny-register {
  background-color: $pink;
  width: 100vw;
  height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 36px;
  margin-top: 5px;
  color: #fff;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.register-title {
  text-align: center;
  width: 200px;
  border-bottom: 3px solid $darkPurple;

  font-size: 36px;
  color: $darkPurple;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 450px;
  margin: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-top: 5px;
  border-radius: 20px;
  border: 2px solid $darkPurple;
  &.wrong {
    height: 550px;
  }
}

.register-form {
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
    height: 35px;
    border-radius: 20px;
    border: 1px solid $darkPurple;

    &.wrong {
      color: red;
    }
  }
  a {
    text-decoration: none;
    color: $darkViolet;
  }

  label {
    font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 20px;
    text-align: start;
    padding-bottom: 10px;
    padding-top: 10px;
    &.wrong {
      color: 2px solid red;
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
    cursor: pointer;
    &:active {
      width: 155px;
      height: 45px;
    }
    &:target {
      width: 155px;
      height: 45px;
    }
  }

  .disabled {
    background-color: rgba($color: $hotPink, $alpha: 0.5);
  }
}
.login {
  font-size: 24px;
  font-family: AmaticBold, "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  &:hover {
    color: $hotPink;
  }
}
.plants-footer {
  width: 230px;
  margin-top: 10px;
}
</style>
