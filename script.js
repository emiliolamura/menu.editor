




web = 0
let logo
let toninoFont;
let pressuraFont;
let vectorCanvas;
var pdf; // create a variable for a pdf object
var record = false; // set this to false so it doesn't start recording until you tell it to
let h = 0
let showInvited = false;
let invitedGuest = "Nome Invitato";


let data = "25 Gennaio 2025"
let sede = "Napoli";
let evento = "Evento"
let portate = [];
spazio = (300-h)/portate.length

 let base1 = 200.3
 let altezza1 = 280

// let base1 = 419.528
// let altezza1 = 595.276



/////////////////////
function updateInvited() {
    let checkbox = document.getElementById('invitedCheck');
    let guestInput = document.getElementById('invitedGuest');
    
    showInvited = checkbox.checked;
    guestInput.disabled = !showInvited;
    invitedGuest = guestInput.value;
     h=25
     spazio = (300-h)/portate.length;

    redraw();
}
function updatePortate() {
    let textarea = document.getElementById('portateLista');
   
    portate = textarea.value.split(',').map(item => item.trim());
    spazio = (300-h)/portate.length;

}
function updateSede() {
    let textareaSede = document.getElementById('sedeLista');
    sede = textareaSede.value;
    redraw();
}
function updateData() {
    let textareaData = document.getElementById('dataLista');
    data = textareaData.value;
    redraw();
}
function updateEvento() {
    let textareaEvento = document.getElementById('eventoLista');
    evento = textareaEvento.value;
    redraw();
}


function preload() {
    toninoFont = loadFont('assets/Tonino Bold.otf');
    pressuraFont = loadFont('assets/GT Pressura Bold.ttf');
    logo = loadImage('assets/Logo.png'); // Add SVG load
 
}

/////////////////////






function setup() {
  pixelDensity(1)
 
  //////DATA////////
  
  ye = year();
  mon = month();
  mon = ('' + mon).slice(-2);
  d = day();
  d = ('' + d).slice(-2);
  
  
  ////////////////
  
  if ( web === 1 ){ u=1 ; unità = "px" } else { u=28.3465/10 ; unità = "mm" }

  ///////////////
  

  base = u*base1
  altezza = u*altezza1
  
  let canvas = createCanvas(base, altezza, SVG); // Create SVG Canvas
  canvas.parent('canvas-container');
 
  pdf = createPDF(); // initialize the PDF creation



  strokeWeight(0.5); // do 0.1 for laser
  noFill(); // better not to have a fill for laser
  
  
  //////////////////////////////

  giallo = color(255, 204, 0);
  blu = color(0, 103, 177);
  rosso = color(216, 16, 36)
  nero = color(0)
  bianco = color(255)

 /////////////////////////////


    let checkbox = document.getElementById('invitedCheck');
    checkbox.addEventListener('change', updateInvited);
    
    let guestInput = document.getElementById('invitedGuest');
    guestInput.addEventListener('input', updateInvited);


   let textarea = document.getElementById('portateLista');
   textarea.addEventListener('input', updatePortate);

   let textareaSede = document.getElementById('sedeLista');
   textareaSede.addEventListener('input', updateSede);

   let textareaData = document.getElementById('dataLista');
   textareaData.addEventListener('input', updateData);

   let textareaEvento = document.getElementById('eventoLista');
   textareaEvento.addEventListener('input', updateEvento);

   updatePortate();
   updateSede();
   updateData();
   updateEvento();
   updateInvited()

    



}

function draw() {

background(255, 0)
        struttura()

       // scale(1.3,1.3)

        push();
        imageMode(CENTER);
        image(logo, base/2, 149, logo.width/11.4, logo.height/11.4); // Adjust size as needed
        pop();

////////////////////////

  
                    fill(rosso)
                    textAlign(CENTER)
                    textSize(47)
                    textFont(toninoFont);
                    text('Menù', base/2, 262);



                    fill(nero)
                    textAlign(CENTER)
                    textSize(13)
                    textFont(pressuraFont);


                    if (portate.length<5){

                        for (i=0; i<portate.length; i++){
                            text(portate[i], base/2, 360+spazio*i);
                            spazio = (200-h)/portate.length;
                        }

                    } else {



                    for (i=0; i<portate.length; i++){
                    text(portate[i], base/2, 308+spazio*i);

                    } }

                    

                    fill(rosso)
                    textAlign(CENTER)
                    textSize(14)
                    textFont(toninoFont);
                    text(sede+',', base/2, 623-h);
                    text(data, base/2, 640-h);



                    if (showInvited && invitedGuest) {
                        fill(rosso);
                        textAlign(CENTER);
                        textSize(18);
                        textFont(toninoFont);
                        text(invitedGuest, base/2, 660);
                    } else {h=0;      spazio = (300-h)/portate.length;
                    }



////////////////////////

if (record) { // when record is true, it will begin recording the PDF
    pdf.beginRecord();
}

//
// do your thing here
//

if (record) { // if recording began, save it.
    record = false;

    
        
        if (showInvited && invitedGuest) {
            pdf.save({  filename: "Segnaposto_"+invitedGuest+"_"+evento+"_"+d+"_"+mon+"_"+ye   });
        } 
        else { pdf.save({ filename: "Menu_"+evento+"_"+d+"_"+mon+"_"+ye }); 
     }

    
  }


  let downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
      downloadButton.addEventListener('click', function() {
          try {
           record = true;

          } catch (error) {
              console.error("Download failed:", error);
          }
      });
  } else {
      console.error("Download button not found!");
  }

}











function stella(){

        strokeCap(SQUARE)
        strokeWeight(3.3)
        stroke(rosso)
            line(0,0,0,30)
            line(-15,15,15,15)

            line(-10,5,10,25)
            line(10,5,-10,25)

        strokeWeight(3.5)

        stroke(bianco)

            line(-7.5,7.5,7.5,22.5)
            line(7.5,7.5,-7.5,22.5)

        stroke(rosso)
        strokeWeight(3.7)

            line(5,10,-5,20)
            line(-5,10,5,20)




  }

function struttura(){

////////RETTANGOLI///////

    spaziow=28
    spazioh=27



    noStroke() 
    
    fill(giallo)
    rect(spaziow,spazioh, base-(spaziow*2), altezza-(spazioh*2))
    fill(blu)
    rect(spaziow*2,spazioh*2,base-(spaziow*4),altezza-(spazioh*4))
    fill(bianco)
    rect(spaziow*3,spazioh*3,base-(spaziow*6),altezza-(spazioh*6))



////////STELLE////////

    push()
    scale(1.1)
    translate(110,107)
    stella()
    pop()

    push()
    scale(1.1)
    translate(110,583)
    stella()
    pop()

    push()
    scale(1.1)
    translate(406,107)
    stella()
    pop()

    push()
    scale(1.1)
    translate(406,583)
    stella()
    pop()





  }