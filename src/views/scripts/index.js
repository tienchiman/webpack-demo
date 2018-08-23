console.log('mian.js');
document.getElementById('p').innerText = `${JSON.stringify(process.env.NODE_ENV)}---main.js${JSON.stringify(process.env)}`;

import '../scss/main.scss'
import {text } from '../../common/utils'

console.log(JSON.stringify(text));