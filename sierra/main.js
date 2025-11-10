document.addEventListener("DOMContentLoaded", function(){
    const textLines = [
        "BlackLash (1998) by the British art collective Mongrel is a satirical net art game created to expose and confront racial stereotypes embedded in 1980s-90s video games. During this era, most games were produced by white developers for presumed white male players, leading to a landscape where Black characters were either absent or only appeared as caricatures and targets of violence. Composer Orpheus Hanley noted that in those decades, 'you never saw black characters...If there were black ones, they would get beat up' (Gaming The System, Abreu).",
        "BlackLash flips this script by placing a Black protagonist at the center, fighting against racist enemies instead of being the victim.",
        "Mongrel created the game as both a critique and a 'hack' of dominant gaming culture. They modified an older 1995 game, MacAttack, replacing the spaceship with a Black protagonist and turning enemy ships into symbols of racial oppression: KKK members, police officers, judges, and Nazi spiders.",
        "This choice highlights how racism persists in digital spaces shaped by white ideology, even as gaming technology evolves. The game forces players--especially white players--to confront racist imagery that was often hidden beneath the 'fun' and seemingly neutral surface of gaming culture."
    ];

    const container = document.getElementById("textLines");
    let index = 0;
    let typing = false;

    function typeLine(lineText, callback) { //callback: function runs after another function is finished
        typing = true;
        const line = document.createElement("p"); //creates new paragraph
        line.classList.add("current-line");
        container.appendChild(line);

        let i = 0;
        function typeChar(){
            if(i< lineText.length){
                line.textContent += lineText[i];
                i++;
                setTimeout(typeChar, 25);
            } else {
                typing = false;
                if(callback) callback();
            }
        }
        typeChar();
    }

    function showText(){
        container.innerHTML = "";
        for (let i = 0; i <= index; i++){
            if(i === index){
                typeLine(textLines[i]);
            } else{
                const pastLine = document.createElement("p");
                pastLine.textContent = textLines[i];
                container.appendChild(pastLine);
            }
        }
    }

    document.addEventListener("keydown", function(press){
        if(typing) return;
        if(press.key === "ArrowDown"){
            if(index < textLines.length -1){
                index++;
                showText();
            }
        } else if (press.key === "ArrowUp"){
            if(index> 0){
                index--;
                showText();
            }
        }
    });

    showText();

    
});