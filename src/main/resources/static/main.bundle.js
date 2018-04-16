webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
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
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <app-navbar [notificationsList]=\"notificationList\"></app-navbar>\n  <router-outlet></router-outlet>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_notification__ = __webpack_require__("../../../../../src/app/models/notification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_notification_content__ = __webpack_require__("../../../../../src/app/constants/notification-content.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppComponent = /** @class */ (function () {
    function AppComponent(auth, userprofileService, http, globals, notificationsService) {
        this.auth = auth;
        this.userprofileService = userprofileService;
        this.http = http;
        this.globals = globals;
        this.notificationsService = notificationsService;
        this.notifications = ["hello", "there", "ha"];
        this.notificationList = [];
        this.profile = JSON.parse(localStorage.getItem("profile"));
        var notifications = this.notificationList;
        auth.handleAuthentication(function (data, createUser) {
            var profile = JSON.parse(localStorage.getItem("profile"));
            userprofileService.getUser(profile.nickname).subscribe(function (resBody) {
                var id = resBody.id;
                pollNotifications(id);
                getUserNotifications(profile.nickname);
            });
            if (createUser) {
                var riftData = {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "riftTag": data.riftTag,
                    "auth0Token": data.auth0Token,
                    "email": data.email
                };
                userprofileService.createUser(riftData);
            }
            else {
                userprofileService.getUser(profile.nickname).subscribe(function (resBody) {
                    localStorage.setItem("loggedInUserID", resBody.id.toString());
                });
            }
        });
        function pollNotifications(id) {
            console.log("Polling notifications");
            notificationsService.pollNotifications(id, notifications, true);
        }
        function getUserNotifications(riftTag) {
            console.log("Getting user notifications");
            userprofileService.getUserNotifications(riftTag).subscribe(function (resBody) {
                if (resBody.length > 0) {
                    for (var i = resBody.length - 1; i > -1; i--) {
                        var notification = new __WEBPACK_IMPORTED_MODULE_5__models_notification__["a" /* Notification */]();
                        notification.createdTime = resBody[i].createdTime;
                        notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
                        notification.creatorEmail = resBody[i].creatorUsertable.email;
                        notification.creatorId = resBody[i].creatorUsertable.id;
                        // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
                        notification.notificationType = resBody[i].notificationType;
                        notification.notificationContent = __WEBPACK_IMPORTED_MODULE_7__constants_notification_content__["a" /* NOTIFICATION_CONTENT */].get(notification.notificationType);
                        notification.sessionId = resBody[i].sessionId;
                        notification.seen = resBody[i].seen;
                        if (!notification.seen) {
                            globals.unseenNotifications += 1;
                        }
                        if (notification.sessionId > 0) {
                            notification.sessionTitle = resBody[i].rifterSession.title;
                        }
                        notifications.push(notification);
                    }
                }
                else {
                    var notification = new __WEBPACK_IMPORTED_MODULE_5__models_notification__["a" /* Notification */]();
                    notification.notificationContent = "No notifications";
                    notification.creatorProfilePic = "";
                    notification.createdTime = -1;
                    notifications.push(notification);
                }
            });
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem("profile"));
        if (this.profile) {
            this.userprofileService.getUser(this.profile.nickname).subscribe(function (resBody) {
                var id = resBody.id;
                _this.notificationsService.pollNotifications(id, _this.notificationList, false);
            });
            // this.getUserNotifications(this.profile.nickname);
        }
    };
    AppComponent.prototype.beforeUnloadHandler = function (event) {
        var _this = this;
        this.userprofileService.getUser(this.profile.nickname).subscribe(function (resBody) {
            var id = resBody.id;
            _this.notificationsService.stopPolling(id);
        });
    };
    AppComponent.prototype.getUserNotifications = function (riftTag) {
        var _this = this;
        console.log("Getting user notifications");
        this.userprofileService.getUserNotifications(riftTag).subscribe(function (resBody) {
            if (resBody.length > 0) {
                for (var i = resBody.length - 1; i > -1; i--) {
                    var notification = new __WEBPACK_IMPORTED_MODULE_5__models_notification__["a" /* Notification */]();
                    notification.createdTime = resBody[i].createdTime;
                    notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
                    notification.creatorEmail = resBody[i].creatorUsertable.email;
                    notification.creatorId = resBody[i].creatorUsertable.id;
                    // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
                    notification.notificationType = resBody[i].notificationType;
                    notification.notificationContent = __WEBPACK_IMPORTED_MODULE_7__constants_notification_content__["a" /* NOTIFICATION_CONTENT */].get(notification.notificationType);
                    notification.sessionId = resBody[i].sessionId;
                    notification.seen = resBody[i].seen;
                    if (!notification.seen) {
                        _this.globals.unseenNotifications += 1;
                    }
                    if (notification.sessionId > 0) {
                        notification.sessionTitle = resBody[i].rifterSession.title;
                    }
                    _this.notificationList.push(notification);
                }
            }
            else {
                var notification = new __WEBPACK_IMPORTED_MODULE_5__models_notification__["a" /* Notification */]();
                notification.notificationContent = "No notifications";
                notification.creatorProfilePic = "";
                notification.createdTime = -1;
                _this.notificationList.push(notification);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:beforeunload', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "beforeUnloadHandler", null);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_4__global_globals__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_6__userprofile_notifications_service__["a" /* NotificationsService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_router__ = __webpack_require__("../../../../../src/app/app.router.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_tabs__ = __webpack_require__("../../../material/esm5/tabs.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_component__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__navbar_navbar_component__ = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__usersessions_usersessions_component__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__therift_therift_component__ = __webpack_require__("../../../../../src/app/therift/therift.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__therift_riftsessions_riftsessions_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_session_card_session_card_component__ = __webpack_require__("../../../../../src/app/components/session-card/session-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_capitalize_pipe__ = __webpack_require__("../../../../../src/app/pipes/capitalize.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angular2_wizard_dist__ = __webpack_require__("../../../../angular2-wizard/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_angular2_wizard_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_angular2_wizard_dist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_follow_button_follow_button_component__ = __webpack_require__("../../../../../src/app/components/follow-button/follow-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__userprofile_update_info_update_info_component__ = __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__userprofile_update_info_data_update_info_service__ = __webpack_require__("../../../../../src/app/userprofile/update-info/data/update-info.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_search_bar_search_bar_component__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_search_bar_search_bar_service__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_user_card_user_card_component__ = __webpack_require__("../../../../../src/app/components/user-card/user-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__therift_riftsessions_session_page_session_page_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__therift_riftsessions_session_page_session_page_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__userprofile_user_rating_user_rating_component__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__userprofile_user_rating_data_user_rating_service__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/data/user-rating.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_material_select__ = __webpack_require__("../../../material/esm5/select.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_material_slider__ = __webpack_require__("../../../material/esm5/slider.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_user_review_user_review_component__ = __webpack_require__("../../../../../src/app/components/user-review/user-review.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_notification_notification_component__ = __webpack_require__("../../../../../src/app/components/notification/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37_angular_calendar__ = __webpack_require__("../../../../angular-calendar/esm5/angular-calendar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_rating_rating_component__ = __webpack_require__("../../../../../src/app/components/rating/rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__therift_riftsessions_session_page_update_session_update_session_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__therift_riftsessions_session_page_update_session_data_update_session_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_session_accept_reject_button_session_accept_reject_button_component__ = __webpack_require__("../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__ = __webpack_require__("../../../material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__angular_material_checkbox__ = __webpack_require__("../../../material/esm5/checkbox.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__usersessions_create_session_data_create_session_service__ = __webpack_require__("../../../../../src/app/usersessions/create-session/data/create-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__usersessions_create_session_create_session_component__ = __webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pipes_session_type_pipe__ = __webpack_require__("../../../../../src/app/pipes/session-type.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pipes_session_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/session-time.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pipes_game_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/game-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pipes_console_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/console-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_ap_angular2_fullcalendar_src_calendar_calendar__ = __webpack_require__("../../../../ap-angular2-fullcalendar/src/calendar/calendar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_ap_angular2_fullcalendar_src_calendar_calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_53_ap_angular2_fullcalendar_src_calendar_calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54_angular2_image_upload__ = __webpack_require__("../../../../angular2-image-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__components_file_upload_file_upload_component__ = __webpack_require__("../../../../../src/app/components/file-upload/file-upload.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__feed_feed_component__ = __webpack_require__("../../../../../src/app/feed/feed.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__components_feed_card_feed_card_component__ = __webpack_require__("../../../../../src/app/components/feed-card/feed-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__userprofile_file_a_complaint_file_a_complaint_component__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__userprofile_file_a_complaint_data_file_a_complaint_service__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/data/file-a-complaint-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_kick_riftee_button_kick_riftee_button_component__ = __webpack_require__("../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__userprofile_twitch_service__ = __webpack_require__("../../../../../src/app/userprofile/twitch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__userprofile_youtube_service__ = __webpack_require__("../../../../../src/app/userprofile/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__userprofile_game_account_add_game_account_add_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__userprofile_game_account_edit_game_account_edit_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__userprofile_game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__userprofile_stripe_payment_stripe_payment_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__userprofile_stripe_payment_legal_bank_account_info_add_bank_account_add_bank_account_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__userprofile_stripe_payment_stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__userprofile_stripe_payment_legal_bank_account_info_legal_bank_account_info_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__userprofile_stripe_payment_view_cards_view_cards_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__components_credit_card_credit_card_component__ = __webpack_require__("../../../../../src/app/components/credit-card/credit-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_ngx_img_cropper__ = __webpack_require__("../../../../ngx-img-cropper/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__components_activity_card_activity_card_component__ = __webpack_require__("../../../../../src/app/components/activity-card/activity-card.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












































































function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_25_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_25_angular2_jwt__["AuthConfig"]({
        tokenGetter: (function () { return localStorage.getItem('access_token'); }),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_component__["a" /* UserprofileComponent */],
                __WEBPACK_IMPORTED_MODULE_14__navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_15__usersessions_usersessions_component__["a" /* UsersessionsComponent */],
                __WEBPACK_IMPORTED_MODULE_16__therift_therift_component__["a" /* TheriftComponent */],
                __WEBPACK_IMPORTED_MODULE_17__therift_riftsessions_riftsessions_component__["a" /* RiftsessionsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_session_card_session_card_component__["a" /* SessionCardComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_follow_button_follow_button_component__["a" /* FollowButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_23__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_search_bar_search_bar_component__["a" /* SearchBarComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_user_card_user_card_component__["a" /* UserCardComponent */],
                __WEBPACK_IMPORTED_MODULE_29__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */],
                __WEBPACK_IMPORTED_MODULE_31__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_user_review_user_review_component__["a" /* UserReviewComponent */],
                __WEBPACK_IMPORTED_MODULE_36__components_notification_notification_component__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_rating_rating_component__["a" /* RatingComponent */],
                __WEBPACK_IMPORTED_MODULE_40__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_42__components_session_accept_reject_button_session_accept_reject_button_component__["a" /* SessionAcceptRejectButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_48__usersessions_create_session_create_session_component__["a" /* CreateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_53_ap_angular2_fullcalendar_src_calendar_calendar__["CalendarComponent"],
                __WEBPACK_IMPORTED_MODULE_20__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_49__pipes_session_type_pipe__["a" /* SessionTypePipe */],
                __WEBPACK_IMPORTED_MODULE_50__pipes_session_time_pipe__["a" /* SessionTimePipe */],
                __WEBPACK_IMPORTED_MODULE_51__pipes_game_filter_pipe__["a" /* GameFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_52__pipes_console_filter_pipe__["a" /* ConsoleFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_55__components_file_upload_file_upload_component__["a" /* FileUploadComponent */],
                __WEBPACK_IMPORTED_MODULE_56__feed_feed_component__["a" /* FeedComponent */],
                __WEBPACK_IMPORTED_MODULE_57__components_feed_card_feed_card_component__["a" /* FeedCardComponent */],
                __WEBPACK_IMPORTED_MODULE_59__userprofile_file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */],
                __WEBPACK_IMPORTED_MODULE_61__components_kick_riftee_button_kick_riftee_button_component__["a" /* KickRifteeButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_64__userprofile_game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_65__userprofile_game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_67__userprofile_stripe_payment_stripe_payment_component__["a" /* StripePaymentComponent */],
                __WEBPACK_IMPORTED_MODULE_68__userprofile_stripe_payment_legal_bank_account_info_add_bank_account_add_bank_account_component__["a" /* AddBankAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_70__userprofile_stripe_payment_legal_bank_account_info_legal_bank_account_info_component__["a" /* LegalBankAccountInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_71__userprofile_stripe_payment_view_cards_view_cards_component__["a" /* ViewCardsComponent */],
                __WEBPACK_IMPORTED_MODULE_72__components_credit_card_credit_card_component__["a" /* CreditCardComponent */],
                __WEBPACK_IMPORTED_MODULE_74_ngx_img_cropper__["b" /* ImageCropperComponent */],
                __WEBPACK_IMPORTED_MODULE_75__components_activity_card_activity_card_component__["a" /* ActivityCardComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_router__["a" /* routes */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_tabs__["a" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["i" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["e" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["f" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["g" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_43__angular_material_dialog__["c" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_21_angular2_wizard_dist__["FormWizardModule"],
                __WEBPACK_IMPORTED_MODULE_33__angular_material_select__["a" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_34__angular_material_slider__["a" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_44__angular_material_checkbox__["a" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["h" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_37_angular_calendar__["a" /* CalendarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_38__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__["b" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__["f" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__["e" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_54_angular2_image_upload__["a" /* ImageUploadModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_45_ngx_bootstrap__["d" /* CollapseModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_55__components_file_upload_file_upload_component__["a" /* FileUploadComponent */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_29__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */], __WEBPACK_IMPORTED_MODULE_40__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */], __WEBPACK_IMPORTED_MODULE_15__usersessions_usersessions_component__["a" /* UsersessionsComponent */], __WEBPACK_IMPORTED_MODULE_48__usersessions_create_session_create_session_component__["a" /* CreateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_component__["a" /* UserprofileComponent */], __WEBPACK_IMPORTED_MODULE_23__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */], __WEBPACK_IMPORTED_MODULE_31__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */], __WEBPACK_IMPORTED_MODULE_59__userprofile_file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */], __WEBPACK_IMPORTED_MODULE_64__userprofile_game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_65__userprofile_game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */], __WEBPACK_IMPORTED_MODULE_67__userprofile_stripe_payment_stripe_payment_component__["a" /* StripePaymentComponent */], __WEBPACK_IMPORTED_MODULE_68__userprofile_stripe_payment_legal_bank_account_info_add_bank_account_add_bank_account_component__["a" /* AddBankAccountComponent */], __WEBPACK_IMPORTED_MODULE_70__userprofile_stripe_payment_legal_bank_account_info_legal_bank_account_info_component__["a" /* LegalBankAccountInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_71__userprofile_stripe_payment_view_cards_view_cards_component__["a" /* ViewCardsComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_12__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_13__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_19__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_24__userprofile_update_info_data_update_info_service__["a" /* UpdateInfoService */], __WEBPACK_IMPORTED_MODULE_27__components_search_bar_search_bar_service__["a" /* SearchBarService */], __WEBPACK_IMPORTED_MODULE_30__therift_riftsessions_session_page_session_page_service__["a" /* SessionPageService */],
                __WEBPACK_IMPORTED_MODULE_32__userprofile_user_rating_data_user_rating_service__["a" /* UserRatingService */], __WEBPACK_IMPORTED_MODULE_41__therift_riftsessions_session_page_update_session_data_update_session_service__["a" /* UpdateSessionService */], __WEBPACK_IMPORTED_MODULE_47__usersessions_create_session_data_create_session_service__["a" /* CreateSessionService */], __WEBPACK_IMPORTED_MODULE_58__userprofile_notifications_service__["a" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_60__userprofile_file_a_complaint_data_file_a_complaint_service__["a" /* FileAComplaintService */],
                __WEBPACK_IMPORTED_MODULE_63__userprofile_youtube_service__["a" /* YoutubeService */], __WEBPACK_IMPORTED_MODULE_62__userprofile_twitch_service__["a" /* TwitchService */], __WEBPACK_IMPORTED_MODULE_66__userprofile_game_account_game_account_service__["a" /* GameAccountService */], __WEBPACK_IMPORTED_MODULE_69__userprofile_stripe_payment_stripe_payment_service__["a" /* StripePaymentService */], __WEBPACK_IMPORTED_MODULE_73__shared_shared_functions__["a" /* SharedFunctions */],
                { provide: __WEBPACK_IMPORTED_MODULE_25_angular2_jwt__["AuthHttp"], useFactory: authHttpServiceFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]] },
                { provide: __WEBPACK_IMPORTED_MODULE_8__angular_material__["a" /* MAT_DIALOG_DATA */], useValue: {} },
                __WEBPACK_IMPORTED_MODULE_46__global_globals__["a" /* Globals */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export router */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userprofile_userprofile_component__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__usersessions_usersessions_component__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__ = __webpack_require__("../../../../../src/app/therift/therift.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__therift_riftsessions_riftsessions_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userprofile_update_info_update_info_component__ = __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__therift_riftsessions_session_page_session_page_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__userprofile_user_rating_user_rating_component__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__therift_riftsessions_session_page_update_session_update_session_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__feed_feed_component__ = __webpack_require__("../../../../../src/app/feed/feed.component.ts");










var router = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'user/:rifttag', component: __WEBPACK_IMPORTED_MODULE_1__userprofile_userprofile_component__["a" /* UserprofileComponent */],
        children: [
            { path: 'update', component: __WEBPACK_IMPORTED_MODULE_5__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */] },
            { path: 'rate', component: __WEBPACK_IMPORTED_MODULE_7__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */] }
        ]
    },
    { path: 'sessions', component: __WEBPACK_IMPORTED_MODULE_2__usersessions_usersessions_component__["a" /* UsersessionsComponent */],
    },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */],
    },
    { path: 'youtube', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */] },
    { path: 'twitch', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */] },
    { path: 'therift/:searchQuery', component: __WEBPACK_IMPORTED_MODULE_4__therift_riftsessions_riftsessions_component__["a" /* RiftsessionsComponent */] },
    { path: 'session/:sessionId', component: __WEBPACK_IMPORTED_MODULE_6__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */],
        children: [
            { path: 'update', component: __WEBPACK_IMPORTED_MODULE_8__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */] }
        ]
    },
    { path: 'feed', component: __WEBPACK_IMPORTED_MODULE_9__feed_feed_component__["a" /* FeedComponent */] }
];
var routes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(router);


/***/ }),

/***/ "../../../../../src/app/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth0_variables__ = __webpack_require__("../../../../../src/app/auth/auth0-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_auth0_lock__ = __webpack_require__("../../../../auth0-lock/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_auth0_lock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_auth0_lock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthService = /** @class */ (function () {
    function AuthService(router, http, globals, userProfileService, notificationService) {
        this.router = router;
        this.http = http;
        this.globals = globals;
        this.userProfileService = userProfileService;
        this.notificationService = notificationService;
        this.createUser = "/user/createUser";
        this.lock = new __WEBPACK_IMPORTED_MODULE_3_auth0_lock___default.a(__WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].clientID, __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].domain, {
            autoclose: true,
            auth: {
                redirectUrl: __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].callbackURL,
                responseType: 'token id_token',
                audience: "https://" + __WEBPACK_IMPORTED_MODULE_1__auth0_variables__["a" /* AUTH_CONFIG */].domain + "/userinfo",
                // audience: AUTH_CONFIG.apiUrl,
                params: {
                    scope: 'profile openid email user_metadata read:users'
                }
            },
            theme: {
                logo: "https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/256x256/plain/crack.png",
                primaryColor: "#293e49",
            },
            languageDictionary: {
                title: "Rift"
            },
            additionalSignUpFields: [
                {
                    name: "firstName",
                    placeholder: "Enter your first name",
                },
                {
                    name: "lastName",
                    placeholder: "Enter your last name"
                }
            ],
        });
    }
    AuthService.prototype.login = function () {
        this.lock.show();
    };
    // Call this method in app.component.ts
    // if using path-based routing
    AuthService.prototype.handleAuthentication = function (callback) {
        var _this = this;
        this.lock.on('authenticated', function (authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                _this.setSession(authResult, function () {
                    var profileJson = localStorage.getItem('profile');
                    var profileJsonParse = JSON.parse(profileJson);
                    if (!profileJsonParse.hasOwnProperty("http://riftgaming:auth0:com/app_metadata")) {
                        var data = {
                            "firstName": profileJsonParse["http://riftgaming:auth0:com/user_metadata"].firstName,
                            "lastName": profileJsonParse["http://riftgaming:auth0:com/user_metadata"].lastName,
                            "riftTag": profileJsonParse.nickname,
                            "auth0Token": profileJsonParse.sub,
                            "email": profileJsonParse.email
                        };
                        callback(data, true);
                    }
                    else {
                        callback("", false);
                    }
                });
                _this.router.navigate(['/']);
            }
        });
        this.lock.on('authorization_error', function (err) {
            _this.router.navigate(['/']);
            console.log(err);
            alert("Error: " + err.error + ". Check the console for further details.");
        });
    };
    AuthService.prototype.setSession = function (authResult, callback) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        this.lock.getUserInfo(authResult.accessToken, function (error, profile) {
            if (error) {
                throw new Error(error);
            }
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            localStorage.setItem('profile', JSON.stringify(profile));
            callback();
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        var profile = JSON.parse(localStorage.getItem("profile"));
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');
        localStorage.removeItem('loggedInUserID');
        this.userProfileService.getUser(profile.nickname).subscribe(function (resBody) {
            var id = resBody.id;
            _this.notificationService.stopPolling(id);
        });
        // Go back to the home route
        this.router.navigate(['/']);
    };
    AuthService.prototype.isAuthenticated = function () {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_6__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_7__global_globals__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_5__userprofile_notifications_service__["a" /* NotificationsService */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth0-variables.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_CONFIG; });
var AUTH_CONFIG = {
    clientID: 'XOgkYhvWQEv3ZR1qVF1oJnqqrmdyNL4g',
    domain: 'riftgaming.auth0.com',
    callbackURL: 'http://localhost:4200/home',
    apiUrl: 'https://riftgaming.auth0.com/api/v2/'
};


/***/ }),

