window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('renderCanvas');

    var engine = new BABYLON.Engine(canvas, true);
    
    var get_buffer = function(channel, gltf, bin) {
        var buffer = gltf.accessors[channel].bufferView;
        var componentType = gltf.accessors[channel].componentType;
        var count = gltf.accessors[channel].count;
        var byteStride = gltf.accessors[channel].byteStride;
        var byteLength = gltf.bufferViews[buffer].byteLength;
        var byteOffset = gltf.bufferViews[buffer].byteOffset;
        var resultBuffer = undefined;
        switch(componentType) {
            case 5120: // BYTE 1
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Int8Array(newbuffer, 0, count*byteStride);
                break;
            case 5121: // UNSIGNED_BYTE 1
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Uint8Array(newbuffer, 0, count*byteStride);
                break;
            case 5122: // SHORT 2
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Int16Array(newbuffer, 0, count*byteStride/2);
                break;
            case 5123: // UNSIGNED_SHORT 2
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Uint16Array(newbuffer, 0, count*byteStride/2);
                break;
            case 5124: // INT 4
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Int32Array(newbuffer, 0, count*byteStride/4);
                break;
            case 5125: // UNSIGNED_INT 4
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Uint32Array(newbuffer, 0, count*byteStride/4);
                break;
            case 5126: // FLOAT 4
                var newbuffer = bin.slice(byteOffset, byteOffset+count*byteStride);
                resultBuffer = new Float32Array(newbuffer, 0, count*byteStride/4);
                break;
        }
        var res = [];
        for(var i = 0; i < resultBuffer.length; i++) {
            res[i] = resultBuffer[i];
        }
        return res;
    };
        
    var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 1);

        //create camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(-0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(150, 250, 10));
        camera.attachControl(canvas, true);         
        
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        
        var human = new BABYLON.Mesh("mesh1", scene);
        
        var myRequest = new Request('http://oydalubb3.bkt.clouddn.com/vox-gltf.json');
        fetch(myRequest).then(function(response) {
            return response.json().then(function(gltf) {
            
                
                BABYLON.Tools.LoadFile("http://oydalubb3.bkt.clouddn.com/vox_bin.bin", function(data) {
                    var bin = data;
                    
                    var _mesh = gltf.meshes["root_node_geo_2"];
                    var indicesBuffer = get_buffer(_mesh.primitives[0].indices, gltf, bin);
                    var normalBuffer = get_buffer(_mesh.primitives[0].attributes.NORMAL, gltf, bin);
                    var positionBuffer = get_buffer(_mesh.primitives[0].attributes.POSITION, gltf, bin);
                    var texcoord_0Buffer = get_buffer(_mesh.primitives[0].attributes.TEXCOORD_0, gltf, bin); 
                    var vertexColorBuffer = get_buffer(_mesh.primitives[0].attributes.COLOR, gltf, bin);

                    var vertexData = new BABYLON.VertexData();
                    vertexData.indices = indicesBuffer;
                    vertexData.positions = positionBuffer;
                    vertexData.normals = normalBuffer;
                    vertexData.uvs = texcoord_0Buffer;
                    vertexData.colors  = vertexColorBuffer;
                    vertexData.applyToMesh(human, true);   
                    
                }, null, null, true, function() {});  
                
            });
        });        

        var vox = new BABYLON.MDKVoxMaterial("material1", scene);                    
        human.material = vox;
                
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