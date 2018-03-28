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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_notification__ = __webpack_require__("../../../../../src/app/models/notification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constants_notification_content__ = __webpack_require__("../../../../../src/app/constants/notification-content.ts");
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
    function AppComponent(auth, userprofileService, paymentService, http, globals, notificationsService) {
        this.auth = auth;
        this.userprofileService = userprofileService;
        this.paymentService = paymentService;
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
                // pollNotifications(id);
                getUserNotifications(profile.nickname);
            });
            if (createUser) {
                var btData = {
                    "firstName": data.firstName,
                    "lastName": data.lastName
                };
                paymentService.createBraintreeUser(btData).subscribe(function (resBody) {
                    var braintreeId = resBody.customerId;
                    var riftData = {
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "riftTag": data.riftTag,
                        "auth0Token": data.auth0Token,
                        "braintreeId": braintreeId,
                        "email": data.email
                    };
                    userprofileService.createUser(riftData);
                });
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
                        var notification = new __WEBPACK_IMPORTED_MODULE_6__models_notification__["a" /* Notification */]();
                        notification.createdTime = resBody[i].createdTime;
                        notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
                        notification.creatorEmail = resBody[i].creatorUsertable.email;
                        notification.creatorId = resBody[i].creatorUsertable.id;
                        // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
                        notification.notificationType = resBody[i].notificationType;
                        notification.notificationContent = __WEBPACK_IMPORTED_MODULE_8__constants_notification_content__["a" /* NOTIFICATION_CONTENT */][notification.notificationType];
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
                    var notification = new __WEBPACK_IMPORTED_MODULE_6__models_notification__["a" /* Notification */]();
                    notification.notificationContent = "No notifications";
                    notification.creatorProfilePic = "";
                    notification.createdTime = -1;
                    notifications.push(notification);
                }
            });
        }
    }
    AppComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem("profile"));
        if (this.profile) {
            this.userprofileService.getUser(this.profile.nickname).subscribe(function (resBody) {
                var id = resBody.id;
                // this.notificationsService.pollNotifications(id, this.notificationList, false);
            });
            this.getUserNotifications(this.profile.nickname);
        }
    };
    AppComponent.prototype.beforeUnloadHandler = function (event) {
        this.userprofileService.getUser(this.profile.nickname).subscribe(function (resBody) {
            var id = resBody.id;
            // this.notificationsService.stopPolling(id);
        });
    };
    AppComponent.prototype.getUserNotifications = function (riftTag) {
        var _this = this;
        console.log("Getting user notifications");
        this.userprofileService.getUserNotifications(riftTag).subscribe(function (resBody) {
            if (resBody.length > 0) {
                for (var i = resBody.length - 1; i > -1; i--) {
                    var notification = new __WEBPACK_IMPORTED_MODULE_6__models_notification__["a" /* Notification */]();
                    notification.createdTime = resBody[i].createdTime;
                    notification.creatorRiftTag = resBody[i].creatorUsertable.riftTag;
                    notification.creatorEmail = resBody[i].creatorUsertable.email;
                    notification.creatorId = resBody[i].creatorUsertable.id;
                    // this.getNotificationProfilePicture(notification.creatorRiftTag, notification);
                    notification.notificationType = resBody[i].notificationType;
                    notification.notificationContent = __WEBPACK_IMPORTED_MODULE_8__constants_notification_content__["a" /* NOTIFICATION_CONTENT */][notification.notificationType];
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
                var notification = new __WEBPACK_IMPORTED_MODULE_6__models_notification__["a" /* Notification */]();
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
            __WEBPACK_IMPORTED_MODULE_4__userprofile_payment_service__["a" /* PaymentService */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__global_globals__["a" /* Globals */], __WEBPACK_IMPORTED_MODULE_7__userprofile_notifications_service__["a" /* NotificationsService */]])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__usersessions_sessionform_sessionform_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/sessionform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__usersessions_sessionform_formnav_formnav_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/formnav/formnav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__usersessions_sessionform_step1_step1_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/step1/step1.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__usersessions_sessionform_step2_step2_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/step2/step2.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__usersessions_sessionform_step3_step3_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/step3/step3.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__usersessions_sessionform_result_result_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/result/result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__usersessions_sessionform_data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__usersessions_sessionform_workflow_workflow_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/workflow/workflow.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_wizard_dist__ = __webpack_require__("../../../../angular2-wizard/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_wizard_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_angular2_wizard_dist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_follow_button_follow_button_component__ = __webpack_require__("../../../../../src/app/components/follow-button/follow-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__userprofile_update_info_update_info_component__ = __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__userprofile_update_info_data_update_info_service__ = __webpack_require__("../../../../../src/app/userprofile/update-info/data/update-info.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_search_bar_search_bar_component__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_search_bar_search_bar_service__ = __webpack_require__("../../../../../src/app/components/search-bar/search-bar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_user_card_user_card_component__ = __webpack_require__("../../../../../src/app/components/user-card/user-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__therift_riftsessions_session_page_session_page_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__therift_riftsessions_session_page_session_page_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__userprofile_user_rating_user_rating_component__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__userprofile_user_rating_data_user_rating_service__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/data/user-rating.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__angular_material_select__ = __webpack_require__("../../../material/esm5/select.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__angular_material_slider__ = __webpack_require__("../../../material/esm5/slider.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_user_review_user_review_component__ = __webpack_require__("../../../../../src/app/components/user-review/user-review.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_notification_notification_component__ = __webpack_require__("../../../../../src/app/components/notification/notification.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_angular_calendar__ = __webpack_require__("../../../../angular-calendar/esm5/angular-calendar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__components_rating_rating_component__ = __webpack_require__("../../../../../src/app/components/rating/rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__therift_riftsessions_session_page_update_session_update_session_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__therift_riftsessions_session_page_update_session_data_update_session_service__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/data/update-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_session_accept_reject_button_session_accept_reject_button_component__ = __webpack_require__("../../../../../src/app/components/session-accept-reject-button/session-accept-reject-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__angular_material_dialog__ = __webpack_require__("../../../material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__angular_material_checkbox__ = __webpack_require__("../../../material/esm5/checkbox.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__global_globals__ = __webpack_require__("../../../../../src/app/global/globals.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__usersessions_create_session_data_create_session_service__ = __webpack_require__("../../../../../src/app/usersessions/create-session/data/create-session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__usersessions_create_session_create_session_component__ = __webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pipes_session_type_pipe__ = __webpack_require__("../../../../../src/app/pipes/session-type.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pipes_session_time_pipe__ = __webpack_require__("../../../../../src/app/pipes/session-time.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pipes_game_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/game-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pipes_console_filter_pipe__ = __webpack_require__("../../../../../src/app/pipes/console-filter.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_ap_angular2_fullcalendar_src_calendar_calendar__ = __webpack_require__("../../../../ap-angular2-fullcalendar/src/calendar/calendar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61_ap_angular2_fullcalendar_src_calendar_calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_61_ap_angular2_fullcalendar_src_calendar_calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62_angular2_image_upload__ = __webpack_require__("../../../../angular2-image-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__components_file_upload_file_upload_component__ = __webpack_require__("../../../../../src/app/components/file-upload/file-upload.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64_ngx_braintree__ = __webpack_require__("../../../../ngx-braintree/ngx-braintree.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__feed_feed_component__ = __webpack_require__("../../../../../src/app/feed/feed.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__components_feed_card_feed_card_component__ = __webpack_require__("../../../../../src/app/components/feed-card/feed-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__userprofile_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__userprofile_notifications_service__ = __webpack_require__("../../../../../src/app/userprofile/notifications.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__userprofile_file_a_complaint_file_a_complaint_component__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__userprofile_file_a_complaint_data_file_a_complaint_service__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/data/file-a-complaint-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__components_kick_riftee_button_kick_riftee_button_component__ = __webpack_require__("../../../../../src/app/components/kick-riftee-button/kick-riftee-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__game_api_league_of_legends_league_of_legends_component__ = __webpack_require__("../../../../../src/app/game-api/league-of-legends/league-of-legends.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__game_api_league_of_legends_league_of_legends_service__ = __webpack_require__("../../../../../src/app/game-api/league-of-legends/league-of-legends.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__userprofile_twitch_service__ = __webpack_require__("../../../../../src/app/userprofile/twitch.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__userprofile_youtube_service__ = __webpack_require__("../../../../../src/app/userprofile/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__userprofile_game_account_add_game_account_add_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/add-game-account/add-game-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__userprofile_game_account_edit_game_account_edit_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__userprofile_game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















































































function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_33_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_33_angular2_jwt__["AuthConfig"]({
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
                __WEBPACK_IMPORTED_MODULE_21__usersessions_sessionform_sessionform_component__["a" /* SessionformComponent */],
                __WEBPACK_IMPORTED_MODULE_22__usersessions_sessionform_formnav_formnav_component__["a" /* FormnavComponent */],
                __WEBPACK_IMPORTED_MODULE_23__usersessions_sessionform_step1_step1_component__["a" /* Step1Component */],
                __WEBPACK_IMPORTED_MODULE_24__usersessions_sessionform_step2_step2_component__["a" /* Step2Component */],
                __WEBPACK_IMPORTED_MODULE_25__usersessions_sessionform_step3_step3_component__["a" /* Step3Component */],
                __WEBPACK_IMPORTED_MODULE_26__usersessions_sessionform_result_result_component__["a" /* ResultComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_follow_button_follow_button_component__["a" /* FollowButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_31__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_34__components_search_bar_search_bar_component__["a" /* SearchBarComponent */],
                __WEBPACK_IMPORTED_MODULE_36__components_user_card_user_card_component__["a" /* UserCardComponent */],
                __WEBPACK_IMPORTED_MODULE_37__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */],
                __WEBPACK_IMPORTED_MODULE_39__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */],
                __WEBPACK_IMPORTED_MODULE_43__components_user_review_user_review_component__["a" /* UserReviewComponent */],
                __WEBPACK_IMPORTED_MODULE_44__components_notification_notification_component__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_47__components_rating_rating_component__["a" /* RatingComponent */],
                __WEBPACK_IMPORTED_MODULE_48__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_50__components_session_accept_reject_button_session_accept_reject_button_component__["a" /* SessionAcceptRejectButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_56__usersessions_create_session_create_session_component__["a" /* CreateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_61_ap_angular2_fullcalendar_src_calendar_calendar__["CalendarComponent"],
                __WEBPACK_IMPORTED_MODULE_20__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_57__pipes_session_type_pipe__["a" /* SessionTypePipe */],
                __WEBPACK_IMPORTED_MODULE_58__pipes_session_time_pipe__["a" /* SessionTimePipe */],
                __WEBPACK_IMPORTED_MODULE_59__pipes_game_filter_pipe__["a" /* GameFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_60__pipes_console_filter_pipe__["a" /* ConsoleFilterPipe */],
                __WEBPACK_IMPORTED_MODULE_63__components_file_upload_file_upload_component__["a" /* FileUploadComponent */],
                __WEBPACK_IMPORTED_MODULE_65__feed_feed_component__["a" /* FeedComponent */],
                __WEBPACK_IMPORTED_MODULE_66__components_feed_card_feed_card_component__["a" /* FeedCardComponent */],
                __WEBPACK_IMPORTED_MODULE_69__userprofile_file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */],
                __WEBPACK_IMPORTED_MODULE_71__components_kick_riftee_button_kick_riftee_button_component__["a" /* KickRifteeButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_72__game_api_league_of_legends_league_of_legends_component__["a" /* LeagueOfLegendsComponent */],
                __WEBPACK_IMPORTED_MODULE_76__userprofile_game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_77__userprofile_game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__app_router__["a" /* routes */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_tabs__["a" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["h" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__["b" /* NoopAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["e" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["f" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["b" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material__["g" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_51__angular_material_dialog__["c" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_29_angular2_wizard_dist__["FormWizardModule"],
                __WEBPACK_IMPORTED_MODULE_41__angular_material_select__["a" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_42__angular_material_slider__["a" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_52__angular_material_checkbox__["a" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_64_ngx_braintree__["a" /* NgxBraintreeModule */],
                __WEBPACK_IMPORTED_MODULE_45_angular_calendar__["a" /* CalendarModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_46__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_53_ngx_bootstrap__["b" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_53_ngx_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_53_ngx_bootstrap__["e" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_53_ngx_bootstrap__["d" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_62_angular2_image_upload__["a" /* ImageUploadModule */].forRoot()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_63__components_file_upload_file_upload_component__["a" /* FileUploadComponent */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_37__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */], __WEBPACK_IMPORTED_MODULE_48__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */], __WEBPACK_IMPORTED_MODULE_15__usersessions_usersessions_component__["a" /* UsersessionsComponent */], __WEBPACK_IMPORTED_MODULE_56__usersessions_create_session_create_session_component__["a" /* CreateSessionComponent */],
                __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_component__["a" /* UserprofileComponent */], __WEBPACK_IMPORTED_MODULE_31__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */], __WEBPACK_IMPORTED_MODULE_39__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */], __WEBPACK_IMPORTED_MODULE_69__userprofile_file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */], __WEBPACK_IMPORTED_MODULE_76__userprofile_game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_77__userprofile_game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_12__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_13__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_19__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_32__userprofile_update_info_data_update_info_service__["a" /* UpdateInfoService */], __WEBPACK_IMPORTED_MODULE_35__components_search_bar_search_bar_service__["a" /* SearchBarService */], __WEBPACK_IMPORTED_MODULE_38__therift_riftsessions_session_page_session_page_service__["a" /* SessionPageService */],
                __WEBPACK_IMPORTED_MODULE_40__userprofile_user_rating_data_user_rating_service__["a" /* UserRatingService */], __WEBPACK_IMPORTED_MODULE_49__therift_riftsessions_session_page_update_session_data_update_session_service__["a" /* UpdateSessionService */], __WEBPACK_IMPORTED_MODULE_55__usersessions_create_session_data_create_session_service__["a" /* CreateSessionService */], __WEBPACK_IMPORTED_MODULE_67__userprofile_payment_service__["a" /* PaymentService */], __WEBPACK_IMPORTED_MODULE_68__userprofile_notifications_service__["a" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_70__userprofile_file_a_complaint_data_file_a_complaint_service__["a" /* FileAComplaintService */],
                __WEBPACK_IMPORTED_MODULE_73__game_api_league_of_legends_league_of_legends_service__["a" /* LeagueOfLegendsService */], __WEBPACK_IMPORTED_MODULE_75__userprofile_youtube_service__["a" /* YoutubeService */], __WEBPACK_IMPORTED_MODULE_74__userprofile_twitch_service__["a" /* TwitchService */], __WEBPACK_IMPORTED_MODULE_78__userprofile_game_account_game_account_service__["a" /* GameAccountService */],
                { provide: __WEBPACK_IMPORTED_MODULE_27__usersessions_sessionform_data_formData_service__["a" /* FormDataService */], useClass: __WEBPACK_IMPORTED_MODULE_27__usersessions_sessionform_data_formData_service__["a" /* FormDataService */] },
                { provide: __WEBPACK_IMPORTED_MODULE_28__usersessions_sessionform_workflow_workflow_service__["a" /* WorkflowService */], useClass: __WEBPACK_IMPORTED_MODULE_28__usersessions_sessionform_workflow_workflow_service__["a" /* WorkflowService */] },
                { provide: __WEBPACK_IMPORTED_MODULE_33_angular2_jwt__["AuthHttp"], useFactory: authHttpServiceFactory, deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]] },
                { provide: __WEBPACK_IMPORTED_MODULE_8__angular_material__["a" /* MAT_DIALOG_DATA */], useValue: {} },
                __WEBPACK_IMPORTED_MODULE_54__global_globals__["a" /* Globals */]
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__usersessions_sessionform_sessionform_component__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/sessionform.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__userprofile_update_info_update_info_component__ = __webpack_require__("../../../../../src/app/userprofile/update-info/update-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__therift_riftsessions_session_page_session_page_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/session-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__userprofile_user_rating_user_rating_component__ = __webpack_require__("../../../../../src/app/userprofile/user-rating/user-rating.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__therift_riftsessions_session_page_update_session_update_session_component__ = __webpack_require__("../../../../../src/app/therift/riftsessions/session-page/update-session/update-session.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__feed_feed_component__ = __webpack_require__("../../../../../src/app/feed/feed.component.ts");











var router = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'user/:rifttag', component: __WEBPACK_IMPORTED_MODULE_1__userprofile_userprofile_component__["a" /* UserprofileComponent */],
        children: [
            { path: 'update', component: __WEBPACK_IMPORTED_MODULE_6__userprofile_update_info_update_info_component__["a" /* UpdateInfoComponent */] },
            { path: 'rate', component: __WEBPACK_IMPORTED_MODULE_8__userprofile_user_rating_user_rating_component__["a" /* UserRatingComponent */] }
        ]
    },
    { path: 'sessions', component: __WEBPACK_IMPORTED_MODULE_2__usersessions_usersessions_component__["a" /* UsersessionsComponent */],
        children: [
            { path: 'create', component: __WEBPACK_IMPORTED_MODULE_5__usersessions_sessionform_sessionform_component__["a" /* SessionformComponent */] },
        ]
    },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */],
    },
    { path: 'youtube', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */] },
    { path: 'twitch', component: __WEBPACK_IMPORTED_MODULE_3__therift_therift_component__["a" /* TheriftComponent */] },
    { path: 'therift/:searchQuery', component: __WEBPACK_IMPORTED_MODULE_4__therift_riftsessions_riftsessions_component__["a" /* RiftsessionsComponent */] },
    { path: 'session/:sessionId', component: __WEBPACK_IMPORTED_MODULE_7__therift_riftsessions_session_page_session_page_component__["a" /* SessionPageComponent */],
        children: [
            { path: 'update', component: __WEBPACK_IMPORTED_MODULE_9__therift_riftsessions_session_page_update_session_update_session_component__["a" /* UpdateSessionComponent */] }
        ]
    },
    { path: 'feed', component: __WEBPACK_IMPORTED_MODULE_10__feed_feed_component__["a" /* FeedComponent */] }
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
    callbackURL: 'http://localhost:4200',
    apiUrl: 'https://riftgaming.auth0.com/api/v2/'
};


/***/ }),

/***/ "../../../../../src/app/components/feed-card/feed-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div ng-view class=\"col-xs-2\"></div>\n    <div class=\"col-xs-8\">\n      <div class=\"box\">\n        <div class=\"box-icon\">\n          <img src=\"{{notification.creatorProfilePic}}\" class=\"profile-pic\">\n        </div>\n\n        <div class=\"info\">\n          <h4 class=\"text-center\">{{notification.firstName}} {{notification.lastName}}</h4>\n          <small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>\n          <p><b>{{notification.riftTag}}</b> {{notification.notificationContent}} {{notification.rifterSession.title}}</p>\n          <app-session-card [routerLink]=\"['../session', notification.rifterSession.id]\"\n                            [session]=\"notification.rifterSession\" [isLoggedIn]=\"isLoggedIn\"\n                            [type]=\"notification.rifterSession.type\"\n          ></app-session-card>\n        </div>\n      </div>\n    </div>\n    <div ng-view class=\"col-xs-2\"></div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/feed-card/feed-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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

module.exports = "<input *ngIf=\"showFileNameInput\" id=\"uploadFile\" class=\"upload-file form-control\" placeholder=\"Choose File\" [(ngModel)]=\"selectedFileName\" disabled=\"disabled\" />\n<div class=\"fileUpload btn btn-primary\">\n  <span>{{uploadButtonText}}</span>\n  <input type=\"file\" class=\"upload\" accept=\"*\" (change)=\"changeListener($event)\">\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/file-upload/file-upload.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
        this.selectedFileName = null;
        this.propagateChange = function (_) { };
    }
    FileUploadComponent_1 = FileUploadComponent;
    FileUploadComponent.prototype.writeValue = function (value) {
        //Handle write value
    };
    FileUploadComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    FileUploadComponent.prototype.registerOnTouched = function () { };
    FileUploadComponent.prototype.changeListener = function ($event) {
        // debugger; // uncomment this for debugging purposes
        this.readThis($event.target);
    };
    FileUploadComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        // debugger; // uncomment this for debugging purposes
        var file = inputValue.files[0];
        var myReader = new FileReader();
        myReader.onloadend = function (e) {
            _this.propagateChange(myReader.result);
            _this.selectedFileName = file.name;
        };
        myReader.readAsDataURL(file);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], FileUploadComponent.prototype, "showFileNameInput", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], FileUploadComponent.prototype, "uploadButtonText", void 0);
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
        })
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-toggle-following {\n  background-color: #293e49;\n  color: #fff; }\n\n.btn-toggle-following:hover {\n  background-color: #ef2020;\n  color: #fff; }\n\n.btn-toggle-following:hover span {\n  display: none; }\n\n.btn-toggle-following:hover:after {\n  content: 'Unfollow';\n  display: inline; }\n\n.btn-toggle-following:hover i:before {\n  content: '\\F129'; }\n\n.btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 92px; }\n", ""]);

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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    function KickRifteeButtonComponent(sessionService, modalService, changeDetectorRef) {
        this.sessionService = sessionService;
        this.modalService = modalService;
        this.changeDetectorRef = changeDetectorRef;
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
        console.log(data);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap__["c" /* BsModalService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], KickRifteeButtonComponent);
    return KickRifteeButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/notification/notification.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"media activity-item\">\n  <a href=\"#\" class=\"pull-left\">\n    <img src=\"{{notification.creatorProfilePic}}\" class=\"media-object avatar\">\n  </a>\n  <div class=\"media-body\">\n    <p class=\"activity-title\"><b>{{creatorRiftTag}}</b>\n      {{notification.notificationContent}}\n      <a [routerLink]=\"['../session', notification.sessionId]\">{{notification.sessionTitle}}</a>\n    </p>\n    <div *ngIf=\"status == 0\">\n      rejected\n    </div>\n    <div *ngIf=\"status == 1\">\n      pending\n    </div>\n    <div *ngIf=\"status == 2\">\n      accepted\n    </div>\n    <small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>\n  </div>\n  <div class=\"btn-group pull-right activity-actions\" *ngIf=\"notification.notificationType == 3\">\n    <app-session-accept-reject-button\n    [notification]=\"notification\" [status]=\"status\">\n    </app-session-accept-reject-button>\n  </div>\n</div>\n<div class=\"divider dropdown-divider\"></div>\n"

/***/ }),

/***/ "../../../../../src/app/components/notification/notification.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
        this.getRiftTagById(this.notification.creatorId);
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
            //noinspection TypeScriptUnresolvedVariable
            _this.status = resBody.status;
        });
    };
    NotificationComponent.prototype.getRiftTagById = function (id) {
        var _this = this;
        this.userProfileService.getUserRiftTag(this.notification.creatorId).subscribe(function (resBody) {
            //noinspection TypeScriptUnresolvedVariable
            _this.creatorRiftTag = resBody.riftTag;
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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

module.exports = "<div class=\"navbar-form navbar-left\">\n  <div class=\"input-group\">\n    <input type=\"text\" class=\"form-control form-rounded\" placeholder=\"Search the Rift\" [(ngModel)]=\"searchQuery\">\n    <span class=\"input-group-btn\">\n      <button class=\"btn btn-default btn-rounded\" type=\"button\" [routerLink]=\"['therift/', searchQuery]\">\n        <i class=\"glyphicon glyphicon-search\" style=\"color: white\"></i>\n      </button>\n    </span>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/search-bar/search-bar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".form-rounded, .btn-rounded {\n  border-radius: 1rem;\n  background-color: transparent;\n  color: white; }\n\n.btn-rounded {\n  border-left: none; }\n\n.glyphicon .glyphicon-search {\n  color: white !important; }\n", ""]);

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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__userprofile_payment_service__ = __webpack_require__("../../../../../src/app/userprofile/payment.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
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
    function SessionAcceptRejectButtonComponent(userSessionService, paymentService, userProfileService) {
        this.userSessionService = userSessionService;
        this.paymentService = paymentService;
        this.userProfileService = userProfileService;
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    SessionAcceptRejectButtonComponent.prototype.ngOnInit = function () {
    };
    SessionAcceptRejectButtonComponent.prototype.acceptRequest = function () {
        var data = {
            "accepted": 2,
            "hostId": this.notification.userId,
            "sessionId": this.notification.sessionId,
            "rifteeId": this.notification.creatorId
        };
        // this.getTransactionData(data.rifteeId, data.sessionId);
        this.userSessionService.updateSessionRequest(data);
        this.status = 2;
        this.sendConfirmationEmail();
        console.log("Accepted request");
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
    SessionAcceptRejectButtonComponent.prototype.getTransactionData = function (riftId, sessionId) {
        var _this = this;
        this.paymentService.getTransactionData(riftId, sessionId).subscribe(function (resBody) {
            //noinspection TypeScriptUnresolvedVariable
            _this.doTransaction(resBody.braintreeId, resBody.sessionCost);
        });
    };
    SessionAcceptRejectButtonComponent.prototype.doTransaction = function (customerId, amount) {
        this.paymentService.doTransaction(customerId, amount);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_2__userprofile_payment_service__["a" /* PaymentService */],
            __WEBPACK_IMPORTED_MODULE_3__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], SessionAcceptRejectButtonComponent);
    return SessionAcceptRejectButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/session-card/session-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"event-list\">\n  <div>\n    <time datetime=\"2014-07-20\" [ngClass]=\"{'rifter': type, 'riftee':!type}\">\n      <span class=\"day\">{{session.sessionTime | date:'dd'}}</span>\n      <span class=\"month\">{{session.sessionTime | date:'MMM'}}</span>\n    </time>\n    <img src=\"{{sessionIcon}}\" />\n    <div class=\"info\">\n      <h2 class=\"title\">{{session.title}}</h2>\n      <p class=\"desc\">@{{session.riftTag}}</p>\n      <div *ngIf=\"!type\">\n      <app-rating [rating]=\"session.rifterRating\" [readonly]=\"true\"></app-rating>\n      </div>\n      <p class=\"desc\">{{session.sessionTime | date:'shortTime'}} </p>\n    </div>\n    <div class=\"otherstuff\">\n      <div class=\"statusButtons\" *ngIf=\"isLoggedIn && !(loggedInUserId == session.hostId)\">\n        <button class=\"btn-primary\" *ngIf=\"!request\" (click)=\"changeStatus(template)\">Join</button>\n        <button class=\"btn-primary\" *ngIf=\"request && request.accepted==1\">Pending</button>\n        <button class=\"btn-primary\" *ngIf=\"request && request.accepted==0\">Rejected</button>\n        <button class=\"btn-primary\" *ngIf=\"request && request.accepted==2\">Accepted</button>\n      </div>\n      <div>\n        <img alt=\"{{session.console}}\" class=\"consoleIcon\" src=\"{{consoleIcon}}\" />\n      </div>\n    </div>\n    <ng-template #template style=\"margin-top:20%\">\n      <div class=\"modal-body text-center\">\n        <p>What game account do you want to use?</p>\n        <div class=\"form-group\">\n          <label for=\"account\">Select an Account</label>\n          <select class=\"form-control\" id=\"account\" [(ngModel)]=\"accountId\">\n            <option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">{{account.ign}}</option>\n          </select>\n        </div><br>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"joinUserSession()\" >Yes</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n      </div>\n    </ng-template>\n\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/components/session-card/session-card.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,400italic\");\n@import url(\"//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css\");\n.info {\n  width: 60%;\n  display: inline-block; }\n.consoleIcon {\n  max-height: 25px;\n  max-width: 25px; }\n.riftee {\n  display: inline-block;\n  width: 100%;\n  color: white;\n  background-color: #c52c66;\n  padding: 5px;\n  text-align: center;\n  text-transform: uppercase; }\n.rifter {\n  display: inline-block;\n  width: 100%;\n  color: white;\n  padding: 5px;\n  text-align: center;\n  text-transform: uppercase;\n  background-color: #293e49; }\n.otherstuff {\n  display: inline-block;\n  position: absolute;\n  top: 10px;\n  right: 20px; }\n.event-list {\n  list-style: none;\n  font-family: 'Lato', sans-serif;\n  margin: 0px;\n  padding: 0px; }\n.event-list > div {\n  background-color: white;\n  -webkit-box-shadow: 0px 0px 5px #333333;\n          box-shadow: 0px 0px 5px #333333;\n  -webkit-box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);\n          box-shadow: 0px 0px 5px rgba(51, 51, 51, 0.7);\n  padding: 0px;\n  margin: 0px 0px 20px; }\n.event-list > div:nth-child(even) > time {\n  background-color: #a552a7; }\n.event-list > div > time > span {\n  display: none; }\n.event-list > div > time > .day {\n  display: block;\n  font-size: 56pt;\n  font-weight: 100;\n  line-height: 1; }\n.event-list > div time > .month {\n  display: block;\n  font-size: 24pt;\n  font-weight: 900;\n  line-height: 1; }\n.event-list > div > img {\n  width: 100%; }\n.event-list > div > .info {\n  padding-top: 5px;\n  text-align: center; }\n.event-list > div > .info > .title {\n  font-size: 17pt;\n  font-weight: 700;\n  margin: 0px; }\n.event-list > div > .info > .desc {\n  font-size: 13pt;\n  font-weight: 300;\n  margin: 0px; }\n@media (min-width: 768px) {\n  .event-list > div {\n    position: relative;\n    display: block;\n    width: 100%;\n    height: 120px;\n    padding: 0px; }\n  .event-list > div > time,\n  .event-list > div > img {\n    display: inline-block; }\n  .event-list > div > time,\n  .event-list > div > img {\n    width: 120px;\n    float: left; }\n  .event-list > div > .info {\n    background-color: whitesmoke;\n    overflow: hidden; }\n  .event-list > div > time,\n  .event-list > div > img {\n    width: 120px;\n    height: 120px;\n    padding: 0px;\n    margin: 0px; }\n  .event-list > div > .info {\n    position: relative;\n    height: 120px;\n    text-align: left;\n    padding-right: 40px; }\n  .event-list > div > .info > .title,\n  .event-list > div > .info > .desc {\n    padding: 0px 10px; }\n  .event-list > div > .info > ul {\n    position: absolute;\n    left: 0px;\n    bottom: 0px; }\n  .event-list > div > .social {\n    position: absolute;\n    top: 0px;\n    right: 0px;\n    display: block;\n    width: 40px; }\n  .event-list > div > .social > ul {\n    border-left: 1px solid #e6e6e6; }\n  .event-list > div > .social > ul > div {\n    display: block;\n    padding: 0px; }\n  .event-list > div > .social > ul > div > a {\n    display: block;\n    width: 40px;\n    padding: 10px 0px 9px; } }\n", ""]);

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
    }
    SessionCardComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
            this.loggedInUserId = JSON.parse(localStorage.getItem("loggedInUserID"));
        }
        else {
            this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    };
    SessionCardComponent.prototype.ngOnInit = function () {
        if (this.isLoggedIn) {
            this.getLoggedInUserId(JSON.parse(localStorage.getItem("profile")).nickname);
        }
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userprofile__ = __webpack_require__("../../../../../src/app/models/userprofile.ts");
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



var UserCardComponent = /** @class */ (function () {
    function UserCardComponent(userProfileService) {
        this.userProfileService = userProfileService;
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    UserCardComponent.prototype.ngOnInit = function () {
        if (this.isLoggedIn) {
            this.getCurrentLoggedInUser();
        }
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
    UserCardComponent.prototype.getCurrentLoggedInUser = function () {
        var _this = this;
        this.userProfileService.getUser(this.profile.nickname).subscribe(function (resBody) {
            _this.loggedInUser.id = resBody.id;
            for (var i = 0; i < resBody.followings.length; i++) {
                var currFollowing = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
                currFollowing.firstName = resBody.followings[i].followingUsertable.firstName;
                currFollowing.lastName = resBody.followings[i].followingUsertable.lastName;
                currFollowing.riftTag = resBody.followings[i].followingUsertable.riftTag;
                _this.loggedInUser.followings.push(currFollowing);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], UserCardComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], UserCardComponent.prototype, "isLoggedIn", void 0);
    UserCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-card',
            template: __webpack_require__("../../../../../src/app/components/user-card/user-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/user-card/user-card.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], UserCardComponent);
    return UserCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/user-review/user-review.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-3\">\n  <img src=\"http://dummyimage.com/60x60/666/ffffff&text=No+Image\" class=\"img-rounded\">\n  <div class=\"review-block-name\">\n    <a [routerLink] = \"['../', rating.reviewerUsertable.riftTag]\">\n      {{rating.reviewerUsertable.firstName}} {{rating.reviewerUsertable.lastName}}<br>\n      @{{rating.reviewerUsertable.riftTag}}\n    </a>\n  </div>\n  <div class=\"review-block-date\">{{rating.createdTime | date: longDate}}<br/>1 day ago</div>\n</div>\n<div class=\"col-sm-9\">\n  <div class=\"review-block-rate\">\n    {{accountType}}<br>\n    <button type=\"button\" class=\"btn btn-warning btn-xs\" aria-label=\"Left Align\">\n      <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-warning btn-xs\" aria-label=\"Left Align\">\n      <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-warning btn-xs\" aria-label=\"Left Align\">\n      <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-grey btn-xs\" aria-label=\"Left Align\">\n      <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-grey btn-xs\" aria-label=\"Left Align\">\n      <span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n    </button>\n    {{rating.rating}}\n  </div>\n  <div class=\"review-block-title\">{{rating.reviewTitle}}</div>\n  <div class=\"review-block-description\">{{rating.review}}</div>\n</div>\n\n<!---->\n"

/***/ }),

/***/ "../../../../../src/app/components/user-review/user-review.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".review-block-name {\n  font-size: 12px;\n  margin: 10px 0; }\n\n.review-block-date {\n  font-size: 12px; }\n\n.review-block-rate {\n  font-size: 13px;\n  margin-bottom: 15px; }\n\n.review-block-title {\n  font-size: 15px;\n  font-weight: 700;\n  margin-bottom: 10px; }\n\n.review-block-description {\n  font-size: 13px; }\n", ""]);

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

/***/ "../../../../../src/app/constants/activity-content.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACTIVITY_CONTENT; });
var ACTIVITY_CONTENT = [
    "created a new session: ",
    "updated session: ",
    "cancelled session: ",
    "has joined a session: "
];


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
    "XBox One": "http://images.thisisxbox.com/2013/05/XboxOne_RGB_stacked.png",
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
var NOTIFICATION_CONTENT = [
    "has accepted your request to join session: ",
    "has rejected your request to join session: ",
    "started following you",
    "has requested to join your session: "
];


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
    0: 'https://yt3.ggpht.com/a-/AJLlDp2tN8kN8LY4yIbOOr38BjneYXpM3LsfVCxrzg=s900-mo-c-c0xffffffff-rj-k-no',
    1: 'https://orig00.deviantart.net/4a6d/f/2016/137/b/d/overwatch_tracer_icon_by_troublem4ker-da2twls.png',
    2: 'https://t00.deviantart.net/pzi0PG9h1nqLy7LzAQcSq18kQ1I=/fit-in/150x150/filters:no_upscale():origin()/pre00/9f4f/th/pre/f/2017/261/9/f/fortnite___icon_by_blagoicons-dbnu8a0.png',
    3: 'https://orig00.deviantart.net/a418/f/2017/260/8/6/nba_2k18___icon_by_blagoicons-dbnptmr.png'
};


/***/ }),

/***/ "../../../../../src/app/feed/feed.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 5%; width: 80%; text-align: center\">\n  <div *ngFor=\"let notification of currentUser.feed\">\n    <app-feed-card [notification]=\"notification\"></app-feed-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/feed/feed.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_activity_content__ = __webpack_require__("../../../../../src/app/constants/activity-content.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_session__ = __webpack_require__("../../../../../src/app/models/session.ts");
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
                currNotification.notificationContent = __WEBPACK_IMPORTED_MODULE_4__constants_activity_content__["a" /* ACTIVITY_CONTENT */][currNotification.notificationType];
                currNotification.createdTime = currFeed.createdTime;
                currNotification.riftTag = currFeed.creatorUsertable.riftTag;
                currNotification.firstName = currFeed.creatorUsertable.firstName;
                currNotification.lastName = currFeed.creatorUsertable.lastName;
                _this.getActivityProfilePicture(currNotification.riftTag, currNotification);
                var session = new __WEBPACK_IMPORTED_MODULE_5__models_session__["a" /* Session */]();
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
        console.log("Getting user's profile picture");
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

/***/ "../../../../../src/app/game-api/league-of-legends/league-of-legends.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  league-of-legends works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/game-api/league-of-legends/league-of-legends.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/game-api/league-of-legends/league-of-legends.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeagueOfLegendsComponent; });
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

var LeagueOfLegendsComponent = /** @class */ (function () {
    function LeagueOfLegendsComponent() {
    }
    LeagueOfLegendsComponent.prototype.ngOnInit = function () {
    };
    LeagueOfLegendsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-league-of-legends',
            template: __webpack_require__("../../../../../src/app/game-api/league-of-legends/league-of-legends.component.html"),
            styles: [__webpack_require__("../../../../../src/app/game-api/league-of-legends/league-of-legends.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LeagueOfLegendsComponent);
    return LeagueOfLegendsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/game-api/league-of-legends/league-of-legends.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeagueOfLegendsService; });
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



var LeagueOfLegendsService = /** @class */ (function () {
    function LeagueOfLegendsService(http) {
        this.http = http;
        this.riotUrl = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
        this.apiKey = "RGAPI-279e8bf9-320f-48d9-965e-cb057d623358";
    }
    LeagueOfLegendsService.prototype.getSummonerInfo = function (summonerName) {
        return this.http.get("/api/riotSummoner/" + summonerName)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    LeagueOfLegendsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]])
    ], LeagueOfLegendsService);
    return LeagueOfLegendsService;
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

/***/ "../../../../../src/app/models/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Activity; });
var Activity = /** @class */ (function () {
    function Activity() {
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".navbar {\n  min-height: 70px !important;\n  margin-bottom: 5% !important;\n  background-color: #293e49;\n}\n\n.badge-notify{\n  background:red;\n  position:absolute;\n  top:0px;\n  color: white;\n}\n\na {\n  color: white !important;\n  cursor: pointer;\n}\n\n.container-fluid {\n  margin-top: 10px !important;\n}\n\n.btn-group {\n  margin-top: 9px !important;\n}\n\n.dropdown-toggle {\n  background-color: transparent !important;\n  border: none !important;\n}\n\n.dropdown-item {\n  color: black !important;\n  margin-left: 5px !important;\n  margin-right: 5px !important;\n}\n\napp-notification {\n  color: black !important;\n}\n\n.dropdown-menu {\n  max-height: 600px !important;\n  min-width: 500px !important;\n  overflow-y:scroll !important;\n}\n\n.media {\n  margin-left: 10px !important;\n  margin-right: 10px !important;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-custom navbar-fixed-top\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header page-scroll\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        Menu <i class=\"fa fa-bars\"></i>\n      </button>\n      <app-search-bar></app-search-bar>\n    </div>\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li>\n          <a routerLink=\"feed\" *ngIf=\"auth.isAuthenticated()\">Feed</a>\n        </li>\n        <li>\n          <a routerLink=\"sessions\" *ngIf=\"auth.isAuthenticated()\">Sessions</a>\n        </li>\n        <li>\n          <a [routerLink]=\"['user', getCurrentUser().nickname]\" *ngIf=\"auth.isAuthenticated()\">Profile</a>\n        </li>\n        <li class=\"dropdown\" *ngIf=\"auth.isAuthenticated()\">\n          <div class=\"btn-group\" dropdown>\n            <button dropdownToggle type=\"button\" class=\"btn btn-primary dropdown-toggle\" (click)=\"clearUnseen();\">\n              <span class=\"glyphicon glyphicon-bell\"></span>\n              <span class=\"badge badge-notify\" *ngIf=\"globals.unseenNotifications > 0\">{{globals.unseenNotifications}}</span>\n\n            </button>\n            <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n              <li class=\"media\" *ngFor=\"let notification of notificationsList\">\n                <app-notification [notification]=\"notification\"></app-notification>\n              </li>\n            </ul>\n          </div>\n        </li>\n\n        <li>\n          <a (click)=\"auth.login()\" *ngIf=\"!auth.isAuthenticated()\">Login</a>\n        </li>\n        <li>\n          <a (click)=\"auth.logout()\" *ngIf=\"auth.isAuthenticated()\">Logout</a>\n        </li>\n\n      </ul>\n    </div>\n  </div>\n</nav>\n\n"

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
    function NavbarComponent(auth, userProfileService, notificationService, globals) {
        this.auth = auth;
        this.userProfileService = userProfileService;
        this.notificationService = notificationService;
        this.globals = globals;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_2__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    NavbarComponent.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem('profile'));
    };
    NavbarComponent.prototype.clearUnseen = function () {
        this.globals.unseenNotifications = 0;
        var profile = JSON.parse(localStorage.getItem('profile'));
        this.notificationService.clearUnseen(profile.nickname);
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
            __WEBPACK_IMPORTED_MODULE_5__userprofile_notifications_service__["a" /* NotificationsService */], __WEBPACK_IMPORTED_MODULE_4__global_globals__["a" /* Globals */]])
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

/***/ "../../../../../src/app/therift/riftsessions/riftsessions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"width: 80%\">\n  <mat-tab-group>\n    <mat-tab label=\"users\">\n      <div class=\"user-cards\" *ngFor=\"let user of users\">\n        <app-user-card [user]=\"user\" [isLoggedIn]=\"isLoggedIn\"></app-user-card>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"sessions\">\n      <div *ngFor=\"let session of sessions\">\n        <app-session-card [routerLink]=\"['../../session', session.id]\"\n          [session]=\"session\" [isLoggedIn]=\"isLoggedIn\" [request]=\"loggedInUser.sessionRequests.get(session.id)\">\n        </app-session-card>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/riftsessions.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    function RiftsessionsComponent(searchBarService, route, userSessionsService, userProfileService) {
        this.searchBarService = searchBarService;
        this.route = route;
        this.userSessionsService = userSessionsService;
        this.userProfileService = userProfileService;
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
            if (JSON.parse(localStorage.getItem('profile')) != null) {
                _this.isLoggedIn = true;
            }
            _this.getUserSearchResults(_this.searchQuery);
            _this.getUserSessionRequests(_this.profile.nickname);
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
                _this.getUserProfilePicture(currUser.riftTag, currUser);
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
    RiftsessionsComponent.prototype.getUserProfilePicture = function (riftTag, user) {
        console.log("Getting user's profile picture");
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                user.profilePic = resBody.image;
            }
        });
        return;
        // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
    };
    RiftsessionsComponent.prototype.getUserSessionRequests = function (riftTag) {
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
    RiftsessionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-riftsessions',
            template: __webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.html"),
            styles: [__webpack_require__("../../../../../src/app/therift/riftsessions/riftsessions.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__components_search_bar_search_bar_service__["a" /* SearchBarService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__usersessions_usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_7__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], RiftsessionsComponent);
    return RiftsessionsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <div class=\"panel panel-default  panel--styled\">\n        <div class=\"panel-body\">\n          <div class=\"console\">\n            <img class=\"img-responsive img-circle consoleIcon\" src=\"{{consoleIcon}}\" alt=\"\"/>\n          </div>\n          <div class=\"col-md-8 panelTop\">\n            <div class=\"col-md-4\">\n              <img class=\"img-responsive img-circle sessionIcon\" src=\"{{sessionIcon}}\" alt=\"\"/>\n            </div>\n            <div class=\"col-md-8\">\n              <h2>{{session.title}}</h2>\n              <p class=\"text-muted\">{{session.firstName}} {{session.lastName}} @{{session.riftTag}}</p>\n              <p>{{session.description}}</p>\n            </div>\n          </div>\n          <div class=\"col-md-12 panelBottom\">\n            <div class=\"col-md-4 text-center\">\n              <div *ngIf=\"isLoggedIn && !(profile.nickname == session.riftTag)\">\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status != 1 && request.status != 0 && request.status != 2\" (click)=\"joinUserSession()\">Join</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==1\">Pending</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==0\">Rejected</button>\n                <button class=\"btn btn-lg btn-add-to-cart\" *ngIf=\"request && request.status==2\" (click)=\"changeStatus(template)\">Accepted</button>\n              </div>\n              <button class=\"btn btn-lg btn-add-to-cart\" mat-button (click)=\"openDialog()\" *ngIf=\"isLoggedIn && (profile.nickname == session.riftTag)\">Edit Session</button><br>\n              <ng-template #template style=\"margin-top:20%\">\n                <div class=\"modal-body text-center\">\n                  <p>Are you sure you want to cancel your request?</p>\n                  <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelSessionRequest()\" >Yes</button>\n                  <button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\" >No</button>\n                </div>\n              </ng-template>\n            </div>\n            <div class=\"col-md-4 text-left\">\n              <h5>Price  <span class=\"itemPrice\">${{session.sessionCost}}.00 / slot</span></h5>\n            </div>\n            <div class=\"col-md-4\">\n                  <app-rating [rating]=\"session.rifterRating\" [readonly]=\"true\"></app-rating>\n            </div>\n          </div>\n          <div class=\"col-md-12 panelBottom\">\n            <h4 class=\"text-center\">Riftees</h4>\n            <table class=\"table table-striped custab\">\n              <thead>\n                <tr>\n                  <th></th>\n                  <th>Riftee Name</th>\n                  <th>Riftee Rift Tag</th>\n                  <th class=\"text-center\">Riftee Rating</th>\n                </tr>\n              </thead>\n              <tr *ngFor=\"let riftee of session.riftees\">\n                <td class=\"profilepicturehere\">\n                  <img src=\"{{riftee.profilePic}}\" class=\"profilePic\">\n                </td>\n                <td>\n                  <a [routerLink]=\"['../../user/', riftee.riftTag]\">\n                  {{riftee.firstName}} {{riftee.lastName}}\n                  </a>\n                </td>\n                <td>{{riftee.riftTag}}</td>\n                <td class=\"text-center\">\n                  <app-rating [rating]=\"riftee.rifteeRating\" [readonly]=\"true\"></app-rating>\n                </td>\n                <td *ngIf=\"isLoggedIn && (profile.nickname == session.riftTag)\">\n                  <app-kick-riftee-button [hostId]=\"loggedInUserId\" [rifteeId]=\"riftee.id\" [sessionId]=\"id\"\n                  [riftee]=\"riftee\" (deleteRiftee)=\"remove($event)\"></app-kick-riftee-button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  sessionId: {{session.id}}<br>\n  sessionTitle: {{session.title}}<br>\n  sessionFirstName: {{session.firstName}}<br>\n  sessionLastName: {{session.lastName}}<br>\n  sessionRiftTag: {{session.riftTag}}<br>\n  sessionCost: {{session.sessionCost}}<br>\n  sessionTime: {{session.sessionTime}}<br>\n  sessionSlots: {{session.numSlots}}<br>\n  sessionRifterRating: {{session.rifterRating}}<br>\n  sessionGame: {{session.gameId}}<br>\n  sessionConsole: {{session.console}}<br>\n  sessionDescription: {{session.description}}<br>\n  <br><br><br>\n\n  <button mat-button (click)=\"openDialog()\">Open dialog</button>\n\n</div>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/therift/riftsessions/session-page/session-page.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    function SessionPageComponent(route, sessionPageService, userProfileService, userSessionsService, dialog, modalService) {
        this.route = route;
        this.sessionPageService = sessionPageService;
        this.userProfileService = userProfileService;
        this.userSessionsService = userSessionsService;
        this.dialog = dialog;
        this.modalService = modalService;
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
            this.getUserProfilePicture(riftee.riftTag, riftee);
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
        if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
            this.loggedInUserId = JSON.parse(localStorage.getItem("loggedInUserID"));
        }
        else {
            this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    };
    SessionPageComponent.prototype.getUserProfilePicture = function (riftTag, user) {
        console.log("Getting user's profile picture");
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                user.profilePic = resBody.image;
            }
        });
    };
    SessionPageComponent.prototype.openDialog = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_9__update_session_update_session_component__["a" /* UpdateSessionComponent */], {
            data: {
                sessionTime: this.session.sessionTime,
                sessionId: this.session.id
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
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["c" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["c" /* BsModalService */]])
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    function UpdateSessionComponent(updateSessionService, route, data, dialogRef, gameAccountService, userProfileService) {
        this.updateSessionService = updateSessionService;
        this.route = route;
        this.data = data;
        this.dialogRef = dialogRef;
        this.gameAccountService = gameAccountService;
        this.userProfileService = userProfileService;
        this.title = "Update this session";
        this.currentSession = new __WEBPACK_IMPORTED_MODULE_1__models_session__["a" /* Session */]();
        this.currentSessionDateTime = new __WEBPACK_IMPORTED_MODULE_2__data_sessionDateTime__["a" /* SessionDateTime */]();
        this.gameAccounts = [];
        this.games = __WEBPACK_IMPORTED_MODULE_6__constants_games__["a" /* GAMES */];
        this.consoles = __WEBPACK_IMPORTED_MODULE_7__constants_consoles__["a" /* CONSOLES */];
        this.profile = JSON.parse(localStorage.getItem("profile"));
        this.getLoggedInUserId(this.profile.nickname);
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
        var timeMS = this.timeToMilliseconds(currTime) + date.getTime();
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
    UpdateSessionComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
            this.loggedInUserId = parseInt(JSON.parse(localStorage.getItem("loggedInUserID")));
        }
        else {
            this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    };
    UpdateSessionComponent.prototype.timeToMilliseconds = function (time) {
        var list = time.split(":");
        var hour = (+list[0]);
        var minute = (+list[1]);
        var seconds = (hour * 60 * 60) + (minute * 60);
        return seconds * 1000;
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
            __WEBPACK_IMPORTED_MODULE_10__userprofile_game_account_game_account_service__["a" /* GameAccountService */], __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], UpdateSessionComponent);
    return UpdateSessionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/therift/therift.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\n  overflow-x: hidden;\n  font-family: 'Roboto Slab', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\np {\n  line-height: 1.75;\n}\n\na {\n  color: #666666;\n}\n\na:hover {\n  color: #666666;\n}\n\n.text-primary {\n  color: #fed136 !important;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: 700;\n  font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\nsection {\n  padding: 100px 0;\n}\n\nsection h2.section-heading {\n  font-size: 40px;\n  margin-top: 0;\n  margin-bottom: 15px;\n}\n\nsection h3.section-subheading {\n  font-size: 16px;\n  font-weight: 400;\n  font-style: italic;\n  margin-bottom: 75px;\n  text-transform: none;\n  font-family: 'Droid Serif', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n@media (min-width: 768px) {\n  section {\n    padding: 150px 0;\n  }\n}\n\n.btn {\n  font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-weight: 700;\n}\n\n.btn-xl {\n  font-size: 18px;\n  padding: 20px 40px;\n}\n\n.btn-primary {\n  background-color: #293e49;\n  border-color: transparent;\n  color: white;\n}\n\n::-moz-selection {\n  background: #293e49;;\n  text-shadow: none;\n}\n\n::selection {\n  background: #293e49;\n  text-shadow: none;\n}\n\nimg::-moz-selection {\n  background: transparent;\n}\n\nimg::selection {\n  background: transparent;\n}\n\nimg::-moz-selection {\n  background: transparent;\n}\n\nheader.masthead {\n  text-align: center;\n  color: white;\n  background-image: url(\"http://i.imgur.com/Ywcbcll.jpg\");\n  background-repeat: no-repeat;\n  background-attachment: scroll;\n  background-position: center center;\n  background-size: cover;\n}\n\nheader.masthead .intro-text {\n  padding-top: 150px;\n  padding-bottom: 100px;\n}\n\nheader.masthead .intro-text .intro-lead-in {\n  font-size: 22px;\n  font-style: italic;\n  line-height: 22px;\n  margin-bottom: 50px;\n  font-family: 'Droid Serif', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\nheader.masthead .intro-text .intro-heading {\n  font-size: 50px;\n  font-weight: 700;\n  line-height: 50px;\n  margin-bottom: 20px;\n  font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n@media (min-width: 768px) {\n  header.masthead .intro-text {\n    padding-top: 300px;\n    padding-bottom: 200px;\n  }\n  header.masthead .intro-text .intro-lead-in {\n    font-size: 40px;\n    font-style: italic;\n    line-height: 40px;\n    margin-bottom: 25px;\n    font-family: 'Droid Serif', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n  header.masthead .intro-text .intro-heading {\n    font-size: 75px;\n    font-weight: 700;\n    line-height: 75px;\n    margin-bottom: 50px;\n    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  }\n}\n\n.container /deep/ {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n@media (min-width: 1999px) {\n  .container /deep/ {\n    width: 100% !important;\n  }\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/therift/therift.component.html":
/***/ (function(module, exports) {

module.exports = "<body id=\"page-top\">\n<div class=\"loading\">\n  <img src=\"../../assets/images/loading.svg\" alt=\"loading\">\n</div>\n<!-- Header -->\n<header class=\"masthead\" style=\"width: 100% !important\">\n    <div class=\"intro-text\">\n      <div class=\"intro-heading text-uppercase\">The Rift</div>\n      <div class=\"intro-lead-in\">Meet, Play, Win</div>\n      <a class=\"btn btn-primary btn-xl text-uppercase\" [routerLink]=\"['../therift', '']\">Search the Rift</a>\n    </div>\n</header>\n<!-- Services -->\n<section id=\"services\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-lg-12 text-center\">\n        <!--<iframe-->\n          <!--src=\"http://player.twitch.tv/?channel=imaqtpie&muted=true\"-->\n          <!--height=\"360\"-->\n          <!--width=\"640\"-->\n          <!--frameborder=\"0\"-->\n          <!--scrolling=\"no\"-->\n          <!--allowfullscreen=\"true\">-->\n        <!--</iframe>-->\n        <!--<iframe-->\n          <!--src=\"http://player.twitch.tv/?channel=ninja&muted=true\"-->\n          <!--height=\"360\"-->\n          <!--width=\"640\"-->\n          <!--frameborder=\"0\"-->\n          <!--scrolling=\"no\"-->\n          <!--allowfullscreen=\"true\">-->\n        <!--</iframe>-->\n      </div>\n    </div>\n    <div class=\"row text-center\">\n      <div class=\"col-md-4\">\n            <span class=\"fa-stack fa-4x\">\n              <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\n              <i class=\"fa fa-shopping-cart fa-stack-1x fa-inverse\"></i>\n            </span>\n        <h4 class=\"service-heading\">E-Commerce</h4>\n        <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\n      </div>\n      <div class=\"col-md-4\">\n            <span class=\"fa-stack fa-4x\">\n              <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\n              <i class=\"fa fa-laptop fa-stack-1x fa-inverse\"></i>\n            </span>\n        <h4 class=\"service-heading\">Responsive Design</h4>\n        <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\n      </div>\n      <div class=\"col-md-4\">\n            <span class=\"fa-stack fa-4x\">\n              <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\n              <i class=\"fa fa-lock fa-stack-1x fa-inverse\"></i>\n            </span>\n        <h4 class=\"service-heading\">Web Security</h4>\n        <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\n      </div>\n    </div>\n  </div>\n</section>\n</body>\n\n<!--temp -->\n<!--<h4 *ngIf=\"auth.isAuthenticated()\">-->\n  <!--You are logged in!-->\n<!--</h4>-->\n<!--<h4 *ngIf=\"!auth.isAuthenticated()\">-->\n  <!--You are not logged in! Please <a (click)=\"auth.login()\">Log In</a> to continue.-->\n<!--</h4>-->\n"

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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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

module.exports = "<form #addGameAccountForm=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class=\"row\">\n      Current Game: {{data.account.gameName}}<br>\n      Current IGN: {{data.account.ign}}\n    </div>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"ign\">What is your ign?</label>\n              <input class=\"form-control input-md\" #complaint=\"ngModel\" [(ngModel)]=\"ign\" required id=\"ign\" name=\"ign\" type=\"text\" placeholder=\"In game name\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <button class=\"btn-primary\" type=\"button\">Delete Account</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!addGameAccountForm.valid\"  (click)=save() class=\"btn-primary\" type=\"button\">Update</button>\n    <button routerLink=\"../\" class=\"btn-primary\" type=\"button\">Cancel</button>\n  </div>\n</form>\n\n<!--<pre>{{ userRatingData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    function EditGameAccountComponent(data, gameAccountService) {
        this.data = data;
        this.gameAccountService = gameAccountService;
        this.title = "Add a Game Account";
        this.games = __WEBPACK_IMPORTED_MODULE_1__constants_games__["a" /* GAMES */];
        this.profile = JSON.parse(localStorage.getItem("profile"));
    }
    EditGameAccountComponent.prototype.ngOnInit = function () {
    };
    EditGameAccountComponent.prototype.editGameAccount = function (data) {
        this.gameAccountService.updateGameAccount(data);
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
    EditGameAccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-game-account',
            template: __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.scss")]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_3__game_account_service__["a" /* GameAccountService */]])
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
    GameAccountService.prototype.getUserGameAccounts = function (id) {
        // console.log("Getting user's game accounts");
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
        // console.log("Getting user's game accounts by game Id");
        return this.http.get("/api/gameaccount/usertableId/" + riftId + "/gameId/" + gameId + "/info")
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
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
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
            console.log("Game on...");
            if (_this.allow) {
                console.log("in if statemnet");
                _this.allow = false;
                setInterval(_this.getUpdate(notifications), 6000);
            }
        }, function (error) {
            console.log("error");
        });
    };
    NotificationsService.prototype.getUpdate = function (notifications) {
        var _this = this;
        console.log("Okay let's go...");
        this.http.get(this.pollUrl).subscribe(function (success) {
            console.log("Stop polling: " + _this.globals.stopPolling);
            console.log("Received a new notification");
            console.log(JSON.parse(success["_body"]).data);
            var data = JSON.parse(success["_body"]).data;
            var notification = getNotification(data);
            notifications.unshift(notification);
            _this.globals.unseenNotifications += 1;
            if (!_this.globals.stopPolling) {
                setInterval(_this.getUpdate(notifications), 6000);
            }
        }, function (error) {
            console.log("error, trying again");
            if (!_this.globals.stopPolling) {
                setInterval(_this.getUpdate(notifications), 6000);
            }
        });
        function getNotification(notification) {
            var currNotification = new __WEBPACK_IMPORTED_MODULE_3__models_notification__["a" /* Notification */]();
            currNotification.notificationContent = __WEBPACK_IMPORTED_MODULE_4__constants_notification_content__["a" /* NOTIFICATION_CONTENT */][notification.notification_type];
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
        this.http.get("/api/stop/" + riftId).subscribe(function (success) {
            console.log("Stopped polling");
        }, function (error) {
            console.log("Error when stopping polling");
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

/***/ "../../../../../src/app/userprofile/payment.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentService; });
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




var PaymentService = /** @class */ (function () {
    function PaymentService(http) {
        this.http = http;
        this.createBraintreeUserURL = "/api/braintree/createCustomer";
        this.updateBraintreeUserURL = "/api/braintree/updateCustomer";
    }
    PaymentService.prototype.getTransactionData = function (riftId, sessionId) {
        console.log("running getTransactionData");
        return this.http.get("/api/user/" + riftId + "/session/" + sessionId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error'); });
    };
    PaymentService.prototype.doTransaction = function (customerId, amount) {
        console.log("running doTransaction");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        this.http.put("/api/braintree/transaction/" + customerId + "/" + amount, headers)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); })
            .subscribe();
    };
    PaymentService.prototype.createBraintreeUser = function (data) {
        console.log("running createBraintreeUser");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.put(this.createBraintreeUserURL, data, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); });
    };
    PaymentService.prototype.updateBraintreeUser = function (data) {
        console.log("running createBraintreeUser");
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.put(this.updateBraintreeUserURL, data, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(error.json().error || 'Serve error'); });
    };
    PaymentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], PaymentService);
    return PaymentService;
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

module.exports = "<form #updateInfo=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"riftTag\">Update your Rift Tag</label>\n              <input class=\"form-control input-md\" #riftTag=\"ngModel\" id=\"riftTag\" name=\"riftTag\" type=\"text\" placeholder=\"Change your Rift Tag\" [(ngModel)]=\"currentUser.riftTag\">\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"firstName\">Update your First Name</label>\n              <input class=\"form-control input-md\" #firstName=\"ngModel\" id=\"firstName\" name=\"firstName\" type=\"text\" placeholder=\"Change your first name\" [(ngModel)]=\"currentUser.firstName\">\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"lastName\">Update your Last name</label>\n          <input class=\"form-control input-md\" #lastName=\"ngModel\" id=\"lastName\" name=\"lastName\" type=\"text\" placeholder=\"Change your last name\" [(ngModel)]=\"currentUser.lastName\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"email\">Update your Email</label>\n          <input class=\"form-control input-md\" #email=\"ngModel\" id=\"email\" name=\"email\" type=\"text\" placeholder=\"Change your email\" [(ngModel)]=\"currentUser.email\">\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"email\">Update your Bio</label>\n          <input class=\"form-control input-md\" #email=\"ngModel\" id=\"bio\" name=\"bio\" type=\"text\" placeholder=\"Change your bio\" [(ngModel)]=\"currentUser.bio\">\n        </div>\n        <div class=\"form-group\">\n          <app-file-upload name=\"profilePic\"ngDefaultControl [showFileNameInput]=\"true\" allowedTypes=\"image/*\" [uploadButtonText]=\"'Upload File'\" [(ngModel)]=\"profilePic\"></app-file-upload>\n          <img src={{profilePic}} alt=\"\" class=\"profilePicPreview\"/>\n        </div>\n        <div class=\"form-group\">\n          <app-file-upload name=\"coverPhoto\"ngDefaultControl [showFileNameInput]=\"true\" allowedTypes=\"image/*\" [uploadButtonText]=\"'Upload File'\" [(ngModel)]=\"coverPhoto\"></app-file-upload>\n          <img src={{coverPhoto}} alt=\"\" class=\"profilePicPreview\"/>\n        </div>\n        <div *ngIf=\"!data.currentUser.twitchAccount\">\n          <button (click)=\"verifyWithTwitch()\" type=\"button\" class=\"btn-primary\">Verify With Twitch</button>\n        </div><br>\n        <div *ngIf=\"!data.currentUser.youtubeAccount\">\n          <button (click)=\"verifyWithYouTube()\" type=\"button\" class=\"btn-primary\">Verify With YouTube</button>\n        </div><br>\n        <div>\n          <button (click)=\"addGameAccount()\" type=\"button\" class=\"btn-primary\">Add a Game Account</button>\n        </div><br>\n\n        <div class=\"form-group\">\n          <ngx-braintree\n            [clientTokenURL]=\"'/api/braintree/getclienttoken'\"\n            [createPurchaseURL]=\"data.updateBraintreeUserURL\"\n            [chargeAmount]=\"0\"\n            [allowChoose] = \"true\"\n            [buttonText]=\"'Save Payment Method'\"\n            (paymentStatus)=\"onPaymentStatus($event)\">\n          </ngx-braintree>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button [disabled]=\"!updateInfo.valid\" (click)=\"save()\" class=\"btn-primary\" type=\"button\">Update</button>\n    <button (click)=\"cancel()\" class=\"btn-primary\" type=\"button\">Cancel</button>\n\n  </div>\n</form>\n\n<!--<pre>{{ updateInfoData | json }}</pre>-->\n<!--[routerLink]=\"['../', currentUser.riftTag]\"-->\n"

/***/ }),

/***/ "../../../../../src/app/userprofile/update-info/update-info.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    UpdateInfoComponent.prototype.ngOnInit = function () {
        this.getCurrentLoggedInUser();
        this.currentUser = this.updateInfoService.getUserData();
        this.updateInfoData = this.updateInfoService.getFormData();
        console.log("Current user info loaded to Update Profile");
    };
    UpdateInfoComponent.prototype.getCurrentLoggedInUser = function () {
        var _this = this;
        this.userProfileService.getUser(this.profile.nickname).subscribe(function (resBody) {
            _this.loggedInUser.firstName = resBody.firstName;
            _this.loggedInUser.lastName = resBody.lastName;
            _this.loggedInUser.riftTag = resBody.riftTag;
            _this.loggedInUser.id = resBody.id;
        });
    };
    UpdateInfoComponent.prototype.uploadProfilePic = function () {
        var base64 = this.profilePic;
        var riftTag = this.loggedInUser.riftTag;
        this.userProfileService.uploadProfilePicture(riftTag, base64);
    };
    UpdateInfoComponent.prototype.uploadCoverPhoto = function () {
        var base64 = this.profilePic;
        var riftTag = this.loggedInUser.riftTag;
        this.userProfileService.uploadCoverPhoto(riftTag, base64);
    };
    UpdateInfoComponent.prototype.save = function () {
        this.updateInfoService.setUserData(this.currentUser);
        var data = {
            "firstName": this.updateInfoData.firstName,
            "lastName": this.updateInfoData.lastName,
            "riftTag": this.updateInfoData.riftTag,
            "id": this.loggedInUser.id,
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
            '&redirect_uri=http://localhost:4200/youtube' +
            '&response_type=code&client_id=196736615110-2n7j9c9helma43g2779m66f50p2i6kij.apps.googleusercontent.com';
    };
    UpdateInfoComponent.prototype.addGameAccount = function () {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_5__game_account_add_game_account_add_game_account_component__["a" /* AddGameAccountComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "loggedInUserId": this.loggedInUser.id
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".review-block{\n  background-color:#FAFAFA;\n  border:1px solid #EFEFEF;\n  padding:15px;\n  border-radius:3px;\n  margin-bottom:15px;\n}\n\nbody {\n  min-height: 1585px;\n}\n\n.row {\n  margin-top: 5%;\n}\n\n/*------------------------------------------------*/\n\n/*    Profile Page\n/*------------------------------------------------*/\n\n.user-profile {\n  padding-bottom: 30px;\n}\n\n.profile-header-background {\n  margin: -30px -30px 0 -30px;\n}\n\n.profile-header-background img {\n  width: 100%;\n  height: 310px;\n}\n\n.profile-info-left {\n  position: relative;\n  top: -92px;\n}\n\n.profile-info-left img.avatar {\n  border: 2px solid #fff;\n  overflow: hidden;\n  width: 250px;\n  height: 250px;\n}\n\n#profile-pic {\n\n\n}\n\n.profile-info-left h2 {\n  font-family: \"josefinslab-semibold\";\n  margin-bottom: 30px;\n\n}\n\n.profile-info-left .section {\n  margin-top: 50px;\n}\n\n.profile-info-left .section h3 {\n  font-size: 1.1em;\n  font-weight: 700;\n  border-bottom: 1px solid #ccc;\n  padding-bottom: 10px;\n}\n\n.profile-info-left ul.list-social > li {\n  line-height: 2.3;\n}\n\n/*noinspection CssInvalidPropertyValue*/\n\n.profile-info-left ul.list-social > li i {\n  display: inline-block;\n  vertical-align: middle;\n  *vertical-align: auto;\n  *zoom: 1;\n  *display: inline;\n  position: relative;\n  top: 1px;\n  font-size: 16px;\n  min-width: 16px;\n  line-height: 1;\n}\n\n.profile-info-left ul.list-social > li a {\n  color: #696565;\n}\n\n.profile-info-right {\n  margin-top: 5%;\n}\n\n.profile-info-right .tab-content {\n  padding: 30px 0;\n  background-color: transparent;\n}\n\n@media screen and (max-width: 768px) {\n  .profile-info-right {\n    position: relative;\n    top: -70px;\n  }\n}\n\n.user-follower,\n.user-following {\n  position: relative;\n  margin-bottom: 40px;\n  margin-top: 30px;\n}\n\n.user-follower img,\n.user-following img {\n  border-radius: 2px;\n  width: 40px;\n}\n\n.user-follower a,\n.user-following a {\n  font-size: 1.1em;\n  line-height: 1;\n}\n\n.user-follower .username,\n.user-following .username {\n  font-size: 0.9em;\n  line-height: 1.5;\n}\n\n.user-follower .btn,\n.user-following .btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  min-width: 92px;\n}\n\n.userbtn {\n  position: relative!important;\n  min-width: 92px!important;\n}\n\n/* list icons */\n\n.list-icons-demo li {\n  margin-bottom: 20px;\n  text-align: center;\n}\n\n.list-icons-demo li i {\n  font-size: 24px;\n}\n\n.list-icons-demo2 li {\n  margin-bottom: 10px;\n}\n\n.activity-item {\n  overflow: visible;\n  position: relative;\n  margin: 15px 0;\n  border-top: 1px dashed #ccc;\n  padding-top: 15px;\n}\n\n.activity-item:first-child {\n  border-top: none;\n}\n\n.activity-item .avatar {\n  border-radius: 2px;\n  width: 32px;\n}\n\n.activity-item > i {\n  font-size: 18px;\n  line-height: 1;\n}\n\n.activity-item .media-body {\n  position: relative;\n}\n\n.activity-item .activity-title {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n\n.activity-item .activity-attachment {\n  padding-top: 20px;\n}\n\n.activity-item .well {\n  border-radius: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: none;\n  border-left: 2px solid #cfcfcf;\n  background: #fff;\n  margin-left: 20px;\n  font-size: 0.85em;\n}\n\n.activity-item .thumbnail {\n  display: inline;\n  border: none;\n  padding: 0;\n}\n\n.activity-item .thumbnail img {\n  border-radius: 2px;\n  width: auto;\n  margin: 0;\n}\n\n.activity-item .activity-actions {\n  position: absolute;\n  top: 15px;\n  right: 0;\n}\n\n.activity-item .activity-actions .btn i {\n  margin: 0;\n}\n\n.activity-item .activity-actions .dropdown-menu > li > a {\n  font-size: 0.9em;\n  padding: 3px 10px;\n}\n\n.activity-item + .btn {\n  margin-bottom: 15px;\n}\n\n.profile-info-right /deep/.mat-tab-label, .profile-info-right /deep/.mat-tab-label-active{\n  min-width: 0!important;\n  padding: 10px!important;\n  margin-left: 10px!important;\n  margin-right: 10px!important;\n  background-color: transparent!important;\n}\n\n.userbtn /deep/ button {\n  position: relative!important;\n  min-width: 92px!important;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/userprofile/userprofile.component.html":
/***/ (function(module, exports) {

module.exports = "<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n\n<div class=\"container\" style=\"width: 80%\" *ngIf=\"isDataAvailable\">\n  <base href=\"/\">\n  <div class=\"user-profile\">\n    <div class=\"row\">\n      <div class=\"profile-header-background\"><img src=\"{{currentUser.coverPhoto}}\" alt=\"Profile Header Background\"></div>\n      <div class=\"col-md-4\">\n        <div class=\"profile-info-left\">\n          <div class=\"text-center\">\n            <div id=\"profile-pic\">\n              <img src=\"{{currentUser.profilePic}}\" class=\"avatar img-circle\" alt=\"\">\n            </div>\n            <h3>{{currentUser.firstName | capitalize}} {{currentUser.lastName | capitalize}} </h3>\n            <h3>@{{currentUser.riftTag}}</h3>\n            <h3>{{currentUser.email}}</h3>\n            <app-rating [rating]=\"currentUser.rifterRating\" [readonly]=\"true\"></app-rating>\n            <div id=\"following_button\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">\n              <app-follow-button [following]=\"isFollowing(currentUser.riftTag)\" [id]=\"currentUser.id\"\n              [riftTag]=\"profile.nickname\" class=\"userbtn\">\n              </app-follow-button>\n            </div>\n            <div id=\"update_info_button\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">\n              <button (click)=\"updateInfoModal()\" type=\"button\" class=\"btn-primary\">Update your Info</button>\n            </div>\n            <div id=\"rate_user_button\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">\n              <button (click)=\"openRatingDialog()\" type=\"button\" class=\"btn-primary\">Rate this User</button>\n            </div>\n            <br>\n            <div id=\"file_a_complaint\" *ngIf=\"isLoggedIn && profile.nickname != currentUser.riftTag\">\n              <button (click)=\"fileAComplaint()\" type=\"button\" class=\"btn-primary\">File A Complaint</button>\n            </div>\n            <alert type=\"danger\" *ngIf=\"ratingStatus == 0\">\n              Haven't played with {{currentUser.riftTag}} in past 30 days\n            </alert>\n            <alert type=\"danger\" *ngIf=\"ratingStatus == 1\">\n              Already rated {{currentUser.riftTag}} in past 30 days\n            </alert>\n          </div>\n          <div class=\"section about\">\n            <h3>About Me</h3>\n            <p> {{currentUser.bio}} </p>\n          </div>\n          <div class=\"section statistics\">\n            <h3>Statistics</h3>\n            <p><span class=\"badge\">{{currentUser.followings?.length}}</span> Following</p>\n            <p><span class=\"badge\">{{currentUser.followers?.length}}</span> Followers</p>\n            <p><span class=\"badge\">{{currentUser.rifterSessions?.length}}</span> Sessions Played</p>\n          </div>\n          <div class=\"section socialmedia\">\n            <h3>Social</h3>\n            <ul class=\"list-unstyled list-social\">\n              <li><i class=\"fa fa-youtube\"></i> {{currentUser.youtubeAccount}}</li>\n              <li><i class=\"fa fa-twitch\"></i> <a href=\"https://twitch.tv/{{currentUser.twitchAccount}}\">twitch.tv/{{currentUser.twitchAccount}}</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-8\">\n        <div class=\"profile-info-right\">\n          <mat-tab-group>\n            <mat-tab label=\"activity\">\n              <div class=\"media activity-item\" *ngFor=\"let activity of currentUser.activities\">\n                <a href=\"#\" class=\"pull-left\">\n                  <img src=\"{{currentUser.profilePic}}\" alt=\"Avatar\" class=\"media-object avatar\">\n                </a>\n                <div class=\"media-body\">\n                  <p class=\"activity-title\">\n                    <a href=\"#\">{{currentUser.riftTag}}</a>\n                    {{activity.notificationContent}} <a [routerLink]=\"['../../session', activity.sessionId]\">{{activity.title}}</a>\n                  </p>\n                  <small class=\"text-muted\">{{activity.createdTime | date:'fullDate'}} at {{activity.createdTime | date:'shortTime'}}</small>\n                </div>\n                <div class=\"btn-group pull-right activity-actions\">\n                  <button type=\"button\" class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\">\n                    <i class=\"fa fa-th\"></i>\n                    <span class=\"sr-only\">Toggle Dropdown</span>\n                  </button>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"sessions\">\n              <div class=\"media\" *ngFor=\"let session of currentUser.rifterSessions\">\n                <app-session-card\n                                  [session]=\"session\" [isLoggedIn]=\"isLoggedIn\"\n                                  [type]=\"session.type\" [request]=\"loggedInUser.sessionRequests.get(session.id)\"\n                ></app-session-card>\n                <!--[routerLink]=\"['../../session', session.id]\"-->\n              </div>\n            </mat-tab>\n            <mat-tab label=\"followers\">\n              <div class=\"media user-follower\" *ngFor=\"let follower of currentUser.followers\">\n                <img src=\"{{follower.profilePic}}\" alt=\"User Avatar\" class=\"media-object pull-left\">\n                <div class=\"media-body\">\n                  <a [routerLink]=\"['../../user', follower.riftTag]\">{{follower.firstName}} {{follower.lastName}} {{follower.id}}\n                    <br><span class=\"text-muted username\">@{{follower.riftTag}}</span></a>\n                  <app-follow-button class=\"pull-right\" [following]=\"isFollowing(follower.riftTag)\" [id]=\"follower.id\"\n                                     [riftTag]=\"profile.nickname\" *ngIf=\"isLoggedIn && profile.nickname != follower.riftTag\">\n                  </app-follow-button>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"following\">\n              <div class=\"media user-following\" *ngFor=\"let following of currentUser.followings\">\n                  <img src=\"{{following.profilePic}}\" alt=\"User Avatar\" class=\"media-object pull-left\">\n                  <div class=\"media-body\">\n                    <a [routerLink]=\"['../../user', following.riftTag]\">{{following.firstName}} {{following.lastName}}\n                      <br><span class=\"text-muted username\">@{{following.riftTag}}</span></a>\n                    <app-follow-button class=\"pull-right\" [following]=\"isFollowing(following.riftTag)\" [id]=\"following.id\"\n                                       [riftTag]=\"profile.nickname\" *ngIf=\"isLoggedIn && profile.nickname != following.riftTag\">\n\n                    </app-follow-button>\n                  </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"reviews\" style=\"width: 100%;\">\n              <div class=\"row\" style=\"text-align:center\">\n                <div class=\"col-lg-5\">\n                  <div class=\"rating-block\">\n                    <h4>Average Rifter Rating</h4>\n                    <h2 class=\"bold padding-bottom-7\"> {{currentUser.rifterRating}} <small>/ 5</small></h2>\n                    <app-rating [rating]=\"currentUser.rifterRating\" [readonly]=\"true\"></app-rating>\n                  </div>\n                </div>\n                <div class=\"col-lg-5\">\n                  <div class=\"rating-block\">\n                    <h4>Average Riftee Rating</h4>\n                    <h2 class=\"bold padding-bottom-7\"> {{currentUser.rifteeRating}} <small>/ 5</small></h2>\n                    <app-rating [rating]=\"currentUser.rifteeRating\" [readonly]=\"true\"></app-rating>\n                  </div>\n                </div>\n\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-7\" *ngFor=\"let rating of currentUser.ratings\">\n                    <app-user-review [rating]=\"rating\" ></app-user-review>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"game accounts\">\n              <div class=\"media user-following\" *ngFor=\"let account of currentUser.gameAccounts\">\n                <img src=\"{{account.gameIcon}}\" alt=\"User Avatar\" class=\"media-object pull-left\">\n                <div class=\"media-body\">\n                  {{account.gameName}}\n                    <br><span class=\"text-muted username\">@{{account.ign}}</span>\n                  <button type=\"button\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\" class=\"btn btn-sm btn-primary\"\n                          (click)=\"editGameAccount(account)\">\n                    <span>Edit Game Account</span>\n                  </button>\n                </div>\n              </div>\n            </mat-tab>\n          </mat-tab-group>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<router-outlet></router-outlet>\n\n<!--<mat-tab label=\"notifications\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">-->\n<!--<div class=\"media\" *ngFor=\"let notification of currentUser.notifications\">-->\n<!--<app-notification [notification]=\"notification\"></app-notification>-->\n<!--</div>-->\n<!--</mat-tab>-->\n\n\n<!--<mat-tab label=\"feed\" *ngIf=\"isLoggedIn && profile.nickname == currentUser.riftTag\">-->\n  <!--<div class=\"media activity-item\" *ngFor=\"let notification of currentUser.feed\">-->\n    <!--<a href=\"#\" class=\"pull-left\">-->\n      <!--<img src=\"https://bootdey.com/img/Content/avatar/avatar1.png\" alt=\"Avatar\" class=\"media-object avatar\">-->\n    <!--</a>-->\n    <!--<div class=\"media-body\">-->\n      <!--<p class=\"activity-title\"><a [routerLink]=\"['../../user',notification.rifttag]\">{{notification.riftTag}}</a>-->\n        <!--{{notification.notificationContent}} </p>-->\n      <!--<small class=\"text-muted\">{{notification.createdTime | date:'fullDate'}} at {{notification.createdTime | date:'shortTime'}}</small>-->\n    <!--</div>-->\n  <!--</div>-->\n<!--</mat-tab>-->\n"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__constants_activity_content__ = __webpack_require__("../../../../../src/app/constants/activity-content.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__file_a_complaint_file_a_complaint_component__ = __webpack_require__("../../../../../src/app/userprofile/file-a-complaint/file-a-complaint.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__models_game_account__ = __webpack_require__("../../../../../src/app/models/game-account.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__game_account_game_account_service__ = __webpack_require__("../../../../../src/app/userprofile/game-account/game-account.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__constants_session_icon_variables__ = __webpack_require__("../../../../../src/app/constants/session-icon-variables.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__game_account_edit_game_account_edit_game_account_component__ = __webpack_require__("../../../../../src/app/userprofile/game-account/edit-game-account/edit-game-account.component.ts");
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
    function UserprofileComponent(userProfileService, auth, route, userRatingService, dialog, gameAccountService, userSessionsService) {
        this.userProfileService = userProfileService;
        this.auth = auth;
        this.route = route;
        this.userRatingService = userRatingService;
        this.dialog = dialog;
        this.gameAccountService = gameAccountService;
        this.userSessionsService = userSessionsService;
        this.currentUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.loggedInUser = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
        this.following = false;
        this.isDataAvailable = false;
        this.isLoggedIn = false;
        this.updateBraintreeUserURL = '/api/braintree/updateCustomer/';
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile != null) {
            this.isLoggedIn = true;
        }
    }
    UserprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.currUser = params['rifttag'];
            _this.isDataAvailable = true;
            // this.getLeagueInfo("ZeroSweg");
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
            _this.currentUser.rifterRating = resBody.rifterRating;
            _this.currentUser.rifteeRating = resBody.rifteeRating;
            _this.currentUser.braintreeId = resBody.braintreeId;
            _this.currentUser.twitchAccount = resBody.twitchAccount;
            _this.currentUser.youtubeAccount = resBody.youtubeAccount;
            _this.updateBraintreeUserURL = _this.updateBraintreeUserURL + resBody.braintreeId;
            _this.getUserProfilePicture(_this.currentUser.riftTag, _this.currentUser);
            _this.getUserCoverPhoto(riftTag);
            _this.getUserFollowersAndFollowing(resBody.followers, resBody.followings);
            _this.getUserRatings(_this.currentUser.id);
            _this.getUserActivities(resBody.creatorActivityList);
            _this.getUserRifterSessions(resBody.rifterSessions, _this.currentUser);
            _this.getCurrentLoggedInUser(_this.profile.nickname);
            _this.getUserGameAccounts(_this.currentUser.id);
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
            this.getUserProfilePicture(currFollower.riftTag, currFollower);
            this.currentUser.followers.push(currFollower);
        }
        for (var i = 0; i < followings.length; i++) {
            var currFollowing = new __WEBPACK_IMPORTED_MODULE_1__models_userprofile__["a" /* Userprofile */]();
            currFollowing.firstName = followings[i].followingUsertable.firstName;
            currFollowing.lastName = followings[i].followingUsertable.lastName;
            currFollowing.riftTag = followings[i].followingUsertable.riftTag;
            currFollowing.id = followings[i].followingUsertable.id;
            this.getUserProfilePicture(currFollowing.riftTag, currFollowing);
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
                userRating.reviewerUsertable = reviewer;
                _this.currentUser.ratings.push(userRating);
            }
        });
    };
    UserprofileComponent.prototype.getUserActivities = function (creatorActivityList) {
        // console.log("Getting user's activities");
        this.currentUser.activities = [];
        this.currentUser.creatorActivityList = creatorActivityList;
        for (var i = 0; i < this.currentUser.creatorActivityList.length; i++) {
            var currActivity = new __WEBPACK_IMPORTED_MODULE_3__models_activity__["a" /* Activity */]();
            currActivity.notificationType = this.currentUser.creatorActivityList[i].notificationType;
            currActivity.notificationContent = __WEBPACK_IMPORTED_MODULE_14__constants_activity_content__["a" /* ACTIVITY_CONTENT */][parseInt(currActivity.notificationType)];
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
    UserprofileComponent.prototype.getUserProfilePicture = function (riftTag, user) {
        // console.log("Getting user's profile picture");
        this.userProfileService.getProfilePicture(riftTag).subscribe(function (resBody) {
            if (resBody.image == "") {
                user.profilePic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";
            }
            else {
                user.profilePic = resBody.image;
            }
        });
        return;
        // this.currentUser.profilePic = "https://s3.us-east-2.amazonaws.com/rift-profilepictures/" + riftTag +"profile-picture"
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
                var account = new __WEBPACK_IMPORTED_MODULE_16__models_game_account__["a" /* GameAccount */]();
                account.gameName = currAccount.game.game;
                account.gameId = currAccount.gameId;
                account.ign = currAccount.ign;
                account.id = currAccount.id;
                account.gameIcon = __WEBPACK_IMPORTED_MODULE_18__constants_session_icon_variables__["a" /* SESSION_ICONS */][account.gameId];
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
                "updateBraintreeUserURL": this.updateBraintreeUserURL,
                "currentUser": this.currentUser
            }
        });
    };
    UserprofileComponent.prototype.editGameAccount = function (account) {
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_19__game_account_edit_game_account_edit_game_account_component__["a" /* EditGameAccountComponent */], {
            height: '450px',
            width: '600px',
            data: {
                "account": account,
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
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_15__file_a_complaint_file_a_complaint_component__["a" /* FileAComplaintComponent */], {
            height: '450px',
            width: '600px',
            data: {
                submitterId: this.loggedInUser.id,
                riftId: this.currentUser.id
            }
        });
    };
    UserprofileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-userprofile',
            template: __webpack_require__("../../../../../src/app/userprofile/userprofile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/userprofile/userprofile.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__userprofile_service__["a" /* UserprofileService */],
            __WEBPACK_IMPORTED_MODULE_5__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_7__user_rating_data_user_rating_service__["a" /* UserRatingService */],
            __WEBPACK_IMPORTED_MODULE_11__angular_material__["c" /* MatDialog */], __WEBPACK_IMPORTED_MODULE_17__game_account_game_account_service__["a" /* GameAccountService */], __WEBPACK_IMPORTED_MODULE_9__usersessions_usersessions_service__["a" /* UsersessionsService */]])
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

module.exports = "<mat-dialog-content>\n  <form #createSession=\"ngForm\" class=\"editForm\" novalidate>\n    <div class=\"tab-pane fade in active\">\n      <h4 class=\"head text-center\">{{title}}</h4>\n      <br/>\n      <div class='row'>\n        <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiontitle\">Give your session a title</label>\n                <input class=\"form-control input-md\" #sessiontitle=\"ngModel\"  id=\"sessiontitle\" name=\"sessiontitle\" type=\"text\" placeholder=\"Session Title\" [(ngModel)]=\"currentSession.title\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiongame\">What game will you be playing?</label>\n                <!--<input class=\"form-control input-md\" #sessiongame=\"ngModel\"  id=\"sessiongame\" name=\"sessiongame\" type=\"text\" placeholder=\"Session Game\" [(ngModel)]=\"currentSession.game\">-->\n                <mat-form-field>\n                  <mat-select placeholder=\"Select a Game\" [(value)]=\"gameId\" (selectionChange)=\"getUserGameAccountsByGameId(gameId, loggedInUserId)\">\n                    <mat-option *ngFor=\"let game of games\" [value]=\"game.id\">\n                      {{ game.name }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n                <mat-form-field>\n                  <mat-select placeholder=\"Select an Account\" [(value)]=\"accountId\">\n                    <mat-option *ngFor=\"let account of gameAccounts\" [value]=\"account.id\">\n                      {{ account.ign }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiondesc\">Give your session a description</label>\n                <div class=\"input-group\">\n                  <textarea name=\"sessiondesc\" #sessiondesc = \"ngModel\" id =\"sessiondesc\" class=\"form-control\" [(ngModel)]=\"currentSession.description\"></textarea>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessionplatform\">What platform will you be playing on?</label>\n            <mat-form-field>\n              <mat-select placeholder=\"Select a Platform\" [(value)]=\"platform\">\n                <mat-option *ngFor=\"let console of consoles\" [value]=\"console\">\n                  {{ console.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionslots\">How many slots in your session</label>\n                <input class=\"form-control input-md\" #sessionslots=\"ngModel\"  id=\"sessionslots\" name=\"sessionslots\" type=\"number\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"currentSession.numSlots\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessioncost\">Cost per slot</label>\n                <input class=\"form-control input-md\" #sessioncost=\"ngModel\"  id=\"sessioncost\" name=\"sessioncost\" type=\"number\" placeholder=\"Cost per slot\" [(ngModel)]=\"currentSession.sessionCost\">\n              </div>\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiondate\">What date</label>\n                <!--<input class=\"form-control input-md\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" type=\"text\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"step3.sessionDate\">-->\n                <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" #sessiondate=\"ngModel\"  id=\"sessiondate\" name=\"sessiondate\" [(ngModel)]=\"currentSessionDateTime.sessionDate\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessiontime\">What time</label>\n                <input matInput type=\"time\" placeholder=\"Pick a time\" #sessiontime=\"ngModel\"  id=\"sessiontime\" name=\"sessiontime\" [(ngModel)]=\"currentSessionDateTime.sessionTime\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionduration\">Select a Duration</label>\n                <input matInput type=\"number\" placeholder=\"Select a duration\" #sessionduration=\"ngModel\"  id=\"sessionduration\" name=\"sessionduration\" [(ngModel)]=\"currentSessionDateTime.sessionDuration\">\n              </div>\n            </div>\n            <div class='col-xs-12 col-sm-6'>\n              <div class=\"form-group\">\n                <label class=\"control-label\" for=\"sessionlanguage\">Select a Language</label>\n                <mat-form-field>\n                  <mat-select placeholder=\"Select a Language\" [(value)]=\"language\">\n                    <mat-option *ngFor=\"let language of languages\" [value]=\"language.language\">\n                      {{ language.language }}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div>\n      <button [disabled]=\"!createSession.valid\" (click)=\"save()\" class=\"btn btn-lg btn-update\" type=\"button\">Create</button>\n      <button (click)=\"cancel()\" class=\"btn btn-lg btn-cancel\" type=\"button\">Cancel</button>\n    </div>\n  </form>\n</mat-dialog-content>\n\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/create-session/create-session.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
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
    //noinspection JSAnnotator
    function CreateSessionComponent(createSessionService, route, userSessionService, globals, userProfileService, gameAccountService, dialogRef, data) {
        this.createSessionService = createSessionService;
        this.route = route;
        this.userSessionService = userSessionService;
        this.globals = globals;
        this.userProfileService = userProfileService;
        this.gameAccountService = gameAccountService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = "Create this session";
        this.currentSession = new __WEBPACK_IMPORTED_MODULE_5__models_session__["a" /* Session */]();
        this.currentSessionDateTime = new __WEBPACK_IMPORTED_MODULE_1__data_sessionDateTime__["a" /* SessionDateTime */]();
        this.gameAccounts = [];
        this.games = __WEBPACK_IMPORTED_MODULE_7__constants_games__["a" /* GAMES */];
        this.consoles = __WEBPACK_IMPORTED_MODULE_6__constants_consoles__["a" /* CONSOLES */];
        this.languages = __WEBPACK_IMPORTED_MODULE_8__constants_languages__["a" /* LANGUAGES */];
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    CreateSessionComponent_1 = CreateSessionComponent;
    CreateSessionComponent.prototype.ngOnInit = function () {
        this.getLoggedInUserId(this.profile.nickname);
        this.currentSession = this.createSessionService.getSessionData();
        this.createSessionData = this.createSessionService.getFormData();
    };
    CreateSessionComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
            this.loggedInUserId = parseInt(JSON.parse(localStorage.getItem("loggedInUserID")));
        }
        else {
            this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    };
    CreateSessionComponent.prototype.save = function () {
        this.createSessionService.setSessionData(this.currentSession, this.currentSessionDateTime);
        var timeMS = CreateSessionComponent_1.timeToMilliseconds(this.currentSessionDateTime.sessionTime) + this.currentSessionDateTime.sessionDate.getTime();
        var data = {
            "hostId": this.loggedInUserId,
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
    CreateSessionComponent.timeToMilliseconds = function (time) {
        var list = time.split(":");
        var hour = (+list[0]);
        var minute = (+list[1]);
        var seconds = (hour * 60 * 60) + (minute * 60);
        return seconds * 1000;
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
    CreateSessionComponent = CreateSessionComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-create-session',
            template: __webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/create-session/create-session.component.scss")]
        }),
        __param(7, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__data_create_session_service__["a" /* CreateSessionService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_9__usersessions_service__["a" /* UsersessionsService */], __WEBPACK_IMPORTED_MODULE_10__global_globals__["a" /* Globals */],
            __WEBPACK_IMPORTED_MODULE_11__userprofile_userprofile_service__["a" /* UserprofileService */], __WEBPACK_IMPORTED_MODULE_12__userprofile_game_account_game_account_service__["a" /* GameAccountService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MatDialogRef */], Object])
    ], CreateSessionComponent);
    return CreateSessionComponent;
    var CreateSessionComponent_1;
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

/***/ "../../../../../src/app/usersessions/sessionform/data/formData.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormData; });
/* unused harmony export Step1 */
/* unused harmony export Step2 */
/* unused harmony export Step3 */
var FormData = /** @class */ (function () {
    function FormData() {
        this.sessionCreatorId = "";
        this.sessionCreatorRiftTag = "";
        this.title = "";
        this.console = "";
        this.numSlots = "";
        this.sessionCost = "";
    }
    FormData.prototype.clear = function () {
        this.sessionCreatorId = "";
        this.sessionCreatorRiftTag = "";
        this.sessionCreationTime = "";
        this.title = "";
        this.gameId = -1;
        this.console = "";
        this.numSlots = "";
        this.sessionCost = "";
        this.sessionDate = "";
        this.sessionTimes = "";
        this.sessionDuration = "";
    };
    return FormData;
}());

var Step1 = /** @class */ (function () {
    function Step1() {
        this.title = "";
        this.console = "";
    }
    return Step1;
}());

var Step2 = /** @class */ (function () {
    function Step2() {
    }
    return Step2;
}());

var Step3 = /** @class */ (function () {
    function Step3() {
    }
    return Step3;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/data/formData.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formData_model__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__workflow_workflow_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/workflow/workflow.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__workflow_workflow_model__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/workflow/workflow.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FormDataService = /** @class */ (function () {
    function FormDataService(workflowService) {
        this.workflowService = workflowService;
        this.formData = new __WEBPACK_IMPORTED_MODULE_1__formData_model__["a" /* FormData */]();
        this.isStep1Valid = false;
        this.isStep2Valid = false;
        this.isStep3Valid = false;
    }
    FormDataService.prototype.getStep1Info = function () {
        var step1 = {
            title: this.formData.title,
            gameId: this.formData.gameId,
            console: this.formData.console
        };
        return step1;
    };
    FormDataService.prototype.setStep1Info = function (data) {
        this.isStep1Valid = true;
        this.formData.title = data.title;
        this.formData.gameId = data.gameId;
        this.formData.console = data.console;
        this.workflowService.validateStep(__WEBPACK_IMPORTED_MODULE_3__workflow_workflow_model__["a" /* STEPS */].step1);
    };
    FormDataService.prototype.getStep2Info = function () {
        var step2 = {
            numSlots: this.formData.numSlots,
            sessionCost: this.formData.sessionCost
        };
        return step2;
    };
    FormDataService.prototype.setStep2Info = function (data) {
        // Update the work type only when the Work Form had been validated successfully
        this.isStep2Valid = true;
        this.formData.numSlots = data.numSlots;
        this.formData.sessionCost = data.sessionCost;
        this.workflowService.validateStep(__WEBPACK_IMPORTED_MODULE_3__workflow_workflow_model__["a" /* STEPS */].step2);
    };
    FormDataService.prototype.getStep3Info = function () {
        var step3 = {
            sessionDate: this.formData.sessionDate,
            sessionTimes: this.formData.sessionTimes,
            sessionDuration: this.formData.sessionDuration
        };
        return step3;
    };
    FormDataService.prototype.setStep3Info = function (data) {
        this.isStep3Valid = true;
        this.formData.sessionDate = data.sessionDate;
        this.formData.sessionTimes = data.sessionTimes;
        this.formData.sessionDuration = data.sessionDuration;
        this.workflowService.validateStep(__WEBPACK_IMPORTED_MODULE_3__workflow_workflow_model__["a" /* STEPS */].step3);
    };
    FormDataService.prototype.getFormData = function () {
        // Return the entire Form Data
        return this.formData;
    };
    FormDataService.prototype.resetFormData = function () {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isStep1Valid = this.isStep2Valid = this.isStep3Valid = false;
        return this.formData;
    };
    FormDataService.prototype.isFormValid = function () {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isStep1Valid &&
            this.isStep2Valid &&
            this.isStep3Valid;
    };
    FormDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__workflow_workflow_service__["a" /* WorkflowService */]])
    ], FormDataService);
    return FormDataService;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/formnav/formnav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"board-inner\" id=\"status-buttons\">\n  <ul class=\"nav nav-tabs\" id=\"myTab\">\n    <div class=\"liner\"></div>\n\n    <!-- circular user icon -->\n    <li>\n      <a uiSrefActive=\"active\" uiSref=\"step1\" data-toggle=\"tab\" title=\"step1\">\n                <span class=\"round-tabs one\">\n                    <i class=\"glyphicon glyphicon-user\"></i>\n                </span>\n      </a>\n    </li>\n\n    <!-- circular tasks icon -->\n    <li>\n      <a uiSrefActive=\"active\" uiSref=\"step2\" data-toggle=\"tab\" title=\"step2\">\n                <span class=\"round-tabs two\">\n                    <i class=\"glyphicon glyphicon-tasks\"></i>\n                </span>\n      </a>\n    </li>\n\n    <!-- circular home icon -->\n    <li>\n      <a uiSrefActive=\"active\" uiSref=\"step3\" data-toggle=\"tab\" title=\"step3\">\n                <span class=\"round-tabs three\">\n                    <i class=\"glyphicon glyphicon-home\"></i>\n                </span>\n      </a>\n    </li>\n\n    <!-- circular ok icon -->\n    <li>\n      <a uiSrefActive=\"active\" uiSref=\"result\" data-toggle=\"tab\" title=\"completed\">\n                <span class=\"round-tabs four\">\n                    <i class=\"glyphicon glyphicon-ok\"></i>\n                </span>\n      </a>\n    </li>\n\n  </ul>\n  <div class=\"clearfix\"></div>\n</div>\n\n<!-- Close the Splash screen -->\n<script src=\"content/js/loading-bars.js\"></script>\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/formnav/formnav.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/formnav/formnav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormnavComponent; });
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

var FormnavComponent = /** @class */ (function () {
    function FormnavComponent() {
    }
    FormnavComponent.prototype.ngOnInit = function () {
    };
    FormnavComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-formnav',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/formnav/formnav.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/formnav/formnav.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FormnavComponent);
    return FormnavComponent;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/result/result.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"tab-pane fade in active\">\n  <h3 class=\"head text-center\">{{title}}</h3>\n  <p class=\"narrow text-center\">\n    Here is a copy of the information you have entered:\n  </p>\n  <div class='row'>\n    <div class='col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-8 col-md-offset-4 col-md-8'>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"title\">Session Title: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.title}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"game\">Game: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.gameId}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"console\">Platform: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.console}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"numSlots\">Number of slots: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.numSlots}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessionCost\">Cost per slot: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.sessionCost}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessiondate\">Session Date: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.sessionDate}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessiontime\">Session Time: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{formData.sessionTimes}}\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class='col-xs-3 col-sm-2'>\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"sessiontimeMS\">Session Time in MS: </label>\n          </div>\n        </div>\n        <div class='col-xs-9 col-sm-10'>\n          {{timeMS}}\n        </div>\n      </div>\n\n    </div>\n  </div>\n  <div class=\"text-center\">\n    <button class=\"btn btn-success btn-outline-rounded\" (click)=\"submit()\" routerLink=\"../\"> Submit <span style=\"margin-left:10px;\" class=\"glyphicon glyphicon-arrow-right\"></span></button>\n    <button class=\"btn btn-success btn-outline-rounded\" (click)=\"clear()\" routerLink=\"../\"> Cancel  </button>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/result/result.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/result/result.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_formData_model__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usersessions_service__ = __webpack_require__("../../../../../src/app/usersessions/usersessions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__ = __webpack_require__("../../../../../src/app/userprofile/userprofile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResultComponent = /** @class */ (function () {
    function ResultComponent(formDataService, userSessionService, userProfileService) {
        this.formDataService = formDataService;
        this.userSessionService = userSessionService;
        this.userProfileService = userProfileService;
        this.title = "Review your Submission";
        this.isFormValid = false;
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    ResultComponent.prototype.ngOnInit = function () {
        this.getLoggedInUserId(this.profile.nickname);
        this.formData = this.formDataService.getFormData();
        this.isFormValid = this.formDataService.isFormValid();
        console.log('Result feature loaded!');
    };
    ResultComponent.prototype.submit = function () {
        alert('Session Created');
        console.log(this.formData);
        this.formData.sessionCreatorId = JSON.parse(localStorage.getItem("profile"));
        this.timeMS = this.timeToMilliseconds(this.formData.sessionTimes) + this.formData.sessionDate.getTime();
        // var costNoDollar = this.formatCost(this.formData.sessionCost);
        var data = {
            "hostId": this.loggedInUserId,
            "title": this.formData.title,
            "game_id": this.formData.gameId,
            "console": this.formData.console,
            "numSlots": this.formData.numSlots,
            "sessionCost": this.formData.sessionCost,
            "sessionTime": this.timeMS,
            "sessionDuration": '1:00:00'
        };
        this.userSessionService.createUserSession(data);
        console.log(data);
        // window.location.reload();
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    };
    ResultComponent.prototype.getLoggedInUserId = function (riftTag) {
        var _this = this;
        if (JSON.parse(localStorage.getItem("loggedInUserID")) != null) {
            this.loggedInUserId = parseInt(JSON.parse(localStorage.getItem("loggedInUserID")));
        }
        else {
            this.userProfileService.getUserId(riftTag).subscribe(function (resBody) {
                _this.loggedInUserId = resBody.id;
            });
        }
    };
    ResultComponent.prototype.timeToMilliseconds = function (time) {
        var list = time.split(":");
        var hour = (+list[0]);
        var minute = (+list[1]);
        var seconds = (hour * 60 * 60) + (minute * 60);
        return seconds * 1000;
    };
    // formatCost(cost): string {
    //
    //   if (cost.charAt(0) == "$") {
    //     return cost.substr(1);
    //   }
    //   return cost;
    // }
    ResultComponent.prototype.clear = function () {
        this.formData = this.formDataService.resetFormData();
        this.isFormValid = false;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__data_formData_model__["a" /* FormData */])
    ], ResultComponent.prototype, "formData", void 0);
    ResultComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-result',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/result/result.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/result/result.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_formData_service__["a" /* FormDataService */], __WEBPACK_IMPORTED_MODULE_3__usersessions_service__["a" /* UsersessionsService */],
            __WEBPACK_IMPORTED_MODULE_4__userprofile_userprofile_service__["a" /* UserprofileService */]])
    ], ResultComponent);
    return ResultComponent;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/sessionform.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"width: 80%\">\n  <mat-horizontal-stepper [linear]=\"isLinear\">\n    <mat-step>\n      <ng-template matStepLabel></ng-template>\n      <app-step1></app-step1>\n    </mat-step>\n    <mat-step>\n      <app-step2></app-step2>\n    </mat-step>\n    <mat-step>\n      <app-step3></app-step3>\n    </mat-step>\n    <mat-step>\n      <app-result></app-result>\n    </mat-step>\n  </mat-horizontal-stepper>\n\n  <!-- For Debugging: show our valid formData -->\n  <pre>{{ formData | json }}</pre>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/sessionform.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/sessionform.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionformComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SessionformComponent = /** @class */ (function () {
    function SessionformComponent(formDataService) {
        this.formDataService = formDataService;
    }
    SessionformComponent.prototype.ngOnInit = function () {
        this.step1 = this.formDataService.getStep1Info();
        this.step2 = this.formDataService.getStep2Info();
        this.step3 = this.formDataService.getStep3Info();
        this.formData = this.formDataService.getFormData();
    };
    SessionformComponent.prototype.save = function (form) {
        if (!form.valid) {
            return;
        }
        this.formDataService.setStep1Info(this.step1);
        this.formDataService.setStep2Info(this.step2);
        this.formDataService.setStep3Info(this.step3);
        console.log(this.step3.sessionDate);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], SessionformComponent.prototype, "formData", void 0);
    SessionformComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sessionform',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/sessionform.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/sessionform.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_formData_service__["a" /* FormDataService */]])
    ], SessionformComponent);
    return SessionformComponent;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step1/step1.component.html":