/***/ "../../../../../src/app/components/activity-card/activity-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"activity-card\" *ngIf=\"isDataAvailable\">\n  <div class=\"card-header\">\n    <img src=\"{{currentUser.profilePic}}\" class=\"headshot\" alt=\"\">\n    <span class=\"title\">\n      <a class=\"username\">{{currentUser.riftTag}}</a>\n      {{activity.notificationContent}}\n    </span>\n    <br>\n    <span class=\"timestamp\">{{activity.createdTime | date:'fullDate'}} at {{activity.createdTime | date:'shortTime'}}</span> </div>\n    <app-session-card\n      [session]=\"session\" [isLoggedIn]=\"isLoggedIn\"\n      [type]=\"session.type\" [request]=\"request\" [loggedInUserId]=\"loggedInUserId\"\n    ></app-session-card>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/components/activity-card/activity-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activity-card {\n  background-color: #22303F;\n  border: 1px #18202A solid;\n  padding: 10px 15px; }\n\n.activity-card .card-header {\n  margin: 10px 0px;\n  height: 47px; }\n\n.activity-card .title {\n  font-weight: 400;\n  font-size: 18px;\n  display: inline-block;\n  margin-top: 3px; }\n\n.activity-card .username {\n  color: #F6511D;\n  font-weight: 500; }\n\n.activity-card .timestamp {\n  font-size: 11px;\n  font-weight: 400;\n  opacity: 0.8;\n  -webkit-transform: translateY(-1px);\n          transform: translateY(-1px);\n  display: inline-block; }\n\n.activity-card .headshot {\n  height: 47px;\n  width: 47px;\n  display: block;\n  float: left;\n  margin-right: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/activity-card/activity-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_activity__ = __webpack_require__("../../../../../src/app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__therift_riftsessions_session_page_session_page_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session_request__ = __webpack_require__("../../../../../src/app/models/session-request.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ActivityCardComponent = /** @class */ (function () {
    function ActivityCardComponent(sessionPageService) {
        this.sessionPageService = sessionPageService;
        this.session = new __WEBPACK_IMPORTED_MODULE_4__models_session__["a" /* Session */]();
        this.isDataAvailable = false;
    }
    ActivityCardComponent.prototype.ngOnInit = function () {
        this.getSessionById();
    };
    ActivityCardComponent.prototype.getSessionById = function () {
        var _this = this;
        this.sessionPageService.getSessionById(this.activity.sessionId).subscribe(function (resBody) {
            _this.response = resBody;
            _this.session.id = _this.response.id;
            _this.session.hostId = _this.response.hostId;
            _this.session.riftTag = _this.response.usertable.riftTag;
            _this.session.rifterRating = _this.response.usertable.rifterRating;
            _this.session.firstName = _this.response.usertable.firstName;
            _this.session.lastName = _this.response.usertable.lastName;
            _this.session.title = _this.response.title;
            _this.session.sessionTime = _this.response.sessionTime;
            _this.session.gameId = _this.response.gameId;
            _this.session.console = _this.response.console;
            if (_this.session.hostId == _this.loggedInUserId) {
                _this.session.type = true;
            }
            else {
                _this.session.type = false;
            }
            _this.isDataAvailable = true;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_activity__["a" /* Activity */])
    ], ActivityCardComponent.prototype, "activity", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_userprofile__["a" /* Userprofile */])
    ], ActivityCardComponent.prototype, "currentUser", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__models_session_request__["a" /* SessionRequest */])
    ], ActivityCardComponent.prototype, "request", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ActivityCardComponent.prototype, "isLoggedIn", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], ActivityCardComponent.prototype, "loggedInUserId", void 0);
    ActivityCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-activity-card',
            template: __webpack_require__("../../../../../src/app/components/activity-card/activity-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/activity-card/activity-card.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__therift_riftsessions_session_page_session_page_service__["a" /* SessionPageService */]])
    ], ActivityCardComponent);
    return ActivityCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/credit-card/credit-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-4\">\n  <div class=\"thumbnail\">\n    <div class=\"caption\">\n      <div class='col-lg-12'>\n        <span class=\"glyphicon glyphicon-credit-card\"></span>\n        <span class=\"glyphicon glyphicon-trash pull-right text-primary\" (click)=\"changeStatus(delete)\"></span>\n      </div>\n      <div class='col-lg-12 well well-add-card'>\n        <h4>First Name Last Name</h4>\n      </div>\n      <div class='col-lg-12'>\n        <p>**** **** **** {{creditCard.last4}}</p>\n        <p clas=\"text-muted\">Exp: {{creditCard.expMonth}}/{{creditCard.expYear}}</p>\n        <p class=\"text-muted\">{{creditCard.brand}}</p>\n      </div>\n      <button type=\"button\" class=\"btn btn-primary btn-xs btn-update btn-add-card\" (click)=\"changeStatus(template)\">Set As Default</button>\n      <ng-template #setDefault style=\"margin-top:20%\">\n        <div class=\"modal-body text-center\">\n          <p>Set Card as Default?</p>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"setAsDefault()\" >Yes</button>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n        </div>\n      </ng-template>\n      <ng-template #delete style=\"margin-top:20%\">\n        <div class=\"modal-body text-center\">\n          <p>Are you sure you want to delete this credit card?</p>\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"deleteCard()\" >Yes</button>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/credit-card/credit-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".well {\n  min-height: 20px;\n  padding: 0px;\n  margin-bottom: 20px;\n  background-color: #D9D9D9;\n  border: 1px solid #D9D9D9;\n  border-radius: 0px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  padding-left: 15px;\n  border: 0px; }\n\n.thumbnail .caption {\n  padding: 9px;\n  color: #333;\n  padding-left: 0px;\n  padding-right: 0px; }\n\n.icon-style {\n  margin-right: 15px;\n  font-size: 18px;\n  margin-top: 20px; }\n\np {\n  margin: 3px; }\n\n.well-add-card {\n  margin-bottom: 10px; }\n\n.btn-add-card {\n  margin-top: 20px; }\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 6px solid #D9D9D9;\n  border-radius: 15px;\n  -webkit-transition: border .2s ease-in-out;\n  transition: border .2s ease-in-out;\n  padding-left: 0px;\n  padding-right: 0px; }\n\n.btn {\n  border-radius: 0px; }\n\n.btn-update {\n  margin-left: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/credit-card/credit-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_credit_card__ = __webpack_require__("../../../../../src/app/models/credit-card.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_stripe_payment_stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreditCardComponent = /** @class */ (function () {
    function CreditCardComponent(stripeService, modalService) {
        this.stripeService = stripeService;
        this.modalService = modalService;
    }
    CreditCardComponent.prototype.ngOnInit = function () {
    };
    CreditCardComponent.prototype.setAsDefault = function () {
        this.stripeService.setCardAsDefault(this.creditCard.id, this.customerId);
    };
    CreditCardComponent.prototype.deleteCard = function () {
        this.stripeService.deleteCustomerCreditCard(this.creditCard.id, this.customerId);
    };
    CreditCardComponent.prototype.changeStatus = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_credit_card__["a" /* CreditCard */])
    ], CreditCardComponent.prototype, "creditCard", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CreditCardComponent.prototype, "customerId", void 0);
    CreditCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-credit-card',
            template: __webpack_require__("../../../../../src/app/components/credit-card/credit-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/credit-card/credit-card.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__userprofile_stripe_payment_stripe_payment_service__["a" /* StripePaymentService */], __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap__["c" /* BsModalService */]])
    ], CreditCardComponent);
    return CreditCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/feed-card/feed-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div ng-view class=\"col-xs-2\"></div>\n    <div class=\"col-xs-8\">\n      <div class=\"box\">\n        <div class=\"box-icon\">\n          <img src=\"{{notification.creatorProfilePic}}\" class=\"profile-pic\">\n        </div>\n\n        <div class=\"info\">\n          <h4 class=\"text-center\">{{notification.firstName}} {{notification.lastName}}</h4>\n          <small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>\n          <p><b>{{notification.riftTag}}</b> {{notification.notificationContent}} {{notification.rifterSession.title}}</p>\n          <app-session-card [routerLink]=\"['../session', notification.rifterSession.id]\"\n                            [session]=\"notification.rifterSession\" [isLoggedIn]=\"isLoggedIn\"\n                            [type]=\"notification.rifterSession.type\"\n          ></app-session-card>\n        </div>\n      </div>\n    </div>\n    <div ng-view class=\"col-xs-2\"></div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/feed-card/feed-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css);\nbody {\n  padding-top: 50px; }\n.profile-pic {\n  height: 100px;\n  width: 100px; }\n.box {\n  border-radius: 3px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  padding: 10px 25px;\n  text-align: right;\n  display: block;\n  margin-top: 60px; }\n.box-icon {\n  background-color: transparent;\n  border-radius: 50%;\n  display: table;\n  height: 100px;\n  margin: 0 auto;\n  width: 100px;\n  margin-top: -61px; }\n.box-icon span {\n  color: #fff;\n  display: table-cell;\n  text-align: center;\n  vertical-align: middle; }\n.info h4 {\n  font-size: 26px;\n  letter-spacing: 2px;\n  text-transform: uppercase; }\n.info > p {\n  color: #717171;\n  font-size: 16px;\n  padding-top: 10px;\n  text-align: justify; }\n.info > a {\n  background-color: #03a9f4;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  color: #fff;\n  -webkit-transition: all 0.5s ease 0s;\n  transition: all 0.5s ease 0s; }\n.info > a:hover {\n  background-color: #0288d1;\n  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.12);\n  color: #fff;\n  -webkit-transition: all 0.5s ease 0s;\n  transition: all 0.5s ease 0s; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/feed-card/feed-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FeedCardComponent = /** @class */ (function () {
    function FeedCardComponent() {
    }
    FeedCardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], FeedCardComponent.prototype, "notification", void 0);
    FeedCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-feed-card',
            template: __webpack_require__("../../../../../src/app/components/feed-card/feed-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/feed-card/feed-card.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FeedCardComponent);
    return FeedCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/file-upload/file-upload.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<input *ngIf=\"showFileNameInput\" id=\"uploadFile\" class=\"upload-file form-control\" placeholder=\"Choose File\" [(ngModel)]=\"selectedFileName\" disabled=\"disabled\" />-->\n<!--<div class=\"fileUpload btn btn-primary\">-->\n  <!--<span>{{uploadButtonText}}</span>-->\n  <!--<input type=\"file\" class=\"upload\" accept=\"*\" (change)=\"changeListener($event)\">-->\n<!--</div>-->\n\n\n<div>\n\n  <img-cropper [image]=\"data1\" [settings]=\"cropperSettings1\" (onCrop)=\"cropped($event)\"></img-cropper>\n  <span class=\"result\" *ngIf=\"data1.image\" >\n        <img [src]=\"data1.image\"\n             [width]=\"croppedWidth\"\n             [height]=\"croppedHeight\">\n        {{data1.image}}\n    </span>\n\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/file-upload/file-upload.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/********************************/\n/* File Upload */\n.fileUpload {\n  position: relative;\n  overflow: hidden; }\n.fileUpload input.upload {\n  position: absolute;\n  top: 0;\n  right: 0;\n  margin: 0;\n  padding: 0;\n  font-size: 20px;\n  cursor: pointer;\n  opacity: 0;\n  filter: alpha(opacity=0); }\n.upload-file.form-control {\n  width: auto;\n  display: inherit; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/file-upload/file-upload.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_img_cropper__ = __webpack_require__("../../../../ngx-img-cropper/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent() {
        this.name = 'Angular2';
        this.cropperSettings1 = new __WEBPACK_IMPORTED_MODULE_2_ngx_img_cropper__["a" /* CropperSettings */]();
        this.cropperSettings1.width = 200;
        this.cropperSettings1.height = 200;
        this.cropperSettings1.croppedWidth = 200;
        this.cropperSettings1.croppedHeight = 200;
        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;
        this.cropperSettings1.minWidth = 10;
        this.cropperSettings1.minHeight = 10;
        this.cropperSettings1.rounded = true;
        this.cropperSettings1.keepAspect = true;
        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
        this.data1 = {};
    }
    FileUploadComponent_1 = FileUploadComponent;
    FileUploadComponent.prototype.writeValue = function (obj) {
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
    };
    FileUploadComponent.prototype.registerOnTouched = function (fn) {
    };
    FileUploadComponent.prototype.cropped = function (bounds) {
        this.croppedHeight = 200;
        this.croppedWidth = 200;
    };
    FileUploadComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cropper', undefined),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ngx_img_cropper__["b" /* ImageCropperComponent */])
    ], FileUploadComponent.prototype, "cropper", void 0);
    FileUploadComponent = FileUploadComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-file-upload',
            template: __webpack_require__("../../../../../src/app/components/file-upload/file-upload.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/file-upload/file-upload.component.scss")],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FileUploadComponent_1; }),
                    multi: true
                }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], FileUploadComponent);
    return FileUploadComponent;
    var FileUploadComponent_1;
}());



/***/ }),

/***/ "../../../../../src/app/components/follow-button/follow-button.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 *ngIf=\"following\">\n  <button type=\"button\" class=\"btn btn-sm btn-toggle-following\" (click)=\"unfollowUser()\">\n    <span>Following</span>\n  </button>\n</h3>\n<h3 *ngIf=\"!following\">\n  <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"followUser()\">\n    <i class=\"fa fa-checkmark-round\"></i> <span>Follow</span>\n  </button>\n</h3>\n"

/***/ }),

/***/ "../../../../../src/app/components/follow-button/follow-button.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-toggle-following {\n  background-color: #293e49;\n  color: #fff; }\n\n.btn-toggle-following:hover {\n  background-color: #ef2020;\n  color: #fff; }\n\n.btn-toggle-following:hover span {\n  display: none; }\n\n.btn-toggle-following:hover:after {\n  content: 'Unfollow';\n  display: inline; }\n\n.btn-toggle-following:hover i:before {\n  content: '\\F129'; }\n\n.btn {\n  top: 0;\n  right: 0;\n  min-width: 92px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/follow-button/follow-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FollowButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FollowButtonComponent = /** @class */ (function () {
    function FollowButtonComponent(userProfileService) {
        this.userProfileService = userProfileService;
    }
    FollowButtonComponent.prototype.ngOnInit = function () {
    };
    FollowButtonComponent.prototype.followUser = function () {
        var _this = this;
        this.userProfileService.followUser(this.riftTag, this.id).subscribe(function (resBody) {
            _this.following = true;
        });
    };
    FollowButtonComponent.prototype.unfollowUser = function () {
        var _this = this;
        this.userProfileService.unfollowUser(this.riftTag, this.id).subscribe(function (resBody) {
            _this.following = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], FollowButtonComponent.prototype, "following", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], FollowButtonComponent.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FollowButtonComponent.prototype, "riftTag", void 0);
    FollowButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-follow-button',
            template: __webpack_require__("../../../../../src/app/components/follow-button/follow-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/follow-button/follow-button.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], FollowButtonComponent);
    return FollowButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>\n  <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"changeStatus(template)\">\n    <i class=\"fa fa-checkmark-round\"></i> <span>Kick User</span>\n  </button>\n\n  <ng-template #template style=\"margin-top:20%\">\n    <div class=\"modal-body text-center\">\n      <p>Are you sure you want to kick this user?</p>\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"kickRiftee()\" >Yes</button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n    </div>\n  </ng-template>\n</h3>\n\n"

/***/ }),

/***/ "../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KickRifteeButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var KickRifteeButtonComponent = /** @class */ (function () {
    function KickRifteeButtonComponent(sessionService, modalService) {
        this.sessionService = sessionService;
        this.modalService = modalService;
        this.deleteRiftee = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    KickRifteeButtonComponent.prototype.ngOnInit = function () {
    };
    KickRifteeButtonComponent.prototype.changeStatus = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    KickRifteeButtonComponent.prototype.kickRiftee = function () {
        var data = {
            "accepted": 0,
            "hostId": this.hostId,
            "sessionId": parseInt(this.sessionId),
            "rifteeId": this.rifteeId
        };
        this.sessionService.updateSessionRequest(data);
        console.log("Kicked riftee from session");
        this.deleteRiftee.emit(this.riftee);
        this.modalRef.hide();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], KickRifteeButtonComponent.prototype, "riftee", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], KickRifteeButtonComponent.prototype, "sessionId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], KickRifteeButtonComponent.prototype, "rifteeId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], KickRifteeButtonComponent.prototype, "hostId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], KickRifteeButtonComponent.prototype, "deleteRiftee", void 0);
    KickRifteeButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-kick-riftee-button',
            template: __webpack_require__("../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap__["c" /* BsModalService */]])
    ], KickRifteeButtonComponent);
    return KickRifteeButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/notification/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"media activity-item\">\n  <a href=\"#\" class=\"pull-left\">\n    <img src=\"{{notification.creatorProfilePic}}\" class=\"media-object avatar\">\n  </a>\n  <div class=\"media-body\">\n    <p class=\"activity-title\" [routerLink]=\"['../../user', notification.creatorRiftTag]\"><b>{{notification.creatorRiftTag}}</b>\n      {{notification.notificationContent}}\n      <a [routerLink]=\"['../session', notification.sessionId]\">{{notification.sessionTitle}}</a>\n    </p>\n    <div *ngIf=\"status == 0\">\n      rejected\n    </div>\n    <div *ngIf=\"status == 1\">\n      pending\n    </div>\n    <div *ngIf=\"status == 2\">\n      accepted\n    </div>\n    <small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>\n  </div>\n  <div class=\"btn-group pull-right activity-actions\" *ngIf=\"notification.notificationType == 'SRQ'\">\n    <app-session-accept-reject-button\n    [notification]=\"notification\" [status]=\"status\">\n    </app-session-accept-reject-button>\n  </div>\n</div>\n<div class=\"divider dropdown-divider\"></div>\n"

/***/ }),

/***/ "../../../../../src/app/components/notification/notification.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".activity-item {\n  overflow: visible;\n  position: relative;\n  margin: 15px 0;\n  border-top: 1px dashed #ccc;\n  padding-top: 15px; }\n\n.activity-item:first-child {\n  border-top: none; }\n\n.activity-item .avatar {\n  border-radius: 2px;\n  width: 32px; }\n\n.activity-item > i {\n  font-size: 18px;\n  line-height: 1; }\n\n.activity-item .media-body {\n  position: relative; }\n\n.activity-item .activity-title {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.activity-item .activity-attachment {\n  padding-top: 20px; }\n\n.activity-item .well {\n  border-radius: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: none;\n  border-left: 2px solid #cfcfcf;\n  background: #fff;\n  margin-left: 20px;\n  font-size: 0.85em; }\n\n.activity-item .thumbnail {\n  display: inline;\n  border: none;\n  padding: 0; }\n\n.activity-item .thumbnail img {\n  border-radius: 2px;\n  width: auto;\n  margin: 0; }\n\n.activity-item .activity-actions {\n  position: absolute;\n  top: 15px;\n  right: 0; }\n\n.activity-item .activity-actions .btn i {\n  margin: 0; }\n\n.activity-item .activity-actions .dropdown-menu > li > a {\n  font-size: 0.9em;\n  padding: 3px 10px; }\n\n.activity-item + .btn {\n  margin-bottom: 15px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/notification/notification.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(userSessionService, userProfileService) {
        this.userSessionService = userSessionService;
        this.userProfileService = userProfileService;
        this.hasProfilePic = true;
    }
    NotificationComponent.prototype.ngOnInit = function () {
        this.getNotificationProfilePicture(this.creatorRiftTag, this.notification);
        if (this.notification.notificationType - 2 != 0) {
            this.getSessionStatus(this.notification.creatorId, this.notification.sessionId);
        }
        if (this.notification.creatorProfilePic == "") {
            this.hasProfilePic = false;
        }
    };
    NotificationComponent.prototype.getSessionStatus = function (rifteeId, sessionId) {
        var _this = this;
        this.userSessionService.getSessionStatus(rifteeId, sessionId).subscribe(function (resBody) {
            _this.status = resBody.status;
        });
    };
    NotificationComponent.prototype.getNotificationProfilePicture = function (riftTag, notification) {
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                notification.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                notification.creatorProfilePic = resBody.image;
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], NotificationComponent.prototype, "notification", void 0);
    NotificationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-notification',
            template: __webpack_require__("../../../../../src/app/components/notification/notification.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/notification/notification.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], NotificationComponent);
    return NotificationComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/rating/rating.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #t let-fill=\"fill\">\n  <span *ngIf=\"fill === 100\" class=\"star full\">&#9733;</span>\n  <span *ngIf=\"fill === 0\" class=\"star\">&#9733;</span>\n  <span *ngIf=\"fill < 100 && fill > 0\" class=\"star\">\n                <span class=\"half\" [style.width.%]=\"fill\">&#9733;</span>&#9733;\n              </span>\n</ng-template>\n<ngb-rating [(rate)]=\"rating\" [starTemplate]=\"t\" [readonly]=\"readonly\" max=\"5\"></ngb-rating>\n"

/***/ }),

/***/ "../../../../../src/app/components/rating/rating.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".star {\n  position: relative;\n  display: inline-block;\n  font-size: 3rem;\n  color: #d3d3d3; }\n\n.full {\n  color: red; }\n\n.half {\n  position: absolute;\n  display: inline-block;\n  overflow: hidden;\n  color: red; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/rating/rating.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
    }
    RatingComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], RatingComponent.prototype, "rating", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], RatingComponent.prototype, "readonly", void 0);
    RatingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-rating',
            template: __webpack_require__("../../../../../src/app/components/rating/rating.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/rating/rating.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], RatingComponent);
    return RatingComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-form navbar-left\">\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"search-query form-control\" placeholder=\"Search the Rift\" [(ngModel)]=\"searchQuery\">\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-danger searchButton\" type=\"button\" [routerLink]=\"['therift/', searchQuery]\">\n        <i class=\"glyphicon glyphicon-search\"></i>\n      </button>\n    </span>\n  </div>\n</div>\n\n    <!--<div id=\"custom-search-input\">-->\n      <!--<div class=\"input-group col-md-3\">-->\n        <!--<input type=\"text\" class=\"  search-query form-control\" placeholder=\"Search the Rift\" [(ngModel)]=\"searchQuery\" />-->\n        <!--<span class=\"input-group-btn\">-->\n            <!--<button class=\"btn btn-danger\" type=\"button\" [routerLink]=\"['therift/', searchQuery]\">-->\n                <!--<span class=\" glyphicon glyphicon-search\"></span>-->\n            <!--</button>-->\n        <!--</span>-->\n      <!--</div>-->\n    <!--</div>-->\n"

/***/ }),

/***/ "../../../../../src/app/components/search-bar/search-bar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".form-rounded, .btn-rounded {\n  border-radius: 1rem;\n  background-color: transparent;\n  color: white; }\n\n.searchButton {\n  background-color: #FAB702 !important;\n  border-color: #FAB702; }\n\n.btn-rounded {\n  border-left: none; }\n\n.glyphicon .glyphicon-search {\n  color: white !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_bar_service__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(searchBarService) {
        this.searchBarService = searchBarService;
        this.searchQuery = "";
    }
    SearchBarComponent.prototype.ngOnInit = function () {
    };
    SearchBarComponent.prototype.getUserSearchResults = function (searchQuery) {
        this.searchBarService.getSearchResults(searchQuery).subscribe(function (resBody) {
            console.log(resBody[0]);
            localStorage.setItem('userSearchResults', resBody[0]);
        });
    };
    SearchBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search-bar',
            template: __webpack_require__("../../../../../src/app/components/search-bar/search-bar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/search-bar/search-bar.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__search_bar_service__["a" /* SearchBarService */]])
    ], SearchBarComponent);
    return SearchBarComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/search-bar/search-bar.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchBarService = /** @class */ (function () {
    function SearchBarService(http) {
        this.http = http;
    }
    SearchBarService.prototype.getSearchResults = function (searchQuery) {
        console.log("running getSearchResults");
        return this.http.get("/api/user/search/searchParam=" + searchQuery)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    SearchBarService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], SearchBarService);
    return SearchBarService;
}());



/***/ }),

/***/ "../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<button (click)=\"sendConfirmationEmail(rifteeEmail)\">-->\n  <!--haha-->\n<!--</button>-->\n<h3 *ngIf=\"status == 2\">\n  <button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\"console.log('accepted')\">\n    <span>Accepted</span>\n  </button>\n</h3>\n<h3 *ngIf=\"status == 0\">\n  <button type=\"button\" class=\"btn btn-sm btn-primary\" onclick=\"console.log('rejected')\">\n    <i class=\"fa fa-checkmark-round\"></i> <span>Rejected</span>\n  </button>\n</h3>\n<h3 *ngIf=\"status == 1\">\n  <button type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"acceptRequest()\">\n    Accept\n  </button>\n  <button type=\"button\" class=\"btn btn-danger btn-xs\" (click)=\"rejectRequest()\">\n    Reject\n  </button>\n </h3>\n"

/***/ }),

/***/ "../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionAcceptRejectButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SessionAcceptRejectButtonComponent = /** @class */ (function () {
    function SessionAcceptRejectButtonComponent(userSessionService, userProfileService) {
        this.userSessionService = userSessionService;
        this.userProfileService = userProfileService;
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    SessionAcceptRejectButtonComponent.prototype.ngOnInit = function () {
    };
    SessionAcceptRejectButtonComponent.prototype.sendConfirmationEmail = function () {
        var rifterEmail = {
            "to": this.profile.email,
            "subject": "To the rifter",
            "message": "rifter"
        };
        var rifteeEmail = {
            "to": this.notification.creatorEmail,
            "subject": "To the riftee",
            "message": "hello there im in the message of the user profile"
        };
        console.log("Sent confirmation to " + rifterEmail.to);
        console.log("Sent confirmation to " + rifteeEmail.to);
        this.userProfileService.sendConfirmationEmail(rifterEmail);
        this.userProfileService.sendConfirmationEmail(rifteeEmail);
    };
    SessionAcceptRejectButtonComponent.prototype.acceptRequest = function () {
        var data = {
            "accepted": 2,
            "hostId": this.notification.userId,
            "sessionId": this.notification.sessionId,
            "rifteeId": this.notification.creatorId
        };
        this.userSessionService.updateSessionRequest(data);
        this.status = 2;
        this.sendConfirmationEmail();
        console.log("Accepted request");
    };
    SessionAcceptRejectButtonComponent.prototype.rejectRequest = function () {
        var data = {
            "accepted": 0,
            "hostId": this.notification.userId,
            "sessionId": this.notification.sessionId,
            "rifteeId": this.notification.creatorId
        };
        this.userSessionService.updateSessionRequest(data);
        this.status = 0;
        console.log("Rejected request");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SessionAcceptRejectButtonComponent.prototype, "status", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SessionAcceptRejectButtonComponent.prototype, "notification", void 0);
    SessionAcceptRejectButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-session-accept-reject-button',
            template: __webpack_require__("../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], SessionAcceptRejectButtonComponent);
    return SessionAcceptRejectButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/session-card/session-card.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<div class=\"event-list\">-->\n  <!--<div>-->\n    <!--<time datetime=\"2014-07-20\" [ngClass]=\"{'rifter': type, 'riftee':!type}\">-->\n      <!--<span class=\"day\">{{session.sessionTime | date:'dd'}}</span>-->\n      <!--<span class=\"month\">{{session.sessionTime | date:'MMM'}}</span>-->\n    <!--</time>-->\n    <!--<img src=\"{{sessionIcon}}\" />-->\n    <!--<div class=\"info\">-->\n      <!--<h2 class=\"title\">{{session.title}}</h2>-->\n      <!--<p class=\"desc\">@{{session.riftTag}}</p>-->\n      <!--<div *ngIf=\"!type\">-->\n      <!--<app-rating [rating]=\"session.rifterRating\" [readonly]=\"true\"></app-rating>-->\n      <!--</div>-->\n      <!--<p class=\"desc\">{{session.sessionTime | date:'shortTime'}} </p>-->\n    <!--</div>-->\n    <!--<div class=\"otherstuff\">-->\n      <!--<div class=\"statusButtons\" *ngIf=\"isLoggedIn && !(loggedInUserId == session.hostId)\">-->\n        <!--<button class=\"btn-primary\" *ngIf=\"!request\" (click)=\"changeStatus(template)\">Join</button>-->\n        <!--<button class=\"btn-primary\" *ngIf=\"request && request.accepted==1\">Pending</button>-->\n        <!--<button class=\"btn-primary\" *ngIf=\"request && request.accepted==0\">Rejected</button>-->\n        <!--<button class=\"btn-primary\" *ngIf=\"request && request.accepted==2\">Accepted</button>-->\n      <!--</div>-->\n      <!--<div>-->\n        <!--<img alt=\"{{session.console}}\" class=\"consoleIcon\" src=\"{{consoleIcon}}\" />-->\n      <!--</div>-->\n    <!--</div>-->\n    <!--<ng-template #template style=\"margin-top:20%\">-->\n      <!--<div class=\"modal-body text-center\">-->\n        <!--<p>What game account do you want to use?</p>-->\n        <!--<div class=\"form-group\">-->\n          <!--<label for=\"account\">Select an Account</label>-->\n          <!--<select class=\"form-control\" id=\"account\" [(ngModel)]=\"accountId\">-->\n            <!--<option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">{{account.ign}}</option>-->\n          <!--</select>-->\n        <!--</div><br>-->\n        <!--<button type=\"button\" class=\"btn btn-default\" (click)=\"joinUserSession()\" >Yes</button>-->\n        <!--<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>-->\n      <!--</div>-->\n    <!--</ng-template>-->\n\n  <!--</div>-->\n<!--</div>-->\n\n<div class=\"session-card\">\n  <div class=\"date-area\">\n    <span class=\"month\">{{session.sessionTime | date:'MMM'}}</span>\n    <span class=\"day\">{{session.sessionTime | date:'dd'}}</span>\n  </div>\n  <div class=\"main-area\">\n    <span class=\"title\">{{session.title}}</span><br>\n    <span class=\"user\">by {{session.riftTag}}</span>\n    <div class=\"rating\"></div>\n    <div class=\"bottom-details\">\n      <img src=\"{{sessionIcon}}\" alt=\"\"><div class=\"time\"><img [src]=\"clockIcon\" alt=\"\"><span>{{session.sessionTime | date:'shortTime'}}</span> </div>\n    </div>\n  </div>\n  <div class=\"join-area\" >\n    <img src=\"{{consoleIcon}}\" alt=\"\">\n    <!--<button *ngIf=\"isLoggedIn && !(loggedInUserId == session.hostId)\">Join</button>-->\n    <div id=\"join_buttons\" *ngIf=\"isLoggedIn && loggedInUserId != session.hostId\">\n      <button *ngIf=\"!request\" (click)=\"changeStatus(template)\">Join</button>\n      <button *ngIf=\"request && request.accepted==1\">Pending</button>\n      <button *ngIf=\"request && request.accepted==0\">Rejected</button>\n      <button *ngIf=\"request && request.accepted==2\">Accepted</button>\n    </div>\n  </div>\n  <ng-template #template style=\"margin-top:20%\">\n    <div class=\"modal-body text-center\">\n      <p>What game account do you want to use?</p>\n      <div class=\"form-group\">\n        <label for=\"account\">Select an Account</label>\n        <select class=\"form-control\" id=\"account\" [(ngModel)]=\"accountId\">\n          <option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">{{account.ign}}</option>\n        </select>\n      </div><br>\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"joinUserSession()\" >Yes</button>\n      <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n    </div>\n  </ng-template>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/session-card/session-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".session-card {\n  height: auto;\n  width: 100%;\n  background-color: #2E3E4F;\n  border: #2E3E4F;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  padding: 20px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 5px 0px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\n.session-card > div {\n  border: 0px red solid; }\n\n.date-area {\n  width: 60px;\n  margin-right: 10px;\n  height: 58px; }\n\n.date-area .month {\n  text-transform: uppercase;\n  font-size: 20px;\n  display: block;\n  text-align: center; }\n\n.date-area .day {\n  display: block;\n  font-size: 29px;\n  text-align: center; }\n\n.session-card .title {\n  font-size: 23px;\n  font-weight: 500; }\n\n.session-card .user {\n  font-size: 16px;\n  opacity: 0.8; }\n\n.session-card .main-area {\n  width: 67%; }\n\n.session-card button {\n  border: 3px #1DA1F2 solid;\n  padding: 10px 15px;\n  text-transform: uppercase;\n  background-color: transparent;\n  color: #1DA1F2;\n  font-weight: 500;\n  font-size: 17px; }\n\n.session-card .bottom-details {\n  margin-top: 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.session-card .bottom-details img {\n  height: 26px;\n  display: inline-block;\n  opacity: 1; }\n\n.session-card .bottom-details .time {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-left: 20px; }\n\n.session-card .bottom-details .time img {\n  float: left;\n  height: 16px;\n  margin-right: 6px; }\n\n.session-card .bottom-details .time span {\n  float: left; }\n\n.session-card .join-area {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  height: 94px; }\n\n.session-card .join-area img {\n  width: 100px; }\n\n.activity-card .title {\n  font-weight: 300; }\n\n.username {\n  color: #F6511D;\n  font-weight: 500; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/session-card/session-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session_request__ = __webpack_require__("../../../../../src/app/models/session-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_console_icon_variables__ = __webpack_require__("../../../../../src/app/constants/console-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__userprofile_game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SessionCardComponent = /** @class */ (function () {
    function SessionCardComponent(userSessionsService, userProfileService, modalService, gameAccountService) {
        this.userSessionsService = userSessionsService;
        this.userProfileService = userProfileService;
        this.modalService = modalService;
        this.gameAccountService = gameAccountService;
        this.gameAccounts = [];
        this.clockIcon = "https://cms.bsu.edu/-/media/www/images/common/icons/clockiconwhite.png?h=250&la=en&w=250&hash=230DC7880F07ECED39ADE5B6649523BE395F9147";
    }
    SessionCardComponent.prototype.ngOnInit = function () {
        this.sessionIcon = __WEBPACK_IMPORTED_MODULE_1__constants_session_icon_variables__["a" /* SESSION_ICONS */][this.session.gameId];
        this.consoleIcon = __WEBPACK_IMPORTED_MODULE_6__constants_console_icon_variables__["a" /* CONSOLE_ICONS */][this.session.console];
    };
    SessionCardComponent.prototype.changeStatus = function (template) {
        this.modalRef = this.modalService.show(template);
        this.getUserGameAccountsByGameId(this.session.gameId, this.loggedInUserId);
    };
    SessionCardComponent.prototype.joinUserSession = function () {
        console.log(this.gameAccounts);
        var data = {
            "rifteeId": this.loggedInUserId,
            "hostId": this.session.hostId,
            "sessionId": this.session.id,
            "accepted": 1,
            "rifteeGameAccount": this.accountId
        };
        console.log(data);
        this.userSessionsService.joinUserSession(data);
        alert("Sent request");
    };
    SessionCardComponent.prototype.getUserGameAccountsByGameId = function (gameId, riftId) {
        var _this = this;
        this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                var currAccount = resBody[i];
                var account = new __WEBPACK_IMPORTED_MODULE_8__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_1__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
                _this.gameAccounts.push(account);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], SessionCardComponent.prototype, "loggedInUserId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__models_session__["a" /* Session */])
    ], SessionCardComponent.prototype, "session", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__models_session_request__["a" /* SessionRequest */])
    ], SessionCardComponent.prototype, "request", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SessionCardComponent.prototype, "isLoggedIn", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], SessionCardComponent.prototype, "type", void 0);
    SessionCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-session-card',
            template: __webpack_require__("../../../../../src/app/components/session-card/session-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/session-card/session-card.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["c" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_9__userprofile_game_account_game_account_service__["a" /* GameAccountService */]])
    ], SessionCardComponent);
    return SessionCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/user-card/user-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <img src=\"{{user.profilePic}}\" alt=\"John\" style=\"width:100%\">\n  <h1 [routerLink]=\"['../../user/', user.riftTag]\">{{user.firstName}} {{user.lastName}}</h1>\n  <p class=\"title\">@{{user.riftTag}}</p>\n  <div *ngIf=\"isLoggedIn && loggedInUser.id != user.id\">\n    <app-follow-button [following]=\"isFollowing(user.riftTag)\" [id]=\"user.id\"\n                       [riftTag]=\"profile.nickname\" class=\"userbtn\">\n    </app-follow-button>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/components/user-card/user-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card {\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  max-width: 300px;\n  margin: auto;\n  text-align: center; }\n\n.title {\n  color: grey;\n  font-size: 18px; }\n\nbutton {\n  border: none;\n  outline: 0;\n  display: inline-block;\n  padding: 8px;\n  color: white;\n  background-color: #000;\n  text-align: center;\n  cursor: pointer;\n  width: 100%;\n  font-size: 18px; }\n\na {\n  text-decoration: none;\n  font-size: 22px;\n  color: black; }\n\nbutton:hover, a:hover {\n  opacity: 0.7; }\n\n.userbtn /deep/ button {\n  position: relative !important;\n  min-width: 92px !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/user-card/user-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserCardComponent = /** @class */ (function () {
    function UserCardComponent() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    UserCardComponent.prototype.ngOnInit = function () {
    };
    UserCardComponent.prototype.isFollowing = function (riftTag) {
        for (var i = 0; i < this.loggedInUser.followings.length; i++) {
            var currFollowing = this.loggedInUser.followings[i].riftTag;
            if (currFollowing == riftTag) {
                return true;
            }
        }
        return false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UserCardComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], UserCardComponent.prototype, "isLoggedIn", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UserCardComponent.prototype, "loggedInUser", void 0);
    UserCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-card',
            template: __webpack_require__("../../../../../src/app/components/user-card/user-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/user-card/user-card.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserCardComponent);
    return UserCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/user-review/user-review.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-3\">\n  <img src=\"{{rating.reviewerUsertable.profilePic}}\" class=\"img-rounded profilePic\">\n  <div class=\"review-block-name\">\n    <a [routerLink] = \"['../', rating.reviewerUsertable.riftTag]\">\n      {{rating.reviewerUsertable.firstName}} {{rating.reviewerUsertable.lastName}}<br>\n      @{{rating.reviewerUsertable.riftTag}}\n    </a>\n  </div>\n  <div class=\"review-block-date\">{{rating.createdTime | date: longDate}}<br/>1 day ago</div>\n</div>\n<div class=\"col-sm-9\">\n  <div class=\"review-block-rate\">\n    {{accountType}}<br>\n    <app-rating [rating]=\"rating.rating\" [readonly]=\"true\"></app-rating>\n  </div>\n  <div class=\"review-block-title\">{{rating.reviewTitle}}</div>\n  <div class=\"review-block-description\">{{rating.review}}</div>\n</div>\n\n<!---->\n"

/***/ }),

