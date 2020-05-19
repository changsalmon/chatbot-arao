<template>
  <div class="signup">
    <div class="card">
      <p class="title">ログイン</p>
      <div class="form">
        <input placeholder="メールアドレス" type="email" v-model="email" />
        <input placeholder="パスワード" type="password" v-model="password" />
        <button @click="signIn">ログイン</button>
        <p class="login">
          会員登録は
          <a class="router" @click="$router.push('/signup')">こちら</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          if (data.user.emailVerified) {
            this.$store.dispatch("changeUserAction", {
              user: data.user
            });
            this.$router.replace("/");
          }
        });
    }
  }
};
</script>

<style scoped>
.card {
  margin: 100px auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  width: 300px;
}
.title {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
}
.form {
  text-align: center;
}
input {
  margin-top: 15px;
  width: 80%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid black;
  color: black;
}
button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #5419da;
  border-radius: 25px;
  cursor: pointer;
  margin: 15px;
}
.login {
  color: black;
}
.router {
  color: #1800ee;
  text-decoration: underline;
}
</style>