/***/ (function(module, exports) {

module.exports = "<form #step1Form=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiontitle\">Give your session a title</label>\n              <input class=\"form-control input-md\" #sessiontitle=\"ngModel\" required id=\"sessiontitle\" name=\"sessiontitle\" type=\"text\" placeholder=\"Session Title\" [(ngModel)]=\"step1.title\">\n              <div class=\"alert alert-danger\" [hidden]=\"sessiontitle.valid\">Session title is required</div>\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiongame\">What game will you be playing?</label>\n              <!--<input class=\"form-control input-md\" #sessiongame=\"ngModel\"  id=\"sessiongame\" name=\"sessiongame\" type=\"text\" placeholder=\"Session Game\" [(ngModel)]=\"currentSession.game\">-->\n              <mat-form-field>\n                <mat-select placeholder=\"Select a Game\" [(value)]=\"gameId\">\n                  <mat-option *ngFor=\"let game of games\" [value]=\"game.id\">\n                    {{ game.name }}\n                  </mat-option>\n                </mat-select>\n              </mat-form-field>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\" for=\"sessionplatform\">What platform will you be playing on?</label>\n          <input class=\"form-control input-md\" #sessionplatform=\"ngModel\" required id=\"sessionplatform\" name=\"sessinplatform\" type=\"text\" placeholder=\"Session Platform\" [(ngModel)]=\"step1.console\">\n          <div class=\"alert alert-danger\" [hidden]=\"sessionplatform.valid\">Email is required and must be valid</div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div>\n    <button mat-button matStepperNext [disabled]=\"!step1Form.valid\" (click)=\"save(step1Form)\" class=\"btn-primary\" type=\"button\">Next</button>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step1/step1.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step1/step1.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Step1Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_games__ = __webpack_require__("../../../../../src/app/constants/games.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Step1Component = /** @class */ (function () {
    function Step1Component(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Step 1';
    }
    Step1Component.prototype.ngOnInit = function () {
        this.games = __WEBPACK_IMPORTED_MODULE_2__constants_games__["a" /* GAMES */];
        this.step1 = this.formDataService.getStep1Info();
        console.log("Step 1 information loaded");
    };
    Step1Component.prototype.save = function (form) {
        if (!form.valid) {
            return;
        }
        this.formDataService.setStep1Info(this.step1);
    };
    Step1Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-step1',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/step1/step1.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/step1/step1.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_formData_service__["a" /* FormDataService */]])
    ], Step1Component);
    return Step1Component;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step2/step2.component.html":
/***/ (function(module, exports) {

module.exports = "<form #step2Form=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessionslots\">How many slots in your session</label>\n              <input class=\"form-control input-md\" #sessionslots=\"ngModel\" required id=\"sessionslots\" name=\"sessionslots\" type=\"number\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"step2.numSlots\">\n              <div class=\"alert alert-danger\" [hidden]=\"sessionslots.valid\">Number of slots required</div>\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessioncost\">Cost per slot</label>\n              <input class=\"form-control input-md\" #sessioncost=\"ngModel\" required id=\"sessioncost\" name=\"sessioncost\" type=\"number\" placeholder=\"Cost per slot\" [(ngModel)]=\"step2.sessionCost\">\n              <div class=\"alert alert-danger\" [hidden]=\"sessioncost.valid\">Cost per slot required</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group text-center\">\n          <button mat-button matStepperPrevious class=\"btn-primary\" type=\"button\" (click)=\"save(step2Form)\">Back</button>\n          <button mat-button matStepperNext type=\"button\" [disabled]=\"!step2Form.valid\" (click)=\"save(step2Form)\">Next</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step2/step2.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step2/step2.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Step2Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Step2Component = /** @class */ (function () {
    function Step2Component(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Step 2';
    }
    Step2Component.prototype.ngOnInit = function () {
        this.step2 = this.formDataService.getStep2Info();
        console.log("Step 2 information loaded");
    };
    Step2Component.prototype.save = function (form) {
        if (!form.valid) {
            return;
        }
        this.formDataService.setStep2Info(this.step2);
    };
    Step2Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-step2',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/step2/step2.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/step2/step2.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_formData_service__["a" /* FormDataService */]])
    ], Step2Component);
    return Step2Component;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step3/step3.component.html":
/***/ (function(module, exports) {

module.exports = "<form #step3Form=\"ngForm\" class=\"editForm\" novalidate>\n  <div class=\"tab-pane fade in active\">\n    <h4 class=\"head text-center\">{{title}}</h4>\n    <br/>\n    <div class='row'>\n      <div class='col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8'>\n        <div class=\"row\">\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiondate\">What date</label>\n              <!--<input class=\"form-control input-md\" #sessiondate=\"ngModel\" required id=\"sessiondate\" name=\"sessiondate\" type=\"text\" placeholder=\"Number of slots for your session\" [(ngModel)]=\"step3.sessionDate\">-->\n              <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\" #sessiondate=\"ngModel\" required id=\"sessiondate\" name=\"sessiondate\" [(ngModel)]=\"step3.sessionDate\">\n              <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n              <mat-datepicker #picker></mat-datepicker>\n              <div class=\"alert alert-danger\" [hidden]=\"sessiondate.valid\">Date is required</div>\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessiontime\">What time</label>\n              <input matInput type=\"time\" placeholder=\"Pick a time\" #sessiontime=\"ngModel\" required id=\"sessiontime\" name=\"sessiontime\" [(ngModel)]=\"step3.sessionTimes\">\n              <div class=\"alert alert-danger\" [hidden]=\"sessiontime.valid\">Time is required</div>\n            </div>\n          </div>\n          <div class='col-xs-12 col-sm-6'>\n            <div class=\"form-group\">\n              <label class=\"control-label\" for=\"sessionduration\">Select a Duration</label>\n              <input matInput type=\"number\" placeholder=\"Select a duration\" #sessionduration=\"ngModel\" required id=\"sessionduration\" name=\"sessionduration\" [(ngModel)]=\"step3.sessionDuration\">\n              <div class=\"alert alert-danger\" [hidden]=\"sessionduration.valid\">Duration required</div>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group text-center\">\n          <button mat-button matStepperPrevious class=\"btn-primary\" type=\"button\" (click)=\"save(step3Form)\">Back</button>\n          <button mat-button matStepperNext type=\"button\" [disabled]=\"!step3Form.valid\" (click)=\"save(step3Form)\">Next</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n"

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step3/step3.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/step3/step3.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Step3Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_formData_service__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/data/formData.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Step3Component = /** @class */ (function () {
    function Step3Component(formDataService) {
        this.formDataService = formDataService;
        this.title = 'Step 3';
    }
    Step3Component.prototype.ngOnInit = function () {
        this.step3 = this.formDataService.getStep3Info();
        console.log("Step 3 information loaded");
    };
    Step3Component.prototype.save = function (form) {
        if (!form.valid) {
            return;
        }
        this.formDataService.setStep3Info(this.step3);
    };
    Step3Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-step3',
            template: __webpack_require__("../../../../../src/app/usersessions/sessionform/step3/step3.component.html"),
            styles: [__webpack_require__("../../../../../src/app/usersessions/sessionform/step3/step3.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_formData_service__["a" /* FormDataService */]])
    ], Step3Component);
    return Step3Component;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/workflow/workflow.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STEPS; });
var STEPS = {
    step1: 'step1',
    step2: 'step2',
    step3: 'step3',
    result: 'result'
};


/***/ }),

/***/ "../../../../../src/app/usersessions/sessionform/workflow/workflow.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkflowService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__workflow_model__ = __webpack_require__("../../../../../src/app/usersessions/sessionform/workflow/workflow.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var WorkflowService = /** @class */ (function () {
    function WorkflowService() {
        this.workflow = [
            { step: __WEBPACK_IMPORTED_MODULE_1__workflow_model__["a" /* STEPS */].step1, valid: false },
            { step: __WEBPACK_IMPORTED_MODULE_1__workflow_model__["a" /* STEPS */].step2, valid: false },
            { step: __WEBPACK_IMPORTED_MODULE_1__workflow_model__["a" /* STEPS */].step3, valid: false },
            { step: __WEBPACK_IMPORTED_MODULE_1__workflow_model__["a" /* STEPS */].result, valid: false }
        ];
    }
    WorkflowService.prototype.validateStep = function (step) {
        // If the state is found, set the valid field to true
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
            }
        }
    };
    WorkflowService.prototype.resetSteps = function () {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(function (element) {
            element.valid = false;
        });
    };
    WorkflowService.prototype.getFirstInvalidStep = function (step) {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            var item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step;
            }
        }
        return redirectToStep;
    };
    WorkflowService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], WorkflowService);
    return WorkflowService;
}());