/***/ "../../../../../src/app/components/user-review/user-review.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".review-block-name {\n  font-size: 12px;\n  margin: 10px 0; }\n\n.review-block-date {\n  font-size: 12px; }\n\n.review-block-rate {\n  font-size: 13px;\n  margin-bottom: 15px; }\n\n.review-block-title {\n  font-size: 15px;\n  font-weight: 700;\n  margin-bottom: 10px; }\n\n.review-block-description {\n  font-size: 13px; }\n\n.profilePic {\n  width: 100px;\n  height: 100px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/user-review/user-review.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserReviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userrating__ = __webpack_require__("../../../../../src/app/models/userrating.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserReviewComponent = /** @class */ (function () {
    function UserReviewComponent() {
        this.accountType = "";
    }
    UserReviewComponent.prototype.ngOnInit = function () {
        if (this.rating.account_type == true) {
            this.accountType = "Rifter";
        }
        else {
            this.accountType = "Riftee";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_userrating__["a" /* UserRating */])
    ], UserReviewComponent.prototype, "rating", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], UserReviewComponent.prototype, "userProfilePic", void 0);
    UserReviewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-review',
            template: __webpack_require__("../../../../../src/app/components/user-review/user-review.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/user-review/user-review.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserReviewComponent);
    return UserReviewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/constants/complaint-type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMPLAINT_TYPE; });
var COMPLAINT_TYPE = [
    "No Show",
    "Poor Performance",
    "Toxic Behavior",
    "Hard to Contact"
];


/***/ }),

/***/ "../../../../../src/app/constants/console-icon-variables.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONSOLE_ICONS; });
var CONSOLE_ICONS = {
    "XBox One": "http://www.workatplay.com/assets/img/case/xbox-one-logo.png",
    "PC": "https://cdn3.iconfinder.com/data/icons/computer-system-and-data/512/1-512.png",
    "Playstation 4": "https://cdn6.aptoide.com/imgs/5/8/d/58db080f17e85105d530e66ad3edb7fa_icon.png?w=256",
    "Wii U": "https://image.flaticon.com/icons/svg/39/39462.svg"
};


/***/ }),

/***/ "../../../../../src/app/constants/consoles.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONSOLES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_console__ = __webpack_require__("../../../../../src/app/models/console.ts");

var CONSOLES = [
    new __WEBPACK_IMPORTED_MODULE_0__models_console__["a" /* Console */]("XBox One", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_console__["a" /* Console */]("PC", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_console__["a" /* Console */]("Playstation 4", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_console__["a" /* Console */]("Wii U", false)
];


/***/ }),

/***/ "../../../../../src/app/constants/games.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GAMES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_game__ = __webpack_require__("../../../../../src/app/models/game.ts");

var GAMES = [
    new __WEBPACK_IMPORTED_MODULE_0__models_game__["a" /* Game */](0, "League of Legends", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_game__["a" /* Game */](1, "Overwatch", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_game__["a" /* Game */](2, "Fortnite", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_game__["a" /* Game */](3, "NBA 2k18", false)
];


/***/ }),

/***/ "../../../../../src/app/constants/languages.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LANGUAGES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_language__ = __webpack_require__("../../../../../src/app/models/language.ts");

var LANGUAGES = [
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("English", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Spanish", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Chinese", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Korean", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("French", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("German", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Russian", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Hindi", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Arabic", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Portuguese", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Bengali", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Japanese", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Punjabi", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Italian", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Thai", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Wu", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Javanese", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Malay", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Telugu", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Vietnamese", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Marathi", false),
    new __WEBPACK_IMPORTED_MODULE_0__models_language__["a" /* Language */]("Tamil", false)
];


/***/ }),

/***/ "../../../../../src/app/constants/notification-content.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NOTIFICATION_CONTENT; });
var NOTIFICATION_CONTENT = new Map([
    ["FOL", "started following you"],
    ["SRQ", "has requested to join session"],
    ["SRA", "has accepted your request to join session: "],
    ["SRR", "has rejected your request to join session: "],
    ["SPO", "created a new session: "],
    ["SUP", "updated session: "],
    ["SDE", "cancelled session: "],
    ["SST", "is live on twitch: "],
    ["SJO", "has joined a session: "]
]);


/***/ }),

/***/ "../../../../../src/app/constants/session-icon-variables.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SESSION_ICONS; });
// export const SESSION_ICONS = {
//   leagueOfLegends: 'https://yt3.ggpht.com/a-/AJLlDp2tN8kN8LY4yIbOOr38BjneYXpM3LsfVCxrzg=s900-mo-c-c0xffffffff-rj-k-no',
//   fortnite: 'https://t00.deviantart.net/pzi0PG9h1nqLy7LzAQcSq18kQ1I=/fit-in/150x150/filters:no_upscale():origin()/pre00/9f4f/th/pre/f/2017/261/9/f/fortnite___icon_by_blagoicons-dbnu8a0.png'
// };
var SESSION_ICONS = {
    0: 'https://nip.gl/wp-content/uploads/2017/08/league-of-legends-logo-700x262.png',
    1: 'https://i.imgur.com/ArCdMwGr.png',
    2: "https://theverticalslice.files.wordpress.com/2017/06/fortnite_white_logo.png",
    3: 'https://www.nba2k.com/img/logo_NBA2K18.png'
};


/***/ }),

/***/ "../../../../../src/app/feed/feed.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 5%; width: 80%; text-align: center\">\n  <div *ngFor=\"let notification of currentUser.feed\">\n    <app-feed-card [notification]=\"notification\"></app-feed-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/feed/feed.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css);\nbody {\n  padding-top: 50px; }\n.box {\n  border-radius: 3px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  padding: 10px 25px;\n  text-align: right;\n  display: block;\n  margin-top: 60px; }\n.box-icon {\n  background-color: #57a544;\n  border-radius: 50%;\n  display: table;\n  height: 100px;\n  margin: 0 auto;\n  width: 100px;\n  margin-top: -61px; }\n.box-icon span {\n  color: #fff;\n  display: table-cell;\n  text-align: center;\n  vertical-align: middle; }\n.info h4 {\n  font-size: 26px;\n  letter-spacing: 2px;\n  text-transform: uppercase; }\n.info > p {\n  color: #717171;\n  font-size: 16px;\n  padding-top: 10px;\n  text-align: justify; }\n.info > a {\n  background-color: #03a9f4;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n  color: #fff;\n  -webkit-transition: all 0.5s ease 0s;\n  transition: all 0.5s ease 0s; }\n.info > a:hover {\n  background-color: #0288d1;\n  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.12);\n          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.12);\n  color: #fff;\n  -webkit-transition: all 0.5s ease 0s;\n  transition: all 0.5s ease 0s; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feed/feed.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_activity__ = __webpack_require__("../../../../../src/app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_notification_content__ = __webpack_require__("../../../../../src/app/constants/notification-content.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FeedComponent = /** @class */ (function () {
    function FeedComponent(userProfileService) {
        this.userProfileService = userProfileService;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    FeedComponent.prototype.ngOnInit = function () {
        this.getBroadcastNotifications(this.profile.nickname);
    };
    FeedComponent.prototype.getBroadcastNotifications = function (riftTag) {
        var _this = this;
        this.currentUser.feed = [];
        this.userProfileService.getUserBroadcastNotifications(riftTag).subscribe(function (resBody) {
            for (var i = 0; i < resBody.length; i++) {
                var currFeed = resBody[i];
                var currNotification = new __WEBPACK_IMPORTED_MODULE_3__models_activity__["a" /* Activity */]();
                currNotification.notificationType = currFeed.notificationType;
                currNotification.notificationContent = __WEBPACK_IMPORTED_MODULE_5__constants_notification_content__["a" /* NOTIFICATION_CONTENT */].get(currNotification.notificationType);
                currNotification.createdTime = currFeed.createdTime;
                currNotification.riftTag = currFeed.creatorUsertable.riftTag;
                currNotification.firstName = currFeed.creatorUsertable.firstName;
                currNotification.lastName = currFeed.creatorUsertable.lastName;
                _this.getActivityProfilePicture(currNotification.riftTag, currNotification);
                var session = new __WEBPACK_IMPORTED_MODULE_4__models_session__["a" /* Session */]();
                var currSession = currFeed.rifterSession;
                session.id = currSession.id;
                session.gameId = currSession.gameId;
                session.console = currSession.console;
                session.title = currSession.title;
                session.sessionTime = currSession.sessionTime;
                session.slotsRemaining = currSession.slotsRemaining;
                session.riftTag = currNotification.riftTag;
                currNotification.rifterSession = session;
                _this.currentUser.feed.push(currNotification);
            }
        });
        return true;
    };
    FeedComponent.prototype.getActivityProfilePicture = function (riftTag, activity) {
        // console.log("Getting user's profile picture");
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                activity.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                activity.creatorProfilePic = resBody.image;
            }
        });
        return;
    };
    FeedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-feed',
            template: __webpack_require__("../../../../../src/app/feed/feed.component.html"),
            styles: [__webpack_require__("../../../../../src/app/feed/feed.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], FeedComponent);
    return FeedComponent;
}());



/***/ }),

/***/ "../../../../../src/app/global/globals.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Globals; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var Globals = /** @class */ (function () {
    function Globals() {
        this.role = 'test';
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.unseenNotifications = 0;
        this.previousNumNotifications = 0;
        this.began = false;
        this.stopPolling = false;
    }
    Globals = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], Globals);
    return Globals;
}());



/***/ }),

/***/ "../../../../../src/app/img/rift-welcome.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "rift-welcome.193d2c8aa8b9fcd2f2da.jpg";

/***/ }),

/***/ "../../../../../src/app/models/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Activity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__session__ = __webpack_require__("../../../../../src/app/models/session.ts");

var Activity = /** @class */ (function () {
    function Activity() {
        this.session = new __WEBPACK_IMPORTED_MODULE_0__session__["a" /* Session */]();
    }
    return Activity;
}());



/***/ }),

/***/ "../../../../../src/app/models/console.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Console; });
var Console = /** @class */ (function () {
    function Console(name, selected) {
        this.name = name;
        this.selected = selected;
    }
    return Console;
}());



/***/ }),

/***/ "../../../../../src/app/models/credit-card.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditCard; });
var CreditCard = /** @class */ (function () {
    function CreditCard() {
    }
    return CreditCard;
}());



/***/ }),

/***/ "../../../../../src/app/models/game-account.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameAccount; });
var GameAccount = /** @class */ (function () {
    function GameAccount() {
    }
    return GameAccount;
}());



/***/ }),

/***/ "../../../../../src/app/models/game.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
var Game = /** @class */ (function () {
    function Game(id, name, selected) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }
    return Game;
}());



/***/ }),

/***/ "../../../../../src/app/models/language.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Language; });
var Language = /** @class */ (function () {
    function Language(language, selected) {
        this.language = language;
        this.selected = selected;
    }
    return Language;
}());



/***/ }),

/***/ "../../../../../src/app/models/notification.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
var Notification = /** @class */ (function () {
    function Notification() {
    }
    return Notification;
}());



/***/ }),

/***/ "../../../../../src/app/models/session-request.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionRequest; });
var SessionRequest = /** @class */ (function () {
    function SessionRequest() {
    }
    return SessionRequest;
}());



/***/ }),

/***/ "../../../../../src/app/models/session.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Session; });
var Session = /** @class */ (function () {
    // constructor(firstName: string, lastName: string, riftTag: string, rifterRating: number,hostId: number,
    //             sessionCost: number, methodOfContact: string, sessionDuration: string, sessionTitle: string,
    //             sessionHits: number, sessionTime: any) {
    //   this.firstName = firstName;
    //   this.lastName = lastName;
    //   this.riftTag = riftTag;
    //   this.rifterRating = rifterRating;
    //   this.hostId = hostId;
    //   this.sessionCost = sessionCost;
    //   this.methodOfContact = methodOfContact;
    //   this.sessionDuration = sessionDuration;
    //   this.title = sessionTitle;
    //   this.hits = sessionHits;
    //   this.sessionTime = sessionTime;
    // }
    function Session() {
        this.riftees = [];
    }
    return Session;
}());



/***/ }),

/***/ "../../../../../src/app/models/userprofile.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Userprofile; });
var Userprofile = /** @class */ (function () {
    function Userprofile() {
        this.followers = [];
        this.followings = [];
        this.ratings = [];
        this.notifications = [];
        this.gameAccounts = [];
        this.activities = [];
    }
    return Userprofile;
}());



/***/ }),

/***/ "../../../../../src/app/models/userrating.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");

var UserRating = /** @class */ (function () {
    function UserRating() {
        this.reviewerUsertable = new __WEBPACK_IMPORTED_MODULE_0__userprofile__["a" /* Userprofile */]();
    }
    return UserRating;
}());



/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar {\n  min-height: 70px !important;\n  margin-bottom: 0 !important;\n  background-color: #18191b;\n  border: none;\n  border-radius: 0;\n}\n\n.navbar-right {\n  font-family: \"Raleway\", Arial, Helvetica, sans-serif;\n  font-size: 11px;\n  font-weight: 400 !important;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n}\n\n.navbar-text {\n  font-family: \"Raleway\", Arial, Helvetica, sans-serif;\n  font-size: 11px;\n  font-weight: 400 !important;\n  letter-spacing: 3px;\n  text-transform: uppercase;\n  color: white !important;\n}\n\nul {\n  margin-top:0;\n  margin-bottom: 10px;\n\n}\n\nli a:after {\n  float: right;\n  position: relative;\n  font-family: \"FontAwesome\";\n  content: \"\\F111\";\n  font-size: 6px;\n  margin-left: 15px;\n  margin-right: 10px;\n  margin-top: 0px;\n  color: #FAB702;\n  display:inline-block;\n}\n\n.profile-dropdown a{\n  color: #18191b !important;\n  font-size: 13px;\n  font-weight: 500 !important;\n  letter-spacing: 0px;\n  text-transform: none;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.notifications-dropdown {\n  color: #18191b !important;\n  font-size: 13px;\n  font-weight: 500 !important;\n  letter-spacing: 0px;\n  text-transform: none;\n  font-family: \"Montserrat\", sans-serif;\n}\n\n.profile-dropdown a:after, .profileToggle a:after{\n  content: none;\n}\n\n.profilePic {\n  max-height: 25px;\n  max-width: 25px;\n  margin-right: 10%;\n}\n\n#user-profile-label {\n  margin-bottom: 10%;\n}\n\n.rift-icon {\n  height: 25px;\n  width: 25px;\n  display:inline-block;\n}\n\n.badge-notify{\n  background:red;\n  position:absolute;\n  top:0;\n  color: white;\n}\n\na {\n  color: white !important;\n  cursor: pointer;\n  width: 110%;\n}\n\n.container-fluid {\n  margin-top: 10px !important;\n}\n\n.dropdown-toggle {\n  background-color: transparent !important;\n  border: none !important;\n}\n\n#notify-icon {\n  padding: 15px 12px;\n  display: inline;\n  line-height: 20px;\n  vertical-align: middle;\n}\n\n.dropdown-item {\n  color: black !important;\n  margin-left: 5px !important;\n  margin-right: 5px !important;\n}\n\n/*app-notification {*/\n\n/*color: black !important;*/\n\n/*}*/\n\n.dropdown-menu {\n  max-height: 600px !important;\n  min-width: 200px !important;\n  overflow-y: hidden !important;\n  /*display:inline-block;*/\n  padding: 5px 10px;\n  margin-top: 10px !important;\n  animation: fadein 0.25s;\n  -moz-animation: fadein 0.25s; /* Firefox */\n  -webkit-animation: fadein 0.25s; /* Safari and Chrome */\n  -o-animation: fadein 0.25s; /* Opera */\n}\n\n.media {\n  margin-left: 10px !important;\n  margin-right: 10px !important;\n}\n\n.user-info {\n  position: relative;\n  margin-bottom: 40px;\n  margin-top: 30px;\n}\n\n.user-info img {\n  border-radius: 2px;\n  width: 40px;\n}\n\n.user-info a {\n  font-size: 1.1em;\n  line-height: 1;\n}\n\n.user-info .username {\n  font-size: 0.9em;\n  line-height: 1.5;\n}\n\n.media-body {\n  margin-left: 10%;\n  padding-left: 10%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<nav class=\"navbar navbar-default navbar-custom navbar-fixed-top\">-->\n  <!--<div class=\"container-fluid\">-->\n    <!--<div class=\"navbar-header page-scroll\">-->\n      <!--<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">-->\n        <!--<span class=\"sr-only\">Toggle navigation</span>-->\n        <!--Menu <i class=\"fa fa-bars\"></i>-->\n      <!--</button>-->\n      <!--<app-search-bar></app-search-bar>-->\n    <!--</div>-->\n    <!--<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">-->\n      <!--<ul class=\"nav navbar-nav navbar-right\">-->\n        <!--<li>-->\n          <!--<a routerLink=\"feed\" *ngIf=\"auth.isAuthenticated()\">Feed</a>-->\n        <!--</li>-->\n        <!--<li>-->\n          <!--<a routerLink=\"sessions\" *ngIf=\"auth.isAuthenticated()\">Sessions</a>-->\n        <!--</li>-->\n        <!--<li>-->\n          <!--<a [routerLink]=\"['user', profile.nickname]\" *ngIf=\"auth.isAuthenticated()\">{{profile.nickname}}</a>-->\n        <!--</li>-->\n        <!--<li class=\"dropdown\" *ngIf=\"auth.isAuthenticated()\">-->\n          <!--<div class=\"btn-group\" dropdown>-->\n            <!--<button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle\" (click)=\"clearUnseen();\">-->\n              <!--<span class=\"glyphicon glyphicon-bell\"></span>-->\n              <!--<span class=\"badge badge-notify\" *ngIf=\"globals.unseenNotifications > 0\">{{globals.unseenNotifications}}</span>-->\n\n            <!--</button>-->\n            <!--<ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">-->\n              <!--<li class=\"media\" *ngFor=\"let notification of notificationsList\">-->\n                <!--<app-notification [notification]=\"notification\"></app-notification>-->\n              <!--</li>-->\n            <!--</ul>-->\n          <!--</div>-->\n        <!--</li>-->\n\n        <!--<li>-->\n          <!--<a (click)=\"auth.login()\" *ngIf=\"!auth.isAuthenticated()\">Login</a>-->\n        <!--</li>-->\n        <!--<li>-->\n          <!--<a (click)=\"auth.logout()\" *ngIf=\"auth.isAuthenticated()\">Logout</a>-->\n        <!--</li>-->\n\n      <!--</ul>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</nav>-->\n\n<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" (click)=\"isCollapsed = !isCollapsed\" aria-expanded=\"false\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <i class=\"fa fa-bars\"></i>\n      </button>\n      <a class=\"navbar-brand\" routerLink=\"home\">\n        <img src=\"https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/256x256/plain/crack.png\" class=\"rift-icon\">\n        RIFT\n      </a>\n    </div>\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse\" [collapse]=isCollapsed>\n      <app-search-bar></app-search-bar>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown profileDrop\" *ngIf=\"auth.isAuthenticated()\" dropdown>\n          <a class=\"dropdown-toggle\" dropdownToggle>\n            <span><img src=\"{{loggedInUser.profilePic}}\" class=\"profilePic img-circle\">\n            {{profile.nickname}}\n            </span>\n            <!--<b class=\"caret\"></b>-->\n          </a>\n          <ul class=\"dropdown-menu\" *dropdownMenu>\n            <li class=\"profile-dropdown\">\n              <a [routerLink]=\"['user', profile.nickname]\">\n                <!--<span id=\"user-profile-label\">-->\n                  <!--<img src=\"{{loggedInUser.profilePic}}\" class=\"profilePic img-circle\" style=\"display:inline-block\">-->\n                  <!--<p>{{loggedInUser.firstName}} {{loggedInUser.lastName}}</p>-->\n                  <!--<p>@{{profile.nickname}}</p>-->\n                <!--</span>-->\n                <div class=\"user-info\">\n                  <img src=\"{{loggedInUser.profilePic}}\" alt=\"User Avatar\" class=\"media-object pull-left\">\n                  <div class=\"media-body\">\n                    {{loggedInUser.firstName}} {{loggedInUser.lastName}}\n                    <br><span class=\"text-muted username\">@{{profile.nickname}}</span>\n                  </div>\n                </div>\n                View Profile\n              </a>\n            </li>\n            <li class=\"divider\"></li>\n            <li class=\"profile-dropdown\">\n              <a (click)=\"auth.logout()\" *ngIf=\"auth.isAuthenticated()\">Sign Out</a>\n            </li>\n          </ul>\n        </li>\n        <li class=\"feed\">\n          <a routerLink=\"feed\" *ngIf=\"auth.isAuthenticated()\">Feed</a>\n        </li>\n        <li class=\"sessions\">\n          <a routerLink=\"sessions\" *ngIf=\"auth.isAuthenticated()\">Sessions</a>\n        </li>\n        <li class=\"notifications dropdown\" *ngIf=\"auth.isAuthenticated()\">\n          <div class=\"btn-group\" dropdown>\n            <button id=\"notify-icon\" dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle\" (click)=\"clearUnseen();\">\n              <span class=\"glyphicon glyphicon-bell\"></span>\n              <span class=\"badge badge-notify\" *ngIf=\"globals.unseenNotifications > 0\">{{globals.unseenNotifications}}</span>\n\n            </button>\n            <ul *dropdownMenu class=\"dropdown-menu notifications-dropdown\" role=\"menu\" style=\"min-width: 500px !important\">\n              <li class=\"media\" *ngFor=\"let notification of notificationsList\">\n                <app-notification [notification]=\"notification\"></app-notification>\n              </li>\n            </ul>\n          </div>\n        </li>\n\n        <li>\n          <a (click)=\"auth.login()\" *ngIf=\"!auth.isAuthenticated()\">Login</a>\n        </li>\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(auth, userProfileService, notificationService, globals, sharedFunc) {
        this.auth = auth;
        this.userProfileService = userProfileService;
        this.notificationService = notificationService;
        this.globals = globals;
        this.sharedFunc = sharedFunc;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_2__models_userprofile__["a" /* Userprofile */]();
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_2__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile) {
            this.loggedInUser.firstName = this.profile["http://riftgaming:auth0:com/user_metadata"].firstName;
            this.loggedInUser.lastName = this.profile["http://riftgaming:auth0:com/user_metadata"].lastName;
            this.sharedFunc.getUserProfilePicture(this.profile.nickname, this.loggedInUser);
        }
    }
    NavbarComponent.prototype.clearUnseen = function () {
        this.globals.unseenNotifications = 0;
        this.notificationService.clearUnseen(this.profile.nickname);
    };
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.getNotificationProfilePicture = function (riftTag, notification) {
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                notification.creatorProfilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                notification.creatorProfilePic = resBody.image;
            }
        });
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "notificationsList", void 0);
    NavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_5__userprofile_notifications_service__["a" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__global_globals__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_6__shared_shared_functions__["a" /* SharedFunctions */]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/capitalize.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CapitalizePipe = /** @class */ (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
        return value;
    };
    CapitalizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'capitalize' })
    ], CapitalizePipe);
    return CapitalizePipe;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/console-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsoleFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConsoleFilterPipe = /** @class */ (function () {
    function ConsoleFilterPipe() {
    }
    ConsoleFilterPipe.prototype.transform = function (sessions, consoles) {
        if (!consoles || consoles.length === 0)
            return sessions;
        return sessions.filter(function (session) { return consoles.includes(session.console); });
    };
    ConsoleFilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'consoleFilter'
        })
    ], ConsoleFilterPipe);
    return ConsoleFilterPipe;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/game-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GameFilterPipe = /** @class */ (function () {
    function GameFilterPipe() {
    }
    GameFilterPipe.prototype.transform = function (sessions, gameIds) {
        if (!gameIds || gameIds.length === 0)
            return sessions;
        return sessions.filter(function (session) { return gameIds.includes(session.gameId); });
    };
    GameFilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'gameFilter'
        })
    ], GameFilterPipe);
    return GameFilterPipe;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/session-time.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionTimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SessionTimePipe = /** @class */ (function () {
    function SessionTimePipe() {
    }
    SessionTimePipe.prototype.transform = function (sessions, upcoming, past) {
        if (!upcoming && !past || upcoming && past) {
            return sessions;
        }
        var currentTime = new Date();
        var currentTimeMS = currentTime.getTime();
        if (upcoming && !past) {
            return sessions.filter(function (session) {
                return session.sessionTime > currentTimeMS;
            });
        }
        if (past && !upcoming) {
            return sessions.filter(function (session) {
                return session.sessionTime < currentTimeMS;
            });
        }
    };
    SessionTimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sessionTime'
        })
    ], SessionTimePipe);
    return SessionTimePipe;
}());



