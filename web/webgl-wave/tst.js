window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, false);
  
    BABYLON.Effect.ShadersStore["waterVertexShader"] = `
           attribute vec3 position;
           attribute vec2 uv;           
           uniform mat4 world;                                     
           uniform mat4 viewProjection;
           uniform sampler2D waterSampler;
           varying vec2 vMainUV1;
           varying vec3 positionWater;
           void main(void) {
               vMainUV1 = uv;
               vec4 info = texture(waterSampler, vMainUV1);
               positionWater = position.xyz;
               positionWater.y += info.r * 50.0;
               vec4 worldPosition = world * vec4(positionWater, 1.0);
               gl_Position =  viewProjection * worldPosition;
           }`;

    BABYLON.Effect.ShadersStore["waterFragmentShader"] = `         
        precision highp float;
        uniform vec3 vEyePosition;
        uniform samplerCube sky;
        uniform sampler2D waterSampler;    
        varying vec2 vMainUV1;
        varying vec3 positionWater;    
        const float IOR_AIR = 1.0;
        const float IOR_WATER = 1.333;       
        void main(void) {    
            vec4 info = texture(waterSampler, vMainUV1);
            vec3 normal = vec3(info.b, sqrt(1.0 - dot(info.ba, info.ba)), info.a);
            vec3 incomingRay = normalize(positionWater - vEyePosition); 
            vec3 reflectedRay = reflect(incomingRay, normal);
            vec3 refractedRay = refract(incomingRay, normal, IOR_AIR / IOR_WATER);
            float fresnel = mix(0.25, 1.0, pow(1.0 - dot(normal, -incomingRay), 3.0));
            vec3 reflectedColor = textureCube(sky, reflectedRay).rgb;       
            vec3 refractedColor = textureCube(sky, refractedRay).rgb;        
            gl_FragColor = vec4(mix(refractedColor, reflectedColor, fresnel), 1.0);
            //gl_FragColor = vec4(normal, 1.0);
        }`;         
   
    var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 1.0);
        
        // var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 70, 70), scene);
        // camera.setTarget(BABYLON.Vector3.Zero());
        // camera.attachControl(canvas, false);
        // Creates, angles, distances and targets the camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // This positions the camera
        camera.setPosition(new BABYLON.Vector3(0, 100, -100));

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);       
        
        var waveTextureA = engine.createRenderTargetTexture(256, {type:BABYLON.Engine.TEXTURETYPE_FLOAT});
        var waveTextureB = engine.createRenderTargetTexture(256, {type:BABYLON.Engine.TEXTURETYPE_FLOAT});        
        
        var waveA = new BABYLON.EmptyMapProceduralTexture("waveA", 256, scene, waveTextureA);
        waveA.onGenerated = function() {
            waveA.isEnabled = false;
        }
        
        var hit = new BABYLON.HitWaterProceduralTexture("hit", 256, scene, waveTextureB);
        hit.waveTexture = waveA;
        hit.onGenerated = function() {
            waveA._texture = waveTextureB;
            hit.isEnabled = false;
        }
        
        var waveB = new BABYLON.WaveMapProceduralTexture("waveB", 256, scene, waveTextureA);
        waveB.waveTexture = waveA;       
        
        var waveC = new BABYLON.WaveNormalMapProceduralTexture("waveC", 256, scene, waveTextureB);
        waveC.waveTexture = waveB;
        
        //var skyBox = new BABYLON.CubeTexture.CreateFromPrefilteredData("/demo/water/hdrlib_com.dds", scene);
        var skyBox = new BABYLON.CubeTexture("https://zhangzhu123.github.io/zhangzhuhome/asset/wave/CloudyLightRays", scene);        
        
        var waterMaterial = new BABYLON.ShaderMaterial("test", scene, {
                vertex: "water",
                fragment: "water"
            },
            {
                needAlphaBlending: true,
                attributes: ["position", "uv"],
                uniforms:   ["world","viewProjection","vEyePosition"],
                samplers:   ["waterSampler","sky"]
                // uniforms:   ["world","viewProjection"],
                // samplers:   ["waterSampler"]                
            });    

        waterMaterial.onBind = function(mesh) {
            var effect = waterMaterial.getEffect();
            effect.setTexture("waterSampler", waveC); 
            effect.setTexture("sky", skyBox); 
            effect.setVector3("vEyePosition", scene.activeCamera.position);
            
        }        
      
        var model;
        BABYLON.SceneLoader.ImportMesh("", "", "https://zhangzhu123.github.io/zhangzhuhome/asset/wave/waterPlane.obj", scene, function (newMeshes) {
            newMeshes[0].material = waterMaterial;
            //newMeshes[0].rotation.x  =  -1.5707;
            model = newMeshes[0];
        });  

        // // Plane
        // var plane = BABYLON.Mesh.CreatePlane("map", 20, scene);
        // //plane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        // //plane.scaling.y = 1.0 / engine.getAspectRatio(scene.activeCamera);
        // plane.material = waterMaterial;
        window.addEventListener("click", function () {
           hit.center = new BABYLON.Vector2(Math.random() - 0.5,Math.random() - 0.5);
           hit.radius = 0.05;
           hit.strength = 0.02;
           waveA._texture = waveTextureA;
           hit.isEnabled = true;
        });   
        
        return scene;
    }

    var scene = createScene();

    engine.runRenderLoop(function(){
        scene.render();
    });

    window.addEventListener('resize', function(){
        engine.resize();
    });
});