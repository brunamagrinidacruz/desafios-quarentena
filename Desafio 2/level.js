//Make the selecter of levels
var selectLevel = document.getElementById("level");

for(let i = 0; i < levels.length; i++) {
   var option = document.createElement("option");
   option.text = levels[i].name;
   option.value = i;
   selectLevel.add(option);
}

//Set a event listener when select the level
selectLevel.onchange = function() {
    const index = document.getElementById("level").selectedIndex;
    //Initializing the game passing the level
    const url = new URL(window.location.href);
    //Set the index of the level selected
    url.searchParams.set('level', index);
    //The url is .../index.html, so I have to go to .../minefield.html
    window.location.href = url.href.replace("index", "minefield");
 }