/**
 * travel_next
 * travel_last
 * travel_front
 * travel_back
 * damage_next
 * damage_last
 * barometer_next
 * barometer_last
 *
 * **/

/******************************************************/
function travel_next_selstart( e ){
    let controller = e.target;
    let intersections = travel_next_getInter( controller );
    if( intersections.length > 0){
        travel_name_Index ++;
        travel_name_Index %= travel_scene_num[travel_url_Index];
        meauFresh();
        chartFresh();
    }
}
function travel_next_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        travel_next_mesh = controller.userData.selected;
        travel_next_mesh.matrix.premultiply( controller.matrixWorld );
        travel_next_mesh.matrix.decompose( travel_next_mesh.position, travel_next_mesh.quaternion, travel_next_mesh.scale );
        travel_next_mesh.material.emissive.b = 0;
        travel_next.add( travel_next_mesh );
        controller.userData.selected = undefined;
    }
}
function travel_next_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( travel_next.children );
}
function travel_next_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = travel_next_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function travel_next_clean() {
    while ( intersected.length ) {
        travel_next_mesh = intersected.pop();
        travel_next_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function travel_last_selstart( e ){
    let controller = e.target;
    let intersections = travel_last_getInter( controller );
    if( intersections.length > 0){
        travel_name_Index--;
        if(travel_name_Index<0){
            travel_name_Index += travel_scene_num[travel_url_Index] - 1;
        }
        travel_name_Index %= travel_scene_num[travel_url_Index];
        meauFresh();
        chartFresh();
    }
}
function travel_last_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        travel_last_mesh = controller.userData.selected;
        travel_last_mesh.matrix.premultiply( controller.matrixWorld );
        travel_last_mesh.matrix.decompose( travel_last_mesh.position, travel_last_mesh.quaternion, travel_last_mesh.scale );
        travel_last_mesh.material.emissive.b = 0;
        travel_last.add( travel_last_mesh );
        controller.userData.selected = undefined;
    }
}
function travel_last_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( travel_last.children );
}
function travel_last_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = travel_last_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function travel_last_clean() {
    while ( intersected.length ) {
        travel_last_mesh = intersected.pop();
        travel_last_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function travel_back_selstart( e ){
    let controller = e.target;
    let intersections = travel_back_getInter( controller );
    if( intersections.length > 0){
        travel_url_Index--;
        if(travel_url_Index<0){
            travel_url_Index += 6;
        }
        travel_url_Index %= 7;
        meauFresh();
        chartFresh();
    }
}
function travel_back_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        travel_back_mesh = controller.userData.selected;
        travel_back_mesh.matrix.premultiply( controller.matrixWorld );
        travel_back_mesh.matrix.decompose( travel_back_mesh.position, travel_back_mesh.quaternion, travel_back_mesh.scale );
        travel_back_mesh.material.emissive.b = 0;
        travel_back.add( travel_back_mesh );
        controller.userData.selected = undefined;
    }
}
function travel_back_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( travel_back.children );
}
function travel_back_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = travel_back_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function travel_back_clean() {
    while ( intersected.length ) {
        travel_back_mesh = intersected.pop();
        travel_back_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function travel_front_selstart( e ){
    let controller = e.target;
    let intersections = travel_front_getInter( controller );
    if( intersections.length > 0){
        travel_url_Index++;
        travel_url_Index %= 7;
        meauFresh();
        chartFresh();
    }
}
function travel_front_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        travel_front_mesh = controller.userData.selected;
        travel_front_mesh.matrix.premultiply( controller.matrixWorld );
        travel_front_mesh.matrix.decompose( travel_front_mesh.position, travel_front_mesh.quaternion, travel_front_mesh.scale );
        travel_front_mesh.material.emissive.b = 0;
        travel_front.add( travel_front_mesh );
        controller.userData.selected = undefined;
    }
}
function travel_front_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( travel_front.children );
}
function travel_front_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = travel_front_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function travel_front_clean() {
    while ( intersected.length ) {
        travel_front_mesh = intersected.pop();
        travel_front_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function damage_next_selstart( e ){
    let controller = e.target;
    let intersections = damage_next_getInter( controller );
    if( intersections.length > 0){
        damage_Index++;
        damage_Index%=3;
        meauFresh();
        chartFresh();
    }
}
function damage_next_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        damage_next_mesh = controller.userData.selected;
        damage_next_mesh.matrix.premultiply( controller.matrixWorld );
        damage_next_mesh.matrix.decompose( damage_next_mesh.position, damage_next_mesh.quaternion, damage_next_mesh.scale );
        damage_next_mesh.material.emissive.b = 0;
        damage_next.add( damage_next_mesh );
        controller.userData.selected = undefined;
    }
}
function damage_next_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( damage_next.children );
}
function damage_next_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = damage_next_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function damage_next_clean() {
    while ( intersected.length ) {
        damage_next_mesh = intersected.pop();
        damage_next_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function damage_last_selstart( e ){
    let controller = e.target;
    let intersections = damage_last_getInter( controller );
    if( intersections.length > 0){
        damage_Index--;
        if(damage_Index){
            damage_Index += 2;
        }
        damage_Index%=3;
        meauFresh();
        chartFresh();
    }
}
function damage_last_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        damage_last_mesh = controller.userData.selected;
        damage_last_mesh.matrix.premultiply( controller.matrixWorld );
        damage_last_mesh.matrix.decompose( damage_last_mesh.position, damage_last_mesh.quaternion, damage_last_mesh.scale );
        damage_last_mesh.material.emissive.b = 0;
        damage_last.add( damage_last_mesh );
        controller.userData.selected = undefined;
    }
}
function damage_last_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( damage_last.children );
}
function damage_last_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = damage_last_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function damage_last_clean() {
    while ( intersected.length ) {
        damage_last_mesh = intersected.pop();
        damage_last_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function barometer_next_selstart( e ){
    let controller = e.target;
    let intersections = barometer_next_getInter( controller );
    if( intersections.length > 0){
        time_day++;
        time_day%=226;
        meauFresh();
        chartFresh();
    }
}
function barometer_next_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        barometer_next_mesh = controller.userData.selected;
        barometer_next_mesh.matrix.premultiply( controller.matrixWorld );
        barometer_next_mesh.matrix.decompose( barometer_next_mesh.position, barometer_next_mesh.quaternion, barometer_next_mesh.scale );
        barometer_next_mesh.material.emissive.b = 0;
        barometer_next.add( barometer_next_mesh );
        controller.userData.selected = undefined;
    }
}
function barometer_next_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( barometer_next.children );
}
function barometer_next_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = barometer_next_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function barometer_next_clean() {
    while ( intersected.length ) {
        barometer_next_mesh = intersected.pop();
        barometer_next_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function barometer_last_selstart( e ){
    let controller = e.target;
    let intersections = barometer_last_getInter( controller );
    if( intersections.length > 0){
        time_day--;
        if(time_day<0){
            time_day += 25;
        }
        time_day%=226;
        meauFresh();
        chartFresh();
    }
}
function barometer_last_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        barometer_last_mesh = controller.userData.selected;
        barometer_last_mesh.matrix.premultiply( controller.matrixWorld );
        barometer_last_mesh.matrix.decompose( barometer_last_mesh.position, barometer_last_mesh.quaternion, barometer_last_mesh.scale );
        barometer_last_mesh.material.emissive.b = 0;
        barometer_last.add( barometer_last_mesh );
        controller.userData.selected = undefined;
    }
}
function barometer_last_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( barometer_last.children );
}
function barometer_last_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = barometer_last_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function barometer_last_clean() {
    while ( intersected.length ) {
        barometer_last_mesh = intersected.pop();
        barometer_last_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function damage_screen_selstart( e ){
    let controller = e.target;
    let intersections = damage_screen_getInter( controller );
    if( intersections.length > 0){
        window.open( 'video.html','_self' )
    }
}
function damage_screen_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        damage_screen_mesh = controller.userData.selected;
        damage_screen_mesh.matrix.premultiply( controller.matrixWorld );
        damage_screen_mesh.matrix.decompose( damage_screen_mesh.position, damage_screen_mesh.quaternion, damage_screen_mesh.scale );
        damage_screen_mesh.material.emissive.b = 0;
        damage_screen.add( damage_screen_mesh );
        controller.userData.selected = undefined;
    }
}
function damage_screen_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( damage_screen.children );
}
function damage_screen_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = damage_screen_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function damage_screen_clean() {
    while ( intersected.length ) {
        damage_screen_mesh = intersected.pop();
        damage_screen_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function weather_rain_selstart( e ){
    let controller = e.target;
    let intersections = weather_rain_getInter( controller );
    if( intersections.length > 0){
        scene.remove(rains,winds,snows);

        scene.add(rains);
    }
}
function weather_rain_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        weather_rain_mesh = controller.userData.selected;
        weather_rain_mesh.matrix.premultiply( controller.matrixWorld );
        weather_rain_mesh.matrix.decompose( weather_rain_mesh.position, weather_rain_mesh.quaternion, weather_rain_mesh.scale );
        weather_rain_mesh.material.emissive.b = 0;
        weather_rain.add( weather_rain_mesh );
        controller.userData.selected = undefined;
    }
}
function weather_rain_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( weather_rain.children );
}
function weather_rain_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = weather_rain_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function weather_rain_clean() {
    while ( intersected.length ) {
        weather_rain_mesh = intersected.pop();
        weather_rain_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function weather_snow_selstart( e ){
    let controller = e.target;
    let intersections = weather_snow_getInter( controller );
    if( intersections.length > 0){
        scene.remove(rains,winds,snows);

        scene.add(snows);
    }
}
function weather_snow_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        weather_snow_mesh = controller.userData.selected;
        weather_snow_mesh.matrix.premultiply( controller.matrixWorld );
        weather_snow_mesh.matrix.decompose( weather_snow_mesh.position, weather_snow_mesh.quaternion, weather_snow_mesh.scale );
        weather_snow_mesh.material.emissive.b = 0;
        weather_snow.add( weather_snow_mesh );
        controller.userData.selected = undefined;
    }
}
function weather_snow_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( weather_snow.children );
}
function weather_snow_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = weather_snow_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function weather_snow_clean() {
    while ( intersected.length ) {
        weather_snow_mesh = intersected.pop();
        weather_snow_mesh.material.emissive.r = 0;
    }
}
/******************************************************/


