/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sensor_module_1 = __webpack_require__(5);
const supabase_service_1 = tslib_1.__importDefault(__webpack_require__(7));
const serve_static_1 = __webpack_require__(10);
const path_1 = __webpack_require__(11);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sensor_module_1.SensorModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "dist/apps", 'frontend'),
            }),
        ],
        providers: [supabase_service_1.default],
        exports: [supabase_service_1.default],
        controllers: [],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SensorModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sensor_service_1 = __webpack_require__(6);
const sensor_controller_1 = __webpack_require__(9);
const supabase_service_1 = __webpack_require__(7);
let SensorModule = class SensorModule {
};
exports.SensorModule = SensorModule;
exports.SensorModule = SensorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [sensor_service_1.SensorService, supabase_service_1.SupabaseService],
        controllers: [sensor_controller_1.SensorController],
    })
], SensorModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SensorService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const supabase_service_1 = __webpack_require__(7);
let SensorService = class SensorService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async getLatestSensorValues() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('sensor_one')
            .select('srno, distance_cm,sensor_name,timestamp,litre,waterpercent,level')
            .order('timestamp', { ascending: false })
            .limit(10);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async getSensorValues() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('sensor_one')
            .select('srno, distance_cm,sensor_name,timestamp,litre,waterpercent,level')
            .order('timestamp', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async getDataByDateRange(startDate, endDate) {
        try {
            const { data, error } = await this.supabaseService
                .getClient()
                .from('sensor_one')
                .select('timestamp,litre')
                //.range('timestamp::Date', [startDate.toISOString(), endDate.toISOString()]);
                .gte('timestamp::Date', startDate) // Greater than or equal to the start date
                .lte('timestamp:Date', endDate) // Less than or equal to the end date
                .order('timestamp', { ascending: true });
            console.log(data);
            return data;
        }
        catch (error) {
            throw new Error(`Failed to fetch data from Supabase: ${error.message}`);
        }
    }
    async percentvalueoh() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('sensor_one')
            .select('waterpercent')
            .order('timestamp', { ascending: false })
            .limit(1);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async percentvaluelh() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('sensor_two')
            .select('waterpercent,litre')
            .order('time_stamp', { ascending: false })
            .limit(1);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof supabase_service_1.SupabaseService !== "undefined" && supabase_service_1.SupabaseService) === "function" ? _a : Object])
], SensorService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupabaseService = void 0;
const tslib_1 = __webpack_require__(4);
// supabase.service.ts
const common_1 = __webpack_require__(1);
const supabase_js_1 = __webpack_require__(8);
let SupabaseService = class SupabaseService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)('https://oyxwpkznmawsavvqhgxl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95eHdwa3pubWF3c2F2dnFoZ3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NzE0ODUsImV4cCI6MjAyNDM0NzQ4NX0.SD1ZiGx2r9u3m6lY6iC7MMKEgvxW4NT5AvyT7qlZzfw');
    }
    getClient() {
        return this.supabase;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], SupabaseService);
exports["default"] = SupabaseService; // Export the SupabaseService


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SensorController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sensor_service_1 = __webpack_require__(6);
let SensorController = class SensorController {
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    async getLatestSensorValues() {
        return this.sensorService.getLatestSensorValues();
    }
    async getSensorValues() {
        return this.sensorService.getSensorValues();
    }
    // @Get(':date')
    // async getDataByDate(@Param('date') date1: Date): Promise<any[]> {
    //   return this.sensorService.getDataByDate(date1); // Call the service method
    // }
    // ':startDate/:endDate'
    async getDataByDateRange(startDate, endDate) {
        return this.sensorService.getDataByDateRange(startDate, endDate);
    }
    async getSensorData(endpoint) {
        switch (endpoint) {
            case 'percentoh':
                return this.sensorService.percentvalueoh();
            case 'percentlh':
                return this.sensorService.percentvaluelh();
            default:
                throw new Error('Invalid endpoint');
        }
    }
};
exports.SensorController = SensorController;
tslib_1.__decorate([
    (0, common_1.Get)('latest'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], SensorController.prototype, "getLatestSensorValues", null);
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SensorController.prototype, "getSensorValues", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('startDate')),
    tslib_1.__param(1, (0, common_1.Query)('endDate')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object, typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SensorController.prototype, "getDataByDateRange", null);
tslib_1.__decorate([
    (0, common_1.Get)(':endpoint'),
    tslib_1.__param(0, (0, common_1.Param)('endpoint')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], SensorController.prototype, "getSensorData", null);
exports.SensorController = SensorController = tslib_1.__decorate([
    (0, common_1.Controller)('sensor'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof sensor_service_1.SensorService !== "undefined" && sensor_service_1.SensorService) === "function" ? _a : Object])
], SensorController);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    app.enableCors({
        origin: '*', // Update this to allow requests from specific origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
        credentials: true,
    });
    await app.listen(port, '0.0.0.0');
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// import { Logger } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';
// import * as process from 'process';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const host = '0.0.0.0'; // Listen on all network interfaces
//   const port = process.env.PORT ;
//   await app.listen(port, host);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//   app.enableCors({
//     origin: '*', // Update this to allow requests from specific origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
//     credentials: true,
//   });
//   Logger.log(
//     `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
//   );
// }
// bootstrap();

})();

/******/ })()
;