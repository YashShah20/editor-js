<template>
  <div>
    <div class="container mt-3 text-center">
      <router-link class="me-3" to="/">tinyMCE</router-link>
      <router-link to="/editor-js">editor.js</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

};
</script>
<style scoped>
a {
  text-decoration: none;
  font-size: large;
  background-color: aliceblue;
  padding:10px;
  border-radius: 5px;
}

</style>
