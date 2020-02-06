const Util = {};
Util.timeStamp = function() {
	return window.performance.now();
};
Util.random = function(min, max) {
  return min + Math.random() * (max - min);
};
Util.randomArray = function(array){
	return array[Math.floor(Math.random()*array.length)];
};
Util.map = function(a, b, c, d, e) {
	a = this.clamp(a,b,c);
  return (a - b) / (c - b) * (e - d) + d;
};
Util.lerp = function(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
};
Util.clamp = function(value,min,max){
	return Math.max(min, Math.min(max, value));
};
Util.threeAngle = function(p0,p1,p2){
    var b = Math.pow(p1.x-p0.x,2) + Math.pow(p1.y-p0.y,2),
        a = Math.pow(p1.x-p2.x,2) + Math.pow(p1.y-p2.y,2),
        c = Math.pow(p2.x-p0.x,2) + Math.pow(p2.y-p0.y,2);
    return Math.acos( (a+b-c) / Math.sqrt(4*a*b) );
}
Util.hsl = function(hue,saturation,lightness){
	return `hsl(${hue},${saturation}%,${lightness}%)`;
}

class Vector{
	constructor(x,y){
		this.x = x || 0;
		this.y = y || 0;
	}
	set(x,y){
		this.x = x;
		this.y = y;
	}
  reset(){
		this.x = 0;
		this.y = 0;
  }
	fromAngle(angle){
		let x = Math.cos(angle),
			y = Math.sin(angle);
		return new Vector(x,y);
	}
	add(vector){
		this.x += vector.x;
		this.y += vector.y;
	}
	sub(vector){
		this.x -= vector.x;
		this.y -= vector.y;
	}
	mult(scalar){
		this.x *= scalar;
		this.y *= scalar;
	}
	div(scalar){
		this.x /= scalar;
		this.y /= scalar;
	}
	dot(vector){
		return vector.x * this.x + vector.y * this.y;
	}
	limit(limit_value){
		if(this.mag() > limit_value) this.setMag(limit_value);
	}
	mag(){
		return Math.hypot(this.x,this.y);
	}
	setMag(new_mag){
		if(this.mag() > 0){
			this.normalize();
		}else{
			this.x = 1;
			this.y = 0;
		}
		this.mult(new_mag);
	}
	normalize(){
		let mag = this.mag();
		if(mag > 0){
			this.x /= mag;
			this.y /= mag;
		}
	}
  normalizedMag(){
    let copy = this.copy();
    copy.normalize();
    return copy.mag();
  }
	heading(){
		return Math.atan2(this.y,this.x);
	}
	setHeading(angle){
		let mag = this.mag();
		this.x = Math.cos(angle) * mag;
		this.y = Math.sin(angle) * mag;
	}
	dist(vector){
		return new Vector(this.x - vector.x,this.y - vector.y).mag();
	}
	angle(vector){
		return Math.atan2(vector.y - this.y, vector.x - this.x);
	}
	copy(){
		return new Vector(this.x,this.y);
	}
}


class Tagada{
  constructor(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.W = 0;
    this.H = 0;
    this.ressources = {
      images:[],
      audio:[],
    }
    this.backgroundColor = "gray";
    this.timeData = {
      now : 0,
      dt : 0,
      last : Util.timeStamp(),
      step : 1/60,
    };
    this.frame = 0;
    window.addEventListener("resize",()=>{
      this.setSize();
      this.resize();
    });
    this.mouse = new Vector(0,0);
    window.addEventListener("pointermove",(event)=>{
      this.pMove(event);
    });
  }
  addImage(path){
    let image = new Image();
    image.src = path;
    this.ressources.images.push(image);
    return image;
  }
  drawImageCover(image,x,y,sizeX,sizeY){
    if(sizeX <= 0 || sizeY <= 0) return false;
    let scaleX,
        scaleY,
        ratio = image.width / image.height;
    
    let sourceScaleX,sourceScaleY;
    
    let cRation = sizeX / sizeY;
    
    if(cRation > ratio){
      scaleX = sizeX;
      scaleY = scaleX / ratio;
      
      sourceScaleX = image.width;
      sourceScaleY = sourceScaleX / cRation;
    }else{
      scaleY = sizeY;
      scaleX = scaleY * ratio;
      
      sourceScaleY = image.height;
      sourceScaleX = sourceScaleY * cRation;
    }
    
    let offsetX = (sizeX - scaleX);
    let offsetY = (sizeY - scaleY);
    
    this.ctx.drawImage(
    image,(image.width - sourceScaleX) / 2,(image.height - sourceScaleY) / 2,sourceScaleX ,sourceScaleY,
    x ,y,scaleX + offsetX,scaleY + offsetY
    );
    
    
  }
  run(){
    Promise.all(
      this.ressources.images.map(image=>{
        return new Promise(resolve=>{
          image.onload = ()=>{
            resolve();
          }
        });
      })
    ).then(v=>{
      this.setSize();
      this.loop();
    });
  }
  resize(){

  }
  pMove(event){
    this.mouse.x = event.clientX - this.canvas.offsetLeft;
    this.mouse.y = event.clientY - this.canvas.offsetTop;
  }
  setSize(){
    this.W = this.canvas.width = window.innerWidth;
    this.H = this.canvas.height = window.innerHeight;
  }
  update(dt){

  }
  render(){

  }
  loop(){
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0,0,this.W,this.H);