/***/ }),

/***/ "../../../../../src/app/pipes/session-type.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionTypePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SessionTypePipe = /** @class */ (function () {
    function SessionTypePipe() {
    }
    SessionTypePipe.prototype.transform = function (sessions, rifter, riftee) {
        if (rifter && riftee || !rifter && !riftee) {
            return sessions;
        }
        if (rifter && !riftee) {
            return sessions.filter(function (session) {
                return session.type == true;
            });
        }
        if (riftee && !rifter) {
            return sessions.filter(function (session) {
                return session.type == false;
            });
        }
    };
    SessionTypePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sessionType'
        })
    ], SessionTypePipe);
    return SessionTypePipe;
}());



/***/ }),

/***/ "../../../../../src/app/shared/shared-functions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedFunctions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SharedFunctions = /** @class */ (function () {
    function SharedFunctions(userProfileService) {
        this.userProfileService = userProfileService;
    }
    SharedFunctions.prototype.getLoggedInUserId = function (riftTag, loggedInUser) {
        this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
            loggedInUser.id = resBody.id;
            console.log(loggedInUser.id);
        });
    };
    SharedFunctions.prototype.getUserProfilePicture = function (riftTag, user) {
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                user.profilePic = resBody.image;
            }
        });
    };
    SharedFunctions.prototype.timeToMilliseconds = function (time) {
        var list = time.split(":");
        var hour = (+list[0]);
        var minute = (+list[1]);
        var seconds = (hour * 60 * 60) + (minute * 60);
        return seconds * 1000;
    };
    SharedFunctions = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], SharedFunctions);
    return SharedFunctions;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/riftsessions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"width: 80%\">\n  <mat-tab-group>\n    <mat-tab label=\"users\">\n      <div class=\"user-cards\" *ngFor=\"let user of users\">\n        <app-user-card [user]=\"user\" [isLoggedIn]=\"isLoggedIn\" [loggedInUser]=\"loggedInUser\"></app-user-card>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"sessions\">\n      <div *ngFor=\"let session of sessions\">\n        <app-session-card [routerLink]=\"['../../session', session.id]\"\n          [session]=\"session\" [isLoggedIn]=\"isLoggedIn\" [request]=\"loggedInUser.sessionRequests.get(session.id)\">\n        </app-session-card>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/riftsessions.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  margin-top: 5%; }\n\n.user-cards {\n  display: inline-block; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/riftsessions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RiftsessionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_search_bar_search_bar_service__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session_request__ = __webpack_require__("../../../../../src/app/models/session-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var RiftsessionsComponent = /** @class */ (function () {
    function RiftsessionsComponent(searchBarService, route, userSessionsService, userProfileService, sharedFunc) {
        this.searchBarService = searchBarService;
        this.route = route;
        this.userSessionsService = userSessionsService;
        this.userProfileService = userProfileService;
        this.sharedFunc = sharedFunc;
        this.searchQuery = "";
        this.sessions = [];
        this.users = [];
        this.isLoggedIn = false;
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_6__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    RiftsessionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.searchQuery = params['searchQuery'];
            if (_this.profile) {
                _this.isLoggedIn = true;
                _this.getCurrentLoggedInUser();
                _this.getUserSessionRequests(_this.profile.nickname);
            }
            _this.getUserSearchResults(_this.searchQuery);
        });
    };
    RiftsessionsComponent.prototype.getUserSearchResults = function (searchQuery) {
        var _this = this;
        this.sessions = [];
        this.users = [];
        this.searchBarService.getSearchResults(searchQuery).subscribe(function (resBody) {
            var users = resBody[0];
            for (var i = 0; i < users.length; i++) {
                var currUser = new __WEBPACK_IMPORTED_MODULE_6__models_userprofile__["a" /* Userprofile */]();
                currUser.firstName = users[i].firstName;
                currUser.lastName = users[i].lastName;
                currUser.riftTag = users[i].riftTag;
                currUser.id = users[i].id;
                _this.sharedFunc.getUserProfilePicture(currUser.riftTag, currUser);
                _this.users.push(currUser);
            }
            for (var i = 0; i < resBody[1].length; i++) {
                var currDateMS = resBody[1][i].sessionTime;
                var date = new Date(currDateMS);
                var currSession = new __WEBPACK_IMPORTED_MODULE_3__models_session__["a" /* Session */]();
                currSession.firstName = resBody[1][i].usertable.firstName;
                currSession.lastName = resBody[1][i].usertable.lastName;
                currSession.riftTag = resBody[1][i].usertable.riftTag;
                currSession.rifterRating = resBody[1][i].rifterRating;
                currSession.hostId = resBody[1][i].hostId;
                currSession.sessionCost = resBody[1][i].sessionCost;
                currSession.methodOfContact = resBody[1][i].methodOfContact;
                currSession.sessionDuration = resBody[1][i].sessionDuration;
                currSession.title = resBody[1][i].title;
                currSession.sessionTime = date;
                currSession.id = resBody[1][i].id;
                currSession.numSlots = resBody[1][i].numSlots;
                currSession.gameId = resBody[1][i].game_id;
                _this.sessions.push(currSession);
            }
        });
    };
    RiftsessionsComponent.prototype.getUserSessionRequests = function (riftTag) {
        var _this = this;
        this.loggedInUser.sessionRequests = new Map();
        this.userSessionsService.getSessionRequests(riftTag).subscribe(function (resBody) {
            for (var i = 0; i < resBody.length; i++) {
                var request = new __WEBPACK_IMPORTED_MODULE_5__models_session_request__["a" /* SessionRequest */]();
                request.accepted = resBody[i].accepted;
                request.hostId = resBody[i].hostId;
                request.rifteeId = resBody[i].rifteeId;
                request.sessionId = resBody[i].sessionId;
                _this.loggedInUser.sessionRequests.set(request.sessionId, request);
            }
        });
    };
    RiftsessionsComponent.prototype.getCurrentLoggedInUser = function () {
        var _this = this;
        this.userProfileService.getUser(this.profile.nickname).subscribe(function (resBody) {
            _this.loggedInUser.id = resBody.id;
            for (var i = 0; i < resBody.followings.length; i++) {
                var currFollowing = new __WEBPACK_IMPORTED_MODULE_6__models_userprofile__["a" /* Userprofile */]();
                currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
                currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
                currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
                _this.loggedInUser.followings.push(currFollowing);
            }
        });
    };
    RiftsessionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-riftsessions',
            template: __webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.html"),
            styles: [__webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_search_bar_search_bar_service__["a" /* SearchBarService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_7__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_8__shared_shared_functions__["a" /* SharedFunctions */]])
    ], RiftsessionsComponent);
    return RiftsessionsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"panel panel-default  panel--styled\">\n        <div class=\"panel-body\">\n          <div class=\"console\">\n            <img class=\"img-responsive img-circle consoleIcon\" src=\"{{consoleIcon}}\" alt=\"\"/>\n          </div>\n          <div class=\"col-md-8 panelTop\">\n            <div class=\"col-md-4\">\n              <img class=\"img-responsive img-circle sessionIcon\" src=\"{{sessionIcon}}\" alt=\"\"/>\n            </div>\n            <div class=\"col-md-8\">\n              <h2>{{session.title}}</h2>\n              <p class=\"text-muted\">{{session.firstName}} {{session.lastName}} @{{session.riftTag}}</p>\n              <p>{{session.description}}</p>\n            </div>\n          </div>\n          <div class=\"col-md-12 panelBottom\">\n            <div class=\"col-md-4 text-center\">\n              <div *ngIf=\"isLoggedIn && !(profile.nickname == session.riftTag)\">\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status != 1 && request.status != 0 && request.status != 2\" (click)=\"joinUserSession()\">Join</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==1\">Pending</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==0\">Rejected</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==2\" (click)=\"changeStatus(template)\">Accepted</button>\n              </div>\n              <button class=\"btn btn-lg btn-add-to-cart\" mat-button (click)=\"openUpdateSessionDialog()\" *ngIf=\"isLoggedIn && (profile.nickname == session.riftTag)\">Edit Session</button><br>\n              <ng-template #template style=\"margin-top:20%\">\n                <div class=\"modal-body text-center\">\n                  <p>Are you sure you want to cancel your request?</p>\n                  <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelSessionRequest()\" >Yes</button>\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n                </div>\n              </ng-template>\n            </div>\n            <div class=\"col-md-4 text-left\">\n              <h5>Price  <span class=\"itemPrice\">${{session.sessionCost}}.00 / slot</span></h5>\n            </div>\n            <div class=\"col-md-4\">\n                  <app-rating [rating]=\"session.rifterRating\" [readonly]=\"true\"></app-rating>\n            </div>\n          </div>\n          <div class=\"col-md-12 panelBottom\">\n            <h4 class=\"text-center\">Riftees</h4>\n            <table class=\"table table-striped custab\">\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>Riftee Name</th>\n                  <th>Riftee Rift Tag</th>\n                  <th class=\"text-center\">Riftee Rating</th>\n                </tr>\n              </thead>\n              <tr *ngFor=\"let riftee of session.riftees\">\n                <td class=\"profilepicturehere\">\n                  <img src=\"{{riftee.profilePic}}\" class=\"profilePic\">\n                </td>\n                <td>\n                  <a [routerLink]=\"['../../user/', riftee.riftTag]\">\n                  {{riftee.firstName}} {{riftee.lastName}}\n                  </a>\n                </td>\n                <td>{{riftee.riftTag}}</td>\n                <td class=\"text-center\">\n                  <app-rating [rating]=\"riftee.rifteeRating\" [readonly]=\"true\"></app-rating>\n                </td>\n                <td *ngIf=\"isLoggedIn && (profile.nickname == session.riftTag)\">\n                  <app-kick-riftee-button [hostId]=\"loggedInUserId\" [rifteeId]=\"riftee.id\" [sessionId]=\"id\"\n                  [riftee]=\"riftee\" (deleteRiftee)=\"remove($event)\"></app-kick-riftee-button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  sessionId: {{session.id}}<br>\n  sessionTitle: {{session.title}}<br>\n  sessionFirstName: {{session.firstName}}<br>\n  sessionLastName: {{session.lastName}}<br>\n  sessionRiftTag: {{session.riftTag}}<br>\n  sessionCost: {{session.sessionCost}}<br>\n  sessionTime: {{session.sessionTime}}<br>\n  sessionSlots: {{session.numSlots}}<br>\n  sessionRifterRating: {{session.rifterRating}}<br>\n  sessionGame: {{session.gameId}}<br>\n  sessionConsole: {{session.console}}<br>\n  sessionDescription: {{session.description}}<br>\n  <br><br><br>\n\n  <button mat-button (click)=\"openUpdateSessionDialog()\">Open dialog</button>\n\n</div>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  width: 80%;\n  margin-top: 5%; }\n\n.console {\n  position: absolute;\n  top: 20px;\n  right: 50px; }\n\n.consoleIcon {\n  max-height: 100px;\n  max-width: 100px; }\n\n.profilePic {\n  max-height: 100px;\n  max-width: 100px; }\n\n/*----------------------\nProduct Card Styles\n----------------------*/\n\n.panel.panel--styled {\n  background: #F4F2F3; }\n\n.panelTop {\n  padding: 30px; }\n\n.panelBottom {\n  border-top: 1px solid #e7e7e7;\n  padding-top: 20px;\n  padding-bottom: 20px; }\n\n.btn-add-to-cart {\n  background: #FD5A5B;\n  color: #fff; }\n\n.btn.btn-add-to-cart.focus, .btn.btn-add-to-cart:focus, .btn.btn-add-to-cart:hover {\n  color: #fff;\n  background: #FD7172;\n  outline: none; }\n\n.btn-add-to-cart:active {\n  background: #F9494B;\n  outline: none; }\n\nspan.itemPrice {\n  font-size: 24px;\n  color: #FA5B58; }\n\n.modal-container {\n  margin-top: 20% !important; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__session_page_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__update_session_update_session_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__constants_console_icon_variables__ = __webpack_require__("../../../../../src/app/constants/console-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SessionPageComponent = /** @class */ (function () {
    function SessionPageComponent(route, sessionPageService, userProfileService, userSessionsService, dialog, modalService, sharedFunc) {
        this.route = route;
        this.sessionPageService = sessionPageService;
        this.userProfileService = userProfileService;
        this.userSessionsService = userSessionsService;
        this.dialog = dialog;
        this.modalService = modalService;
        this.sharedFunc = sharedFunc;
        this.session = new __WEBPACK_IMPORTED_MODULE_3__models_session__["a" /* Session */]();
        this.isLoggedIn = false;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile != null) {
            this.isLoggedIn = true;
        }
    }
    SessionPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            if (_this.isLoggedIn) {
                _this.getLoggedInUserId(JSON.parse(localStorage.getItem("profile")).nickname);
            }
            _this.id = params['sessionId'];
            _this.getSessionById();
        });
    };
    SessionPageComponent.prototype.getSessionById = function () {
        var _this = this;
        this.sessionPageService.getSessionById(this.id).subscribe(function (resBody) {
            _this.response = resBody;
            _this.session.id = _this.response.id;
            _this.session.hostId = _this.response.hostId;
            _this.session.riftTag = _this.response.usertable.riftTag;
            _this.session.rifterRating = _this.response.usertable.rifterRating;
            _this.session.firstName = _this.response.usertable.firstName;
            _this.session.lastName = _this.response.usertable.lastName;
            _this.session.methodOfContact = _this.response.methodOfContact;
            _this.session.title = _this.response.title;
            _this.session.description = _this.response.description;
            _this.session.hits = _this.response.hits;
            _this.session.sessionTime = _this.response.sessionTime;
            _this.session.sessionCost = _this.response.sessionCost;
            _this.session.numSlots = _this.response.numSlots;
            _this.session.gameId = _this.response.gameId;
            _this.session.console = _this.response.console;
            _this.sessionIcon = __WEBPACK_IMPORTED_MODULE_6__constants_session_icon_variables__["a" /* SESSION_ICONS */][_this.session.gameId];
            _this.consoleIcon = __WEBPACK_IMPORTED_MODULE_10__constants_console_icon_variables__["a" /* CONSOLE_ICONS */][_this.session.console];
            _this.getSessionRiftees(_this.response.players);
            _this.checkRifteeStatus(_this.session.id);
        });
    };
    SessionPageComponent.prototype.checkRifteeStatus = function (sessionId) {
        var _this = this;
        this.sessionPageService.checkRifteeStatus(sessionId, this.loggedInUserId).subscribe(function (resBody) {
            _this.request = resBody;
        });
    };
    SessionPageComponent.prototype.getSessionRiftees = function (players) {
        this.session.riftees = [];
        for (var i = 0; i < players.length; i++) {
            var riftee = new __WEBPACK_IMPORTED_MODULE_7__models_userprofile__["a" /* Userprofile */]();
            var player = players[i];
            riftee.firstName = player.firstName;
            riftee.lastName = player.lastName;
            riftee.riftTag = player.riftTag;
            riftee.rifteeRating = player.rifteeRating;
            riftee.id = player.id;
            this.sharedFunc.getUserProfilePicture(riftee.riftTag, riftee);
            this.session.riftees.push(riftee);
        }
    };
    SessionPageComponent.prototype.joinUserSession = function () {
        var data = {
            "rifteeId": this.loggedInUserId,
            "hostId": this.session.hostId,
            "sessionId": this.session.id,
            "accepted": 1
        };
        console.log(data);
        this.userSessionsService.joinUserSession(data);
        alert("Sent request");
    };
    SessionPageComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
            _this.loggedInUserId = resBody.id;
        });
    };
    SessionPageComponent.prototype.openUpdateSessionDialog = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__update_session_update_session_component__["a" /* UpdateSessionComponent */], {
            data: {
                sessionTime: this.session.sessionTime,
                sessionId: this.session.id,
            }
        });
    };
    SessionPageComponent.prototype.changeStatus = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    SessionPageComponent.prototype.remove = function (item) {
        this.session.riftees.splice(this.session.riftees.indexOf(item), 1);
    };
    SessionPageComponent.prototype.cancelSessionRequest = function () {
        this.sessionPageService.cancelSessionRequest(this.session.id, this.loggedInUserId);
    };
    SessionPageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-session-page',
            template: __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.html"),
            styles: [__webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_2__session_page_service__["a" /* SessionPageService */],
            __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_5__usersessions_usersessions_service__["a" /* UsersessionsService */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["c" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["c" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_12__shared_shared_functions__["a" /* SharedFunctions */]])
    ], SessionPageComponent);
    return SessionPageComponent;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SessionPageService = /** @class */ (function () {
    function SessionPageService(http) {
        this.http = http;
        this.getSessionURL = "/api/rifterSession/";
    }
    SessionPageService.prototype.getSessionById = function (id) {
        console.log("running getSessionById");
        return this.http.get(this.getSessionURL + id)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    SessionPageService.prototype.checkRifteeStatus = function (sessionId, riftId) {
        console.log("running checkRifteeStatus");
        return this.http.get("/api/sessionRequest/" + sessionId + "/status/" + riftId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    SessionPageService.prototype.cancelSessionRequest = function (sessionId, riftId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.delete("/api/sessionRequest/delete/" + sessionId + "/" + riftId, options)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    SessionPageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], SessionPageService);
    return SessionPageService;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/data/sessionDateTime.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionDateTime; });
var SessionDateTime = /** @class */ (function () {
    function SessionDateTime() {
    }
    return SessionDateTime;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateSessionData; });
var UpdateSessionData = /** @class */ (function () {
    function UpdateSessionData() {
        this.title = "";
        this.console = "";
        this.description = "";
    }
    return UpdateSessionData;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateSessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__update_session_model__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateSessionService = /** @class */ (function () {
    function UpdateSessionService(http) {
        this.http = http;
        this.updateSessionData = new __WEBPACK_IMPORTED_MODULE_3__update_session_model__["a" /* UpdateSessionData */]();
        this.isValid = false;
        this.updateSessionURL = "/api/rifterSession/update";
        this.cancelSessionURL = "/api/rifterSession/delete/";
    }
    UpdateSessionService.prototype.getSessionData = function () {
        var session = new __WEBPACK_IMPORTED_MODULE_4__models_session__["a" /* Session */]();
        session.title = this.updateSessionData.title;
        session.gameId = this.updateSessionData.gameId;
        session.console = this.updateSessionData.console;
        session.numSlots = this.updateSessionData.numSlots;
        session.sessionCost = this.updateSessionData.sessionCost;
        session.description = this.updateSessionData.description;
        return session;
    };
    UpdateSessionService.prototype.setSessionData = function (data, dateTime) {
        this.isValid = true;
        this.updateSessionData.title = data.title;
        this.updateSessionData.gameId = data.gameId;
        this.updateSessionData.console = data.console;
        this.updateSessionData.numSlots = data.numSlots;
        this.updateSessionData.sessionCost = data.sessionCost;
        this.updateSessionData.sessionDate = dateTime.sessionDate;
        this.updateSessionData.sessionTime = dateTime.sessionTime;
        this.updateSessionData.sessionDuration = dateTime.sessionDuration;
        this.updateSessionData.description = data.description;
    };
    UpdateSessionService.prototype.getFormData = function () {
        return this.updateSessionData;
    };
    UpdateSessionService.prototype.updateUserSession = function (data) {
        console.log("running updateUserSession");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.updateSessionURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Updated session'); });
    };
    UpdateSessionService.prototype.cancelSession = function (sessionId) {
        console.log("Cancelling Session: " + sessionId);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.delete(this.cancelSessionURL + sessionId, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Canceled session'); });
    };
    UpdateSessionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], UpdateSessionService);
    return UpdateSessionService;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content>\n<form #updateSession=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiontitle\">Give your session a title</label>\n              <input class=\"form-control input-md\" #sessiontitle=\"ngModel\"  id=\"sessiontitle\" name=\"sessiontitle\" type=\"text\" placeholder=\"Session Title\" [(ngModel)]=\"currentSession.title\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiongame\">What game will you be playing?</label>\n              <!--<input class=\"form-control input-md\" #sessiongame=\"ngModel\"  id=\"sessiongame\" name=\"sessiongame\" type=\"text\" placeholder=\"Session Game\" [(ngModel)]=\"currentSession.game\">-->\n              <mat-form-field>\n                <mat-select placeholder=\"Select a Game\" [(value)]=\"gameId\" (selectionChange)=\"getUserGameAccountsByGameId(gameId, loggedInUserId)\">\n                  <mat-option *ngFor=\"let game of games\" [value]=\"game.id\">\n                    {{ game.name }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n              <mat-form-field>\n                <mat-select placeholder=\"Select an Account\" [(value)]=\"accountId\">\n                  <mat-option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">\n                    {{ account.ign }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessionplatform\">What platform will you be playing on?</label>\n            <mat-form-field>\n              <mat-select placeholder=\"Select a Platform\" [(value)]=\"platform\">\n                <mat-option *ngFor=\"let console of consoles\" [value]=\"console\">\n                  {{ console.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n        </div>\n        <div class='col-xs-12 col-sm-6'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessiondesc\">Give your session a description</label>\n            <div class=\"input-group\">\n              <textarea name=\"sessiondesc\" #sessiondesc = \"ngModel\" id =\"sessiondesc\" class=\"form-control\" [(ngModel)]=\"currentSession.description\"></textarea>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessionslots\">How many slots in your session</label>\n              <input class=\"form-control input-md\" #sessionslots=\"ngModel\"  id=\"sessionslots\" name=\"sessionslots\" type=\"number\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"currentSession.numSlots\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessioncost\">Cost per slot</label>\n              <input class=\"form-control input-md\" #sessioncost=\"ngModel\"  id=\"sessioncost\" name=\"sessioncost\" type=\"number\" placeholder=\"Cost per slot\" [(ngModel)]=\"currentSession.sessionCost\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiondate\">What date</label>\n              <!--<input class=\"form-control input-md\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" type=\"text\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"step3.sessionDate\">-->\n              <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" [(ngModel)]=\"currentSessionDateTime.sessionDate\">\n              <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n              <mat-datepicker #picker></mat-datepicker>\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiontime\">What time</label>\n              <input matInput type=\"time\" placeholder=\"Pick a time\" #sessiontime=\"ngModel\"  id=\"sessiontime\" name=\"sessiontime\" [(ngModel)]=\"currentSessionDateTime.sessionTime\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessionduration\">Select a Duration</label>\n              <input matInput type=\"number\" placeholder=\"Select a duration\" #sessionduration=\"ngModel\"  id=\"sessionduration\" name=\"sessionduration\" [(ngModel)]=\"currentSessionDateTime.sessionDuration\">\n            </div>\n          </div>\n          <div class=\"col-xs-12 col-sm-6\">\n            <button (click)=\"cancelSession()\" class=\"btn btn-lg btn-cancel\" type=\"button\">Cancel Session</button>\n          </div>\n          <br>\n          <br>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!updateSession.valid\" (click)=\"save()\" class=\"btn btn-lg btn-update\" type=\"button\">Update</button>\n    <button (click)=\"cancel()\" class=\"btn btn-lg btn-cancel\" type=\"button\">Cancel</button>\n  </div>\n</form>\n</mat-dialog-content>\n"

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-cancel {\n  background: #FD5A5B;\n  color: #fff; }\n\n.btn-update {\n  background: #293e49;\n  color: #fff; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateSessionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_sessionDateTime__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/sessionDateTime.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_update_session_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_consoles__ = __webpack_require__("../../../../../src/app/constants/consoles.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__userprofile_game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var UpdateSessionComponent = /** @class */ (function () {
    //noinspection JSAnnotator
    function UpdateSessionComponent(updateSessionService, route, data, dialogRef, gameAccountService, userProfileService, sharedFunc) {
        this.updateSessionService = updateSessionService;
        this.route = route;
        this.data = data;
        this.dialogRef = dialogRef;
        this.gameAccountService = gameAccountService;
        this.userProfileService = userProfileService;
        this.sharedFunc = sharedFunc;
        this.title = "Update this session";
        this.currentSession = new __WEBPACK_IMPORTED_MODULE_1__models_session__["a" /* Session */]();
        this.currentSessionDateTime = new __WEBPACK_IMPORTED_MODULE_2__data_sessionDateTime__["a" /* SessionDateTime */]();
        this.gameAccounts = [];
        this.games = __WEBPACK_IMPORTED_MODULE_6__constants_games__["a" /* GAMES */];
        this.consoles = __WEBPACK_IMPORTED_MODULE_7__constants_consoles__["a" /* CONSOLES */];
        this.profile = JSON.parse(localStorage.getItem("profile"));
    }
    UpdateSessionComponent.prototype.ngOnInit = function () {
        this.currentSession = this.updateSessionService.getSessionData();
        this.updateSessionData = this.updateSessionService.getFormData();
    };
    UpdateSessionComponent.prototype.save = function () {
        this.updateSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
        var d = new Date(this.data.sessionTime);
        var currDate = d.toLocaleDateString();
        var currTime = d.toLocaleTimeString("en-Us", { hour12: false, hour: '2-digit', minute: '2-digit' });
        if (this.updateSessionData.sessionDate) {
            var newD = this.updateSessionData.sessionDate;
            currDate = newD.toLocaleDateString();
        }
        if (this.updateSessionData.sessionTime) {
            currTime = this.updateSessionData.sessionTime;
        }
        var date = new Date(currDate);
        var timeMS = this.sharedFunc.timeToMilliseconds(currTime) + date.getTime();
        var data = {
            "id": this.data.sessionId,
            "title": this.updateSessionData.title,
            "description": this.updateSessionData.description,
            "gameId": this.gameId,
            "console": this.platform,
            "numSlots": this.updateSessionData.numSlots,
            "sessionCost": this.updateSessionData.sessionCost,
            "sessionTime": timeMS,
            "sessionDuration": "1:00:00",
            "gameAccountId": this.accountId
        };
        console.log(data);
        this.updateSessionService.updateUserSession(data);
        //noinspection TypeScriptUnresolvedFunction
        this.dialogRef.close();
        window.location.reload();
    };
    UpdateSessionComponent.prototype.cancelSession = function () {
        this.updateSessionService.cancelSession(this.data.sessionId);
    };
    UpdateSessionComponent.prototype.cancel = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialogRef.close();
    };
    UpdateSessionComponent.prototype.getUserGameAccountsByGameId = function (gameId, riftId) {
        var _this = this;
        this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                var currAccount = resBody[i];
                var account = new __WEBPACK_IMPORTED_MODULE_8__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_9__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
                _this.gameAccounts.push(account);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UpdateSessionComponent.prototype, "updateSessionData", void 0);
    UpdateSessionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-update-session',
            template: __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.html"),
            styles: [__webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.scss")]
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__data_update_session_service__["a" /* UpdateSessionService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */], Object, __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatDialogRef */],
            __WEBPACK_IMPORTED_MODULE_10__userprofile_game_account_game_account_service__["a" /* GameAccountService */], __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_12__shared_shared_functions__["a" /* SharedFunctions */]])
    ], UpdateSessionComponent);
    return UpdateSessionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/therift/therift.component.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\n  margin: 0px;\n  padding: 0px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\nh1, h2 {\n  font-weight: 300;\n}\n\nbody {\n  padding: 0px;\n  margin: 0px;\n  font-family: \"Montserrat\", sans-serif;\n  width: 100%;\n  height: 100vh;\n}\n\nheader {\n  width: 100%;\n  height: 100%;\n  padding: 0px;\n  margin: 0px;\n  display: block;\n  background-image: url(" + escape(__webpack_require__("../../../../../src/app/img/rift-welcome.jpg")) + ");\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: absolute;\n}\n\n#text-holder {\n  margin-left: 14%;\n  margin-top: 25vh;\n  display: inline-block;\n  position: relative;\n  animation: fadein 2s;\n  -moz-animation: fadein 2s; /* Firefox */\n  -webkit-animation: fadein 2s; /* Safari and Chrome */\n  -o-animation: fadein 2s; /* Opera */\n}\n\n#gradient {\n  width: 50%;\n  height: 100%;\n  background: -webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));\n  background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));\n  position: absolute;\n}\n\nh1 {\n  font-size: 70px;\n  text-transform: uppercase;\n  letter-spacing: 5px;\n  color: #f7f7f2;\n  font-weight: 300;\n  margin-bottom: 10%;\n}\n\nh2 {\n  font-size: 30px;\n  color: #f7f7f2;\n  font-weight: 300;\n  margin-bottom: 10%;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/therift/therift.component.html":
/***/ (function(module, exports) {

module.exports = "<body id=\"page-top\">\n<!-- Header -->\n<header>\n  <div id=\"gradient\">\n  </div>\n  <div id=\"text-holder\">\n    <h2>Meet. Play. Win.</h2>\n    <h1>The Rift</h1>\n    <app-search-bar style=\"width: 100% !important\"></app-search-bar>\n  </div>\n\n</header>\n</body>\n"

/***/ }),

/***/ "../../../../../src/app/therift/therift.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TheriftComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_twitch_service__ = __webpack_require__("../../../../../src/app/userprofile/twitch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__userprofile_update_info_data_update_info_service__ = __webpack_require__("../../../../../src/app/userprofile/update-info/data/update-info.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userprofile_youtube_service__ = __webpack_require__("../../../../../src/app/userprofile/youtube.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TheriftComponent = /** @class */ (function () {
    function TheriftComponent(auth, router, activatedRoute, twitchService, youtubeService, updateInfoService, userProfileService) {
        var _this = this;
        this.auth = auth;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.twitchService = twitchService;
        this.youtubeService = youtubeService;
        this.updateInfoService = updateInfoService;
        this.userProfileService = userProfileService;
        this.profile = JSON.parse(localStorage.getItem("profile"));
        this.sessionId = localStorage.getItem("sessionId");
        if (this.profile) {
            this.userProfileService.getUserId(this.profile.nickname).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    }
    TheriftComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.activatedRoute.queryParams.subscribe(function (params) {
            var authType = _this.activatedRoute.snapshot.url[0].path;
            if (authType == "twitch") {
                _this.twitchService.getTwitchInfo(params['code']).subscribe(function (resBody) {
                    console.log(JSON.parse(resBody.content).id_token);
                    var jwt = JSON.parse(resBody.content).id_token;
                    _this.twitchService.getTwitchUsername(jwt + ".").subscribe(function (resBody) {
                        var data = {
                            "id": _this.loggedInUserId,
                            "twitchAccount": resBody.username,
                            "riftTag": ""
                        };
                        console.log(data);
                        _this.updateInfoService.updateUser(data);
                    });
                });
            }
            else if (authType == "youtube") {
                console.log("in youtube!");
                var code = params['code'];
                code = code.replace("/", "%252F");
                console.log(code);
                _this.youtubeService.getYouTubeUsername(code).subscribe(function (resBody) {
                    var data = {
                        "id": _this.loggedInUserId,
                        "youtubeAccount": resBody.username,
                        "riftTag": ""
                    };
                    console.log(data);
                    _this.updateInfoService.updateUser(data);
                });
            }
        });
    };
    TheriftComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-therift',
            template: __webpack_require__("../../../../../src/app/therift/therift.component.html"),
            styles: [__webpack_require__("../../../../../src/app/therift/therift.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__userprofile_twitch_service__["a" /* TwitchService */], __WEBPACK_IMPORTED_MODULE_6__userprofile_youtube_service__["a" /* YoutubeService */],
            __WEBPACK_IMPORTED_MODULE_5__userprofile_update_info_data_update_info_service__["a" /* UpdateInfoService */],
            __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], TheriftComponent);
    return TheriftComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/file-a-complaint/data/file-a-complaint-service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileAComplaintService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FileAComplaintService = /** @class */ (function () {
    function FileAComplaintService(http) {
        this.http = http;
    }
    FileAComplaintService.prototype.fileAComplaint = function (submitterId, riftId, data) {
        console.log("Filing a complaint against " + riftId);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put("/api/userComplaint/" + submitterId + "/" + riftId, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* Observable */].throw(error.json().error || 'Serve error'); })
            .subscribe();
        ;
    };
    FileAComplaintService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], FileAComplaintService);
    return FileAComplaintService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.html":
/***/ (function(module, exports) {

module.exports = "<form #fileAComplaintForm=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\">What type of Complaint</label>\n              <mat-form-field>\n                <mat-select placeholder=\"Select a Complaint\" [(value)]=\"complaintType\">\n                  <mat-option *ngFor=\"let type of complaintTypes\" [value]=\"type\">\n                    {{ type }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"complaint\">Leave a complaint</label>\n              <input class=\"form-control input-md\" #complaint=\"ngModel\" [(ngModel)]=\"complaintContent\" required id=\"complaint\" name=\"complaint\" type=\"text\" placeholder=\"Leave a complaint\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!fileAComplaintForm.valid\"  (click)=save() class=\"btn-primary\" type=\"button\">Update</button>\n    <button routerLink=\"../\" class=\"btn-primary\" type=\"button\">Cancel</button>\n  </div>\n</form>\n\n<!--<pre>{{ userRatingData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileAComplaintComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_complaint_type__ = __webpack_require__("../../../../../src/app/constants/complaint-type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_file_a_complaint_service__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/data/file-a-complaint-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var FileAComplaintComponent = /** @class */ (function () {
    function FileAComplaintComponent(complaintService, data) {
        this.complaintService = complaintService;
        this.data = data;
        this.title = "Leave a Complaint";
        this.complaintContent = "";
        this.complaintType = "";
        this.complaintTypes = __WEBPACK_IMPORTED_MODULE_1__constants_complaint_type__["a" /* COMPLAINT_TYPE */];
    }
    FileAComplaintComponent.prototype.ngOnInit = function () {
    };
    FileAComplaintComponent.prototype.save = function () {
        var complaintData = {
            "complaint": this.complaintContent,
            "type": this.complaintType
        };
        console.log(complaintData);
        console.log("Submitter ID: " + this.data.submitterId);
        console.log("Rift ID: " + this.data.riftId);
        // this.fileAComplaint(data);
    };
    FileAComplaintComponent.prototype.fileAComplaint = function (data) {
        this.complaintService.fileAComplaint(this.submitterId, this.riftId, data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], FileAComplaintComponent.prototype, "submitterId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], FileAComplaintComponent.prototype, "riftId", void 0);
    FileAComplaintComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-file-a-complaint',
            template: __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.scss")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_file_a_complaint_service__["a" /* FileAComplaintService */], Object])
    ], FileAComplaintComponent);
    return FileAComplaintComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.html":
/***/ (function(module, exports) {

module.exports = "<form #addGameAccountForm=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\">What game</label>\n              <mat-form-field>\n                <mat-select placeholder=\"Select a Game\" [(value)]=\"gameId\">\n                  <mat-option *ngFor=\"let game of games\" [value]=\"game.id\">\n                    {{ game.name }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"ign\">What is your ign?</label>\n              <input class=\"form-control input-md\" #complaint=\"ngModel\" [(ngModel)]=\"ign\" required id=\"ign\" name=\"ign\" type=\"text\" placeholder=\"In game name\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!addGameAccountForm.valid\"  (click)=save() class=\"btn-primary\" type=\"button\">Update</button>\n    <button routerLink=\"../\" class=\"btn-primary\" type=\"button\">Cancel</button>\n  </div>\n</form>\n\n<!--<pre>{{ userRatingData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddGameAccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AddGameAccountComponent = /** @class */ (function () {
    function AddGameAccountComponent(data, gameAccountService) {
        this.data = data;
        this.gameAccountService = gameAccountService;
        this.title = "Add a Game Account";
        this.games = __WEBPACK_IMPORTED_MODULE_1__constants_games__["a" /* GAMES */];
        this.profile = JSON.parse(localStorage.getItem("profile"));
    }
    AddGameAccountComponent.prototype.ngOnInit = function () {
    };
    AddGameAccountComponent.prototype.addGameAccount = function (data) {
        this.gameAccountService.addGameAccount(data);
    };
    AddGameAccountComponent.prototype.save = function () {
        var data = {
            "gameId": this.gameId,
            "ign": this.ign,
            "usertableId": this.data.loggedInUserId
        };
        console.log(data);
        this.addGameAccount(data);
        window.location.reload();
    };
    AddGameAccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-game-account',
            template: __webpack_require__("../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_3__game_account_service__["a" /* GameAccountService */]])
    ], AddGameAccountComponent);
    return AddGameAccountComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.html":
/***/ (function(module, exports) {

module.exports = "<form #addGameAccountForm=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class=\"row\">\n      Current Game: {{data.account.gameName}}<br>\n      Current IGN: {{data.account.ign}}\n    </div>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"ign\">What is your ign?</label>\n              <input class=\"form-control input-md\" #complaint=\"ngModel\" [(ngModel)]=\"ign\" required id=\"ign\" name=\"ign\" type=\"text\" placeholder=\"In game name\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <button class=\"btn-primary\" type=\"button\" (click)=\"changeStatus(deleteConfirm)\">Delete Account</button>\n        </div>\n        <ng-template #template style=\"margin-top:20%\">\n          <div class=\"modal-body text-center\">\n            <p>The following sessions have your account linked to it.<br>Please change the account associated before proceeding</p>\n            <div class=\"form-group\">\n              <label for=\"account\">Select an Account</label>\n              <select class=\"form-control\" id=\"account\" [(ngModel)]=\"accountId\" [ngModelOptions]=\"{standalone: true}\">\n                <option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">{{account.ign}}</option>\n              </select>\n            </div><br>\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"editSessionsGameAccount()\" >Confirm</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >Cancel</button>\n          </div>\n        </ng-template>\n\n        <ng-template #deleteConfirm style=\"margin-top:20%\">\n          <div class=\"modal-body text-center\">\n            <p>Are you sure you want to delete?</p>\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmDelete(template)\" >Confirm</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >Cancel</button>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!addGameAccountForm.valid\"  (click)=save() class=\"btn-primary\" type=\"button\">Update</button>\n    <button routerLink=\"../\" class=\"btn-primary\" type=\"button\">Cancel</button>\n  </div>\n</form>\n\n<!--<pre>{{ userRatingData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditGameAccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__therift_riftsessions_session_page_update_session_data_update_session_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var EditGameAccountComponent = /** @class */ (function () {
    function EditGameAccountComponent(data, gameAccountService, modalService, http, updateSessionService, userSessionService) {
        this.data = data;
        this.gameAccountService = gameAccountService;
        this.modalService = modalService;
        this.http = http;
        this.updateSessionService = updateSessionService;
        this.userSessionService = userSessionService;
        this.title = "Add a Game Account";
        this.sessionsToUpdate = new Map();
        this.sessionIds = [];
        this.gameAccounts = [];
        this.games = __WEBPACK_IMPORTED_MODULE_1__constants_games__["a" /* GAMES */];
        this.profile = JSON.parse(localStorage.getItem("profile"));
    }
    EditGameAccountComponent.prototype.ngOnInit = function () {
        this.getUserSessionsByGameAccountId(this.data.account.id);
    };
    EditGameAccountComponent.prototype.confirmDelete = function (changeAccounts) {
        var _this = this;
        var status;
        this.gameAccountService.deleteGameAccount(this.data.account.id).subscribe(function (resBody) {
            status = resBody.status;
            if (!status) {
                _this.changeStatus(changeAccounts);
            }
        });
    };
    EditGameAccountComponent.prototype.editGameAccount = function (data) {
        this.gameAccountService.updateGameAccount(data);
    };
    EditGameAccountComponent.prototype.editSessionsGameAccount = function () {
        console.log('in edit session');
        console.log(this.sessionIds);
        for (var i = 0; i < this.sessionIds.length; i++) {
            var currSessionId = this.sessionIds[i];
            var data = {
                "id": currSessionId,
                "gameAccountId": +this.accountId
            };
            this.sessionsToUpdate.set(currSessionId, +this.accountId);
            console.log(data);
        }
        console.log(this.sessionsToUpdate);
        this.deleteAndUpdateGameAccount(this.data.account.id, this.sessionsToUpdate);
    };
    EditGameAccountComponent.prototype.changeStatus = function (template) {
        this.modalRef = this.modalService.show(template);
        this.getUserGameAccountsByGameId(this.data.account.gameId, this.data.riftId);
    };
    EditGameAccountComponent.prototype.save = function () {
        var data = {
            "id": this.data.account.id,
            "ign": this.ign
        };
        console.log(data);
        this.editGameAccount(data);
        window.location.reload();
    };
    EditGameAccountComponent.prototype.getUserSessionsByGameAccountId = function (gameId) {
        var _this = this;
        this.sessionsToUpdate = new Map();
        this.userSessionService.getUserSessionsByGameAccountId(gameId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                _this.sessionIds.push(resBody[i].id);
            }
        });
    };
    EditGameAccountComponent.prototype.getUserGameAccountsByGameId = function (gameId, riftId) {
        var _this = this;
        this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                var currAccount = resBody[i];
                var account = new __WEBPACK_IMPORTED_MODULE_8__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_7__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
                _this.gameAccounts.push(account);
            }
        });
    };
    EditGameAccountComponent.prototype.deleteAndUpdateGameAccount = function (gameAccountId, data) {
        this.gameAccountService.deleteGameAccountAndUpdateSession(gameAccountId, data);
    };
    EditGameAccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-game-account',
            template: __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_3__game_account_service__["a" /* GameAccountService */],
            __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__["c" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_6__therift_riftsessions_session_page_update_session_data_update_session_service__["a" /* UpdateSessionService */],
            __WEBPACK_IMPORTED_MODULE_9__usersessions_usersessions_service__["a" /* UsersessionsService */]])
    ], EditGameAccountComponent);
    return EditGameAccountComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/game-account.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameAccountService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameAccountService = /** @class */ (function () {
    function GameAccountService(http) {
        this.http = http;
        this.addGameAccountURL = "/api/gameaccount/create";
        this.updateGameAccountURL = "/api/gameaccount/update";
    }
    GameAccountService.prototype.addGameAccount = function (data) {
        console.log("Adding game account");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.addGameAccountURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Added game account"); });
    };
    GameAccountService.prototype.deleteGameAccountAndUpdateSession = function (gameAccountId, data) {
        console.log("Deleting game account and updating sessions");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.put("/api/rifterSession/gameAccountId/" + gameAccountId + "/deleteAndUpdate", data, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    GameAccountService.prototype.getUserGameAccounts = function (id) {
        console.log("Getting user's game accounts");
        return this.http.get("/api/gameaccount/usertableId/" + id + "/info")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    GameAccountService.prototype.updateGameAccount = function (data) {
        console.log("Adding game account");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.updateGameAccountURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Added game account"); });
    };
    GameAccountService.prototype.getUserGameAccountsByGameID = function (gameId, riftId) {
        console.log("Getting user's game accounts by game Id");
        return this.http.get("/api/gameaccount/usertableId/" + riftId + "/gameId/" + gameId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    GameAccountService.prototype.deleteGameAccount = function (accountId) {
        console.log("Deleting game account");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.delete("/api/gameaccount/delete/" + accountId, options)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); });
    };
    GameAccountService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], GameAccountService);
    return GameAccountService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/notifications.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_notification__ = __webpack_require__("../../../../../src/app/models/notification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_notification_content__ = __webpack_require__("../../../../../src/app/constants/notification-content.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NotificationsService = /** @class */ (function () {
    function NotificationsService(http, globals) {
        this.http = http;
        this.globals = globals;
        this.allow = true;
    }
    NotificationsService.prototype.pollNotifications = function (riftId, notifications, login) {
        this.startUrl = "/api/matchupdate/begin/";
        this.pollUrl = "/api/matchupdate/deferred";
        this.start(this.startUrl, this.pollUrl, riftId, notifications, login);
    };
    NotificationsService.prototype.start = function (start, poll, riftId, notifications, login) {
        var _this = this;
        this.globals.stopPolling = false;
        if (login) {
            console.log("Starting poll");
        }
        else {
            console.log("Already logged in, not starting");
        }
        this.startUrl = start;
        this.pollUrl = poll;
        this.allow = true;
        this.http.get(this.startUrl + riftId + "/" + login).subscribe(function (success) {
            var sessionId = JSON.parse(success["_body"]).result;
            localStorage.setItem("sessionId", sessionId);
            console.log("Game on...");
            if (_this.allow) {
                console.log("in if statemnet");
                _this.allow = false;
                setInterval(_this.getUpdate(notifications, sessionId), 6000);
            }
        }, function (error) {
            console.log("error");
        });
    };
    NotificationsService.prototype.getUpdate = function (notifications, sessionId) {
        var _this = this;
        console.log("Okay let's go...");
        this.http.get(this.pollUrl + "/" + sessionId).subscribe(function (success) {
            console.log("Stop polling: " + _this.globals.stopPolling);
            console.log("Received a new notification");
            console.log(success);
            console.log(JSON.parse(success["_body"]).data);
            var data = JSON.parse(success["_body"]).data;
            var notification = getNotification(data);
            notifications.unshift(notification);
            _this.globals.unseenNotifications += 1;
            if (!_this.globals.stopPolling) {
                setInterval(_this.getUpdate(notifications, sessionId), 6000);
            }
        }, function (error) {
            console.log("error, trying again");
            if (!_this.globals.stopPolling) {
                setInterval(_this.getUpdate(notifications, sessionId), 6000);
            }
        });
        function getNotification(notification) {
            var currNotification = new __WEBPACK_IMPORTED_MODULE_3__models_notification__["a" /* Notification */]();
            currNotification.notificationContent = __WEBPACK_IMPORTED_MODULE_4__constants_notification_content__["a" /* NOTIFICATION_CONTENT */].get(notification.notification_type);
            currNotification.creatorId = notification.creator_id;
            currNotification.userId = notification.user_id;
            currNotification.createdTime = notification.created_time;
            currNotification.notificationType = notification.notification_type;
            currNotification.seen = notification.seen;
            return currNotification;
        }
    };
    NotificationsService.prototype.stopPolling = function (riftId) {
        this.globals.stopPolling = true;
        this.http.get("/api/stop/" + riftId + "/" + localStorage.getItem("sessionId")).subscribe(function (success) {
            console.log("Stopped polling");
            console.log(success);
        }, function (error) {
            console.log(error);
        });
    };
    NotificationsService.prototype.clearUnseen = function (riftId) {
        this.http.get("/api/notifications/" + riftId + "/clearUnseen").subscribe(function (success) {
            console.log("Clearing unseen");
        }, function (error) {
            console.log("Error when stopping polling");
        });
    };
    NotificationsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__global_globals__["a" /* Globals */]])
    ], NotificationsService);
    return NotificationsService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Custom Stripe Form</h1>\n<h3>{{data.accountId}}</h3>\n<form action=\"\" method=\"POST\" id=\"payment-form\" (submit)=\"getToken()\">\n  <span class=\"payment-message\">{{message}}</span>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Country</span>\n      <input [(ngModel)]=\"country\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Currency</span>\n      <input [(ngModel)]=\"currency\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Routing Number</span>\n      <input [(ngModel)]=\"routing_number\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Account Number</span>\n      <input [(ngModel)]=\"account_number\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Account Holder Name</span>\n      <input [(ngModel)]=\"account_holder_name\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Account Holder Type</span>\n      <input [(ngModel)]=\"account_holder_type\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <input type=\"submit\" value=\"Submit Payment\">\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddBankAccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var AddBankAccountComponent = /** @class */ (function () {
    function AddBankAccountComponent(_zone, data, stripeService) {
        this._zone = _zone;
        this.data = data;
        this.stripeService = stripeService;
    }
    AddBankAccountComponent.prototype.ngOnInit = function () {
    };
    AddBankAccountComponent.prototype.getToken = function () {
        var _this = this;
        this.message = 'Loading...';
        window.Stripe.bankAccount.createToken({
            country: this.country,
            currency: this.currency,
            routing_number: this.routing_number,
            account_number: this.account_number,
            account_holder_name: this.account_holder_name,
            account_holder_type: this.account_holder_type
        }, function (status, response) {
            // Wrapping inside the Angular zone
            _this._zone.run(function () {
                if (status === 200) {
                    _this.message = "Success! Bank Account token " + response.id + ".";
                    var data = {
                        "accountId": _this.data.accountId,
                        "bankAccountToken": response.id
                    };
                    console.log(data);
                    _this.stripeService.storeMerchantBankAccount(data, _this.data.riftId);
                }
                else {
                    _this.message = response.error.message;
                }
            });
        });
        console.log("hello got token");
    };
    AddBankAccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-bank-account',
            template: __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.scss")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], Object, __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__["a" /* StripePaymentService */]])
    ], AddBankAccountComponent);
    return AddBankAccountComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Custom Stripe Form</h1>\n\n<form action=\"\" method=\"POST\" id=\"payment-form\" (submit)=\"getToken()\">\n  <span class=\"payment-message\">{{message}}</span>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Country</span>\n      <input [(ngModel)]=\"country\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>City</span>\n      <input [(ngModel)]=\"city\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Address Line 1</span>\n      <input [(ngModel)]=\"addressLine1\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Address Line 2</span>\n      <input [(ngModel)]=\"addressLine2\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Postal Code</span>\n      <input [(ngModel)]=\"zipCode\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Postal State</span>\n      <input [(ngModel)]=\"state\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Date of Birth</span>\n      <input [(ngModel)]=\"dobDay\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Month of Birth</span>\n      <input [(ngModel)]=\"dobMonth\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Year of Birth</span>\n      <input [(ngModel)]=\"dobYear\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>First Name</span>\n      <input [(ngModel)]=\"firstName\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Last Name</span>\n      <input [(ngModel)]=\"lastName\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Legal Entity Type</span>\n      <input [(ngModel)]=\"type\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <input type=\"submit\" value=\"Submit Payment\">\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LegalBankAccountInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_bank_account_add_bank_account_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/add-bank-account/add-bank-account.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var LegalBankAccountInfoComponent = /** @class */ (function () {
    function LegalBankAccountInfoComponent(data, stripeService, userProfileService, dialog) {
        this.data = data;
        this.stripeService = stripeService;
        this.userProfileService = userProfileService;
        this.dialog = dialog;
        this.profile = JSON.parse(localStorage.getItem("profile"));
    }
    LegalBankAccountInfoComponent.prototype.ngOnInit = function () {
        console.log(this.profile.nickname);
        console.log(this.data.riftId);
    };
    LegalBankAccountInfoComponent.prototype.getToken = function () {
        var _this = this;
        if (this.addressLine2 == "") {
            this.addressLine2 = null;
        }
        var data = {
            "country": this.country,
            "city": this.city,
            "addressLine1": this.addressLine1,
            "addressLine2": this.addressLine2,
            "zipCode": this.zipCode,
            "state": this.state,
            "dobDay": this.dobDay,
            "dobMonth": this.dobMonth,
            "dobYear": this.dobYear,
            "firstName": this.firstName,
            "lastName": this.lastName,
            "type": this.type
        };
        this.stripeService.getAccountId(data, this.data.riftId).subscribe(function (resBody) {
            var accountId = resBody.accountId;
            console.log(accountId);
            _this.dialog.open(__WEBPACK_IMPORTED_MODULE_4__add_bank_account_add_bank_account_component__["a" /* AddBankAccountComponent */], {
                height: '450px',
                width: '600px',
                data: {
                    "accountId": accountId,
                    "riftId": _this.data.riftId
                }
            });
        });
    };
    LegalBankAccountInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-legal-bank-account-info',
            template: __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__["a" /* StripePaymentService */],
            __WEBPACK_IMPORTED_MODULE_3__userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatDialog */]])
    ], LegalBankAccountInfoComponent);
    return LegalBankAccountInfoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>Add a Credit Card</h1>\n<h3>Customer ID: {{data.customerId}}</h3>\n<form action=\"\" method=\"POST\" id=\"payment-form\" (submit)=\"getToken()\">\n  <span class=\"payment-message\">{{message}}</span>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Card Number</span>\n      <input [(ngModel)]=\"cardNumber\" name=\"card-number\" type=\"text\" size=\"20\" data-stripe=\"number\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>Expiration (MM/YY)</span>\n      <input [(ngModel)]=\"expiryMonth\" name=\"expiry-month\" type=\"text\" size=\"2\" data-stripe=\"exp_month\">\n    </label>\n    <span> / </span>\n    <input [(ngModel)]=\"expiryYear\" name=\"expiry-year\" type=\"text\" size=\"2\" data-stripe=\"exp_year\">\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      <span>CVC</span>\n      <input [(ngModel)]=\"cvc\" name=\"cvc\" type=\"text\" size=\"4\" data-stripe=\"cvc\">\n    </label>\n  </div>\n\n  <div class=\"form-row\">\n    <label>\n      Set as Default Credit Card?\n    </label>\n    <input type=\"checkbox\" (change)=\"setDefault()\">\n  </div>\n\n  <input type=\"submit\" value=\"Submit Payment\">\n</form>\n\n<button class=\"btn btn-primary\" (click)=\"viewCards()\"> View Cards </button>\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StripePaymentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view_cards_view_cards_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var StripePaymentComponent = /** @class */ (function () {
    function StripePaymentComponent(_zone, data, stripeService, dialog) {
        this._zone = _zone;
        this.data = data;
        this.stripeService = stripeService;
        this.dialog = dialog;
        this.isDefault = false;
    }
    StripePaymentComponent.prototype.ngOnInit = function () {
    };
    StripePaymentComponent.prototype.getToken = function () {
        var _this = this;
        this.message = 'Loading...';
        window.Stripe.card.createToken({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        }, function (status, response) {
            // Wrapping inside the Angular zone
            _this._zone.run(function () {
                if (status === 200) {
                    _this.message = "Success! Card token " + response.card.id + ".";
                    console.log(response);
                    var data = {
                        "customerId": _this.data.customerId,
                        // "token": "tok_visa"
                        "token": response.id
                    };
                    console.log(data);
                    _this.stripeService.storeCustomerCard(data, _this.isDefault);
                }
                else {
                    _this.message = response.error.message;
                }
            });
        });
        console.log("hello got token");
    };
    StripePaymentComponent.prototype.viewCards = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__view_cards_view_cards_component__["a" /* ViewCardsComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "customerId": this.data.customerId
            }
        });
    };
    StripePaymentComponent.prototype.setDefault = function () {
        this.isDefault = !this.isDefault;
        console.log(this.isDefault);
    };
    StripePaymentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-stripe-payment',
            template: __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.scss")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], Object, __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__["a" /* StripePaymentService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatDialog */]])
    ], StripePaymentComponent);
    return StripePaymentComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StripePaymentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StripePaymentService = /** @class */ (function () {
    function StripePaymentService(http) {
        this.http = http;
        this.storeCustomerCardURL = "/api/stripe/storeCustomerCard/setDefault=";
    }
    StripePaymentService.prototype.storeCustomerCard = function (data, isDefault) {
        console.log("storing customer credit card");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.storeCustomerCardURL + isDefault, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Stored credit card"); });
    };
    StripePaymentService.prototype.getAccountId = function (data, id) {
        console.log("getting account token");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.put("/api/stripe/user/" + id + "/getMerchantAccountToken", data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); });
    };
    StripePaymentService.prototype.storeMerchantBankAccount = function (data, id) {
        console.log("storing merchant bank account");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put("/api/stripe/user/" + id + "/storeMerchantBankAccount", data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Stored bank account"); });
    };
    StripePaymentService.prototype.getCustomerDefaultCard = function (accountId) {
        return this.http.get("/api/stripe/getDefaultCard/" + accountId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    StripePaymentService.prototype.getAllCustomerCards = function (accountId) {
        return this.http.get("/api/stripe/getCustomerCards/" + accountId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    StripePaymentService.prototype.setCardAsDefault = function (cardId, customerId) {
        console.log("Changing card to default card");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put("/api/stripe/setDefaultCard/" + cardId + "/cardOwner/" + customerId, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Set new default card"); });
    };
    StripePaymentService.prototype.deleteCustomerCreditCard = function (cardId, customerId) {
        console.log("Deleting credit card for customer");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.delete("/api/stripe/deleteCard/" + cardId + "/customer/" + customerId, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Deleted customer credit card"); });
    };
    StripePaymentService.prototype.createTransaction = function (data, customerId, accountId) {
        console.log("Creating transaction");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put("/api/stripe/createTransaction/bankAccount/" + accountId + "/customerId/" + customerId, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("Transaction completed"); });
    };
    StripePaymentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], StripePaymentService);
    return StripePaymentService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" id=\"tourpackages-carousel\">\n  <div class=\"row\">\n    <div *ngFor=\"let card of creditCards\">\n      <app-credit-card [creditCard]=\"card\" [customerId]=\"data.customerId\"></app-credit-card>\n    </div>\n\n  </div>\n</div><!-- End container -->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewCardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_credit_card__ = __webpack_require__("../../../../../src/app/models/credit-card.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ViewCardsComponent = /** @class */ (function () {
    function ViewCardsComponent(data, stripeService) {
        this.data = data;
        this.stripeService = stripeService;
        this.creditCards = [];
    }
    ViewCardsComponent.prototype.ngOnInit = function () {
        this.getAllCustomerCards();
        this.getDefaultCustomerCard();
    };
    ViewCardsComponent.prototype.getAllCustomerCards = function () {
        var _this = this;
        this.stripeService.getAllCustomerCards(this.data.customerId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                var currentCard = new __WEBPACK_IMPORTED_MODULE_3__models_credit_card__["a" /* CreditCard */]();
                currentCard.id = resBody[i].id;
                currentCard.brand = resBody[i].brand;
                currentCard.country = resBody[i].country;
                currentCard.expMonth = resBody[i].expMonth;
                currentCard.expYear = resBody[i].expYear;
                currentCard.last4 = resBody[i].last4;
                _this.creditCards.push(currentCard);
            }
            console.log(_this.creditCards);
        });
    };
    ViewCardsComponent.prototype.getDefaultCustomerCard = function () {
        this.stripeService.getCustomerDefaultCard(this.data.customerId).subscribe(function (resBody) {
            console.log("Default credit card");
            console.log(resBody);
        });
    };
    ViewCardsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-view-cards',
            template: __webpack_require__("../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/stripe-payment/view-cards/view-cards.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_2__stripe_payment_service__["a" /* StripePaymentService */]])
    ], ViewCardsComponent);
    return ViewCardsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/twitch.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TwitchService = /** @class */ (function () {
    function TwitchService(http) {
        this.http = http;
    }
    TwitchService.prototype.getTwitchInfo = function (code) {
        return this.http.get("/api/verifyTwitch/" + code)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    TwitchService.prototype.getTwitchUsername = function (jwt) {
        return this.http.get("/api/decode/" + jwt)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    TwitchService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]])
    ], TwitchService);
    return TwitchService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/data/update-info-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateInfoData; });
