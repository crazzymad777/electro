import {Viewport} from './Viewport.js';
import {App} from './App.js';

let canvas = document.getElementById("canvas");
let container = document.getElementById("container");
let viewport = new Viewport(container, canvas);
let app = new App(viewport);
app.run();
