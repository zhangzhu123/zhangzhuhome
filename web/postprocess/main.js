window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, false);
    
    var IBL_path_root = "/demo/pbrMRSG/IBL/";
    var IBL_path = IBL_path_root + "doge.dds"
    
    var model;
    var model_name = "zbrush-for-concept-mech-design-dver";
    var model_path = "./"+model_name+"/"+model_name+".obj";
    var model_dic = new Array();
   
    model_dic["zbrush-for-concept-mech-design-dver"] = new Array();
    model_dic["zbrush-for-concept-mech-design-dver"]["albedoTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_albedo.jpeg";
    model_dic["zbrush-for-concept-mech-design-dver"]["reflectivityTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_metallic.jpeg"
    model_dic["zbrush-for-concept-mech-design-dver"]["microSurfaceTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_roughness.jpeg"
    model_dic["zbrush-for-concept-mech-design-dver"]["bumpTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_normal.jpeg"
    model_dic["zbrush-for-concept-mech-design-dver"]["ambientTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_AO.jpeg"
    model_dic["zbrush-for-concept-mech-design-dver"]["emissiveTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/default_emissive.jpeg"
    model_dic["zbrush-for-concept-mech-design-dver"]["opacityTexture"] = false;       
    
    var pbr;
    var hdrTexture = false;  
    var skyTexture = false;
    var albedoTexture = false;
    var reflectivityTexture = false;
    var microSurfaceTexture = false;
    var bumpTexture = false;
    var ambientTexture = false;
    var emissiveTexture = false;
    var opacityTexture = false;    
    
    var scene;
    
    // var bloomExtract;    
    // var tonemap;
    // var fxaa;
    var mdkpp;
    
    var createMaterial = function(){
        //
        // hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(IBL_path, scene);
        // hdrTexture.gammaSpace = false;

        if (model_dic[model_name]["albedoTexture"]){
            albedoTexture = new BABYLON.Texture(model_dic[model_name]["albedoTexture"], scene);
        }else{
            albedoTexture = false; 
        }
        if (model_dic[model_name]["reflectivityTexture"]){
            reflectivityTexture = new BABYLON.Texture(model_dic[model_name]["reflectivityTexture"], scene);
        }else{
            reflectivityTexture = false; 
        }   
        if (model_dic[model_name]["microSurfaceTexture"]){
            microSurfaceTexture = new BABYLON.Texture(model_dic[model_name]["microSurfaceTexture"], scene);
        }else{
            microSurfaceTexture = false; 
        }  
        if (model_dic[model_name]["bumpTexture"]){
            bumpTexture = new BABYLON.Texture(model_dic[model_name]["bumpTexture"], scene);
        }else{
            bumpTexture = false; 
        }          
        if (model_dic[model_name]["ambientTexture"]){
            ambientTexture = new BABYLON.Texture(model_dic[model_name]["ambientTexture"], scene);
        }else{
            ambientTexture = false; 
        } 
        if (model_dic[model_name]["emissiveTexture"]){
            emissiveTexture = new BABYLON.Texture(model_dic[model_name]["emissiveTexture"], scene);
        }else{
            emissiveTexture = false; 
        } 
        if (model_dic[model_name]["opacityTexture"]){
            opacityTexture = new BABYLON.Texture(model_dic[model_name]["opacityTexture"], scene);
        }else{
            opacityTexture = false; 
        }         
        
        //
        pbr = new BABYLON.MDKPBRMaterial("pbr", scene);
        pbr.environmentTexture = hdrTexture; 
        //pbr.environmentTexture.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
        //pbr.environmentTexture.coordinatesMode = 3;
        pbr.environmentTexture.gammaSpace = false;
        
        pbr.albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        pbr.albedoTexture = albedoTexture;
        
        pbr.useMetalWorkFlow = true;
        
        pbr.metallic = 1.0;
        pbr.metallicTexture = reflectivityTexture;
        
        pbr.roughness = 1.0;
        pbr.roughnessTexture = microSurfaceTexture;   
        
        pbr.normalTexture = bumpTexture;       
        pbr.invertNormalMapX = true;
        pbr.invertNormalMapY = true;
        
        pbr.occlusionTexture = ambientTexture; 
        pbr.occlusionStrength = 1.0;
        
        pbr.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        pbr.emissiveTexture = emissiveTexture;
        pbr.emissiveIntensity = 30.0;

        pbr.useTransparencyMask = false;
        pbr.useTransparencyBlend = false;
        pbr.alpha = 1.;
        pbr.opacityTexture = opacityTexture;
        pbr.opacityTexture.getAlphaFromRGB = true;
        
	    pbr.environmentRotationMatrix = BABYLON.Matrix.RotationY(1);  
        pbr.environmentIntensity = 47;        
        
        pbr.useLogarithmicDepth = false;
        pbr.backFaceCulling = false;           
    }
    
    var createModel = function(){
        BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
        BABYLON.SceneLoader.ImportMesh("", "", "https://zhangzhu123.github.io/zhangzhuhome/asset/postprocess/zbrush-for-concept-mech-design-dver.obj", scene, function (newMeshes) {
            newMeshes[0].material = pbr;
            model = newMeshes[0];
        });   
        
    }
    
    var createScene = function(){
        scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.89, 0.929, 0.803, 1);
        
        //create camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 600));
        camera.attachControl(canvas, true);          

        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/doge2SpecularHDR.dds", scene);
        skyTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/doge2SpecularHDR.dds", scene);        
        
        //
        createMaterial();
        
        //
        createModel();        

        //
        var skyboxMaterial = new BABYLON.MDKPBRMaterial("skyBox", scene);        
        skyboxMaterial.environmentTexture = skyTexture; 
        //skyboxMaterial.environmentTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.environmentTexture.coordinatesMode = 5;
        skyboxMaterial.environmentTexture.gammaSpace = false;
        skyboxMaterial.useMetalWorkFlow = true;
        skyboxMaterial.roughness = 0.3;
        skyboxMaterial.metallic = 1.0;
        skyboxMaterial.backFaceCulling = false; 
        skyboxMaterial.bg_environmentIntensity = 35.0;
        skyboxMaterial.bg_backgroundIntensity = 15.0;
        skyboxMaterial.disableLighting = true;
        
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
        skybox.infiniteDistance = false;
        skybox.material = skyboxMaterial;               
        
        mdkpp = new BABYLON.MDKRenderingPipeline(name, scene, [camera], engine);
        mdkpp.TonemapEnabled = true;
        mdkpp.toneExposure = 1.5;
        mdkpp.toneBrightness = 0.0;
        mdkpp.toneContrast = 0.13;
        mdkpp.toneSaturation = 1.4;
        mdkpp.SharpenEnabled = true;
        mdkpp.sharpen = 0.1;
        mdkpp.VignetteEnabled = true;
        mdkpp.amount = 0.7;
        mdkpp.hardness = 0.0;
        mdkpp.GrainEnabled = true
        mdkpp.grainFactor = 0.61;
        mdkpp.timeGrain = true;
        mdkpp.BloomEnabled = true;
        mdkpp.bloomThreshold = 0.5;
        mdkpp.bloomRadius = 0.8;
        mdkpp.bloomFactor = 1.2;
              
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