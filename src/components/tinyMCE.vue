<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <input
          type="text"
          v-model="fileName"
          placeholder="Enter File Name"
          class="form-control w-25 d-inline-block me-2"
        />
        <input type="submit" value="Save" class="btn btn-primary" />
        <a
          class="ms-2"
          target="_blank"
          :href="`http://localhost:3000/templates/${fileName}.docx`"
          >Download the .docx file</a
        >
      </div>
    </form>
    <editor
      :api-key="apiKey"
      :init="initOptions"
      style="min-height: 100vh"
      v-model="content"
    />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import documentApi from "../services/documentApi";
import config from "../config";

export default {
  beforeMount() {
    this.apiKey = config.tinyMCE_API_KEY;
  },
  data() {
    return {
      content: "",
      useDarkMode: false,
      apiKey: "",
      fileName: "Untitled",
      initOptions: {
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons",
        menu: {
          file: {
            title: "File",
            items: "newdocument | preview | save print",
          },
          edit: {
            title: "Edit",
            items:
              "undo redo | cut copy paste pastetext | selectall | searchreplace",
          },
          view: {
            title: "View",
            items: "code | preview fullscreen | showcomments",
          },
          insert: {
            title: "Insert",
            items:
              "image link media addcomment pageembed codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
          },
          format: {
            title: "Format",
            items:
              "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
          },
          tools: {
            title: "Tools",
            items:
              "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
          },
          table: {
            title: "Table",
            items:
              "inserttable | cell row column | advtablesort | tableprops deletetable",
          },
          help: { title: "Help", items: "help" },
        },
        menubar: "file edit view insert format  table help",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify lineheight | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        image_caption: true,
        table_style_by_css: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        contextmenu: "link image table",
        skin: this.useDarkMode ? "oxide-dark" : "oxide",
        content_css: this.useDarkMode ? "dark" : "default",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        file_picker_callback: this.file_picker_callback,
      },
    };
  },
  components: {
    editor: Editor, // <- Important part
  },
  methods: {
    handleSubmit: function () {
      console.log(this.fileName, this.content);
      documentApi
        .saveToDocx(this.fileName, this.content)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    file_picker_callback: function (callback, value, meta) {
      /* Provide file and text for the link dialog */
      if (meta.filetype === "file") {
        callback("https://www.google.com/logos/google.jpg", {
          text: "My text",
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === "image") {
        callback("https://www.google.com/logos/google.jpg", {
          alt: "My alt text",
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === "media") {
        callback("movie.mp4", {
          source2: "alt.ogg",
          poster: "https://www.google.com/logos/google.jpg",
        });
      }
    },
  },
};
</script>

<style scoped></style>