var UpdateInfoData = /** @class */ (function () {
    function UpdateInfoData() {
        this.riftTag = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.bio = "";
    }
    return UpdateInfoData;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/data/update-info.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateInfoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__update_info_model__ = __webpack_require__("../../../../../src/app/userprofile/update-info/data/update-info-model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateInfoService = /** @class */ (function () {
    function UpdateInfoService(http) {
        this.http = http;
        this.updateUserURL = "/api/user/updateUser";
        this.updateUserAuth0 = "/api/user/updateAuth";
        this.updateInfoData = new __WEBPACK_IMPORTED_MODULE_1__update_info_model__["a" /* UpdateInfoData */]();
        this.isValid = false;
    }
    UpdateInfoService.prototype.getUserData = function () {
        var user = new __WEBPACK_IMPORTED_MODULE_2__models_userprofile__["a" /* Userprofile */]();
        user.riftTag = this.updateInfoData.riftTag;
        user.firstName = this.updateInfoData.firstName;
        user.lastName = this.updateInfoData.lastName;
        user.email = this.updateInfoData.email;
        user.bio = this.updateInfoData.bio;
        return user;
    };
    UpdateInfoService.prototype.setUserData = function (data) {
        this.isValid = true;
        this.updateInfoData.riftTag = data.riftTag;
        this.updateInfoData.lastName = data.lastName;
        this.updateInfoData.firstName = data.firstName;
        this.updateInfoData.email = data.email;
        this.updateInfoData.bio = data.bio;
    };
    UpdateInfoService.prototype.getFormData = function () {
        return this.updateInfoData;
    };
    UpdateInfoService.prototype.updateUser = function (data) {
        console.log("running updateUser");
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["Headers"]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.updateUserURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UpdateInfoService.prototype.updateAuth0User = function (auth0data, auth0Id) {
        var header = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["Headers"]();
        var token = localStorage.getItem("access_token");
        console.log("access token: " + token);
        var auth = 'Bearer ' + token;
        header.append("Authorization", auth);
        header.append("FirstName", auth0data["firstName"]);
        header.append("LastName", auth0data["lastName"]);
        header.append("Email", auth0data["email"]);
        header.append("Username", auth0data["userName"]);
        header.append("Auth0Id", auth0Id);
        // this.getUserInfoAuth0(auth0Id);
        this.http.patch(this.updateUserAuth0, auth0data, { headers: header })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UpdateInfoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"]])
    ], UpdateInfoService);
    return UpdateInfoService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/update-info.component.html":
/***/ (function(module, exports) {

module.exports = "<form #updateInfo=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"riftTag\">Update your Rift Tag</label>\n              <input class=\"form-control input-md\" #riftTag=\"ngModel\" id=\"riftTag\" name=\"riftTag\" type=\"text\" placeholder=\"Change your Rift Tag\" [(ngModel)]=\"currentUser.riftTag\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"firstName\">Update your First Name</label>\n              <input class=\"form-control input-md\" #firstName=\"ngModel\" id=\"firstName\" name=\"firstName\" type=\"text\" placeholder=\"Change your first name\" [(ngModel)]=\"currentUser.firstName\">\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"lastName\">Update your Last name</label>\n          <input class=\"form-control input-md\" #lastName=\"ngModel\" id=\"lastName\" name=\"lastName\" type=\"text\" placeholder=\"Change your last name\" [(ngModel)]=\"currentUser.lastName\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"email\">Update your Email</label>\n          <input class=\"form-control input-md\" #email=\"ngModel\" id=\"email\" name=\"email\" type=\"text\" placeholder=\"Change your email\" [(ngModel)]=\"currentUser.email\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"email\">Update your Bio</label>\n          <input class=\"form-control input-md\" #email=\"ngModel\" id=\"bio\" name=\"bio\" type=\"text\" placeholder=\"Change your bio\" [(ngModel)]=\"currentUser.bio\">\n        </div>\n        <div class=\"form-group\">\n          <!--<app-file-upload name=\"profilePic\"ngDefaultControl [showFileNameInput]=\"true\" allowedTypes=\"image/*\" [uploadButtonText]=\"'Upload File'\" [(ngModel)]=\"profilePic\"></app-file-upload>-->\n          <app-file-upload [(ngModel)]=\"profilePic\"></app-file-upload>\n          <img src={{profilePic}} alt=\"\" class=\"profilePicPreview\"/>\n        </div>\n        <div class=\"form-group\">\n          <!--<app-file-upload name=\"coverPhoto\"ngDefaultControl [showFileNameInput]=\"true\" allowedTypes=\"image/*\" [uploadButtonText]=\"'Upload File'\" [(ngModel)]=\"coverPhoto\"></app-file-upload>-->\n          <img src={{coverPhoto}} alt=\"\" class=\"profilePicPreview\"/>\n        </div>\n        <div *ngIf=\"!data.currentUser.twitchAccount\">\n          <button (click)=\"verifyWithTwitch()\" type=\"button\" class=\"btn-primary\">Verify With Twitch</button>\n        </div><br>\n        <div *ngIf=\"!data.currentUser.youtubeAccount\">\n          <button (click)=\"verifyWithYouTube()\" type=\"button\" class=\"btn-primary\">Verify With YouTube</button>\n        </div><br>\n        <div>\n          <button (click)=\"addGameAccount()\" type=\"button\" class=\"btn-primary\">Add a Game Account</button>\n        </div><br>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!updateInfo.valid\" (click)=\"save()\" class=\"btn-primary\" type=\"button\">Update</button>\n    <button (click)=\"cancel()\" class=\"btn-primary\" type=\"button\">Cancel</button>\n\n  </div>\n</form>\n\n<!--<pre>{{ updateInfoData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/update-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".profilePicPreview {\n  max-height: 60px;\n  max-width: 60px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/update-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_update_info_service__ = __webpack_require__("../../../../../src/app/userprofile/update-info/data/update-info.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_account_add_game_account_add_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var UpdateInfoComponent = /** @class */ (function () {
    //noinspection JSAnnotator
    function UpdateInfoComponent(updateInfoService, userProfileService, dialogRef, data, dialog) {
        this.updateInfoService = updateInfoService;
        this.userProfileService = userProfileService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
        this.title = "Update your Profile Information";
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    UpdateInfoComponent.prototype.ngOnInit = function () {
        this.currentUser = this.updateInfoService.getUserData();
        this.updateInfoData = this.updateInfoService.getFormData();
        console.log("Current user info loaded to Update Profile");
    };
    UpdateInfoComponent.prototype.uploadProfilePic = function () {
        var base64 = this.profilePic;
        var riftTag = this.data.loggedInUser.riftTag;
        this.userProfileService.uploadProfilePicture(riftTag, base64);
    };
    UpdateInfoComponent.prototype.uploadCoverPhoto = function () {
        var base64 = this.profilePic;
        var riftTag = this.data.loggedInUser.riftTag;
        this.userProfileService.uploadCoverPhoto(riftTag, base64);
    };
    UpdateInfoComponent.prototype.save = function () {
        this.updateInfoService.setUserData(this.currentUser);
        var data = {
            "firstName": this.updateInfoData.firstName,
            "lastName": this.updateInfoData.lastName,
            "riftTag": this.updateInfoData.riftTag,
            "id": this.data.loggedInUser.id,
            "bio": this.updateInfoData.bio,
            "email": this.updateInfoData.email
        };
        var auth0data = {
            'firstName': this.updateInfoData.firstName,
            'lastName': this.updateInfoData.lastName,
            'riftTag': this.updateInfoData.riftTag,
            'email': this.updateInfoData.email
        };
        this.updateInfoService.updateUser(data);
        this.updateInfoService.updateAuth0User(auth0data, this.profile.sub);
        if (this.profilePic) {
            this.uploadProfilePic();
        }
        if (this.coverPhoto) {
            this.uploadCoverPhoto();
        }
        window.location.reload();
    };
    UpdateInfoComponent.prototype.verifyWithTwitch = function () {
        window.location.href = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code' +
            '&client_id=aoxhv1qbec0v2fqalc68euxkn4c66e' +
            '&redirect_uri=http://localhost:4200/twitch' +
            '&scope=openid';
    };
    UpdateInfoComponent.prototype.verifyWithYouTube = function () {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly' +
            '&access_type=offline' +
            '&include_granted_scopes=true' +
            '&redirect_uri=https://localhost:4200/youtube' +
            '&response_type=code&client_id=196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com';
    };
    UpdateInfoComponent.prototype.addGameAccount = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "loggedInUserId": this.data.loggedInUser.id
            }
        });
    };
    UpdateInfoComponent.prototype.cancel = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialogRef.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UpdateInfoComponent.prototype, "updateInfoData", void 0);
    UpdateInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-update-info',
            template: __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.scss")]
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_update_info_service__["a" /* UpdateInfoService */], __WEBPACK_IMPORTED_MODULE_3__userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatDialogRef */], Object, __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatDialog */]])
    ], UpdateInfoComponent);
    return UpdateInfoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/user-rating/data/user-rating-data-model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRatingData; });