    this.timeData.now = Util.timeStamp();
    this.timeData.dt = this.timeData.dt + Math.min(1, (this.timeData.now - this.timeData.last) / 1000);
    while(this.timeData.dt > this.timeData.step) {
      this.timeData.dt = this.timeData.dt - this.timeData.step;
      this.update(this.timeData.step);
    }
    this.render();
    this.timeData.last = this.timeData.now;
    this.frame += 1;

    requestAnimationFrame(()=>{
      this.loop()
    });
  }
}


let app = new Tagada();
let shapes = [];
let $ = app.ctx;
let minSize = 0;

class Particle {
  constructor(container, x, y, size) {
    this.container = container;
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.size = size;
    this.maxSpeed = Util.random(100, 1000);
    this.start = new Date();
    this.duration = Util.random(200, 2000);
    this.spinOffset = Util.random(0.001,0.4);
    this.gravity = new Vector(0,10);
    this.colors = ["#fff83a","#ffffff"];
  }
  draw() {
    let time = new Date() - this.start;
    if (time > this.duration) {
      // delete particle
      let id = this.container.indexOf(this);
      this.container.splice(id, 1);
    }
    let sizeOffset = Util.map(time,0,this.duration,1,0);

    $.fillStyle = this.colors[Math.floor(Util.map(Math.sin(app.frame * this.spinOffset),-1,1,0,this.colors.length))];
    $.beginPath();
    $.ellipse(this.position.x, this.position.y, this.size * sizeOffset * Math.abs(Math.sin(app.frame * this.spinOffset)),this.size * sizeOffset, this.velocity.heading(), 0, Math.PI * 2);
    $.fill();
  }
  addForce(force) {
    this.acceleration.add(force);
  }
  update(dt) {
    this.addForce(this.gravity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.velocity.mult(0.98);
    let v = this.velocity.copy();
    v.mult(dt);
    this.position.add(v);
    this.acceleration.reset();
  }
}

class Bubble {
  constructor(container, x, y, size) {
    this.container = container;
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.size = size;
    this.displayedSize = size;
    this.maxSpeed = Util.random(100, 400);
    this.beatSpeed = Util.random(0.01,0.04);

    this.offset = Util.random(0.1,100);
    this.colors = ["#ff93c9","#12e524"];
    this.color = Util.randomArray(this.colors);

  }
  draw() {
    this.displayedSize = this.size * Util.map(Math.sin(app.frame * this.beatSpeed),-1,1,0.96,1.04);
    let dMouse = this.position.dist(app.mouse);
    $.strokeStyle = Util.hsl(0,Util.map(dMouse-this.displayedSize,0,200,80,0),
    Util.map(dMouse-this.displayedSize,0,200,60,0)
  );

    // draw ondulation
    let resolution = Math.floor(Util.map(this.size,0,minSize,6,10));
    let ps = [];
    let globalSpeed = Util.map(this.velocity.mag(),0,this.maxSpeed,0.01,1);
    let globalScale = Util.map(this.velocity.mag(),0,this.maxSpeed,0.1,1.2);

    for (var i = 0; i < resolution; i++) {

      let pSize = this.displayedSize + Math.sin( this.offset +
        Math.cos(i  * 0.46 + app.frame * 0.02) * Math.sin(-i  * 2 + app.frame * 0.02)
      ) * this.size * globalScale;

      let a = Util.map(i,0,resolution,0,Math.PI*2),
          x = this.position.x + Math.cos(a) * pSize,
          y = this.position.y + Math.sin(a) * pSize;

          //$.fillStyle = "blue";
          //$.beginPath();
          //$.arc(x, y, 2, 0, Math.PI * 2);
          //$.fill();

          ps.push({x:x,y:y});
    }

    smooth(ps);
  }
  addForce(force) {
    this.acceleration.add(force);
  }
  update(dt) {
    this.divide();
    this.bound();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.velocity.mult(0.98);
    let v = this.velocity.copy();
    v.mult(dt);
    this.position.add(v);
    this.acceleration.reset();
  }
  bound() {
    let center = new Vector(app.W / 2, app.H / 2);
    let dist = this.position.dist(center);
    let smallestSide = Math.min(app.W, app.H) / 2;

    if (dist > smallestSide) {
      let force = new Vector(0, 0).fromAngle(this.position.angle(center));
      force.setMag(Util.map(dist, 0, smallestSide, 0, 10));
      this.addForce(force);
    }
  }
  divide() {
    let dist = this.position.dist(app.mouse);
    if (dist > this.displayedSize) return;
    // shake Screen
    shake(Util.map(this.size,0,minSize,2,8));
    // delete bubble
    let id = this.container.indexOf(this);
    this.container.splice(id, 1);
    // add Particles
    let pCount = Util.map(this.size,0,minSize,10,400);

    for (let i = 0; i < pCount; i++) {
      let angle = Util.map(i, 0, pCount, 0, Math.PI * 2),
        pX = this.position.x + Math.cos(angle) * this.size,
        pY = this.position.y + Math.sin(angle) * this.size;

      let p = new Particle(particles, pX, pY,
        Util.map(this.size,0,minSize,4,10) * Util.random(0.2, 1.2));
      p.velocity = new Vector().fromAngle(angle);
      p.velocity.mult(Util.random(100, 800));
      particles.push(p);
    }
    // add new bubles if size is sufficient
    if (this.size < 20) return;
    let divisions = Math.floor(Util.random(2, 6)),
      childSize = this.size / divisions;

    for (let i = 0; i < divisions; i++) {
      let angle = Util.map(i, 0, divisions, 0, Math.PI * 2),
        pX = this.position.x + Math.cos(angle) * this.size / 2,
        pY = this.position.y + Math.sin(angle) * this.size / 2;

      let bubbleChild = new Bubble(
        this.container,
        pX,
        pY,
        childSize * Util.random(0.8, 1.8)
      );
      bubbleChild.velocity = new Vector().fromAngle(angle);
      bubbleChild.velocity.mult(Util.random(100, 400));
      this.container.push(bubbleChild);
    }
  }

