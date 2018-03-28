webpackJsonp([1],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactProvider = /** @class */ (function () {
    function ContactProvider(db) {
        this.db = db;
        this.PATH = 'contacts/';
    }
    ContactProvider.prototype.getAll = function () {
        return this.db.list(this.PATH, function (ref) { return ref.orderByChild('name'); })
            .snapshotChanges()
            .map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    };
    ContactProvider.prototype.get = function (key) {
        return this.db.object(this.PATH + key)
            .snapshotChanges()
            .map(function (c) {
            return __assign({ key: c.key }, c.payload.val());
        });
    };
    ContactProvider.prototype.save = function (contact) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (contact.key) {
                _this.db.list(_this.PATH)
                    .update(contact.key, { name: contact.name, tel: contact.tel })
                    .then(function () { return resolve(); })
                    .catch(function (e) { return reject(e); });
            }
            else {
                _this.db.list(_this.PATH)
                    .push({ name: contact.name, tel: contact.tel })
                    .then(function () { return resolve(); });
            }
        });
    };
    ContactProvider.prototype.remove = function (key) {
        return this.db.list(this.PATH).remove(key);
    };
    ContactProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object])
    ], ContactProvider);
    return ContactProvider;
    var _a;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 143:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 143;

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/contact/contact.module": [
		432,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 185;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_contact_contact__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, provider, toast) {
        this.navCtrl = navCtrl;
        this.provider = provider;
        this.toast = toast;
        this.contacts = this.provider.getAll();
    }
    HomePage.prototype.newContact = function () {
        this.navCtrl.push('ContactPage');
    };
    HomePage.prototype.editContact = function (contact) {
        // maneira 1
        this.navCtrl.push('ContactPage', { contact: contact });
        //maneira 2
        //this.navCtrl.push('ContactPage', { key: contact.key });
    };
    HomePage.prototype.removeContact = function (key) {
        var _this = this;
        this.provider.remove(key)
            .then(function () {
            _this.toast.create({ message: 'Contato removido com sucesso!', duration: 3000 }).present();
        })
            .catch(function (e) {
            _this.toast.create({ message: 'Erro ao remover o contato!', duration: 3000 }).present();
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/everton/public_html/Ionic/AppContato/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Contatos\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item-sliding *ngFor="let contact of contacts | async">\n\n      <ion-item>\n        <h1>{{ contact.name }}</h1>\n        <p>{{ contact.tel }}</p>\n      </ion-item>\n\n      <ion-item-options side="left">\n        <button ion-button color="secondary" (click)="editContact(contact)">\n          <ion-icon name="create"></ion-icon>\n        </button>\n        <button ion-button color="danger" (click)="removeContact(contact.key)">\n          <ion-icon name="trash"></ion-icon>\n        </button>\n      </ion-item-options>\n\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-fab bottom right>\n    <button ion-fab color="primary" (click)="newContact()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/everton/public_html/Ionic/AppContato/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_contact_contact__["a" /* ContactProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_contact_contact__["a" /* ContactProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]) === "function" && _c || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(295);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_contact_contact__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5_angularfire2__["a" /* AngularFireModule */].initializeApp({
                    apiKey: "AIzaSyDMfQ9cOWZgPYegizDCZd4CbKU3Nv9PY6I",
                    authDomain: "tutorial-d0829.firebaseapp.com",
                    databaseURL: "https://tutorial-d0829.firebaseio.com",
                    projectId: "tutorial-d0829",
                    storageBucket: "tutorial-d0829.appspot.com",
                    messagingSenderId: "290899237291"
                }),
                __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_contact_contact__["a" /* ContactProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(274);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/everton/public_html/Ionic/AppContato/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/everton/public_html/Ionic/AppContato/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[275]);
//# sourceMappingURL=main.js.map