var UserRatingData = /** @class */ (function () {
    function UserRatingData() {
        this.review = "";
        this.account_type = true;
    }
    return UserRatingData;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/user-rating/data/user-rating.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRatingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_userrating__ = __webpack_require__("../../../../../src/app/models/userrating.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_rating_data_model__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/data/user-rating-data-model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserRatingService = /** @class */ (function () {
    function UserRatingService(http) {
        this.http = http;
        this.userRatingData = new __WEBPACK_IMPORTED_MODULE_4__user_rating_data_model__["a" /* UserRatingData */]();
        this.isValid = false;
        this.createUserRatingURL = "/api/rating/createRating";
        this.getUserRatingURL = "/api/rating/userRatings/";
    }
    UserRatingService.prototype.getUserRatingData = function () {
        var rating = new __WEBPACK_IMPORTED_MODULE_3__models_userrating__["a" /* UserRating */]();
        rating.rating = this.userRatingData.rating;
        rating.review = this.userRatingData.review;
        rating.account_type = this.userRatingData.account_type;
        rating.reviewTitle = this.userRatingData.reviewTitle;
        return rating;
    };
    UserRatingService.prototype.setUserRatingData = function (data) {
        this.isValid = true;
        this.userRatingData.rating = data.rating;
        this.userRatingData.review = data.review;
        this.userRatingData.account_type = data.account_type;
        this.userRatingData.reviewTitle = data.reviewTitle;
    };
    UserRatingService.prototype.createUserRating = function (data) {
        console.log("running createUserRating");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.createUserRatingURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
        window.location.reload();
    };
    UserRatingService.prototype.isAllowedToRate = function (raterId, rateeId) {
        console.log("running isAllowedToRate");
        return this.http.get("/api/rating/" + rateeId + "/allowedToRate/" + raterId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserRatingService.prototype.getUserRating = function (id) {
        // console.log("running getUserRating");
        return this.http.get(this.getUserRatingURL + id)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserRatingService.prototype.getFormData = function () {
        return this.userRatingData;
    };
    UserRatingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], UserRatingService);
    return UserRatingService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/user-rating/user-rating.component.html":
/***/ (function(module, exports) {

module.exports = "<form #userRatingForm=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-md-12 col-md-6\\'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"rating\">Rate this User</label>\n              <!--<input class=\"form-control input-md\" #rating=\"ngModel\" required id=\"rating\" name=\"rating\" type=\"number\" placeholder=\"Rate this user\" [(ngModel)]=\"currentUserRating.rating\">-->\n              <mat-slider style=\"width: 50%;\" required id=\"rating\" min=\"1\" max=\"5\" step=\"0.5\" tickInterval=\"1\" name=\"rating\" [(ngModel)]=\"currentUserRating.rating\"></mat-slider>{{currentUserRating.rating}}\n              <!--<app-rating required id=\"rating\" [rating]=\"currentUserRating.rating\" [readonly]=\"false\"></app-rating>{{currentUserRating.rating}}-->\n\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"reviewtitle\">Review title</label>\n              <input class=\"form-control input-md\" #review=\"ngModel\" required id=\"reviewtitle\" name=\"reviewtitle\" type=\"text\" placeholder=\"Review title\" [(ngModel)]=\"currentUserRating.reviewTitle\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"review\">Leave a review</label>\n              <input class=\"form-control input-md\" #review=\"ngModel\" required id=\"review\" name=\"review\" type=\"text\" placeholder=\"Leave a review\" [(ngModel)]=\"currentUserRating.review\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label for=\"exampleFormControlSelect1\">What type of rating?</label>\n              <select required class=\"form-control\" id=\"exampleFormControlSelect1\" name=\"type\" [(ngModel)]=\"account_type_str\">\n                <option value=\"\" selected disabled>None</option>\n                <option value=\"true\">Rifter Rating</option>\n                <option value=\"false\">Riftee Rating</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!userRatingForm.valid\" (click)=\"save()\" class=\"btn-primary\" type=\"button\">Update</button>\n    <button routerLink=\"../\" class=\"btn-primary\" type=\"button\">Cancel</button>\n  </div>\n</form>\n\n<pre>{{ userRatingData | json }}</pre>\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/user-rating/user-rating.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/user-rating/user-rating.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRatingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userrating__ = __webpack_require__("../../../../../src/app/models/userrating.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_user_rating_service__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/data/user-rating.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var UserRatingComponent = /** @class */ (function () {
    function UserRatingComponent(userRatingService, userProfileService, route, data) {
        this.userRatingService = userRatingService;
        this.userProfileService = userProfileService;
        this.route = route;
        this.data = data;
        this.title = "Rate this User";
        this.currentUserRating = new __WEBPACK_IMPORTED_MODULE_1__models_userrating__["a" /* UserRating */]();
        this.ratedUserRiftTag = data.ratedUserRiftTag;
        this.ratedUserId = data.rateeId;
        this.loggedInUserId = data.raterId;
    }
    UserRatingComponent_1 = UserRatingComponent;
    UserRatingComponent.prototype.ngOnInit = function () {
        this.currentUserRating = this.userRatingService.getUserRatingData();
        this.userRatingData = this.userRatingService.getFormData();
    };
    UserRatingComponent.prototype.save = function () {
        this.userRatingService.setUserRatingData(this.currentUserRating);
        this.account_type = this.account_type_str == "true";
        var data = {
            "rating": this.userRatingData.rating,
            "review": this.userRatingData.review,
            "createdTime": UserRatingComponent_1.getCurrentTimeMS(),
            "riftId": this.ratedUserId,
            // "reviewerId" : JSON.parse(localStorage.getItem("loggedInUserID")),
            "reviewerId": this.loggedInUserId,
            "accountType": this.account_type,
            "reviewTitle": this.userRatingData.reviewTitle
        };
        console.log(data);
        this.userRatingService.createUserRating(data);
    };
    // getUserId(riftTag: string) {
    //   this.userProfileService.getUserId(riftTag).subscribe(
    //     resBody => {
    //       this.ratedUserId = resBody.id;
    //     }
    //   );
    //   this.userProfileService.getUserId(this.profile.nickname).subscribe(
    //     resBody => {
    //       this.loggedInUserId = resBody.id;
    //     }
    //   )
    // }
    UserRatingComponent.getCurrentTimeMS = function () {
        var currentDate = new Date();
        return currentDate.getTime();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UserRatingComponent.prototype, "userRatingData", void 0);
    UserRatingComponent = UserRatingComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-rating',
            template: __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.scss")]
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_user_rating_service__["a" /* UserRatingService */], __WEBPACK_IMPORTED_MODULE_3__userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */], Object])
    ], UserRatingComponent);
    return UserRatingComponent;
    var UserRatingComponent_1;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/userprofile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"utf-8\";\n/* CSS Document */\n* {\n  border: 0px red solid;\n}\na {\n  cursor: pointer;\n  text-decoration: none;\n}\nbody {\n  background-color: #1B2531;\n  color: #F7F7F2;\n  font-family: \"Montserrat\", sans-serif;\n}\n#profile-header {\n  margin: 0px auto;\n  width: 840px;\n\n}\n#profile-header #overview {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  background-color: #2E3E4F;\n  border: 1px #18202A solid;\n\n}\n#profile-header #overview .headshot {\n  margin: 42px 15px 35px 40px;\n  display: inline-block;\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0;\n\n}\n#profile-header #overview #basic-details{\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1;\n  margin-top: 52px;\n}\n#profile-header #overview #user-stats {\n  -webkit-box-ordinal-group: 3;\n      -ms-flex-order: 2;\n          order: 2;\n  display: inline-block;\n  -ms-flex-item-align: center;\n      -ms-grid-row-align: center;\n      align-self: center;\n  padding: 0px 20px;\n  margin-left: 30px;\n}\n.stat-item {\n  display: inline-block;\n  margin: 0px 10px;\n  width: 70px;\n  height: auto;\n}\n.stat-item .stat {\n  font-size: 35px;\n  color: #F6511D;\n  text-align: center;\n  width: 100%;\n  display: inline-block;\n\n}\n.stat-item label {\n  font-size: 13px;\n  text-align: center;\n  position: relative;\n  top: -7px;\n  width: 100%;\n  display: inline-block;\n}\n.name {\n  font-size: 27px;\n  margin-right: 10px;\n}\n.username {\n  font-size: 17px;\n  font-weight: 500;\n  opacity: 0.7;\n}\n.headshot {\n  width: 106px;\n  height: 106px;\n  border-radius: 53px;\n  background-size: contain;\n}\n.following-btn {\n  padding: 5px;\n  color: #F7F7F2;\n  font-weight: 500;\n  display: inline-block;\n  background-color: #1DA1F2;\n  margin: 0px 5px;\n  zoom: 0.8;\n  -webkit-transform: translateY(-3px);\n          transform: translateY(-3px);\n}\n#profile-header #tabs {\n  width: 100%;\n  height: 45px;\n  background-color: #22303F;\n  border: 1px #18202A solid;\n  border-top: 0px black solid;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.tab {\n  display: block;\n  text-transform: uppercase;\n  width: 210px;\n  height: 45px;\n  text-align: center;\n  line-height: 45px;\n  vertical-align: middle;\n  cursor: pointer;\n}\n.tab-active {\n  /**outline: 5px #1DA1F2 solid;\n  outline-offset: -5px;*/\n  -webkit-box-shadow: inset 0px -5px 0px 0px #1DA1F2;\n          box-shadow: inset 0px -5px 0px 0px #1DA1F2;\n}\n.section {\n  margin-top: 20px;\n  background-color: transparent;\n  width: 840px;\n  border: 0px #18202A solid;\n  overflow: hidden;\n\n}\n#info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: #2E3E4F;\n}\n.sidemenu {\n  width: 240px;\n  background-color: #22303F;\n  border-right: 1px #18202A solid;\n  padding: 17px 0px;\n  -webkit-box-ordinal-group: 1;\n      -ms-flex-order: 0;\n          order: 0;\n}\n.sidemenu a {\n  display: block;\n  padding: 5px 25px;\n  cursor: pointer;\n  margin: 15px 0px;\n\n}\n.menu-active {\n  font-weight: 600;\n\n}\n.content-card {\n  padding: 33px;\n  width: 533px;\n  display: inline-block;\n  -webkit-box-ordinal-group: 2;\n      -ms-flex-order: 1;\n          order: 1;\n}\n.segment {\n  padding: 0px 0px 35px 0px;\n\n}\n.segment .title {\n  text-transform: uppercase;\n  font-size: 17px;\n  display: block;\n  margin-bottom: 12px;\n  font-weight: 500;\n}\n.segment p {\n  font-size:15px;\n  opacity: 0.8;\n  margin: 0px 0px;\n  line-height: 20px;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 15px;\n}\ntable td {\n  border-top: 0.2px rgba(255,255,255, 0.2) solid;\n  border-bottom: 0.2px rgba(255,255,255, 0.2) solid;\n  padding: 9px 6px;\n}\ntable td:first-child {\n  font-weight: 300;\n}\ntable td:nth-child(2) {\n  font-weight:500;\n}\n.hide {\n  display: none;\n}\n.text-fadein {\n  animation: fadein 0.25s;\n  -moz-animation: fadein 0.25s; /* Firefox */\n  -webkit-animation: fadein 0.25s; /* Safari and Chrome */\n  -o-animation: fadein 0.25s; /* Opera */\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/userprofile.component.html":
/***/ (function(module, exports) {

module.exports = "\n<!--<div class=\"container\" style=\"width: 80%\" *ngIf=\"isDataAvailable\">-->\n  <!--<base href=\"/\">-->\n  <!--<div class=\"user-profile\">-->\n    <!--<div class=\"row\">-->\n      <!--<div class=\"profile-header-background\"><img src=\"{{currentUser.coverPhoto}}\" alt=\"Profile Header Background\"></div>-->\n      <!--<div class=\"col-md-4\">-->\n        <!--<div class=\"profile-info-left\">-->\n          <!--<div class=\"text-center\">-->\n            <!--<div id=\"profile-pic\">-->\n              <!--<img src=\"{{currentUser.profilePic}}\" class=\"avatar img-circle\" alt=\"\">-->\n            <!--</div>-->\n            <!--<h3>{{currentUser.firstName | capitalize}} {{currentUser.lastName | capitalize}} </h3>-->\n            <!--<h3>@{{currentUser.riftTag}}</h3>-->\n            <!--<h3>{{currentUser.email}}</h3>-->\n            <!--<app-rating [rating]=\"currentUser.rifterRating\" [readonly]=\"true\"></app-rating>-->\n            <!--<div id=\"following_button\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">-->\n              <!--<app-follow-button [following]=\"isFollowing(currentUser.riftTag)\" [id]=\"currentUser.id\"-->\n              <!--[riftTag]=\"profile.nickname\" class=\"userbtn\">-->\n              <!--</app-follow-button>-->\n            <!--</div>-->\n            <!--<div id=\"update_info_button\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">-->\n              <!--<button (click)=\"updateInfoModal()\" type=\"button\" class=\"btn-primary\">Update your Info</button>-->\n            <!--</div><br>-->\n            <!--<div class=\"stripe-payment\">-->\n              <!--<button (click)=\"updatePaymentModal()\" type=\"button\" class=\"btn-primary\">Update Payment</button>-->\n            <!--</div><br>-->\n            <!--<div class=\"stripe-payment\">-->\n              <!--<button *ngIf=\"!currentUser.accountId\" (click)=\"updateBankAccountModal()\" type=\"button\" class=\"btn-primary\">Update Bank Account</button>-->\n            <!--</div>-->\n            <!--<div id=\"rate_user_button\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">-->\n              <!--<button (click)=\"openRatingDialog()\" type=\"button\" class=\"btn-primary\">Rate this User</button>-->\n            <!--</div>-->\n            <!--<br>-->\n            <!--<div id=\"file_a_complaint\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">-->\n              <!--<button (click)=\"fileAComplaint()\" type=\"button\" class=\"btn-primary\">File A Complaint</button>-->\n            <!--</div>-->\n            <!--<alert type=\"danger\" *ngIf=\"ratingStatus == 0\">-->\n              <!--Haven't played with {{currentUser.riftTag}} in past 30 days-->\n            <!--</alert>-->\n            <!--<alert type=\"danger\" *ngIf=\"ratingStatus == 1\">-->\n              <!--Already rated {{currentUser.riftTag}} in past 30 days-->\n            <!--</alert>-->\n          <!--</div>-->\n          <!--<div class=\"section about\">-->\n            <!--<h3>About Me</h3>-->\n            <!--<p> {{currentUser.bio}} </p>-->\n          <!--</div>-->\n          <!--<div class=\"section statistics\">-->\n            <!--<h3>Statistics</h3>-->\n            <!--<p><span class=\"badge\">{{currentUser.followings?.length}}</span> Following</p>-->\n            <!--<p><span class=\"badge\">{{currentUser.followers?.length}}</span> Followers</p>-->\n            <!--<p><span class=\"badge\">{{currentUser.rifterSessions?.length}}</span> Sessions Played</p>-->\n          <!--</div>-->\n          <!--<div class=\"section socialmedia\">-->\n            <!--<h3>Social</h3>-->\n            <!--<ul class=\"list-unstyled list-social\">-->\n              <!--<li><i class=\"fa fa-youtube\"></i> {{currentUser.youtubeAccount}}</li>-->\n              <!--<li><i class=\"fa fa-twitch\"></i> <a href=\"https://twitch.tv/{{currentUser.twitchAccount}}\">twitch.tv/{{currentUser.twitchAccount}}</a></li>-->\n            <!--</ul>-->\n          <!--</div>-->\n        <!--</div>-->\n      <!--</div>-->\n      <!--<div class=\"col-md-8\">-->\n        <!--<div class=\"profile-info-right\">-->\n          <!--<mat-tab-group>-->\n            <mat-tab label=\"activity\">\n              <div class=\"media activity-item\" *ngFor=\"let activity of currentUser.activities\">\n                <a href=\"#\" class=\"pull-left\">\n                  <img src=\"{{currentUser.profilePic}}\" alt=\"Avatar\" class=\"media-object avatar\">\n                </a>\n                <div class=\"media-body\">\n                  <p class=\"activity-title\">\n                    <a href=\"#\">{{currentUser.riftTag}}</a>\n                    {{activity.notificationContent}} <a [routerLink]=\"['../../session', activity.sessionId]\">{{activity.title}}</a>\n                  </p>\n                  <small class=\"text-muted\">{{activity.createdTime | date:'fullDate'}} at {{activity.createdTime | date:'shortTime'}}</small>\n                </div>\n                <div class=\"btn-group pull-right activity-actions\">\n                  <button type=\"button\" class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                    <i class=\"fa fa-th\"></i>\n                    <span class=\"sr-only\">Toggle Dropdown</span>\n                  </button>\n                </div>\n              </div>\n            </mat-tab>\n            <!--<mat-tab label=\"sessions\">-->\n              <!--<div class=\"media\" *ngFor=\"let session of currentUser.rifterSessions\">-->\n                <!--<app-session-card-->\n                                  <!--[session]=\"session\" [isLoggedIn]=\"isLoggedIn\"-->\n                                  <!--[type]=\"session.type\" [request]=\"loggedInUser.sessionRequests.get(session.id)\"-->\n                <!--&gt;</app-session-card>-->\n                <!--&lt;!&ndash;[routerLink]=\"['../../session', session.id]\"&ndash;&gt;-->\n              <!--</div>-->\n            <!--</mat-tab>-->\n            <!--<mat-tab label=\"followers\">-->\n              <!--<div class=\"media user-follower\" *ngFor=\"let follower of currentUser.followers\">-->\n                <!--<img src=\"{{follower.profilePic}}\" alt=\"User Avatar\" class=\"media-object pull-left\">-->\n                <!--<div class=\"media-body\">-->\n                  <!--<a [routerLink]=\"['../../user', follower.riftTag]\">{{follower.firstName}} {{follower.lastName}} {{follower.id}}-->\n                    <!--<br><span class=\"text-muted username\">@{{follower.riftTag}}</span></a>-->\n                  <!--<app-follow-button class=\"pull-right\" [following]=\"isFollowing(follower.riftTag)\" [id]=\"follower.id\"-->\n                                     <!--[riftTag]=\"profile.nickname\" *ngIf=\"isLoggedIn && profile.nickname != follower.riftTag\">-->\n                  <!--</app-follow-button>-->\n                <!--</div>-->\n              <!--</div>-->\n            <!--</mat-tab>-->\n            <!--<mat-tab label=\"following\">-->\n              <!--<div class=\"media user-info\" *ngFor=\"let following of currentUser.followings\">-->\n                  <!--<img src=\"{{following.profilePic}}\" alt=\"User Avatar\" class=\"media-object pull-left\">-->\n                  <!--<div class=\"media-body\">-->\n                    <!--<a [routerLink]=\"['../../user', following.riftTag]\">{{following.firstName}} {{following.lastName}}-->\n                      <!--<br><span class=\"text-muted username\">@{{following.riftTag}}</span></a>-->\n                    <!--<app-follow-button class=\"pull-right\" [following]=\"isFollowing(following.riftTag)\" [id]=\"following.id\"-->\n                                       <!--[riftTag]=\"profile.nickname\" *ngIf=\"isLoggedIn && profile.nickname != following.riftTag\">-->\n\n                    <!--</app-follow-button>-->\n                  <!--</div>-->\n              <!--</div>-->\n            <!--</mat-tab>-->\n            <!--<mat-tab label=\"reviews\" style=\"width: 100%;\">-->\n              <!--<div class=\"row\" style=\"text-align:center\">-->\n                <!--<div class=\"col-lg-5\">-->\n                  <!--<div class=\"rating-block\">-->\n                    <!--<h4>Average Rifter Rating</h4>-->\n                    <!--<h2 class=\"bold padding-bottom-7\"> {{currentUser.rifterRating}} <small>/ 5</small></h2>-->\n                    <!--<app-rating [rating]=\"currentUser.rifterRating\" [readonly]=\"true\"></app-rating>-->\n                  <!--</div>-->\n                <!--</div>-->\n                <!--<div class=\"col-lg-5\">-->\n                  <!--<div class=\"rating-block\">-->\n                    <!--<h4>Average Riftee Rating</h4>-->\n                    <!--<h2 class=\"bold padding-bottom-7\"> {{currentUser.rifteeRating}} <small>/ 5</small></h2>-->\n                    <!--<app-rating [rating]=\"currentUser.rifteeRating\" [readonly]=\"true\"></app-rating>-->\n                  <!--</div>-->\n                <!--</div>-->\n\n              <!--</div>-->\n              <!--<div class=\"row\">-->\n                <!--<div class=\"col-sm-7\" *ngFor=\"let rating of currentUser.ratings\">-->\n                    <!--<app-user-review [rating]=\"rating\" ></app-user-review>-->\n                <!--</div>-->\n              <!--</div>-->\n            <!--</mat-tab>-->\n            <!--<mat-tab label=\"game accounts\">-->\n              <!--<div class=\"media user-info\" *ngFor=\"let account of currentUser.gameAccounts\">-->\n                <!--<img src=\"{{account.gameIcon}}\" alt=\"User Avatar\" class=\"media-object pull-left\">-->\n                <!--<div class=\"media-body\">-->\n                  <!--{{account.gameName}}-->\n                    <!--<br><span class=\"text-muted username\">@{{account.ign}}</span>-->\n                  <!--<button type=\"button\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\" class=\"btn btn-sm btn-primary\"-->\n                          <!--(click)=\"editGameAccount(account)\">-->\n                    <!--<span>Edit Game Account</span>-->\n                  <!--</button>-->\n                <!--</div>-->\n              <!--</div>-->\n            <!--</mat-tab>-->\n          <!--</mat-tab-group>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</div>-->\n<!--<router-outlet></router-outlet>-->\n\n<!--&lt;!&ndash;<mat-tab label=\"notifications\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">&ndash;&gt;-->\n<!--&lt;!&ndash;<div class=\"media\" *ngFor=\"let notification of currentUser.notifications\">&ndash;&gt;-->\n<!--&lt;!&ndash;<app-notification [notification]=\"notification\"></app-notification>&ndash;&gt;-->\n<!--&lt;!&ndash;</div>&ndash;&gt;-->\n<!--&lt;!&ndash;</mat-tab>&ndash;&gt;-->\n\n\n<!--&lt;!&ndash;<mat-tab label=\"feed\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">&ndash;&gt;-->\n  <!--&lt;!&ndash;<div class=\"media activity-item\" *ngFor=\"let notification of currentUser.feed\">&ndash;&gt;-->\n    <!--&lt;!&ndash;<a href=\"#\" class=\"pull-left\">&ndash;&gt;-->\n      <!--&lt;!&ndash;<img src=\"https://bootdey.com/img/Content/avatar/avatar1.png\" alt=\"Avatar\" class=\"media-object avatar\">&ndash;&gt;-->\n    <!--&lt;!&ndash;</a>&ndash;&gt;-->\n    <!--&lt;!&ndash;<div class=\"media-body\">&ndash;&gt;-->\n      <!--&lt;!&ndash;<p class=\"activity-title\"><a [routerLink]=\"['../../user',notification.rifttag]\">{{notification.riftTag}}</a>&ndash;&gt;-->\n        <!--&lt;!&ndash;{{notification.notificationContent}} </p>&ndash;&gt;-->\n      <!--&lt;!&ndash;<small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>&ndash;&gt;-->\n    <!--&lt;!&ndash;</div>&ndash;&gt;-->\n  <!--&lt;!&ndash;</div>&ndash;&gt;-->\n<!--&lt;!&ndash;</mat-tab>&ndash;&gt;-->\n\n<body id=\"profile-header\" class=\"container\" *ngIf=\"isDataAvailable\">\n<div id=\"header\" >\n  <div id=\"overview\">\n    <img src=\"{{currentUser.profilePic}}\" class=\"headshot\">\n    <div id=\"basic-details\">\n      <span class=\"name\">{{currentUser.firstName}} {{currentUser.lastName}}</span>\n      <!--<div class=\"following-btn\">Following</div>-->\n      <div class=\"following-btn\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">\n        <app-follow-button [following]=\"isFollowing(currentUser.riftTag)\" [id]=\"currentUser.id\"\n                           [riftTag]=\"profile.nickname\" class=\"userbtn\">\n        </app-follow-button>\n      </div>\n      <br>\n      <span class=\"username\">@{{currentUser.riftTag}}</span> </div>\n    <div id=\"user-stats\">\n      <div class=\"stat-item\"><span id=\"following\" class=\"stat\">{{currentUser.followings?.length}}</span><br>\n        <label>following</label>\n      </div>\n      <div class=\"stat-item\"><span id=\"followers\" class=\"stat\">{{currentUser.followers?.length}}</span><br>\n        <label>followers</label>\n      </div>\n      <div class=\"stat-item\"><span id=\"rating\" class=\"stat\">346</span><br>\n        <label>rating</label>\n      </div>\n    </div>\n  </div>\n  <div id=\"tabs\">\n    <div class=\"tab tab-active\" id=\"activity-btn\" (click)=\"tabShow($event)\">Activity</div>\n    <div class=\"tab\" id=\"sessions-btn\" (click)=\"tabShow($event)\">Sessions</div>\n    <div class=\"tab\" id=\"ratings-btn\" (click)=\"tabShow($event)\">Ratings</div>\n    <div class=\"tab\" id=\"info-btn\" (click)=\"tabShow($event)\">Info</div>\n  </div>\n</div>\n<br><br>\n<!--<div id=\"update_info_button\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">-->\n  <!--<button (click)=\"updateInfoModal()\" type=\"button\" class=\"btn-primary\">Update your Info</button>-->\n<!--</div><br>-->\n\n<div class=\"section\" id=\"activity\">\n  <div *ngFor=\"let activity of currentUser.activities\">\n    <app-activity-card [activity]=\"activity\" [currentUser]=\"currentUser\" [loggedInUserId]=\"loggedInUser.id\"\n    [request]=\"loggedInUser.sessionRequests.get(activity.sessionId)\" [isLoggedIn]=\"isLoggedIn\">\n    </app-activity-card>\n  </div>\n</div>\n\n<div class=\"section hide\" id=\"sessions\" >\n  <div *ngFor=\"let session of currentUser.rifterSessions\">\n    <app-session-card\n      [session]=\"session\" [isLoggedIn]=\"isLoggedIn\"\n      [type]=\"session.type\" [request]=\"loggedInUser.sessionRequests.get(session.id)\"\n      [loggedInUserId]=\"loggedInUser.id\"\n    ></app-session-card><br>\n    <!--[routerLink]=\"['../../session', session.id]\"-->\n  </div>\n</div>\n\n<div class=\"section hide\" id=\"ratings\">\n  blah\n</div>\n\n<div class=\"section hide\" id=\"info\">\n  <div class=\"sidemenu\">\n    <a id=\"details-btn\" class=\"menu-active\" (click)=\"menuShow($event)\">Details about you</a>\n    <a id=\"contact-info-btn\" (click)=\"menuShow($event)\">Contact Info</a>\n    <a id=\"game-accounts-btn\" (click)=\"menuShow($event)\">Game Accounts</a>\n  </div>\n  <div class=\"content-card\" id=\"details\">\n    <div class=\"segment\">\n      <span class=\"title\">About Me</span>\n      <p>{{currentUser.bio}}</p>\n    </div>\n    <div class=\"segment\">\n      <span class=\"title\">Basic Information</span>\n      <table>\n        <tbody>\n        <tr>\n          <td>Email</td>\n          <td>{{currentUser.email}}</td>\n        </tr>\n        <tr>\n          <td>PO Box</td>\n          <td>159 5th St NW</td>\n        </tr>\n        <tr>\n          <td>Business Email</td>\n          <td>ninja@twitch.com</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"content-card hide\" id=\"contact-info\">\n    <div class=\"segment\">\n      <span class=\"title\">Contact</span>\n      <table>\n        <tbody>\n        <tr>\n          <td>Date of Birth</td>\n          <td>04/16/1998</td>\n        </tr>\n        <tr>\n          <td>Age</td>\n          <td>19</td>\n        </tr>\n        <tr>\n          <td>Gender</td>\n          <td>Male</td>\n        </tr>\n        <tr>\n          <td>Time Zone</td>\n          <td>US East (EST)</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"segment\">\n      <span class=\"title\">Social</span>\n      <table>\n        <tbody>\n        <tr>\n          <td>Twitch</td>\n          <td>{{currentUser.twitchAccount}}</td>\n        </tr>\n        <tr>\n          <td>Youtube</td>\n          <td>{{currentUser.youtubeAccount}}</td>\n        </tr>\n        <tr>\n          <td>Twitter</td>\n          <td>@bvicinay</td>\n        </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n  <div class=\"content-card hide\" id=\"game-accounts\">\n    <div class=\"segment\">\n      <span class=\"title\">Accounts</span>\n      <p>Account card here</p>\n      <p>Account card here</p>\n      <p>Account card here</p>\n    </div>\n  </div>\n</div>\n\n</body>\n\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/userprofile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserprofileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_activity__ = __webpack_require__("../../../../../src/app/models/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_rating_data_user_rating_service__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/data/user-rating.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_userrating__ = __webpack_require__("../../../../../src/app/models/userrating.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__usersessions_usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_session_request__ = __webpack_require__("../../../../../src/app/models/session-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__update_info_update_info_component__ = __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__user_rating_user_rating_component__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__file_a_complaint_file_a_complaint_component__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__game_account_edit_game_account_edit_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__constants_notification_content__ = __webpack_require__("../../../../../src/app/constants/notification-content.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__stripe_payment_stripe_payment_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/stripe-payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__stripe_payment_legal_bank_account_info_legal_bank_account_info_component__ = __webpack_require__("../../../../../src/app/userprofile/stripe-payment/legal-bank-account-info/legal-bank-account-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};























var UserprofileComponent = /** @class */ (function () {
    function UserprofileComponent(userProfileService, auth, route, userRatingService, dialog, gameAccountService, userSessionsService, sharedFunc) {
        this.userProfileService = userProfileService;
        this.auth = auth;
        this.route = route;
        this.userRatingService = userRatingService;
        this.dialog = dialog;
        this.gameAccountService = gameAccountService;
        this.userSessionsService = userSessionsService;
        this.sharedFunc = sharedFunc;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.following = false;
        this.isDataAvailable = false;
        this.isLoggedIn = false;
        this.currSection = "details";
        this.currTab = "activity";
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile != null) {
            this.isLoggedIn = true;
        }
    }
    UserprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.currUser = params['rifttag'];
            _this.getUserProfileInformation(params['rifttag']);
        });
    };
    UserprofileComponent.prototype.getCurrentLoggedInUser = function (riftTag) {
        var _this = this;
        // console.log("Getting currently logged in user");
        this.userProfileService.getUser(riftTag).subscribe(function (resBody) {
            // console.log("in logged in user resbody");
            _this.loggedInUser.id = resBody.id;
            for (var i = 0; i < resBody.followings.length; i++) {
                var currFollowing = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
                currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
                currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
                currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
                _this.loggedInUser.followings.push(currFollowing);
            }
            // console.log("-----------------");
        });
        this.getUserSessionRequests(riftTag);
    };
    UserprofileComponent.prototype.getUserProfileInformation = function (riftTag) {
        var _this = this;
        console.log("Getting " + riftTag + "'s profile information");
        this.userProfileService.getUser(riftTag).subscribe(function (resBody) {
            _this.currentUser.firstName = resBody.firstName;
            _this.currentUser.lastName = resBody.lastName;
            _this.currentUser.riftTag = resBody.riftTag;
            _this.currentUser.gender = resBody.gender;
            _this.currentUser.bio = resBody.bio;
            _this.currentUser.email = resBody.email;
            _this.currentUser.id = resBody.id;
            _this.currentUser.customerId = resBody.customerId;
            _this.currentUser.accountId = resBody.accountId;
            _this.currentUser.rifterRating = resBody.rifterRating;
            _this.currentUser.rifteeRating = resBody.rifteeRating;
            _this.currentUser.twitchAccount = resBody.twitchAccount;
            _this.currentUser.youtubeAccount = resBody.youtubeAccount;
            _this.sharedFunc.getUserProfilePicture(_this.currentUser.riftTag, _this.currentUser);
            _this.getUserCoverPhoto(riftTag);
            _this.getUserFollowersAndFollowing(resBody.followers, resBody.followings);
            _this.getUserRatings(_this.currentUser.id);
            _this.getUserActivities(resBody.creatorActivityList);
            _this.getUserRifterSessions(resBody.rifterSessions, _this.currentUser);
            _this.getCurrentLoggedInUser(_this.profile.nickname);
            _this.getUserGameAccounts(_this.currentUser.id);
            _this.isDataAvailable = true;
        }, function (error) {
            console.log(error.message);
        });
    };
    UserprofileComponent.prototype.getUserFollowersAndFollowing = function (followers, followings) {
        // console.log("Getting user's followers and followings");
        this.currentUser.followings = [];
        this.currentUser.followers = [];
        for (var i = 0; i < followers.length; i++) {
            var currFollower = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
            currFollower.firstName = followers[i].followerUsertable.firstName;
            currFollower.lastName = followers[i].followerUsertable.lastName;
            currFollower.riftTag = followers[i].followerUsertable.riftTag;
            currFollower.id = followers[i].followerUsertable.id;
            this.sharedFunc.getUserProfilePicture(currFollower.riftTag, currFollower);
            this.currentUser.followers.push(currFollower);
        }
        for (var i = 0; i < followings.length; i++) {
            var currFollowing = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
            currFollowing.firstName = followings[i].followingUsertable.firstName;
            currFollowing.lastName = followings[i].followingUsertable.lastName;
            currFollowing.riftTag = followings[i].followingUsertable.riftTag;
            currFollowing.id = followings[i].followingUsertable.id;
            this.sharedFunc.getUserProfilePicture(currFollowing.riftTag, currFollowing);
            this.currentUser.followings.push(currFollowing);
        }
    };
    UserprofileComponent.prototype.getUserRatings = function (id) {
        var _this = this;
        // console.log("Getting user's ratings");
        this.currentUser.ratings = [];
        this.userRatingService.getUserRating(id).subscribe(function (resBody) {
            //noinspection TypeScriptUnresolvedVariable
            for (var i = 0; i < resBody.length; i++) {
                var userRating = new __WEBPACK_IMPORTED_MODULE_8__models_userrating__["a" /* UserRating */]();
                userRating.review = resBody[i].review;
                userRating.createdTime = resBody[i].createdTime;
                userRating.rating = resBody[i].rating;
                userRating.account_type = resBody[i].accountType;
                var reviewer = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
                reviewer.firstName = resBody[i].reviewerUsertable.firstName;
                reviewer.lastName = resBody[i].reviewerUsertable.lastName;
                reviewer.riftTag = resBody[i].reviewerUsertable.riftTag;
                _this.sharedFunc.getUserProfilePicture(reviewer.riftTag, reviewer);
                userRating.reviewerUsertable = reviewer;
                _this.currentUser.ratings.push(userRating);
            }
        });
    };
    UserprofileComponent.prototype.getUserActivities = function (creatorActivityList) {
        // console.log("Getting user's activities");
        this.currentUser.activities = [];
        this.currentUser.creatorActivityList = creatorActivityList;
        for (var i = 0; i < 10; i++) {
            var currActivity = new __WEBPACK_IMPORTED_MODULE_3__models_activity__["a" /* Activity */]();
            currActivity.notificationType = this.currentUser.creatorActivityList[i].notificationType;
            currActivity.notificationContent = __WEBPACK_IMPORTED_MODULE_19__constants_notification_content__["a" /* NOTIFICATION_CONTENT */].get(currActivity.notificationType);
            currActivity.title = this.currentUser.creatorActivityList[i].rifterSession.title;
            currActivity.sessionId = this.currentUser.creatorActivityList[i].sessionId;
            currActivity.createdTime = this.currentUser.creatorActivityList[i].createdTime;
            this.currentUser.activities.push(currActivity);
        }
    };
    UserprofileComponent.prototype.getUserRifterSessions = function (rifterSessions, user) {
        // console.log("Getting user's rifter sessions");
        this.currentUser.rifterSessions = [];
        for (var i = 0; i < rifterSessions.length; i++) {
            var currDateMS = rifterSessions[i].sessionTime;
            var date = new Date(currDateMS);
            var currSession = new __WEBPACK_IMPORTED_MODULE_4__models_session__["a" /* Session */]();
            currSession.firstName = user.firstName;
            currSession.lastName = user.lastName;
            currSession.riftTag = user.riftTag;
            currSession.rifterRating = user.rifterRating;
            currSession.hostId = rifterSessions[i].hostId;
            currSession.sessionCost = rifterSessions[i].sessionCost;
            currSession.methodOfContact = rifterSessions[i].methodOfContact;
            currSession.sessionDuration = rifterSessions[i].sessionDuration;
            currSession.title = rifterSessions[i].title;
            currSession.sessionTime = date;
            currSession.id = rifterSessions[i].id;
            currSession.numSlots = rifterSessions[i].numSlots;
            currSession.gameId = rifterSessions[i].gameId;
            currSession.console = rifterSessions[i].console;
            if (currSession.hostId == currSession.hostId) {
                currSession.type = true;
            }
            else {
                currSession.type = false;
            }
            this.currentUser.rifterSessions.push(currSession);
        }
    };
    UserprofileComponent.prototype.getUserSessionRequests = function (riftTag) {
        var _this = this;
        // console.log("Getting user's session requests");
        this.loggedInUser.sessionRequests = new Map();
        this.userSessionsService.getSessionRequests(riftTag).subscribe(function (resBody) {
            //noinspection TypeScriptUnresolvedVariable
            for (var i = 0; i < resBody.length; i++) {
                var request = new __WEBPACK_IMPORTED_MODULE_10__models_session_request__["a" /* SessionRequest */]();
                request.accepted = resBody[i].accepted;
                request.hostId = resBody[i].hostId;
                request.rifteeId = resBody[i].rifteeId;
                request.sessionId = resBody[i].sessionId;
                _this.loggedInUser.sessionRequests.set(request.sessionId, request);
            }
        });
    };
    UserprofileComponent.prototype.getUserCoverPhoto = function (riftTag) {
        var _this = this;
        // console.log("Getting user's cover photo");
        this.userProfileService.getCoverPhoto(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                _this.currentUser.coverPhoto = "https://atiinc.org/wp-content/uploads/2017/01/cover-default.jpg";
            }
            else {
                _this.currentUser.coverPhoto = resBody.image;
            }
        });
        // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
    };
    UserprofileComponent.prototype.getUserGameAccounts = function (id) {
        var _this = this;
        this.gameAccountService.getUserGameAccounts(id).subscribe(function (resBody) {
            for (var i = 0; i < resBody.length; i++) {
                var currAccount = resBody[i];
                var account = new __WEBPACK_IMPORTED_MODULE_15__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_17__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
                _this.currentUser.gameAccounts.push(account);
            }
        });
    };
    ;
    UserprofileComponent.prototype.isFollowing = function (riftTag) {
        for (var i = 0; i < this.loggedInUser.followings.length; i++) {
            var currFollowing = this.loggedInUser.followings[i].riftTag;
            if (currFollowing == riftTag) {
                this.following = true;
                return true;
            }
        }
        this.following = false;
    };
    UserprofileComponent.prototype.updateInfoModal = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_12__update_info_update_info_component__["a" /* UpdateInfoComponent */], {
            height: '450px',
            width: '600px',
            data: {
                currentUser: this.currentUser,
                loggedInUser: this.loggedInUser
            }
        });
    };
    UserprofileComponent.prototype.updatePaymentModal = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_20__stripe_payment_stripe_payment_component__["a" /* StripePaymentComponent */], {
            height: '450px',
            width: '600px',
            data: {
                customerId: this.currentUser.customerId
            }
        });
    };
    UserprofileComponent.prototype.updateBankAccountModal = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_21__stripe_payment_legal_bank_account_info_legal_bank_account_info_component__["a" /* LegalBankAccountInfoComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "riftId": this.loggedInUser.id,
                "riftTag": this.profile.nickname
            }
        });
    };
    UserprofileComponent.prototype.editGameAccount = function (account) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_18__game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "account": account,
                "riftId": this.currentUser.id
            }
        });
    };
    UserprofileComponent.prototype.openRatingDialog = function () {
        var _this = this;
        var raterId = this.loggedInUser.id;
        console.log(raterId);
        var rateeId = this.currentUser.id;
        console.log(rateeId);
        this.userRatingService.isAllowedToRate(raterId, rateeId).subscribe(function (resBody) {
            _this.ratingStatus = resBody.result;
            if (_this.ratingStatus == 0) {
                console.log("Haven't played with " + _this.currentUser.riftTag + " in the past 30 days");
            }
            else if (_this.ratingStatus == 1) {
                console.log("Already rated " + _this.currentUser.riftTag + " in the past 30 days");
            }
            else {
                //noinspection TypeScriptUnresolvedFunction
                _this.dialog.open(__WEBPACK_IMPORTED_MODULE_13__user_rating_user_rating_component__["a" /* UserRatingComponent */], {
                    height: '600px',
                    width: 'px',
                    data: {
                        ratedUserRiftTag: _this.currentUser.riftTag,
                        raterId: _this.loggedInUser.id,
                        rateeId: _this.currentUser.id
                    }
                });
            }
        });
    };
    UserprofileComponent.prototype.fileAComplaint = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_14__file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */], {
            height: '450px',
            width: '600px',
            data: {
                submitterId: this.loggedInUser.id,
                riftId: this.currentUser.id
            }
        });
    };
    UserprofileComponent.prototype.menuShow = function (event) {
        var btnId = event.target.id;
        var id = btnId.substring(0, btnId.length - 4);
        document.getElementById(this.currSection).classList.add("hide");
        document.getElementById(this.currSection + "-btn").classList.remove("menu-active");
        document.getElementById(id).classList.remove("hide");
        document.getElementById(btnId).classList.add("menu-active");
        document.getElementById(id).classList.add("text-fadein");
        this.currSection = id;
    };
    UserprofileComponent.prototype.tabShow = function (event) {
        var btnId = event.target.id;
        var id = btnId.substring(0, btnId.length - 4);
        document.getElementById(this.currTab).classList.add("hide");
        document.getElementById(this.currTab + "-btn").classList.remove("tab-active");
        document.getElementById(id).classList.remove("hide");
        document.getElementById(id).classList.add("text-fadein");
        document.getElementById(btnId).classList.add("tab-active");
        this.currTab = id;
    };
    UserprofileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-userprofile',
            template: __webpack_require__("../../../../../src/app/userprofile/userprofile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/userprofile.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__user_rating_data_user_rating_service__["a" /* UserRatingService */],
            __WEBPACK_IMPORTED_MODULE_11__angular_material__["c" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_16__game_account_game_account_service__["a" /* GameAccountService */], __WEBPACK_IMPORTED_MODULE_9__usersessions_usersessions_service__["a" /* UsersessionsService */],
            __WEBPACK_IMPORTED_MODULE_22__shared_shared_functions__["a" /* SharedFunctions */]])
    ], UserprofileComponent);
    return UserprofileComponent;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/userprofile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserprofileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserprofileService = /** @class */ (function () {
    function UserprofileService(http) {
        this.http = http;
        this.createUserURL = "/api/user/createUser";
        this.uploadPictureURL = "/api/user/putPicture/";
        this.getPictureURL = "/api/user/getPicture/";
    }
    UserprofileService.prototype.getUser = function (riftTag) {
        // console.log("running getUser: " + riftTag);
        return this.http.get("/api/user/" + riftTag + "/profilePage")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.getUserRiftTag = function (id) {
        return this.http.get("/api/user/" + id + "/riftTag")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.getUserId = function (riftTag) {
        // console.log("running getUserId");
        return this.http.get("/api/user/" + riftTag + "/id")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.getUserNotifications = function (riftTag) {
        return this.http.get("/api/notification/" + riftTag + "/notifications")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || "Server Error"); });
    };
    //**
    //This one is the polling that will check every 2 seconds for backend changes
    //**
    // getUserNotifications(riftTag: string): Observable<Userprofile> {
    //   console.log("Getting user's notifications");
    //   let url = "/api/notification/" + riftTag + "/notifications";
    //   return Observable.interval(2000)
    //     .switchMap(() => this.http.get(url))
    //     .map((res:Response) => res.json());
    // }
    UserprofileService.prototype.getUserBroadcastNotifications = function (riftTag) {
        return this.http.get("/api/notification/" + riftTag + "/broadcastNotifications")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || "Server Error"); });
    };
    UserprofileService.prototype.createUser = function (data) {
        console.log("running createUser");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.createUserURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UserprofileService.prototype.followUser = function (riftTag, id) {
        console.log("Followed " + riftTag);
        return this.http.get("/api/user/" + riftTag + "/follow=" + id)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.unfollowUser = function (riftTag, id) {
        console.log("Unfollowed " + riftTag);
        return this.http.get("/api/user/" + riftTag + "/unfollow=" + id)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.uploadProfilePicture = function (riftTag, base64) {
        // console.log("running uploadProfilePicture");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.uploadPictureURL + riftTag + "/profile-pic", base64, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UserprofileService.prototype.uploadCoverPhoto = function (riftTag, base64) {
        // console.log("running uploadProfilePicture");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.uploadPictureURL + riftTag + "/profile-pic", base64, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UserprofileService.prototype.getProfilePicture = function (riftTag) {
        // console.log("running getProfilePicture");
        return this.http.get(this.getPictureURL + riftTag + "/rift-profilepictures")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.getCoverPhoto = function (riftTag) {
        // console.log("running getProfilePicture");
        return this.http.get(this.getPictureURL + riftTag + "/rift-coverphotos")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserprofileService.prototype.sendConfirmationEmail = function (email) {
        return this.http.put("/api/email/", email)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    UserprofileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], UserprofileService);
    return UserprofileService;
}());



/***/ }),

