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
    var HitWaterProceduralTexture = (function (_super) {
        __extends(HitWaterProceduralTexture, _super);
        function HitWaterProceduralTexture(name, size, scene, texture, fallbackTexture, generateMipMaps) {
            var _this = _super.call(this, name, size, "./hitWaterProceduralTexture", scene, texture,  fallbackTexture, generateMipMaps) || this;
            //_this._delta = new BABYLON.Vector2(1/256.0, 1/256.0);
            _this._center = new BABYLON.Vector2(0, 0);
            _this._radius = 0.03;
            _this._strength = 0.01;
            _this.updateShaderUniforms();
            return _this;
        }
        HitWaterProceduralTexture.prototype.updateShaderUniforms = function () {
            this.setTexture("waveTexture", this._waveTexture);
            this.setVector2("center", this._center);
            this.setFloat("radius", this._radius);
            this.setFloat("strength", this._strength);
        };
        HitWaterProceduralTexture.prototype.render = function (useCameraPostProcess) {
            _super.prototype.render.call(this, useCameraPostProcess);
        };
        Object.defineProperty(HitWaterProceduralTexture.prototype, "waveTexture", {
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
        Object.defineProperty(HitWaterProceduralTexture.prototype, "center", {
            get: function () {
                return this._center;
            },
            set: function (value) {
                this._center = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });  
        Object.defineProperty(HitWaterProceduralTexture.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (value) {
                this._radius = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });  
        Object.defineProperty(HitWaterProceduralTexture.prototype, "strength", {
            get: function () {
                return this._strength;
            },
            set: function (value) {
                this._strength = value;
                this.updateShaderUniforms();
            },
            enumerable: true,
            configurable: true
        });          
        return HitWaterProceduralTexture;
    }(BABYLON.MDKProceduralTexture));
    BABYLON.HitWaterProceduralTexture = HitWaterProceduralTexture;
})(BABYLON || (BABYLON = {}));
