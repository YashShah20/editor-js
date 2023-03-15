const { TemplateHandler, MimeType } = require("easy-template-x");
const fs = require("fs");
const path = require("path");

exports.report = async (req, res) => {
  const templateFilePath = path.join(
    __dirname,
    "public",
    "templates",
    "docx_template.docx"
  );

  const templateFile = fs.readFileSync(templateFilePath);

  // const data = req.body;
  const data = {
    first_name: "Yash",
    last_name: "Shah",
    phone: "9876543210",
    description: "docx-templater demo",
    logo: {
      _type: "image",
      source: fs.readFileSync(path.join(__dirname, "public", "logo.png")),
      format: MimeType.Png,
      width: 50,
      height: 50,
    },
    projects: [
      {
        id: 1,
        title: "Digital Transformation Initiative",
      },
      {
        id: 2,
        title: "Project Phoenix: Rebuilding Our Infrastructure",
      },
      {
        id: 3,
        title: "Quantum Leap: Moving to the Next Level",
      },
    ],
    url: {
      _type: "link",
      // text: "", // optional - if not specified the `target` property will be used
      target: "https://github.com/alonrbar/easy-template-x",
    },
    terms: [
      {
        term: "All services and products provided by our company are subject to the terms and conditions outlined in our service agreement or sales contract. Any additional terms and conditions not included in this invoice will be governed by the service agreement or sales contract. Our company reserves the right to modify our service agreement or sales contract at any time without prior notice.",
      },
      {
        term: "This invoice is a demand for payment and does not constitute an agreement or contract for future services. Payment of this invoice does not guarantee future services or pricing.",
      },
      {
        term: "All information provided in this invoice is accurate and complete to the best of our knowledge. Our company is not liable for any errors or omissions in this invoice.",
      },
      { term: "Thank you for your business." },
    ],
  };

  const handler = new TemplateHandler();
  const document = await handler.process(templateFile, data);

  const outputFilePath = path.join(
    __dirname,
    "public",
    "reports",
    "output.docx"
  );
  fs.writeFileSync(outputFilePath, document);

  // res.json({
  //   templateFilePath,
  //   data,
  //   outputFilePath,
  // });

  // const options = {
  //   root: path.join(__dirname, "public", "reports"),
  //   dotfiles: "deny",
  //   headers: {
  //     "x-timestamp": Date.now(),
  //     "x-sent": true,
  //   },
  // };

  res.sendFile(outputFilePath, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", outputFilePath);
    }
  });
};
