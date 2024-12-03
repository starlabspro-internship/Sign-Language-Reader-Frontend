/* THIS IS THE MAIN JS FILE */
//NE KETE FILE SHTOHEN VETEM KOMPONENTET E NEVOJSHME GLOBALE!
import "../assets/css/style.css";

import { renderHeader } from "./header-footer/header.js";
import { renderFooter } from "./header-footer/footer.js";

//Keto dy rreshta e paraqesin headerin dhe footerin ne secilen faqe qe perdoret app.js
renderHeader();
renderFooter();
