<template>
  <div class="register">
    <Header
      link-title="Connexion"
      link-href="/auth/login"
    />
    <form
      class="register-form"
      @submit.prevent="register"
      novalidate="true"
    >
      <h1 class="title">Inscription</h1>
      <div class="register-methods">
        <ul>
          <li class="github">
            <a href="">
              <span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  class="svg-inline--fa fa-github fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </span>
              GitHub
            </a>
          </li>
          <li class="gitlab">
            <a href="">
              <span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="gitlab"
                  class="svg-inline--fa fa-gitlab fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M105.2 24.9c-3.1-8.9-15.7-8.9-18.9 0L29.8 199.7h132c-.1 0-56.6-174.8-56.6-174.8zM.9 287.7c-2.6 8 .3 16.9 7.1 22l247.9 184-226.2-294zm160.8-88l94.3 294 94.3-294zm349.4 88l-28.8-88-226.3 294 247.9-184c6.9-5.1 9.7-14 7.2-22zM425.7 24.9c-3.1-8.9-15.7-8.9-18.9 0l-56.6 174.8h132z"
                  ></path>
                </svg>
              </span>
              GitLab
            </a>
          </li>
          <li class="bitbucket">
            <a href="">
              <span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="bitbucket"
                  class="svg-inline--fa fa-bitbucket fa-w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 499 512"
                >
                  <path
                    fill="currentColor"
                    d="M16.2 31.6C7.4 31.5.1 38.5 0 47.4c0 .9.1 1.9.2 2.8l67.9 412.1c1.7 10.4 10.7 18.1 21.3 18.2h325.7c7.9.1 14.7-5.6 16-13.4L499 50.3c1.4-8.7-4.5-16.9-13.2-18.3-.9-.1-1.8-.2-2.8-.2l-466.8-.2zm285.9 297.8h-104l-28.1-147h157.3l-25.2 147z"
                  ></path>
                </svg>
              </span>
              Bitbucket
            </a>
          </li>
        </ul>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <input
          class="input"
          required
          v-model="email"
          type="email"
          placeholder="john.doe@email.com"
        />

      </div>
      <div class="field">
        <label class="label">Mot de passe</label>
        <input
          class="input"
          required
          v-model="password"
          type="password"
          placeholder="••••••••••"
        />
      </div>
      <button
        type="submit"
        class="btn submit"
      >Inscription</button>
    </form>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    Header,
    Footer
  },
  computed: {},
  methods: {
    register() {
      const { email, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        // eslint-disable-next-line no-console
        console.log("you can access dashboard");
        this.$router.push("/dashboard");
      });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        // eslint-disable-next-line no-console
        console.log("logged out");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.register {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .register-methods {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 40px;
      margin-bottom: 10px;
      height: 50px;
      position: relative;

      li {
        width: 32.333%;
        border-radius: 3px;

        a {
          color: #ffffff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          text-decoration: none;
          span {
            color: #ffffff;
            display: flex;
            align-items: center;
            margin-right: 10px;
            svg {
              width: 18px;
            }
          }
        }

        &.github {
          background: #25292e;
        }
        &.gitlab {
          background: #e24329;
        }
        &.bitbucket {
          background: #0747a6;
        }

        &:not(:last-child) {
          margin-right: 10px;
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0;
        border-top: 1px solid #85858529;
        z-index: 1;
        width: 50%;
        margin: auto;
      }
    }
  }
  .register-form {
    background: #ffffff;
    margin: 0 auto;
    border-radius: 3px;

    @media (min-width: 480px) {
      width: 470px;
      padding: 30px 40px;
    }

    .title {
      text-align: center;
      margin-bottom: 40px;
      color: #303133;
      .logo {
        width: 100%;
        max-width: 80px;
        margin: 0 auto;
        margin-right: 20px;
      }

      p {
        vertical-align: middle;
        margin: 0;
        font-size: 24px;
        font-weight: 500;

        small {
          font-size: 14px;
          font-weight: 400;
          text-align: initial;
        }
        * {
          display: block;
        }
      }

      * {
        display: inline-block;
      }
    }

    .field {
      * {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }

      .input {
        background: #fcfcfc;
        border: 2px solid #e7e7e7;
        margin: 20px auto;
        padding: 10px 15px;
        width: 100%;
        display: block;
        border-radius: 3px;
        font-size: 18px;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        text-align: left;
        height: auto;
        -webkit-appearance: none;
        outline: none;

        &:hover {
          border-color: rgba(39, 117, 237, 0.23);
        }
        &:focus {
          border-color: #2874ed;
        }
      }
    }
    .submit {
      color: #ffffff;
      background: #2874ed;
      border: 0;
      font-weight: 500;
      font-size: 17px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 0;
      height: auto;
      -webkit-appearance: none;
      width: 100%;
      padding: 14px;
      border-radius: 3px;
      margin-top: 20px;
    }
  }
}
</style>
