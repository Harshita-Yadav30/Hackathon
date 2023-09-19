import path from 'path';
import express from 'express';
import multer from 'multer';
import alert from 'alert';
import { Script } from 'vm';

const app = express();

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        return cb(null, "./uploads");
    },
    filename: function (req,file,cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.static(path.join(path.resolve(),"uploads")));

app.get("/", (req,res) => {
    return res.redirect("landing.html");
});

app.get("/dashboard.html", (req,res) => {
    return res.redirect("dashboard.html");
});

app.get("/fill_profile", (req,res) => {
    return res.render("fill_profile");
});

app.post('/dashboard.html', (req,res) => {
    if (req.body.mobile === 'abc' && req.body.password === 'abc'){
        return res.redirect('dashboard.html');
    }
    else{
        res.redirect("professional_login.html");
    }
});

app.post("/fill_profile", upload.single("profile"), (req,res) => {
    return res.render("fill_profile",{f:req.file.filename});
});

app.listen(5000, () => console.log("Server is running"))