<template>
  <div class="dashboard">
    <Sidebar></Sidebar>
    <div class="inner-dashboard">
      <p>Salut</p>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/partials/Sidebar";
export default {
  name: "ServersIndexPage",
  data() {},
  computed: {},
  components: {
    Sidebar
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        // eslint-disable-next-line no-console
        console.log("logout OK");
      });
    }
  }
};
</script>



<style lang="scss" scoped>
.dashboard {
  height: 100%;
  display: block;
  .inner-dashboard {
    height: 100%;
    display: block;
    padding-left: 240px;
    background: #f8f9fd;
    height: 100%;
    padding-left: 240px;
    background: #f8f9fd;

    p {
      margin: 0;
    }
  }
}
</style>