  avoid(others) {
    others.forEach(other => {
      if (other !== this) {
        let dist = this.position.dist(other.position),
          max_dist = this.size + other.size;
        if (max_dist - dist >= 0) {
          let angle = other.position.angle(this.position);
          let force = new Vector().fromAngle(angle);
          force.setMag(Util.map(dist, 0, max_dist, 1, 0));
          this.addForce(force);
        }
      }
    });
  }
}

function smooth(points) {

  var xc = (points[0].x + points[1].x) / 2;
  var yc = (points[0].y + points[1].y) / 2;

  $.moveTo(xc, yc);
  for (i = 1; i < points.length - 1; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    $.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  var xc = (points[points.length - 1].x + points[0].x) / 2;
  var yc = (points[points.length - 1].y + points[0].y) / 2;

  $.quadraticCurveTo(points[i].x, points[i].y, xc, yc);

  var xc = (points[0].x + points[1].x) / 2;
  var yc = (points[0].y + points[1].y) / 2;

  $.quadraticCurveTo(points[0].x, points[0].y, xc, yc);




}



let bubbles = [],
  particles = [];

// spring for the screen shake

function shake(intencity){
  let rForce = new Vector().fromAngle(Math.random()*Math.PI * 2);
  rForce.setMag(intencity);
  spring.velocity.add(rForce);
}

let spring = {
  mass:40,
  k:2,
  damping:0.94,
  restPosition: new Vector(0,0),
  position: new Vector(0,0),
  velocity: new Vector(0,0),

  update:function(){
    let force = this.position.copy();
    force.sub(this.restPosition);
    force.mult(-this.k);

    force.div(this.mass);

    this.velocity.add(force);
    this.velocity.mult(this.damping);
    this.velocity.limit(100);
    this.position.add(this.velocity);

  },
}

app.setSize();
populate();

function populate() {
  minSize = Math.min(app.W, app.H) * 0.4;
  particles = [];
  bubbles = [];
  bubbles.push(new Bubble(bubbles, app.W / 2, app.H / 2, minSize));
  bubbles.push(new Bubble(bubbles, app.W / 2, app.H / 2, minSize));
}

app.resize = function() {
  populate();
};

app.update = function(dt) {
  spring.update();
  bubbles.forEach(b => {
    b.avoid(bubbles);
    b.update(dt);
  });
  particles.forEach(p => p.update(dt));
};

app.render = function() {

  $.save();
  $.translate(spring.position.x,spring.position.y);

  $.globalCompositeOperation = "xor";
  bubbles.forEach(b => {
    $.fillStyle = "#2551f3";
    $.beginPath();
    b.draw()
    $.fill();
  });

  $.globalCompositeOperation = "destination-over";
  bubbles.forEach(b => {
    $.fillStyle = b.color;
    $.beginPath();
    b.draw()
    $.fill();
  });

  $.globalCompositeOperation = "source-over";
  for (let i = particles.length-1; i > 0; i--) {
    let p = particles[i];
    p.draw();
  }
  $.restore();



};

app.backgroundColor = "#1a1a1a";
app.run();