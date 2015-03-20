(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('home');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width -15;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        //console.log(width*0.1);
        for(var x = 0; x < width*0.1; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
        var stopElem = document.getElementById('stopAnimation');
        stopElem.addEventListener('click', stopAnim);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        initHeader();
    }

    function stopAnim(){
        if(animateHeader){
            animateHeader = false;
            document.getElementById('stopAnimation').innerHTML= 'Start animation';
        }else{
            animateHeader = true;
            document.getElementById('stopAnimation').innerHTML= 'Stop animation';
        }
        initHeader();
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;
        var _elements = ['<code>','</code>','if(!x)','var n=0;', '<?php','echo $var;'];
        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            //_this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
            _this.mytext = _elements[Math.floor((Math.random() * 5))];
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            // ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.font = "italic bold 7pt Consolas";
			ctx.fillText(_this.mytext,_this.pos.x, _this.pos.y);
            ctx.fill();
        };
    }

})();