window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, false);
    
    var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.89, 0.929, 0.803, 1);
        
        //create camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(-30, 30, 20), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, -400));
        camera.attachControl(canvas, true);   
        
        var pbr = new BABYLON.MDKPBRMaterial("pbr", scene);
        pbr._reflectionTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("http://oydalubb3.bkt.clouddn.com/hdrvfx_pitpaSpecularHDR.dds", scene);
        // pbr._reflectionTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("/9-mm/hdrvfx_pitpaSpecularHDR.dds", scene);
        pbr._reflectionTexture.gammaSpace = true;
        
        pbr._albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        pbr._albedoTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_Albedo.tga.png", scene);
        // pbr._albedoTexture = new BABYLON.Texture("/9-mm/GunGS_Albedo.tga.png", scene);
        
        pbr._useMetal = true;
        pbr._reflectivityColor = new BABYLON.Color3(1.,1.,1.);
        pbr._reflectivityTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_Metallic.tga.png", scene);
        // pbr._reflectivityTexture = new BABYLON.Texture("/9-mm/GunGS_Metallic.tga.png", scene);
        pbr._fresnelWeight = 0.;
        
        pbr._useGlossness = false;
        pbr._microSurface = 1.;
        pbr._microSurfaceTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_Roughness.tga.png", scene);
        // pbr._microSurfaceTexture = new BABYLON.Texture("/9-mm/GunGS_Roughness.tga.png", scene);
        
        pbr._bumpTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_NormalGL.tga.png", scene);
        // pbr._bumpTexture = new BABYLON.Texture("/9-mm/GunGS_NormalGL.tga.png", scene);
        // pbr._bumpTexture.level = 1.;
        pbr._invertNormalMapX = true;
        pbr._invertNormalMapY = true;
        
        // pbr._ambientColor = new BABYLON.Color3(3.0, 3.0, 3.0);
        pbr._ambientTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_AO.tga.png", scene);
        // pbr._ambientTexture = new BABYLON.Texture("/9-mm/GunGS_AO.tga.png", scene);
        pbr._ambientTextureStrength = 1.4;
        
        pbr._emissiveColor = new BABYLON.Color3(2.0, 2.0, 2.0);
        pbr._emissiveTexture = new BABYLON.Texture("http://oydalubb3.bkt.clouddn.com/GunGS_Emissive.tga.png", scene);
        // pbr._emissiveTexture = new BABYLON.Texture("/9-mm/GunGS_Emissive.tga.png", scene);

        pbr._useTransparencyMask = false;
        pbr._useTransparencyBlend = false;
        pbr.alpha = 1.;
        pbr._opacityTexture = false;
        pbr._opacityTexture.getAlphaFromRGB = false;
        
        pbr.useLogarithmicDepth = false;
        pbr.backFaceCulling = true;  
        pbr._environmentRotationMatrix = BABYLON.Matrix.RotationY(0.5);   
        pbr._environmentIntensity = 5.;
        
        //
        BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
        BABYLON.SceneLoader.ImportMesh("", "", "http://oydalubb3.bkt.clouddn.com/9-mm.obj", scene, function (newMeshes) {
            newMeshes[0].material = pbr;
            model = newMeshes[0];
        });           
        // BABYLON.SceneLoader.ImportMesh("", "", "./9-mm/9-mm.obj", scene, function (newMeshes) {
            // newMeshes[0].material = pbr;
            // model = newMeshes[0];
        // }); 
        
        //        
        var skyboxMaterial = new BABYLON.MDKSkyMaterial("skyBox", scene);
        skyboxMaterial._skyTexture = pbr._reflectionTexture ;
        skyboxMaterial._blurIntensity = 3.;
        skyboxMaterial._backgroundIntensity = 1.;
        skyboxMaterial._environmentRotationMatrix = BABYLON.Matrix.RotationY(0.5); 
        skyboxMaterial._environmentIntensity = 5.;
        skyboxMaterial.backFaceCulling = false;
        
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
        skybox.infiniteDistance = true;
        skybox.material = skyboxMaterial;        
        
        //
        // var fx = new BABYLON.PassPostProcess("fsaa", 2.0, scene.activeCamera);
        // fx.renderTargetSamplingMode = BABYLON.Texture.BILINEAR_SAMPLINGMODE;            
              
        // var pipeline = new BABYLON.DefaultRenderingPipeline(
            // "default", // The name of the pipeline
            // true, 
            // scene, // The scene instance
            // [scene.activeCamera] // The list of cameras to be attached to
        // );
 
        // pipeline.fxaaEnabled = true;
        // pipeline.bloomEnabled = true;
        // pipeline.bloomWeight = 0.3;   
        // pipeline.bloomScale = 0.2;
               
        return scene;
    }

    var scene = createScene();

    engine.runRenderLoop(function(){
        scene.render();
        document.getElementById('fps').innerHTML = engine.getFps().toFixed();
    });

    window.addEventListener('resize', function(){
        engine.resize();
    });
});