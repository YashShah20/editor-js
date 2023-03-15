<template>
  <div>
    <button @click="renderDoc" class="btn btn-primary">Download docx template</button>
  </div>
</template>

<script>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

export default {
  name: "doc-export",
  data() {
    return {
      data: {
        first_name: "Yash",
        last_name: "Shah",
        phone: "9876543210",
        description: "docx-templater demo",
        projects: [
          {
            id: 1,
            title: "Project 1",
          },
          {
            id: 2,
            title: "Project 2",
          },
          {
            id: 3,
            title: "Project 3",
          },
        ],
      },
    };
  },
  methods: {
    loadFile: function (url, callback) {
      PizZipUtils.getBinaryContent(url, callback);
    },
    renderDoc: function () {
      this.loadFile(
        "http://localhost:3000/templates/docx_template.docx",
        (error, content) => {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
          doc.setData(this.data);
          try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
          } catch (error) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
            // function replaceErrors(key, value) {
            //   if (value instanceof Error) {
            //     return Object.getOwnPropertyNames(value).reduce(function (
            //       error,
            //       key
            //     ) {
            //       error[key] = value[key];
            //       return error;
            //     },
            //     {});
            //   }
            //   return value;
            // }
            // console.log(JSON.stringify({ error: error }, replaceErrors));
            console.log(error);

            if (error.properties && error.properties.errors instanceof Array) {
              const errorMessages = error.properties.errors
                .map(function (error) {
                  return error.properties.explanation;
                })
                .join("\n");
              console.log("errorMessages", errorMessages);
              // errorMessages is a humanly readable message looking like this :
              // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
          }
          const out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // Output the document using Data-URI
          saveAs(out, "output.docx");
        }
      );
    },
  },
};
</script>
