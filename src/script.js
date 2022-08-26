import './styles/main.css';
import image from "./assets/img/webpack.png";
import { sayHello } from './js/components/seyHello';
import { createImg } from './js/utils/imgWebpack'

sayHello();
const rootHTML = document.getElementById( "root" );
createImg( rootHTML, image );



