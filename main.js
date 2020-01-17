$(document).ready(function () {
    var wrapp = $('#wrapp');
    wrapp.append("<div class='container'></div>");
    var container = $('.container');

    var animals = ['pas','macka','zec','konj','krava','lav','tigar','vuk','ovca','koza','svinja','kokos','zebra','medjed','vrana','pacov','ajkura','kit','pas','macka','zec','konj','krava','lav','tigar','vuk','ovca','koza','svinja','kokos','zebra','medjed','vrana','pacov','ajkura','kit'];
    // var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

    // NaDJENI parovi i skor
    var pair = [];
    var score = 0;
    $('#score').text(score);

    // Za tajmer 
    var min = $('#min');
    var sec = $('#sec');
    var s = 1;
    var m = 1;
    var end = false;

    // Kreira 36 elemenata i u svaki ubacuje raqndom broj
    for(let i=0; i<36; i++){        
        // Kreira random broj od 0-35
        let rand = Math.floor(Math.random() * animals.length);
        
        container.append('<div class="box"><div class="back">'+animals[rand]+'</div><div class="front"></div></div>');

        // Izbacuje iz niza taj koji je rand odabran i ubacen u kocku   
        animals.splice(rand, 1);
    }

    // Selektujemo sve boxeve
    var boxes = $('.box');
    var firstClick;

    function start(){        
        boxes.on('click', function(){       
            // Ako opet klikcemo na isto nista se ne desava
            if(firstClick != this) {
                $(this).find('.front').css('transform', 'rotateY(180deg)');
                $(this).find('.back').css('transform', 'rotateY(0deg)');
        
                // Ubacuje u niz vrednosti koje su selektovane
                pair.push( $(this) );
        
                // KAda su selektovana 2 proverava dal su isti i ponistava pair na []
                if(pair.length === 2) {

                    // Onemogucava dalje kliktanje
                    boxes.off();

                    setTimeout(function(){                        
                        if( pair[0].html() === pair[1].html() ) {
                            pair[0].find('.back').css('background', 'orange');
                            pair[1].find('.back').css('background', 'orange'); 
                            // Povecava skor za 1
                            $('#score').text(++score);

                            if(score === 18) {
                                alert("Kraj");
                                showScore();
                            }
                        }
                        else{
                            

                            pair[0].find('.front').css('transform', 'rotateY(0deg)');
                            pair[1].find('.front').css('transform', 'rotateY(0deg)');                            
                        }            
                        pair = [];
                        start();

                    }, 1400);
                }
            }
            firstClick = this;
        });
    }

    // Funkcija za kraj
    function showScore(){
        end = true;
        m = m-1;
        s = s-1;   
        $("#status").html("<p>Skor : "+m+" minuta "+s+" sekundi</p>");
        $("#status").append('<a href="javascript:location.reload(true)">Igraj ponovo</a>');
    }


    // Timer Funkcija   
    function startTime () {    
        setInterval(function(){
            if(s === 60) {
                s = 0;
                min.text(m++);
            }
            sec.text(s++);        
    
        }, 1000);
    }    
    startTime ();

    // Prvi put startujemo funkciju
    start();

});