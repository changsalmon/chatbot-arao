<template>
  <div id="app">
    <header class="header">
      <div class="box">
        <div></div>
        <h1>
          Chatbot-arao<font-awesome-icon icon="comments" class="comments" />
        </h1>
        <div class="right-login">
          <!-- ログイン時にはフォームとログアウトボタンを表示 -->
          <div class="login-name" v-if="user.uid" key="login">
            <div class="btn btn-logout" @click="doLogout"><p>Logout</p></div>
          </div>
          <!-- 未ログイン時にはログインボタンを表示 -->
          <div v-else key="logout">
            <div class="btn" id="btn-login" @click="doLogin"><p>Login</p></div>
          </div>
        </div>
      </div>
    </header>
    <transition-group name="chat" tag="div" class="list content">
      <section
        v-for="{ key, name, image, message } in chat"
        :key="key"
        class="item"
      >
        <div class="item-image">
          <img :src="image" width="40" height="40" />
        </div>
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message" />
          </div>
        </div>
      </section>
    </transition-group>

    <!-- 入力フォーム -->
    <form action="" @submit.prevent="doSend" class="form">
      <div class="form-box">
        <input
          type="text"
          name="textbox"
          v-model="input"
          :disabled="!user.uid"
          @keydown.enter.exact.prevent="doSend"
          placeholder="メッセージを入力"
        />
        <button type="submit" :disabled="!user.uid" class="send">
          <font-awesome-icon icon="paper-plane" class="send-button" />
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "./styles/style.css";
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@500&display=swap");
</style>

<script>
// firebase モジュール
import firebase from "firebase";
// 改行を <br> タグに変換するモジュール
import Nl2br from "vue-nl2br";
export default {
  components: { Nl2br },
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "" // 入力したメッセージ
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {};
      const ref_message = firebase.database().ref("message");
      if (user) {
        this.chat = [];
        // message に変更があったときのハンドラを登録
        ref_message.limitToLast(10).on("child_added", this.childAdded);
      } else {
        // message に変更があったときのハンドラを解除
        ref_message.limitToLast(10).off("child_added", this.childAdded);
      }
    });
  },
  methods: {
    // ログイン処理
    doLogin() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    // ログアウト処理
    doLogout() {
      firebase.auth().signOut();
    },
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    // 受け取ったメッセージをchatに追加
    // データベースに新しい要素が追加されると随時呼び出される
    childAdded(snap) {
      const message = snap.val();
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      });
      this.scrollBottom();
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        // firebase にメッセージを追加
        firebase
          .database()
          .ref("message")
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL
            },
            () => {
              this.input = ""; // フォームを空にする
            }
          );
      }
    }
  }
};
</script>
