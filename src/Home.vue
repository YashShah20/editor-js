<template>
  <div class="container mt-5">
    <fieldset>
      <legend>Populate docx template with JSON Data</legend>
      <form action="http://localhost:3000/report" method="post">
        <a
          href="http://localhost:3000/templates/docx_template.docx"
          target="_blank"
          class="me-2 btn btn-primary"
          >Download Template</a
        >
        <input
          type="submit"
          class="btn btn-secondary my-3"
          value="Download Report"
        />
      </form>
    </fieldset>
    <hr />
    <fieldset class="mb-3">
      <legend>Document Editor</legend>
      <tiny-mce />
    </fieldset>
  </div>
</template>

<script>
// import Editor from "./components/Editor.vue";
// import Export from "./components/Export.vue";
import tinyMCE from "./components/tinyMCE.vue";
import documentApi from "./services/documentApi";
export default {
  name: "app-home",
  components: {
    // "document-editor": Editor,
    // "doc-export": Export,
    "tiny-mce": tinyMCE,
  },
  methods: {
    handleClick: function () {
      documentApi
        .downloadReport()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style></style>
