// function leapmotion(){
//     baseBoneRotation = (new THREE.Quaternion).setFromEuler(
//
//         new THREE.Euler(Math.PI / 2, 0, 0));
//
//     Leap.loop({background: true}, {
//             hand: function (hand) {
//                 hand.fingers.forEach(function (finger) {
//                     finger.data('boneMeshes').forEach(function (mesh, i) {
//                         var bone = finger.bones[i];
//                         mesh.position.fromArray(bone.center());
//                         mesh.setRotationFromMatrix(
//                             (new THREE.Matrix4).fromArray(bone.matrix())
//                         );
//                         mesh.quaternion.multiply(baseBoneRotation);
//                         mesh.position.z -= 200;
//                         mesh.position.y -= 100;
//                     });
//                     finger.data('jointMeshes').forEach(function (mesh, i) {
//                         var bone = finger.bones[i];
//                         if (bone) {
//                             mesh.position.fromArray(bone.prevJoint);
//                         } else {
//                             bone = finger.bones[i - 1];
//                             mesh.position.fromArray(bone.nextJoint);
//                         }
//                         mesh.position.z -= 1000;
//                         mesh.position.y -= 3000;
//                     });
//                 });
//                 var armMesh = hand.data('armMesh');
//                 armMesh.position.fromArray(hand.arm.center());
//                 armMesh.setRotationFromMatrix(
//                     (new THREE.Matrix4).fromArray(hand.arm.matrix())
//                 );
//                 armMesh.quaternion.multiply(baseBoneRotation);
//                 armMesh.scale.x = hand.arm.width / 2;
//                 armMesh.scale.z = hand.arm.width / 4;
//                 armMesh.position.z -= 1000;
//                 armMesh.position.y -= 3000;
//                 renderer.render(scene, camera);
//
//             }
//         }
//     )
//         .use('handHold')
//         .use('handEntry')
//         .on('handFound', function (hand) {
//             hand.fingers.forEach(function (finger) {
//                 var boneMeshes = [];
//                 var jointMeshes = [];
//                 finger.bones.forEach(function (bone) {
//                     var boneMesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, bone.length), new THREE.MeshPhongMaterial());
//                     boneMesh.material.color.setHex(0xffffff);
//                     scene.add(boneMesh);
//                     boneMeshes.push(boneMesh);
//                 });
//                 for (var i = 0; i < finger.bones.length + 1; i++) {
//                     var jointMesh = new THREE.Mesh(new THREE.SphereGeometry(8), new THREE.MeshPhongMaterial());
//                     jointMesh.material.color.setHex(0xFF0088);
//                     scene.add(jointMesh);
//                     jointMeshes.push(jointMesh);
//                 }
//                 finger.data('boneMeshes', boneMeshes);
//                 finger.data('jointMeshes', jointMeshes);
//             });
//             if (hand.arm) {
//                 var armMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, hand.arm.length, 64), new THREE.MeshPhongMaterial());
//                 armMesh.material.color.setHex(0xffffff);
//                 scene.add(armMesh);
//                 hand.data('armMesh', armMesh);
//             }
//         })
//         .on('handLost', function (hand) {
//             hand.fingers.forEach(function (finger) {
//                 var boneMeshes = finger.data('boneMeshes');
//                 var jointMeshes = finger.data('jointMeshes');
//                 boneMeshes.forEach(function (mesh) {
//                     scene.remove(mesh);
//                 });
//                 jointMeshes.forEach(function (mesh) {
//                     scene.remove(mesh);
//                 });
//                 finger.data({
//                     boneMeshes: null
//                 });
//             });
//             var armMesh = hand.data('armMesh');
//             scene.remove(armMesh);
//             hand.data('armMesh', null);
//
//         })
//         .connect();
// }

function leapmotion(){
    baseBoneRotation = (new THREE.Quaternion).setFromEuler(

        new THREE.Euler(Math.PI / 2, 0, 0));

    Leap.loop({background: true}, {
            hand: function (hand) {
                hand.fingers.forEach(function (finger) {
                    finger.data('boneMeshes').forEach(function (mesh, i) {
                        var bone = finger.bones[i];
                        mesh.position.fromArray(bone.center());
                        mesh.setRotationFromMatrix(
                            (new THREE.Matrix4).fromArray(bone.matrix())
                        );
                        mesh.quaternion.multiply(baseBoneRotation);
                        mesh.position.z -= 200;
                        mesh.position.y -= 100;
                    });
                    finger.data('jointMeshes').forEach(function (mesh, i) {
                        var bone = finger.bones[i];
                        if (bone) {
                            mesh.position.fromArray(bone.prevJoint);
                        } else {
                            bone = finger.bones[i - 1];
                            mesh.position.fromArray(bone.nextJoint);
                        }
                        mesh.position.z -= 1000;
                        mesh.position.y -= 3000;
                    });
                });
                var armMesh = hand.data('armMesh');
                armMesh.position.fromArray(hand.arm.center());
                armMesh.setRotationFromMatrix(
                    (new THREE.Matrix4).fromArray(hand.arm.matrix())
                );
                armMesh.quaternion.multiply(baseBoneRotation);
                armMesh.scale.x = hand.arm.width / 2;
                armMesh.scale.z = hand.arm.width / 4;
                armMesh.position.z -= 1000;
                armMesh.position.y -= 3000;
                renderer.render(scene, camera);

            }
        }
    )
        .use('handHold')
        .use('handEntry')
        .on('handFound', function (hand) {
            hand.fingers.forEach(function (finger) {
                var boneMeshes = [];
                var jointMeshes = [];
                finger.bones.forEach(function (bone) {
                    var boneMesh = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, bone.length), new THREE.MeshPhongMaterial());
                    boneMesh.material.color.setHex(0xffffff);
                   //scene.add(boneMesh);
                    boneMeshes.push(boneMesh);
                });
                for (var i = 0; i < finger.bones.length + 1; i++) {
                    var jointMesh = new THREE.Mesh(new THREE.SphereGeometry(8), new THREE.MeshPhongMaterial());
                    jointMesh.material.color.setHex(0xFF0088);
                    //scene.add(jointMesh);
                    jointMeshes.push(jointMesh);
                }
                finger.data('boneMeshes', boneMeshes);
                finger.data('jointMeshes', jointMeshes);
            });
            if (hand.arm) {
                var armMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, hand.arm.length, 64), new THREE.MeshPhongMaterial());
                armMesh.material.color.setHex(0xffffff);
               // scene.add(armMesh);
                hand.data('armMesh', armMesh);
            }
        })
        .on('handLost', function (hand) {
            hand.fingers.forEach(function (finger) {
                var boneMeshes = finger.data('boneMeshes');
                var jointMeshes = finger.data('jointMeshes');
                boneMeshes.forEach(function (mesh) {
                    //scene.remove(mesh);
                });
                jointMeshes.forEach(function (mesh) {
                   // scene.remove(mesh);
                });
                finger.data({
                    boneMeshes: null
                });
            });
            var armMesh = hand.data('armMesh');
            //scene.remove(armMesh);
            hand.data('armMesh', null);

        })
        .connect();
}
