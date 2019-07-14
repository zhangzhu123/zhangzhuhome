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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BABYLON;
(function (BABYLON) {
    var MDKVoxMaterialDefines = (function (_super) {
        __extends(MDKVoxMaterialDefines, _super);
        function MDKVoxMaterialDefines() {
            var _this = _super.call(this) || this;           
            _this.rebuild();
            return _this;
        }
        return MDKVoxMaterialDefines;
    }(BABYLON.MaterialDefines));
    /*
     */
    var MDKVoxMaterial = (function (_super) {
        __extends(MDKVoxMaterial, _super);
        /*
         */
        function MDKVoxMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
                      
            return _this;
        }
        MDKVoxMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
            if (!subMesh._materialDefines) {
                subMesh._materialDefines = new MDKVoxMaterialDefines();
            }
            var scene = this.getScene();
            var defines = subMesh._materialDefines;
            // if (!this.checkReadyOnEveryCall && subMesh.effect) {
                // if (defines._renderId === scene.getRenderId()) {
                    // return true;
                // }
            // }            
            var engine = scene.getEngine();

            // Get correct effect
            if (defines.isDirty) {
                defines.markAsProcessed();
                scene.resetCachedMaterial();
                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                attribs.push(BABYLON.VertexBuffer.ColorKind);
                // attribs.push(BABYLON.VertexBuffer.NormalKind);
                // attribs.push(BABYLON.VertexBuffer.UVKind);
 
                var uniforms = ["world", "viewProjection"];
                var samplers = [];
                var uniformBuffers = [];
                var onCompiled = function (effect) {
                    if (this.onCompiled) {
                        this.onCompiled(effect);
                    }
                    this.bindSceneUniformBuffer(effect, scene.getSceneUniformBuffer());
                }.bind(this);
                var join = defines.toString();
                subMesh.setEffect(scene.getEngine().createEffect("./mdkvox", {
                    attributes: attribs,
                    uniformsNames: uniforms,
                    uniformBuffersNames: uniformBuffers,
                    samplers: samplers,
                    defines: join,
                    fallbacks: fallbacks,
                    onCompiled: onCompiled,
                    onError: this.onError,
                    indexParameters: { maxSimultaneousLights: 4, maxSimultaneousMorphTargets: 0 }
                }, engine), defines);
            }
            if (!subMesh.effect.isReady()) {
                return false;
            }
            // defines._renderId = scene.getRenderId();
            return true;
        };
        MDKVoxMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
            var scene = this.getScene();
            var defines = subMesh._materialDefines;
            if (!defines) {
                return;
            }
            var effect = subMesh.effect;
            effect.setMatrix("world", world);
            
            if (this._mustRebind(scene, effect, mesh.visibility)) {
                this._useUBO = false;
                this.bindViewProjection(effect);
                // effect.setTexture("skySampler", this._skyTexture);
                // effect.setMatrix("environmentRotationMatrix", this._environmentRotationMatrix);
                
                // this._backgroundInfo.x = this._environmentIntensity;
                // this._backgroundInfo.y = this._backgroundIntensity;
                // this._backgroundInfo.z = this._blurIntensity;
                // effect.setVector3("backgroundInfo", this._backgroundInfo);                
            }

            this._afterBind(mesh);
            scene = null;
        };
        MDKVoxMaterial.prototype.dispose = function (forceDisposeEffect, forceDisposeTextures) {
            if (forceDisposeTextures) {
                // if (this._skyTexture) {
                    // this._skyTexture.dispose();
                // }
            }
            _super.prototype.dispose.call(this, forceDisposeEffect, forceDisposeTextures);
        };
        return MDKVoxMaterial;
    }(BABYLON.PushMaterial));
    BABYLON.MDKVoxMaterial = MDKVoxMaterial;
})(BABYLON || (BABYLON = {}));

