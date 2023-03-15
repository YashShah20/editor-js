<template>
  <div>
    <button class="btn btn-primary" @click="save">Export to JSON</button>

    <hr />
    <h2>JSON DATA</h2>
    <hr />

    <pre>{{ JSONData }}</pre>
    <hr />

    <div ref="editor"></div>
    <hr />
  </div>
</template>
<script>
/* eslint-disable */

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Para from "@editorjs/paragraph";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import NestedList from "@editorjs/nested-list";

export default {
  name: "document-editor",
  data() {
    return {
      editor: {},
      JSONData: {},
    };
  },
  methods: {
    save: function () {
      this.editor
        .save()
        .then((outputData) => {
          this.JSONData = outputData;
          console.log("Page data: ", outputData);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    },
  },
  mounted() {
    const editor = new EditorJS({
      holder: this.$refs.editor,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: "http://localhost:8008/uploadFile", // Your endpoint that provides uploading file
              byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+M",
        },
        marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        paragraph: {
          class: Para,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        delimiter: Delimiter,
        code: Code,
        nestedList: NestedList,
      },
      data: this.data,
    });

    this.editor = editor;
  },
};
</script>
