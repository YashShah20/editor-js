/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
// const mammoth = require("mammoth");

// FIXME: Incase you have the npm package
const HTMLtoDOCX = require("html-to-docx");

exports.save = async (req, res) => {
  // const filePath = path.join(__dirname, "public", "templates", "demo.docx");

  // const html = req.body.content;
  // mammoth
  //   .convert({ arrayBuffer: html })
  //   .then(function (result) {
  //     res.json(result);
  //     // Get the generated DOCX file
  //     const docxFile = result.arrayBuffer();

  //     // Save the generated DOCX file to disk
  //     fs.writeFileSync(filePath, Buffer.from(docxFile));
  //   })
  //   .done();

  try {
    const fileName = `${req.body.fileName}.docx`;
    const filePath = path.join(__dirname, "public", "templates", fileName);

    const htmlString = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
      </head>

      <body>
          ${req.body.content.replaceAll(/[%]/g, "px")}
      </body>

      </html>`;

    const fileBuffer = await HTMLtoDOCX(htmlString, null, {
      table: { row: { cantSplit: true } },
      footer: false,
      pageNumber: false,
    });

    fs.writeFile(filePath, fileBuffer, (error) => {
      if (error) {
        console.log(error);
        console.log("Docx file creation failed");
        return res.status(400).json("error");
      }
      console.log("Docx file created successfully");
      return res.status(201).json("success");
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("error");
  }
};