/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\n  margin-top: 5%;\n}\n\n.session-view {\n  width: 75% !important;\n  /*display: inline-block !important;*/\n  float: right !important;\n}\n\nmat-checkbox {\n  display:block !important;\n}\n\n.btn {\n  /*float: right;*/\n  /*width: 20%;*/\n  margin-top: 10px;\n  background-color: #293e49!important;\n  border: none;\n}\n\n.filters{\n  border: 1px solid #333333;\n  padding: 20px;\n  display: inline-block;\n  width: 20%;\n  -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.1);\n          box-shadow: 5px 5px 15px rgba(0,0,0,0.1);\n  background-color: white;\n  border: none;\n  border-radius: 4px;\n  padding-top: 1px;\n  position: relative;\n  float: left;\n}\n\n.filter{\n  width: 100%;\n  background: #999999;\n  border-radius: 3px;\n  margin-bottom: 10px;\n  height: 35px;\n}\n\nh5 {\n  text-transform: uppercase;\n  color: #bababa;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n\nh5:after{\n   content: \"\";\n   display: block;\n   width: 100%;\n   height: 1px;\n   margin-top: 3px;\n   background-color: #e8e8e8;\n }\n\n.sessions {\n  margin-top: 2%;\n  width: 70%;\n  display: inline-block;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/usersessions/usersessions.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"width: 95%\">\n\n  <div class=\"filters\">\n    <button (click)=\"openDialog()\" type=\"button\" class=\"btn btn-primary createASession\" >\n      Create a Session\n    </button>\n    <h5>Filter by Session Type</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <label class=\"fake-checkbox\">\n          <mat-checkbox [(ngModel)]=\"rifter\"> Rifter </mat-checkbox>\n          <mat-checkbox [(ngModel)]=\"riftee\"> Riftee </mat-checkbox>\n        </label>\n      </div>\n    </div>\n    <h5>Filter by Session Time</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n          <mat-checkbox [(ngModel)]=\"upcoming\"> Upcoming </mat-checkbox>\n          <mat-checkbox [(ngModel)]=\"past\"> Past </mat-checkbox>\n      </div>\n    </div>\n    <h5>Filter by Game</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <div *ngFor=\"let game of games\">\n          <mat-checkbox [(ngModel)]=\"game.selected\"> {{game.name}} </mat-checkbox>\n        </div>\n      </div>\n    </div>\n    <h5>Filter by Console</h5>\n    <div>\n      <div class=\"category-filter filter-wrapper\">\n        <div *ngFor=\"let console of consoles\">\n          <mat-checkbox [(ngModel)]=\"console.selected\"> {{console.name}} </mat-checkbox>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"session-view\">\n    <tabset>\n      <tab heading=\"card view\" id=\"tab1\" (select)=\"card = true\" [ngClass]=\"{'display-calendar': !card, 'hide-calendar':card}\">\n        <div class=\"sessions\">\n          <div *ngFor=\"let session of currentUser.sessions | sessionType: rifter:riftee | sessionTime: upcoming:past |\n            gameFilter: selectedGames | consoleFilter: selectedConsoles\">\n            <app-session-card [routerLink]=\"['../session', session.id]\"\n                              [session]=\"session\" [type]=\"session.type\" [isLoggedIn]=\"true\"\n                              [request]=\"loggedInUser.sessionRequests.get(session.id)\"\n            ></app-session-card>\n          </div>\n        </div>\n      </tab>\n      <tab heading=\"calendar view\" (select)=\"renderCalendar()\" [ngClass]=\"{'display-calendar': !card, 'hide-calendar':card}\">\n        <angular2-fullcalendar [options]=\"calendarOptions\"></angular2-fullcalendar>\n      </tab>\n\n    </tabset>\n\n  </div>\n\n  <router-outlet></router-outlet>\n\n</div>\n\n<!--<mat-tab-group>-->\n<!--<mat-tab label=\"card view\">-->\n<!--<div class=\"sessions\">-->\n<!--<div *ngFor=\"let session of currentUser.sessions | sessionType: rifter:riftee | sessionTime: upcoming:past |-->\n<!--gameFilter: selectedGames | consoleFilter: selectedConsoles\">-->\n<!--<app-session-card [routerLink]=\"['../session', session.id]\"-->\n<!--[session]=\"session\" [type]=\"session.type\" [isLoggedIn]=\"true\"-->\n<!--[request]=\"loggedInUser.sessionRequests.get(session.id)\"-->\n<!--&gt;</app-session-card>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--</mat-tab>-->\n<!--<mat-tab label=\"calendar\" style=\"display: block\">-->\n<!--<angular2-fullcalendar [options]=\"calendarOptions\"></angular2-fullcalendar>-->\n\n<!--</mat-tab>-->\n<!--</mat-tab-group>-->\n"

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
        var riftTag = this.profile.nickname;
        this.getUserRifterAndRifteeSessions(riftTag);
        this.getUserSessionRequests(riftTag);
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
    UsersessionsComponent.prototype.openDialog = function () {
        //noinspection TypeScriptUnresolvedFunction
        this.dialog.open(__WEBPACK_IMPORTED_MODULE_7__create_session_create_session_component__["a" /* CreateSessionComponent */], {});
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
            if (currSession.type) {
                var newSession = {
                    title: currSession.title,
                    sessionId: currSession.id,
                    start: new Date(currSession.sessionTime).toISOString(),
                    color: '#293e49'
                };
            }
            else {
                var newSession = {
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