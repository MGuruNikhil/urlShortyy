import express from "express";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";
import { myUrl } from "./config.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import { fbApp } from "./fbConfig.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const db = getFirestore(fbApp);

app.get("/", async (req, res) => {
  const index = req.query.i;
  if (index) {
    const docRef = doc(db, "urls", "mapping");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let result = docSnap.data();
      const urls = result.list;
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].index === index) {
          return res.render("redirect", { fullUrl: urls[i].fullUrl });
        }
      }
      return res.render("serverError", { home: myUrl });
    } else {
      return res.render("serverError", { home: myUrl });
    }
  }
  return res.render("index", { shortyy: "" });
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  if(url.includes(myUrl)){
    return res.render("index", { shortyy: url });
  }
  const docRef = doc(db, "urls", "mapping");
  const docSnap = await getDoc(docRef);
  let index = "";

  if (docSnap.exists()) {
    let result = docSnap.data();
    const urls = result.list;
    let flag = false;
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].fullUrl === url) {
        flag = true;
        index = urls[i].index;
        break;
      }
    }
    if (!flag) {
      let newLastIndex = parseInt(result.lastIndex, 10) + 1;
      result.lastIndex = newLastIndex.toString();
      urls.push({
        fullUrl: url,
        index: newLastIndex.toString(),
      });
      await setDoc(doc(db, "urls", "mapping"), {
        list: urls,
        lastIndex: result.lastIndex,
      });
      index = newLastIndex.toString();
    }
  } else {
    await setDoc(doc(db, "urls", "mapping"), {
      list: [{ fullUrl: url, index: "0" }],
      lastIndex: "0",
    });
    index = "0";
  }
  const shortyy = `${myUrl}?i=${index}`;
  res.render("index", { shortyy });
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
