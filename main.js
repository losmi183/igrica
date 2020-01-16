$(document).ready(function () {
    var wrapp = $("#wrapp");
    wrapp.append('<div class="container"></div>');
    var container = $('.container');

    var itemAr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    var testClick = 0;
    var savedArr = [];

    for(var i=0; i<16; i++) {
        var rand = Math.floor(Math.random() * itemAr.length);
        container.append('<div class="box"><div class="back">'+ itemAr[rand] +'</div><div class="front"></div></div>');
        itemAr.splice(rand,1);        
    }

    var boxes = $(".box");

    start();

    function start(){
        boxes.click(function(){
            
            savedArr.push($(this));
            testClick++;                        
    
            $(this).find('.front').css('transform', 'perspective(900px) rotateY(180deg)');
            $(this).find('.back').css('transform', 'perspective(900px) rotateY(0deg)');
    
            if(testClick === 2){
                boxes.off();
                if(savedArr[0].html() === savedArr[1].html()) {   
                    testClick = 0;
                    savedArr.length = 0;
                    start();         
                } 
                else { 
                    setTimeout(function(){                    
                        savedArr[0].find('.front').css('transform', 'perspective(900px) rotateY(0deg)');
                        savedArr[0].find('.back').css('transform', 'perspective(900px) rotateY(180deg)');
                        savedArr[1].find('.front').css('transform', 'perspective(900px) rotateY(0deg)');
                        savedArr[1].find('.back').css('transform', 'perspective(900px) rotateY(180deg)');

                        testClick = 0;
                        savedArr.length = 0;
                        start();
                    }, 700);
                }   
            }
        });
    }

}); 

