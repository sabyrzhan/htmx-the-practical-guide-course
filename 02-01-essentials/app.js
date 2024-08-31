import express from 'express';

import {addNoteHandler, newNoteHandler} from "./routes/notes.js";
import {fetchInfoHandler, mainPageHandler} from "./routes/info.js";

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

// Main page
app.get('/', mainPageHandler);
app.get('/info', fetchInfoHandler);

// Notes
app.get('/new-note', newNoteHandler);
app.post('/note', addNoteHandler)


app.listen(3000);
