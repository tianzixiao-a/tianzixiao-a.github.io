"use strict";
var page=[
    "https://github.com/tianzixiao-a",
    "https://tzxblog.eu.org"
];
    function toRandomPage(){pjax.loadUrl("/"+page[Math.floor(Math.random()*page.length)])}