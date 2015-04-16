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
            document.getElementById('stopAnimation').innerHTML= '<i class="fa fa-play fa-2x"></i>';
        }else{
            animateHeader = true;
            document.getElementById('stopAnimation').innerHTML= '<i class="fa fa-pause fa-2x"></i>';
        }
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
        var _elements = ['<script>','</script>',
            'Math.random()*width','var n=0;', '<?php ?>','echo $var;', 'phpinfo();',
            'private $password','static public function Connect()',
            '$(document).ready', '$args = array();', '$xml = new DomDocument();', 'element.push(obj);',
            '@media (max-width: 767px){.myname{font-size:0.5em;}}'
        ];
        var _fontsize = ['7pt','8pt','9pt','10pt', '6pt'];
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
            _this.mytext = _elements[Math.floor((Math.random() * (_elements.length-1) ))];
            _this.font = 'italic bold ' +  _fontsize[Math.floor((Math.random() * (_elements.length-1) ))] + ' Consolas';
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.font = _this.font;
            ctx.fillText(_this.mytext,_this.pos.x, _this.pos.y);
            ctx.fill();
        };
    }

})();