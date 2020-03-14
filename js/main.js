//=============================================================================
// main.js
//=============================================================================

//modo debug improvisado:
window.debug = true;

var button = document.createElement('button');
button.setAttribute('type','button')
//button.innerHTML = 'Retry';
button.style.fontSize = '24px';
button.style.color = '#ffffff';
button.style.backgroundColor = '#000000';
button.style.verticalAlign = "center";
button.style.marginLeft = "33%";

button.onmousedown = button.ontouchstart = function(event) {
    
    var code =   ["/js/libs/pixi.js",
        "/js/libs/pixi-tilemap.js",
        "/js/libs/pixi-picture.js",
        "/js/libs/fpsmeter.js",
        "/js/libs/lz-string.js",
        "/js/libs/iphone-inline-video.browser.js",
        "/js/rpg_core.js",
        "/js/rpg_managers.js",
        "/js/rpg_objects.js",
        "/js/rpg_scenes.js",
        "/js/rpg_sprites.js",
        "/js/rpg_windows.js",];
    
    console.log(code);
    var script = [];
    
    for (let i=0; i<code.length; i++){
        j = script.push( document.createElement('script')) -1;
        script[j].type = 'text/javascript';
        script[j].async = false;
        script[j].src = code[i];
        script[j]._url = code[i];
        document.body.appendChild(script[j]);
        console.log(code[i]);
    } 
    //SceneManager.run(Scene_Boot);
    event.stopPropagation();

};
button.appendChild(document.createTextNode('Carregar jogo'));
document.body.appendChild(button);

/*
window.onload = function() {
    SceneManager.run(Scene_Boot);
};
 */