/***/ "../../../../../src/app/userprofile/youtube.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var YoutubeService = /** @class */ (function () {
    function YoutubeService(http) {
        this.http = http;
    }
    YoutubeService.prototype.getYouTubeUsername = function (code) {
        return this.http.get("/api/verifyYoutube/" + code)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    YoutubeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]])
    ], YoutubeService);
    return YoutubeService;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/create-session.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content>\n  <form #createSession=\"ngForm\" class=\"editForm\" novalidate>\n    <div class=\"tab-pane fade in active\">\n      <h4 class=\"head text-center\">{{title}}</h4>\n      <br/>\n      <div class='row'>\n        <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiontitle\">Give your session a title</label>\n                <input class=\"form-control input-md\" #sessiontitle=\"ngModel\"  id=\"sessiontitle\" name=\"sessiontitle\" type=\"text\" placeholder=\"Session Title\" [(ngModel)]=\"currentSession.title\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiongame\">What game will you be playing?</label>\n                <!--<input class=\"form-control input-md\" #sessiongame=\"ngModel\"  id=\"sessiongame\" name=\"sessiongame\" type=\"text\" placeholder=\"Session Game\" [(ngModel)]=\"currentSession.game\">-->\n                <mat-form-field>\n                  <mat-select placeholder=\"Select a Game\" [(value)]=\"gameId\" (selectionChange)=\"getUserGameAccountsByGameId(gameId, data.loggedInUserId)\">\n                    <mat-option *ngFor=\"let game of games\" [value]=\"game.id\">\n                      {{ game.name }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n                <mat-form-field>\n                  <mat-select placeholder=\"Select an Account\" [(value)]=\"accountId\">\n                    <mat-option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">\n                      {{ account.ign }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiondesc\">Give your session a description</label>\n                <div class=\"input-group\">\n                  <textarea name=\"sessiondesc\" #sessiondesc = \"ngModel\" id =\"sessiondesc\" class=\"form-control\" [(ngModel)]=\"currentSession.description\"></textarea>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessionplatform\">What platform will you be playing on?</label>\n            <mat-form-field>\n              <mat-select placeholder=\"Select a Platform\" [(value)]=\"platform\">\n                <mat-option *ngFor=\"let console of consoles\" [value]=\"console\">\n                  {{ console.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionslots\">How many slots in your session</label>\n                <input class=\"form-control input-md\" #sessionslots=\"ngModel\"  id=\"sessionslots\" name=\"sessionslots\" type=\"number\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"currentSession.numSlots\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessioncost\">Cost per slot</label>\n                <input class=\"form-control input-md\" #sessioncost=\"ngModel\"  id=\"sessioncost\" name=\"sessioncost\" type=\"number\" placeholder=\"Cost per slot\" [(ngModel)]=\"currentSession.sessionCost\">\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiondate\">What date</label>\n                <!--<input class=\"form-control input-md\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" type=\"text\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"step3.sessionDate\">-->\n                <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" [(ngModel)]=\"currentSessionDateTime.sessionDate\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiontime\">What time</label>\n                <input matInput type=\"time\" placeholder=\"Pick a time\" #sessiontime=\"ngModel\"  id=\"sessiontime\" name=\"sessiontime\" [(ngModel)]=\"currentSessionDateTime.sessionTime\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionduration\">Select a Duration</label>\n                <input matInput type=\"number\" placeholder=\"Select a duration\" #sessionduration=\"ngModel\"  id=\"sessionduration\" name=\"sessionduration\" [(ngModel)]=\"currentSessionDateTime.sessionDuration\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionlanguage\">Select a Language</label>\n                <mat-form-field>\n                  <mat-select placeholder=\"Select a Language\" [(value)]=\"language\">\n                    <mat-option *ngFor=\"let language of languages\" [value]=\"language.language\">\n                      {{ language.language }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div>\n      <button [disabled]=\"!createSession.valid\" (click)=\"save()\" class=\"btn btn-lg btn-update\" type=\"button\">Create</button>\n      <button (click)=\"cancel()\" class=\"btn btn-lg btn-cancel\" type=\"button\">Cancel</button>\n    </div>\n  </form>\n</mat-dialog-content>\n\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/create-session.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-cancel {\n  background: #FD5A5B;\n  color: #fff; }\n\n.btn-update {\n  background: #293e49;\n  color: #fff; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/create-session.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateSessionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_sessionDateTime__ = __webpack_require__("../../../../../src/app/usersessions/create-session/data/sessionDateTime.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_create_session_service__ = __webpack_require__("../../../../../src/app/usersessions/create-session/data/create-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_consoles__ = __webpack_require__("../../../../../src/app/constants/consoles.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_languages__ = __webpack_require__("../../../../../src/app/constants/languages.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__userprofile_game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_shared_functions__ = __webpack_require__("../../../../../src/app/shared/shared-functions.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
















