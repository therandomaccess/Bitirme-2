<template>
  <div>
    <div class="register-box">
      <p>Register</p>
      <form>
        <div class="user-box">
          <input required v-model="registerData.username" type="text" />
          <label>Email</label>
        </div>
        <div class="user-box">
          <input required v-model="registerData.password" type="password" />
          <label>Password</label>
        </div>

        <button @click.prevent="register">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
      <p>
        Already have an account ?
        <router-link to="/" class="a2"> Log in!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      registerData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          this.registerData
        );
        console.log(response.data);

        this.$router.push("/");
      } catch (error) {
        console.error(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.register-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  width: 400px;
}

.register-box p {
  margin-bottom: 30px;
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.register-box .user-box {
  position: relative;
}

.register-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.register-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.register-box .user-box input:focus ~ label,
.register-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.register-box form button {
  margin-bottom: 30px;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 3px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.register-box form button:hover {
  background: #fff;
  color: #272727;
  border-radius: 5px;
}

.register-box form button span {
  position: absolute;
  display: block;
}

.register-box form button span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #fff);
  animation: btn-anim1 1.5s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.register-box form button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #fff);
  animation: btn-anim2 1.5s linear infinite;
  animation-delay: 0.375s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.register-box form button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #fff);
  animation: btn-anim3 1.5s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.register-box form button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #fff);
  animation: btn-anim4 1.5s linear infinite;
  animation-delay: 1.125s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}

.register-box p:last-child {
  color: #aaa;
  font-size: 14px;
}

.register-box a.a2 {
  color: #fff;
  text-decoration: none;
}

.register-box a.a2:hover {
  background: transparent;
  color: #aaa;
  border-radius: 5px;
}
</style>
