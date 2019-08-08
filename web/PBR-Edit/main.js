window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, false);
    
    var IBL_path = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/doge2SpecularHDR.dds"
    var IBL_list = ['doge2SpecularHDR.dds'];
    
    var model;
    var model_name = "robo_obj_pose4";
    var model_path = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/robo_obj_pose4.obj";
    var model_dic = new Array();
    
    model_dic["robo_obj_pose4"] = new Array();
    model_dic["robo_obj_pose4"]["albedoTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/Texture_1K.jpg";
    model_dic["robo_obj_pose4"]["reflectivityTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/98a91fc2e52c4db6a4be147a471e98ca.jpeg";
    model_dic["robo_obj_pose4"]["microSurfaceTexture"] = false;
    model_dic["robo_obj_pose4"]["bumpTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/LP_BodyNormalsMap_1K.jpg";
    model_dic["robo_obj_pose4"]["ambientTexture"] = false;
    model_dic["robo_obj_pose4"]["emissiveTexture"] = "https://zhangzhu123.github.io/zhangzhuhome/asset/PBR-Edit/6bf488141a8a487599953582478eca36.jpeg";
    model_dic["robo_obj_pose4"]["opacityTexture"] = false;    
    
    var pbr;
    var hdrTexture = false;  
    var albedoTexture = false;
    var reflectivityTexture = false;
    var microSurfaceTexture = false;
    var bumpTexture = false;
    var ambientTexture = false;
    var emissiveTexture = false;
    var opacityTexture = false;    
    
    var scene;
    
    var createMaterial = function(){
        //
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(IBL_path, scene);
        hdrTexture.gammaSpace = true;

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
        pbr._reflectionTexture = hdrTexture;
        
        pbr._albedoColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        pbr._albedoTexture = albedoTexture;
        
        pbr._useMetal = false;
        pbr._reflectivityColor = new BABYLON.Color3(0.6,0.6,0.6);
        pbr._reflectivityTexture = reflectivityTexture;
        pbr._fresnelWeight = 0.0;
        
        pbr._useGlossness = true;
        pbr._microSurface = 0.69;
        pbr._microSurfaceTexture = microSurfaceTexture;   
        
        pbr._bumpTexture = bumpTexture;       
        // pbr._bumpTexture.level = 1.;
        pbr._invertNormalMapX = false;
        pbr._invertNormalMapY = false;
        
        // pbr._ambientColor = new BABYLON.Color3(3.0, 3.0, 3.0);
        pbr._ambientTexture = ambientTexture; 
        pbr._ambientTextureStrength = 1.0;
        
        pbr._emissiveColor = new BABYLON.Color3(10.0, 10.0, 10.0);
        pbr._emissiveTexture = emissiveTexture;

        pbr._useTransparencyMask = false;
        pbr._useTransparencyBlend = false;
        pbr.alpha = 1.;
        pbr._opacityTexture = opacityTexture;
        pbr._opacityTexture.getAlphaFromRGB = false;
        
        pbr.useLogarithmicDepth = false;
        pbr.backFaceCulling = false;   
        
    }
    
    var createModel = function(){
        BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;
        BABYLON.SceneLoader.ImportMesh("", "", model_path, scene, function (newMeshes) {
            newMeshes[0].material = pbr;
            model = newMeshes[0];
        });   
        
    }
    
    
    var createScene = function(){
        scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.89, 0.929, 0.803, 1);
        
        //create camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(200, 50, 300));
        camera.attachControl(canvas, true);   
        
        //
        createMaterial();
        
        //
        createModel();        
        
        var skyboxMaterial = new BABYLON.MDKSkyMaterial("skyBox", scene);
        skyboxMaterial._skyTexture = hdrTexture;
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial._blurIntensity = 1.0;
        
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 5000.0, scene);
        skybox.infiniteDistance = true;
        skybox.material = skyboxMaterial;        
        
        //
        var fx = new BABYLON.PassPostProcess("fsaa", 2.0, scene.activeCamera);
        fx.renderTargetSamplingMode = BABYLON.Texture.BILINEAR_SAMPLINGMODE;            

        var optionsMat = {
            albedoColorEntirety : true,
            albedoColorR : 1.0,
            albedoColorG : 1.0,
            albedoColorB : 1.0,
            albedoTexture : true,
            
            useMetal : false,
            reflectivityColorR : 0.6,
            reflectivityColorG : 0.6,
            reflectivityColorB : 0.6,    
            fresnelWeight : 0.0,
            reflectivityTexture : true,   

            useGlossness : true,    
            microSurface : 0.69,       
            microSurfaceTexture : true,     

            // normalIntensity : 1.0,     
            invertX : false,
            invertY : false,
            normalTexture : true,    
   
            occlusionStrength : 1.0,
            occlusionTexture : true,    

            emissiveColorEntirety : true,   
            emissiveColorR : 10.0,
            emissiveColorG : 10.0,
            emissiveColorB : 10.0,   
            emissiveTexture : true,    

            useTransparencyMask : false,
            useTransparencyBlend : false,
            alpha : 1.0,         
            getAlphaFromRGB : false,     
            opacityTexture : true,            
            
        }  
  
        mdkGui = new dat.GUI();  
        //albedo
        mdkGui.add(optionsMat, 'albedoColorEntirety').onChange(function () {});        
        mdkGui.add(optionsMat, "albedoColorR", 0., 1.).onChange(function(value) {
            if(optionsMat.albedoColorEntirety){
                pbr._albedoColor = new BABYLON.Color3(value, value, value);
            }else{             
                pbr._albedoColor = new BABYLON.Color3(value, optionsMat.albedoColorG, optionsMat.albedoColorB);
            }
		});
        mdkGui.add(optionsMat, "albedoColorG", 0., 1.).onChange(function(value) {
            if(optionsMat.albedoColorEntirety){
                pbr._albedoColor = new BABYLON.Color3(value, value, value);
            }else{
                pbr._albedoColor = new BABYLON.Color3(optionsMat.albedoColorR, value, optionsMat.albedoColorB);
            }
		});
        mdkGui.add(optionsMat, "albedoColorB", 0., 1.).onChange(function(value) {
            if(optionsMat.albedoColorEntirety){
                pbr._albedoColor = new BABYLON.Color3(value, value, value);
            }else{
                pbr._albedoColor = new BABYLON.Color3(optionsMat.albedoColorR, optionsMat.albedoColorG, value);
            }
		});       
        mdkGui.add(optionsMat, 'albedoTexture').onChange(function (value) {
            if(value){
                pbr._albedoTexture = albedoTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._albedoTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }
        });  
        
        //metal specular
        mdkGui.add(optionsMat, 'useMetal').onChange(function (value) {
            pbr._useMetal = value;
            pbr._markAllSubMeshesAsMiscDirty();
        }); 
        mdkGui.add(optionsMat, "reflectivityColorR", 0., 1.).onChange(function(value) {
            if(pbr._useMetal){
                pbr._reflectivityColor = new BABYLON.Color3(value, value, value);
            }else{             
                pbr._reflectivityColor = new BABYLON.Color3(value, optionsMat.reflectivityColorG, optionsMat.reflectivityColorB);
            }
		});
        mdkGui.add(optionsMat, "reflectivityColorG", 0., 1.).onChange(function(value) {
            if(pbr._useMetal){
                pbr._reflectivityColor = new BABYLON.Color3(value, value, value);
            }else{
                pbr._reflectivityColor = new BABYLON.Color3(optionsMat.reflectivityColorR, value, optionsMat.reflectivityColorB);
            }
		});
        mdkGui.add(optionsMat, "reflectivityColorB", 0., 1.).onChange(function(value) {
            if(pbr._useMetal){
                pbr._reflectivityColor = new BABYLON.Color3(value, value, value);
            }else{
                pbr._reflectivityColor = new BABYLON.Color3(optionsMat.reflectivityColorR, optionsMat.reflectivityColorG, value);
            }
		}); 
        mdkGui.add(optionsMat, "fresnelWeight", 0., 1.).onChange(function(value) {
            pbr._fresnelWeight = value;
		});
        mdkGui.add(optionsMat, 'reflectivityTexture').onChange(function (value) {
            if(value){
                pbr._reflectivityTexture = reflectivityTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._reflectivityTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();                  
            }
        }); 
        
        //rough gloss
        mdkGui.add(optionsMat, 'useGlossness').onChange(function (value) {
            pbr._useGlossness = value;
            pbr._markAllSubMeshesAsMiscDirty();
        }); 
        mdkGui.add(optionsMat, 'microSurface', 0., 1.).onChange(function (value) {
            pbr._microSurface = value;
        }); 
        mdkGui.add(optionsMat, 'microSurfaceTexture').onChange(function (value) {
            if(value){
                pbr._microSurfaceTexture = microSurfaceTexture;   
                pbr._markAllSubMeshesAsTexturesDirty();
            }else{
                pbr._microSurfaceTexture = false; 
                pbr._markAllSubMeshesAsTexturesDirty();                
            }
        }); 
        
        //normal
        // mdkGui.add(optionsMat, 'normalIntensity', 0., 2.).onChange(function (value) {
            // pbr._bumpTexture.level = value;
        // }); 
        mdkGui.add(optionsMat, 'invertX').onChange(function (value) {
            pbr._invertNormalMapX = value;
            pbr._markAllSubMeshesAsTexturesDirty();
        });  
        mdkGui.add(optionsMat, 'invertY').onChange(function (value) {
            pbr._invertNormalMapY = value;
            pbr._markAllSubMeshesAsTexturesDirty();
        });   
        mdkGui.add(optionsMat, 'normalTexture').onChange(function (value) {
            if(value){
                pbr._bumpTexture = bumpTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._bumpTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();                  
            }
        });         
        
        //occlusion
        mdkGui.add(optionsMat, 'occlusionStrength', 0., 2.).onChange(function (value) {
            pbr._ambientTextureStrength = value;
            //pbr._markAllSubMeshesAsTexturesDirty(); 
        });         
        mdkGui.add(optionsMat, 'occlusionTexture').onChange(function (value) {
            if(value){
                pbr._ambientTexture = ambientTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._ambientTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();                  
            }
        }); 
        
        //emissive
        mdkGui.add(optionsMat, 'emissiveColorEntirety').onChange(function () {});        
        mdkGui.add(optionsMat, "emissiveColorR", 0., 100.).onChange(function(value) {
            if(optionsMat.emissiveColorEntirety){
                pbr._emissiveColor = new BABYLON.Color3(value, value, value);
            }else{             
                pbr._emissiveColor = new BABYLON.Color3(value, optionsMat.emissiveColorG, optionsMat.emissiveColorB);
            }
		}); 
        mdkGui.add(optionsMat, "emissiveColorG", 0., 100.).onChange(function(value) {
            if(optionsMat.emissiveColorEntirety){
                pbr._emissiveColor = new BABYLON.Color3(value, value, value);
            }else{             
                pbr._emissiveColor = new BABYLON.Color3(optionsMat.emissiveColorR, value, optionsMat.emissiveColorB);
            }
		}); 
        mdkGui.add(optionsMat, "emissiveColorB", 0., 100.).onChange(function(value) {
            if(optionsMat.emissiveColorEntirety){
                pbr._emissiveColor = new BABYLON.Color3(value, value, value);
            }else{             
                pbr._emissiveColor = new BABYLON.Color3(optionsMat.emissiveColorR, optionsMat.emissiveColorG, value);
            }
		});         
        mdkGui.add(optionsMat, 'emissiveTexture').onChange(function (value) {
            if(value){
                pbr._emissiveTexture = emissiveTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._emissiveTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }
        }); 
        
        //alpha
        mdkGui.add(optionsMat, 'useTransparencyMask').onChange(function (value) {
            pbr._useTransparencyMask = value;
        }); 
        mdkGui.add(optionsMat, 'useTransparencyBlend').onChange(function (value) {
            pbr._useTransparencyBlend = value;
        });         
        mdkGui.add(optionsMat, "alpha", 0., 1.).onChange(function(value) {
            pbr.alpha = value;
		});
        mdkGui.add(optionsMat, 'getAlphaFromRGB').onChange(function (value) {
            pbr._opacityTexture.getAlphaFromRGB = value;
            pbr._markAllSubMeshesAsTexturesDirty();  
        });  
        mdkGui.add(optionsMat, 'opacityTexture').onChange(function (value) {
            if(value){
                pbr._opacityTexture = opacityTexture;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }else{
                pbr._opacityTexture = false;
                pbr._markAllSubMeshesAsTexturesDirty();   
            }
        });
        
        // env
        var optionsEnv = {
            Orientation : 1.0,
            Brightness : 25.0
        }  
  
        mdkGui = new dat.GUI();  
        mdkGui.add(optionsEnv, "Orientation", 0., 2 * Math.PI).onChange(function(value) {
			pbr._environmentRotationMatrix = BABYLON.Matrix.RotationY(value);   
            skyboxMaterial._environmentRotationMatrix = BABYLON.Matrix.RotationY(value);   
		});        
        mdkGui.add(optionsEnv, "Brightness", 0., 100).onChange(function(value) {
            var v;
            if (value < 25){
                v = value/25.0;
            }else if (value < 50){
                v = value * (9.0/25.0) - 8; 
            }else{
                v = value * (9.0/5.0) - 80; 
            }
            
			pbr._environmentIntensity = v;
            skyboxMaterial._environmentIntensity = v;
		}); 

        // backGround
        var optionsBG = {
            backgroundIntensity : 50.0,
            blurIntensity : 1.
        }  
        
        mdkGui = new dat.GUI();  
        mdkGui.add(optionsBG, "backgroundIntensity", 0., 100.).onChange(function(value) {
            var v = value/50.0;
            skyboxMaterial._backgroundIntensity = v;
		});        
        mdkGui.add(optionsBG, "blurIntensity", 0., 8.).onChange(function(value) {
            skyboxMaterial._blurIntensity = value;
            
		});  

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