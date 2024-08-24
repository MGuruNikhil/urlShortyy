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
  setDoc
} from "firebase/firestore";
import { fbApp } from "./fbConfig.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const db = getFirestore(fbApp);

function toAlphanumeric(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';
  while (num > 0) {
    str = chars[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str || '0';
}

function fromAlphanumeric(str) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num = num * 62 + chars.indexOf(str[i]);
  }
  return num;
}

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
      let newLastIndex = fromAlphanumeric(result.lastIndex) + 1;
      let newIndex = toAlphanumeric(newLastIndex);
      result.lastIndex = newIndex;
      urls.push({
        fullUrl: url,
        index: newIndex,
      });
      await setDoc(doc(db, "urls", "mapping"), {
        list: urls,
        lastIndex: result.lastIndex,
      });
      index = newIndex;
    }
  } else {
    let newIndex = toAlphanumeric(0);
    await setDoc(doc(db, "urls", "mapping"), {
      list: [{ fullUrl: url, index: newIndex }],
      lastIndex: newIndex,
    });
    index = newIndex;
  }
  const shortyy = `${myUrl}?i=${index}`;
  res.render("index", { shortyy });
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;