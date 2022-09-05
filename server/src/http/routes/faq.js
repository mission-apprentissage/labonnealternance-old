const express = require("express");
const { NotionAPI } = require("notion-client");
const tryCatch = require("../middlewares/tryCatchMiddleware");

const notion = new NotionAPI();

module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    // eslint-disable-next-line no-empty-pattern
    tryCatch(async ({}, res) => {
      const recordMap = await notion.getPage("b1804fe13330409c8baf775c683821b0");

      let pageTitle = "";
      const keys = Object.keys(recordMap.block);
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        const blockValue = recordMap.block[element].value;
        if (blockValue.type === "page") {
          const title = blockValue.properties.title[0][0];
          if (title !== "Documentation") {
            pageTitle = title;
          }
        }
      }

      return res.json({ ...recordMap, pageTitle });
    })
  );

  router.get(
    "/recruteur",
    // eslint-disable-next-line no-empty-pattern
    tryCatch(async ({}, res) => {
      const recordMap = await notion.getPage("95ae35012c6d4a32851b6c7b031fd28e");

      let pageTitle = "";
      const keys = Object.keys(recordMap.block);
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        const blockValue = recordMap.block[element].value;
        if (blockValue.type === "page") {
          const title = blockValue.properties.title[0][0];
          if (title !== "Documentation") {
            pageTitle = title;
          }
        }
      }

      return res.json({ ...recordMap, pageTitle });
    })
  );

  router.get(
    "/organisme",
    // eslint-disable-next-line no-empty-pattern
    tryCatch(async ({}, res) => {
      const recordMap = await notion.getPage("b166d0ef1e6042f9a4bfd3a834f498d8");

      let pageTitle = "";
      const keys = Object.keys(recordMap.block);
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        const blockValue = recordMap.block[element].value;
        if (blockValue.type === "page") {
          const title = blockValue.properties.title[0][0];
          if (title !== "Documentation") {
            pageTitle = title;
          }
        }
      }

      return res.json({ ...recordMap, pageTitle });
    })
  );

  router.get(
    "/candidat",
    // eslint-disable-next-line no-empty-pattern
    tryCatch(async ({}, res) => {
      const recordMap = await notion.getPage("2543e456b94649e5aefeefa64398b9f9");

      let pageTitle = "";
      const keys = Object.keys(recordMap.block);
      for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        const blockValue = recordMap.block[element].value;
        if (blockValue.type === "page") {
          const title = blockValue.properties.title[0][0];
          if (title !== "Documentation") {
            pageTitle = title;
          }
        }
      }

      return res.json({ ...recordMap, pageTitle });
    })
  );

  return router;
};
