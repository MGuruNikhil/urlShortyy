import express from "express";
import bodyParser from "body-parser";
import { myUrl } from "./config.js";
import { getFirestore , doc, getDoc, setDoc, collection} from "firebase/firestore";
import { fbApp } from "./fbConfig.js";

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const db = getFirestore(fbApp);
// Define a route to render the index.ejs file
app.get('/', async (req, res) => {
    const index = req.query.i;
    if(index) {
        let fullUrl = "";
        const docRef = doc(db, "urls", "mapping");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            let result = docSnap.data();
            const urls = result.list;
            for(let i=0;i<urls.length;i++) {
                if(urls[i].index == index) {
                    return res.render('redirect', { fullUrl: urls[i].fullUrl });
                }
            }
            console.log("No such index exist");
            return res.render('serverError', { home: myUrl });
        } else {
            console.log("No such document!");
            return res.render('serverError', { home: myUrl });
        }
    }
    return res.render('index', { shortyy: "" });
});

// Define a route to handle form submission
app.post('/', async (req, res) => {
    const url = req.body.url;

    const docRef = doc(db, "urls", "mapping");
    const docSnap = await getDoc(docRef);

    let index = "";

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let result = docSnap.data();
        const urls = result.list;
        let flag = false;
        for(let i=0;i<urls.length;i++) {
            if(urls[i].fullUrl == url) {
                flag = true;
                index = urls[i].index;
                break;
            }
        }
        if(!flag) {
            let newLastIndex = parseInt(result.lastIndex, 10) + 1;
            result.lastIndex = newLastIndex.toString();
            result.list.append({
                fullUrl: url,
                index: newLastIndex.toString(),
            });
            await setDoc(doc(collection(db,'urls'), 'mapping'), result);
            index = newLastIndex.toString();
        }
    } else {
        console.log("No such document!");
        await setDoc(doc(collection(db,'urls'), 'mapping'), {
            list:[{fullUrl: url, index: "0"}],
            lastIndex: "0",
        });
        index = "0";
    }
    const shortyy = myUrl+'?i='+index;
    res.render('index', { shortyy: shortyy });
});

// Start the server
const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