var CreateSessionComponent = /** @class */ (function () {
    function CreateSessionComponent(createSessionService, route, userSessionService, globals, userProfileService, gameAccountService, dialogRef, data, sharedFunc) {
        this.createSessionService = createSessionService;
        this.route = route;
        this.userSessionService = userSessionService;
        this.globals = globals;
        this.userProfileService = userProfileService;
        this.gameAccountService = gameAccountService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.sharedFunc = sharedFunc;
        this.title = "Create this session";
        this.currentSession = new __WEBPACK_IMPORTED_MODULE_5__models_session__["a" /* Session */]();
        this.currentSessionDateTime = new __WEBPACK_IMPORTED_MODULE_1__data_sessionDateTime__["a" /* SessionDateTime */]();
        this.gameAccounts = [];
        this.games = __WEBPACK_IMPORTED_MODULE_7__constants_games__["a" /* GAMES */];
        this.consoles = __WEBPACK_IMPORTED_MODULE_6__constants_consoles__["a" /* CONSOLES */];
        this.languages = __WEBPACK_IMPORTED_MODULE_8__constants_languages__["a" /* LANGUAGES */];
    }
    CreateSessionComponent.prototype.ngOnInit = function () {
        console.log(this.data.loggedInUserId);
        this.currentSession = this.createSessionService.getSessionData();
        this.createSessionData = this.createSessionService.getFormData();
    };
    CreateSessionComponent.prototype.save = function () {
        this.createSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
        var timeMS = this.sharedFunc.timeToMilliseconds(this.currentSessionDateTime.sessionTime) + this.currentSessionDateTime.sessionDate.getTime();
        var data = {
            "hostId": this.data.loggedInUserId,
            "title": this.createSessionData.title,
            "description": this.createSessionData.description,
            "gameId": this.gameId,
            "console": this.platform.name,
            "numSlots": this.createSessionData.numSlots,
            "sessionCost": this.createSessionData.sessionCost,
            "sessionTime": timeMS,
            "sessionDuration": "1:00:00",
            "language": this.language,
            "gameAccountId": this.accountId
        };
        console.log(data);
        this.userSessionService.createUserSession(data);
        window.location.reload();
    };
    CreateSessionComponent.prototype.cancel = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialogRef.close();
    };
    CreateSessionComponent.prototype.getUserGameAccountsByGameId = function (gameId, riftId) {
        var _this = this;
        this.gameAccountService.getUserGameAccountsByGameID(gameId, riftId).subscribe(function (resBody) {
            console.log(resBody);
            for (var i = 0; i < resBody.length; i++) {
                var currAccount = resBody[i];
                var account = new __WEBPACK_IMPORTED_MODULE_13__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_14__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
                _this.gameAccounts.push(account);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CreateSessionComponent.prototype, "createSessionData", void 0);
    CreateSessionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-session',
            template: __webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.scss")]
        }),
        __param(7, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__data_create_session_service__["a" /* CreateSessionService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_9__usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_10__global_globals__["a" /* Globals */],
            __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_12__userprofile_game_account_game_account_service__["a" /* GameAccountService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatDialogRef */], Object, __WEBPACK_IMPORTED_MODULE_15__shared_shared_functions__["a" /* SharedFunctions */]])
    ], CreateSessionComponent);
    return CreateSessionComponent;
}());

// this.sub = this.route.parent.params.subscribe(params => {
//   this.sessionId = params["sessionId"];
// });


/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/data/create-session.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateSessionData; });
var CreateSessionData = /** @class */ (function () {
    function CreateSessionData() {
        this.title = "";
        this.console = "";
        this.description = "";
    }
    return CreateSessionData;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/data/create-session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateSessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_session_model__ = __webpack_require__("../../../../../src/app/usersessions/create-session/data/create-session.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateSessionService = /** @class */ (function () {
    function CreateSessionService(http) {
        this.http = http;
        this.updateSessionData = new __WEBPACK_IMPORTED_MODULE_2__create_session_model__["a" /* CreateSessionData */]();
        this.isValid = false;
        this.updateSessionURL = "/api/rifterSession/update";
    }
    CreateSessionService.prototype.getSessionData = function () {
        var session = new __WEBPACK_IMPORTED_MODULE_3__models_session__["a" /* Session */]();
        session.title = this.updateSessionData.title;
        session.gameId = this.updateSessionData.gameId;
        session.console = this.updateSessionData.console;
        session.numSlots = this.updateSessionData.numSlots;
        session.sessionCost = this.updateSessionData.sessionCost;
        session.description = this.updateSessionData.description;
        return session;
    };
    CreateSessionService.prototype.setSessionData = function (data, dateTime) {
        this.isValid = true;
        this.updateSessionData.title = data.title;
        this.updateSessionData.gameId = data.gameId;
        this.updateSessionData.console = data.console;
        this.updateSessionData.numSlots = data.numSlots;
        this.updateSessionData.sessionCost = data.sessionCost;
        this.updateSessionData.sessionDate = dateTime.sessionDate;
        this.updateSessionData.sessionTime = dateTime.sessionTime;
        this.updateSessionData.sessionDuration = dateTime.sessionDuration;
        this.updateSessionData.description = data.description;
    };
    CreateSessionService.prototype.getFormData = function () {
        return this.updateSessionData;
    };
    CreateSessionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], CreateSessionService);
    return CreateSessionService;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/data/sessionDateTime.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionDateTime; });
var SessionDateTime = /** @class */ (function () {
    function SessionDateTime() {
    }
    return SessionDateTime;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  margin-top: 5%;\n}\n\n.session-view {\n  width: 75% !important;\n  /*display: inline-block !important;*/\n  float: right !important;\n}\n\nmat-checkbox {\n  display:block !important;\n}\n\n.btn {\n  /*float: right;*/\n  /*width: 20%;*/\n  margin-top: 10px;\n  background-color: #293e49!important;\n  border: none;\n}\n\n.filters{\n  border: 1px solid #333333;\n  padding: 20px;\n  display: inline-block;\n  width: 20%;\n  -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.1);\n          box-shadow: 5px 5px 15px rgba(0,0,0,0.1);\n  background-color: white;\n  border: none;\n  border-radius: 4px;\n  padding-top: 1px;\n  position: relative;\n  float: left;\n}\n\n.filter{\n  width: 100%;\n  background: #999999;\n  border-radius: 3px;\n  margin-bottom: 10px;\n  height: 35px;\n}\n\nh5 {\n  text-transform: uppercase;\n  color: #bababa;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n\nh5:after{\n   content: \"\";\n   display: block;\n   width: 100%;\n   height: 1px;\n   margin-top: 3px;\n   background-color: #e8e8e8;\n }\n\n.sessions {\n  margin-top: 2%;\n  width: 70%;\n  display: inline-block;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"width: 95%\">\n\n  <div class=\"filters\">\n    <button (click)=\"openCreateSessionDialog()\" type=\"button\" class=\"btn btn-primary createASession\" >\n      Create a Session\n    </button>\n    <h5>Filter by Session Type</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <label class=\"fake-checkbox\">\n          <mat-checkbox [(ngModel)]=\"rifter\"> Rifter </mat-checkbox>\n          <mat-checkbox [(ngModel)]=\"riftee\"> Riftee </mat-checkbox>\n        </label>\n      </div>\n    </div>\n    <h5>Filter by Session Time</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n          <mat-checkbox [(ngModel)]=\"upcoming\"> Upcoming </mat-checkbox>\n          <mat-checkbox [(ngModel)]=\"past\"> Past </mat-checkbox>\n      </div>\n    </div>\n    <h5>Filter by Game</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <div *ngFor=\"let game of games\">\n          <mat-checkbox [(ngModel)]=\"game.selected\"> {{game.name}} </mat-checkbox>\n        </div>\n      </div>\n    </div>\n    <h5>Filter by Console</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <div *ngFor=\"let console of consoles\">\n          <mat-checkbox [(ngModel)]=\"console.selected\"> {{console.name}} </mat-checkbox>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"session-view\">\n    <tabset>\n      <tab heading=\"card view\" id=\"tab1\" (select)=\"card = true\" [ngClass]=\"{'display-calendar': !card, 'hide-calendar':card}\">\n        <div class=\"sessions\">\n          <div *ngFor=\"let session of currentUser.sessions | sessionType: rifter:riftee | sessionTime: upcoming:past |\n            gameFilter: selectedGames | consoleFilter: selectedConsoles\">\n            <app-session-card [routerLink]=\"['../session', session.id]\"\n                              [session]=\"session\" [type]=\"session.type\" [isLoggedIn]=\"true\"\n                              [request]=\"loggedInUser.sessionRequests.get(session.id)\"\n                              [loggedInUserId]=\"loggedInUser.id\"\n            ></app-session-card>\n          </div>\n        </div>\n      </tab>\n      <tab heading=\"calendar view\" (select)=\"renderCalendar()\" [ngClass]=\"{'display-calendar': !card, 'hide-calendar':card}\">\n        <angular2-fullcalendar [options]=\"calendarOptions\"></angular2-fullcalendar>\n      </tab>\n\n    </tabset>\n\n  </div>\n\n  <router-outlet></router-outlet>\n\n</div>\n\n<!--<mat-tab-group>-->\n<!--<mat-tab label=\"card view\">-->\n<!--<div class=\"sessions\">-->\n<!--<div *ngFor=\"let session of currentUser.sessions | sessionType: rifter:riftee | sessionTime: upcoming:past |-->\n<!--gameFilter: selectedGames | consoleFilter: selectedConsoles\">-->\n<!--<app-session-card [routerLink]=\"['../session', session.id]\"-->\n<!--[session]=\"session\" [type]=\"session.type\" [isLoggedIn]=\"true\"-->\n<!--[request]=\"loggedInUser.sessionRequests.get(session.id)\"-->\n<!--&gt;</app-session-card>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--</mat-tab>-->\n<!--<mat-tab label=\"calendar\" style=\"display: block\">-->\n<!--<angular2-fullcalendar [options]=\"calendarOptions\"></angular2-fullcalendar>-->\n\n<!--</mat-tab>-->\n<!--</mat-tab-group>-->\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersessionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session_request__ = __webpack_require__("../../../../../src/app/models/session-request.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__create_session_create_session_component__ = __webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants_consoles__ = __webpack_require__("../../../../../src/app/constants/consoles.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ap_angular2_fullcalendar__ = __webpack_require__("../../../../ap-angular2-fullcalendar/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ap_angular2_fullcalendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ap_angular2_fullcalendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var UsersessionsComponent = /** @class */ (function () {
    function UsersessionsComponent(userSessionsService, userProfileService, dialog, router) {
        this.userSessionsService = userSessionsService;
        this.userProfileService = userProfileService;
        this.dialog = dialog;
        this.router = router;
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem("profile"));
        this.router = router;
        this.calendarOptions = {
            height: '600px',
            fixedWeekCount: false,
            editable: true,
            eventLimit: true,
            events: [],
            eventClick: function (event) {
                router.navigate(["../session", event.sessionId]);
            }
        };
    }
    UsersessionsComponent.prototype.ngOnInit = function () {
        this.games = __WEBPACK_IMPORTED_MODULE_8__constants_games__["a" /* GAMES */];
        this.consoles = __WEBPACK_IMPORTED_MODULE_9__constants_consoles__["a" /* CONSOLES */];
        this.getLoggedInUserId(this.profile.nickname);
        this.getUserRifterAndRifteeSessions(this.profile.nickname);
        this.getUserSessionRequests(this.profile.nickname);
    };
    UsersessionsComponent.prototype.getUserRifterAndRifteeSessions = function (riftTag) {
        var _this = this;
        this.currentUser.sessions = [];
        this.userSessionsService.getUserRifterAndRifteeSessions(riftTag).subscribe(function (resBody) {
            var sessions = resBody;
            for (var i = 0; i < sessions.length; i++) {
                var currSession = new __WEBPACK_IMPORTED_MODULE_3__models_session__["a" /* Session */]();
                var session = sessions[i];
                currSession.hostId = session.hostId;
                currSession.id = session.id;
                currSession.sessionCost = session.sessionCost;
                currSession.title = session.title;
                currSession.sessionTime = session.sessionTime;
                currSession.gameId = session.gameId;
                currSession.console = session.console;
                if (session.usertable) {
                    currSession.firstName = session.usertable.firstName;
                    currSession.lastName = session.usertable.lastName;
                    currSession.riftTag = session.usertable.riftTag;
                    currSession.rifterRating = session.usertable.rifterRating;
                    currSession.type = false;
                }
                else {
                    currSession.firstName = _this.profile["http://riftgaming:auth0:com/user_metadata"].firstName;
                    currSession.lastName = _this.profile["http://riftgaming:auth0:com/user_metadata"].lastName;
                    currSession.riftTag = riftTag;
                    currSession.type = true;
                }
                currSession.numSlots = session.slotsRemaining;
                _this.currentUser.sessions.push(currSession);
            }
        });
    };
    UsersessionsComponent.prototype.getUserSessionRequests = function (riftTag) {
        var _this = this;
        this.loggedInUser.sessionRequests = new Map();
        this.userSessionsService.getSessionRequests(riftTag).subscribe(function (resBody) {
            //noinspection TypeScriptUnresolvedVariable
            for (var i = 0; i < resBody.length; i++) {
                var request = new __WEBPACK_IMPORTED_MODULE_5__models_session_request__["a" /* SessionRequest */]();
                request.accepted = resBody[i].accepted;
                request.hostId = resBody[i].hostId;
                request.rifteeId = resBody[i].rifteeId;
                request.sessionId = resBody[i].sessionId;
                _this.loggedInUser.sessionRequests.set(request.sessionId, request);
            }
        });
    };
    UsersessionsComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
            _this.loggedInUser.id = resBody.id;
        });
    };
    UsersessionsComponent.prototype.openCreateSessionDialog = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__create_session_create_session_component__["a" /* CreateSessionComponent */], {
            data: {
                loggedInUserId: this.loggedInUser.id
            }
        });
    };
    Object.defineProperty(UsersessionsComponent.prototype, "selectedGames", {
        get: function () {
            return this.games.reduce(function (games, game) {
                if (game.selected) {
                    games.push(game.id);
                }
                return games;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersessionsComponent.prototype, "selectedConsoles", {
        get: function () {
            return this.consoles.reduce(function (consoles, console) {
                if (console.selected) {
                    consoles.push(console.name);
                }
                return consoles;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    UsersessionsComponent.prototype.renderCalendar = function () {
        this.myCalendar.fullCalendar("removeEvents");
        for (var i = 0; i < this.currentUser.sessions.length; i++) {
            var currSession = this.currentUser.sessions[i];
            var newSession = {};
            if (currSession.type) {
                newSession = {
                    title: currSession.title,
                    sessionId: currSession.id,
                    start: new Date(currSession.sessionTime).toISOString(),
                    color: '#293e49'
                };
            }
            else {
                newSession = {
                    title: currSession.title,
                    sessionId: currSession.id,
                    start: new Date(currSession.sessionTime).toISOString(),
                    color: 'rgb(197, 44, 102)'
                };
            }
            this.myCalendar.fullCalendar('renderEvent', newSession, 'stick');
        }
        this.myCalendar.fullCalendar('render');
        window.dispatchEvent(new Event('resize'));
    };
    UsersessionsComponent.prototype.changeCalendarView = function (view) {
        this.myCalendar.fullCalendar('changeView', view);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_10_ap_angular2_fullcalendar__["CalendarComponent"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_ap_angular2_fullcalendar__["CalendarComponent"])
    ], UsersessionsComponent.prototype, "myCalendar", void 0);
    UsersessionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-usersessions',
            template: __webpack_require__("../../../../../src/app/usersessions/usersessions.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/usersessions.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_11__angular_router__["b" /* Router */]])
    ], UsersessionsComponent);
    return UsersessionsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersessionsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersessionsService = /** @class */ (function () {
    function UsersessionsService(http) {
        this.http = http;
        this.createUserSessionURL = "/api/rifterSession/createGame";
        this.joinUserSessionURL = "/api/sessionRequest/create";
        this.updateSessionRequestURL = "/api/sessionRequest/update";
        this.getSessionRequestsURL = "/api/sessionRequest/";
    }
    UsersessionsService.prototype.getUserRifterAndRifteeSessions = function (riftTag) {
        console.log("running getUserRifterAndRifteeSessions");
        return this.http.get("/api/rifterSession/" + riftTag + "/rifterAndRifteeSessions")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UsersessionsService.prototype.getUserSessionsByGameAccountId = function (id) {
        console.log("Getting user's game accounts");
        return this.http.get("/api/rifterSession/" + id + "/gameAccountId")
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UsersessionsService.prototype.createUserSession = function (data) {
        console.log("running createUserSession");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.createUserSessionURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Created session'); });
    };
    UsersessionsService.prototype.joinUserSession = function (data) {
        console.log("running joinUserSession");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.joinUserSessionURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Joined session'); });
    };
    UsersessionsService.prototype.updateSessionRequest = function (data) {
        console.log("running updateSessionRequest");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put(this.updateSessionRequestURL, data, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Updated session'); });
    };
    UsersessionsService.prototype.getSessionRequests = function (riftTag) {
        // console.log("running getSessionRequest");
        return this.http.get(this.getSessionRequestsURL + riftTag)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UsersessionsService.prototype.getSessionStatus = function (rifteeId, sessionId) {
        console.log("running getSessionStatus");
        return this.http.get("/api/sessionRequest/" + sessionId + "/status/" + rifteeId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UsersessionsService.prototype.kickRifteeFromSession = function () {
        console.log("Kicking riftee from session");
    };
    UsersessionsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], UsersessionsService);
    return UsersessionsService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map