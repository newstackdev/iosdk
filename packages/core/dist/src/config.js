"use strict";
exports.__esModule = true;
exports.config = exports.newlifeWebsocketsServer = exports.newlifeMediaBucket = exports.newlifeBaseUrl = exports.firebaseConfig = exports.APP_DOMAIN = void 0;
var currentHost = window.location.hostname === "localhost"
    ? "web-dev.newlife.io"
    : window.location.hostname;
var stages = {
    "web-dev.newlife.io": "eu-dev",
    "test.newlife.io": "eu-sit",
    "web.newlife.io": "eu-prod",
    "www.newlife.io": "eu-prod",
    "newlife.io": "eu-prod",
    "web-dev.unsid.org": "eu-dev"
};
var stage = stages[currentHost];
var newlifeBaseUrls = {
    "eu-dev": "https://api-eu-dev.newlife.io/creator",
    "eu-sit": "https://api-eu-sit.newlife.io/creator",
    "eu-prod": "https://api-eu-prod.newlife.io/creator"
};
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfigs = {
    "eu-dev": {
        apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
        authDomain: "newlifeio.firebaseapp.com",
        projectId: "newlifeio",
        storageBucket: "newlifeio.appspot.com",
        messagingSenderId: "360722214510",
        appId: "1:360722214510:web:d088a1e106fef50262007f",
        measurementId: "G-PJWYRPZSNM"
    },
    "eu-sit": {
        apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
        authDomain: "newlifeio.firebaseapp.com",
        projectId: "newlifeio",
        storageBucket: "newlifeio.appspot.com",
        messagingSenderId: "360722214510",
        appId: "1:360722214510:web:d088a1e106fef50262007f",
        measurementId: "G-PJWYRPZSNM"
    },
    "eu-prod": {
        apiKey: "AIzaSyAv5KoJ2S0ZCj-n45hILx7XsTT4irt6w8c",
        authDomain: "newlifeio-prod.firebaseapp.com",
        projectId: "newlifeio-prod",
        storageBucket: "newlifeio-prod.appspot.com",
        messagingSenderId: "666370792765",
        appId: "1:666370792765:web:02c694986693a8ae54f954",
        measurementId: "G-YMT320RGLJ"
    },
    v1: {
        apiKey: "AIzaSyAwMWXd0V5zEvNHBwyY8Cbe-OYG5PF9Qu8",
        authDomain: "newlifeio-prod.firebaseapp.com",
        projectId: "newlifeio-prod",
        storageBucket: "newlifeio-prod.appspot.com",
        messagingSenderId: "666370792765",
        appId: "1:666370792765:web:02c694986693a8ae54f954",
        measurementId: "G-YMT320RGLJ"
    }
};
var newlifeMediaBuckets = {
    "eu-dev": "https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com",
    "eu-sit": "https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com",
    "eu-prod": "https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com"
};
var newlifeWebsocketsServers = {
    "eu-dev": "wss://wsapi-eu-dev.newlife.io/creator",
    "eu-sit": "wss://wsapi-eu-sit.newlife.io/creator",
    "eu-prod": "wss://wsapi-eu-prod.newlife.io/creator"
};
exports.APP_DOMAIN = "life.nco";
exports.firebaseConfig = firebaseConfigs[stage];
exports.newlifeBaseUrl = newlifeBaseUrls[stage];
exports.newlifeMediaBucket = newlifeMediaBuckets[stage];
exports.newlifeWebsocketsServer = newlifeWebsocketsServers[stage];
exports.config = {
    settings: {
        firebaseConfig: exports.firebaseConfig,
        newlife: {
            baseUrl: exports.newlifeBaseUrl,
            mediaBucket: exports.newlifeMediaBucket,
            websocketsServer: exports.newlifeWebsocketsServer
        }
    },
    components: {
        layout: {
        // Layout: Layout as GenericComponent,
        // TopMenu: TopMenu as GenericComponent,
        },
        auth: {
        // AuthWidget: AuthWidget as GenericComponent,
        },
        icons: {
        // Logo: Logo as GenericComponent,
        }
    }
};
