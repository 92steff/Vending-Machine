var screen = document.getElementById('screen');
var myWallet = document.getElementById('myWallet');
var boughtItem = document.getElementById('boughtItem');
var insertedCoinsDiv = document.getElementById('coins-inserted');
var coinChange = document.getElementById('coin-change');
var imgSources = ['pics/diamond-coin.png', 'pics/golden-coin.png', 'pics/silver-coin.png', 'pics/bronze-coin.png'];
var screenNum = 0;
var wallet = 100;
var insertedCoins = 0;
var products = [10,2,8,4,7,5,4,3,6,4,6,5];
var faSpinner = document.getElementById('spinner');
var colapsedDiv = document.getElementsByClassName('collapse');

function enterNumber(num) {

        screenNum = parseFloat(screenNum.toString() + num.toString());
        screen.innerHTML = screenNum;
}

function deleteLastNum() {
    var num = screenNum.toString();
    var subNum = num.slice(0,-1);
    screenNum = parseFloat(subNum);
    screen.innerHTML = screenNum;
    
    if (screen.innerHTML == 'NaN') {
        if (insertedCoins == 0) {
            screen.innerHTML = 'INSERT COINS';
        }
        else {
            screen.innerHTML = 'CHOOSE A PRODUCT';
        }
        screenNum = 0;
    }
}

function enter() {
    
    if (screenNum <= 12) {
        
        var i = products[screenNum -1];
        
            if (insertedCoins >= i) {
                insertedCoins -= i;
                insertedCoinsDiv.innerHTML = '$ ' + insertedCoins;
            }else {
                screen.innerHTML = 'INSERT MORE COINS';
                screenNum = 0;
            } 
        
        var product = document.getElementById('product' + screen.innerHTML);
        product.style.transition = '1s';
        product.style.opacity = 0;
        var productCopy = product.cloneNode();
        productCopy.style.opacity = 1;
        boughtItem.appendChild(productCopy);
        screen.innerHTML = 'THANK YOU, ENJOY';

        setTimeout(function() {
            
            screen.innerHTML = 'INSERT COINS';
            screenNum = 0;
            product.style.opacity = 1;
            productCopy.style.opacity = 0;
            
        },2500);       
    }
    
    else {
        
        screen.innerHTML = 'We only have 12 products!';

        setTimeout(function() {
            
            if (insertedCoins == 0) {
                screen.innerHTML = 'INSERT COINS';
            }
            else {
                screen.innerHTML = 'Choose a product';
            }
            screenNum = 0;

            }, 2500);
        }
}



$(function() {
        
        $('.coin').draggable({revert: true, helper: 'clone'});
        $('#coin-input').droppable({drop: function(event, ui) {
        $(this).append(ui.draggable.clone().css({
            'max-width': "150%",
            'max-height': '150%',
            'transform': 'rotateY(135deg)',
            'transition': '1.3s',
            'top': '4px',
            'left': '-45px'
        }).animate({
            'left': '-35px',
            'opacity': '0'
        }));
        
        var source = ui.draggable.attr('src');
        
        if (source == imgSources[0]) {
            wallet -= 10;
            insertedCoins += 10;
        }
        if (source == imgSources[1]) {
            wallet -= 5;
            insertedCoins += 5;
        }
        if (source == imgSources[2]) {
            wallet -= 2;
            insertedCoins += 2;
        }
        if (source == imgSources[3]) {
            wallet -= 1;
            insertedCoins += 1;
        }
        
        setTimeout(function() {
            
                screen.innerHTML = 'Choose a product';
                screenNum = 0;
                
            }, 1000);
        
        myWallet.innerHTML = '$ ' + wallet;
        insertedCoinsDiv.innerHTML = '$ ' + insertedCoins;
            
    }});
    
});

function shuffle() {
    var marginLeft = parseFloat(Math.random() * 20) + 'px';
    return marginLeft;
}

function change(x) {
    var changeAmount = x;
    var count = 0;
    
    while (changeAmount>=10) {
        changeAmount -= 10;
        count += 1;
        }
    while (changeAmount>=5) {
        changeAmount -= 5;
        count += 1;
    }
    while (changeAmount>=2) {
        changeAmount -= 2;
        count += 1;
    }
    if (changeAmount==1) {
        count += 1;
    }

    for (var i =0; i<count; i++) {
        var img = document.createElement('img');
        img.src = imgSources[i];
        img.className = 'imgChange';               
        img.style.transition = '1s';
        img.style.marginLeft = shuffle();
        coinChange.appendChild(img);
    }
    count = 0;  
    
    setTimeout(function() {
        var imgs = document.getElementsByClassName('imgChange');
        
        for (var i=0; i<imgs.length; i++) {
            imgs[i].style.opacity = '0';
        }
        
    }, 2000);
    
}

function withdraw() {
    wallet += insertedCoins;
    insertedCoinsDiv.innerHTML = '$ ' + 0;
    myWallet.innerHTML = '$ ' + wallet;
    change(insertedCoins);
    insertedCoins = 0;
    screen.innerHTML = 'INSERT COINS';
}

function spin() {
    if (~faSpinner.className.indexOf('closed')) {
        faSpinner.className = faSpinner.className.replace('closed', 'open');
    }
    else {
        faSpinner.className = faSpinner.className.replace('open', 'closed');
    }
}















