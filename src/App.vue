<template>
  <div class="container mt-5">
    <document-editor class="mb-2"/>
    <doc-export class="mt-2"/>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
import Export from "./components/Export.vue";

export default {
  name: "App",
  components: {
    "document-editor": Editor,
    "doc-export": Export,
  },
  methods: {},
};
</script>
<style></style>
