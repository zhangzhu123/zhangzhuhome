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
    var WaveMapProceduralTexture = (function (_super) {
        __extends(WaveMapProceduralTexture, _super);
        function WaveMapProceduralTexture(name, size, scene, texture, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "./waveMapProceduralTexture", scene, texture,  fallbackTexture, generateMipMaps) || this;
            _this._delta = new BABYLON.Vector2(1/256.0, 1/256.0);
            _this.updateShaderUniforms();
            return _this;
        }
        WaveMapProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setTexture("waveTexture", this._waveTexture);
            this.setVector2("delta", this._delta);
        };
        WaveMapProceduralTexture.prototype.render = function (useCameraPostProcess) {
            _super.prototype.render.call(this, useCameraPostProcess);
        };
        Object.defineProperty(WaveMapProceduralTexture.prototype, "waveTexture", {
            get: function () {
                return this._waveTexture;
            },
            set: function (texture) {
                this._waveTexture = texture;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaveMapProceduralTexture.prototype, "delta", {
            get: function () {
                return this._delta;
            },
            set: function (value) {
                this._delta = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });        
        return WaveMapProceduralTexture;
    }(BABYLON.MDKProceduralTexture));
    BABYLON.WaveMapProceduralTexture = WaveMapProceduralTexture;
})(BABYLON || (BABYLON = {}));