/******************************************************/
function weather_wind_selstart( e ){
    let controller = e.target;
    let intersections = weather_wind_getInter( controller );
    if( intersections.length > 0){
        scene.remove(rains,winds,snows);

        scene.add(winds);
    }
}
function weather_wind_selend( event ) {
    let controller = event.target;
    if ( controller.userData.selected !== undefined ) {
        weather_wind_mesh = controller.userData.selected;
        weather_wind_mesh.matrix.premultiply( controller.matrixWorld );
        weather_wind_mesh.matrix.decompose( weather_wind_mesh.position, weather_wind_mesh.quaternion, weather_wind_mesh.scale );
        weather_wind_mesh.material.emissive.b = 0;
        weather_wind.add( weather_wind_mesh );
        controller.userData.selected = undefined;
    }
}
function weather_wind_getInter( controller ) {
    tempMatrix.identity().extractRotation( controller.matrixWorld );
    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );
    return raycaster.intersectObjects( weather_wind.children );
}
function weather_wind_inter( controller ) {
    if ( controller.userData.selected !== undefined ) return;
    let line = controller.getObjectByName( 'line' );
    let intersections = weather_wind_getInter( controller );
    if ( intersections.length > 0 ) {
        let intersection = intersections[ 0 ];
        let object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );
        line.scale.z = intersection.distance;
    } else {
        line.scale.z = 5;
    }
}
function weather_wind_clean() {
    while ( intersected.length ) {
        weather_wind_mesh = intersected.pop();
        weather_wind_mesh.material.emissive.r = 0;
    }
}
/******************************************************/
