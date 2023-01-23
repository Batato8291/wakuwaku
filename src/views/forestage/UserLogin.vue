<template>
  <div class="container">
    <form @submit="userLo" autocomplete="off">
      <div class="login_box">
        <div class="fs-1 mx-auto">LOG IN</div>
        <div class="input_box">
          <input
            type="email"
            id="username"
            :class="{ active: loginUser.account != '' }"
            v-model="loginUser.account"
          /><span></span>
          <label for="username">Username</label>
        </div>
        <div class="input_box">
          <input
            type="password"
            id="password"
            required
            pattern="[A-Za-z0-9]{8,}"
            :class="{ active: loginUser.password != '' }"
            v-model="loginUser.password"
          />
          <span></span>
          <label for="password">Password</label>
        </div>
        <div class="login_btn">
          <button class="" type="submit">LOG IN</button>
        </div>
        <div class="justify-content-center">
          No account?
          <router-link to="#" class="ms-2 signup_link"
            >Create one !</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
*div {
  display: flex;
}
.container {
  // margin: s
  width: 100vw;
  height: 70vh;
  background-color: rgb(227, 227, 227);
  position: relative;
}
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  box-sizing: border-box;
  padding: 1rem;
  background-color: rgba(255, 173, 21, 0.867);
  color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(255, 173, 21, 0.971);
}
.login_box {
  width: 100%;
  flex-direction: column;
  div:first-child {
    margin-bottom: 1rem;
  }
  .input_box {
    display: inline-block;
    position: relative;
    height: 3rem;
    padding: 0 1rem;
    margin-top: 2rem;
    label {
      position: absolute; //
      top: 0;
      left: 1rem;
      font-size: 1.2rem;
      transition: all 0.5s;
    }
    input,
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      border-bottom: 2px solid white;
      font-size: 1.2rem;
      color: white;
      -webkit-text-fill-color: white;
      transition: background-color 6000s 0s, color 6000s 0s;

      &.active ~ label,
      &:focus ~ label {
        top: -1.5rem;
        font-size: medium;
      }
      &:first-of-type input.active:invalid + span::before {
        content: ': (';
        color: rgb(255, 255, 255);
        position: absolute;
        right: 2rem;
        bottom: 20px;
        font-size: 1.2rem;
      }
      &:first-of-type input.active:valid + span::before {
        content: ': )';
        color: rgb(255, 255, 255);
        position: absolute;
        right: 2rem;
        bottom: 20px;
        font-size: 1.2rem;
      }
    }
  }
  .login_btn {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      border: 2px solid white;
      background-color: transparent;
      color: white;
      padding: 0.25rem 1rem;
      border-radius: 5px;
      font-size: large;
      font-weight: 600;
      transition: all 0.2s linear;
      &:hover {
        background-color: white;
        color: rgb(255, 173, 21);
      }
    }
  }
}
.signup_link {
  color: white;
  text-decoration: none;
  font-weight: 800;
  &:hover {
    text-decoration: underline;
  }
}
</style>
<script>
export default {
  data() {
    return {
      loginUser: {
        account: '',
        password: '',
      },
    };
  },
  methods: {
    userLo() {
      console.log('User LOgin~');
    },
  },
  mounted() {
    const pageBody = document.querySelector('body');
    pageBody.setAttribute('style', 'background-color: rgb(227, 227, 227);');
    // document.querySelector('form').focus();
  },
  beforeRouteLeave() {
    document.querySelector('body').removeAttribute('style');
  },
};
</script>
