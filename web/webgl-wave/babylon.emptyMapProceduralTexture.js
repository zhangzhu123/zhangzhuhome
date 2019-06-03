/// <reference path="../../../dist/preview release/babylon.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BABYLON;
(function (BABYLON) {
    var EmptyMapProceduralTexture = (function (_super) {
        __extends(EmptyMapProceduralTexture, _super);
        function EmptyMapProceduralTexture(name, size, scene, texture, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "./emptyMapProceduralTexture", scene, texture,  fallbackTexture, generateMipMaps) || this;
            return _this;
        }
        EmptyMapProceduralTexture.prototype.render = function (useCameraPostProcess) {
            _super.prototype.render.call(this, useCameraPostProcess);
        };        
        return EmptyMapProceduralTexture;
    }(BABYLON.MDKProceduralTexture));
    BABYLON.EmptyMapProceduralTexture = EmptyMapProceduralTexture;
})(BABYLON || (BABYLON = {}));
