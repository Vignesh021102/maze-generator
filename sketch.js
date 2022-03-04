var grid;
var stack = [];
function setup() {
  let res = 10;
  let r = Math.floor(innerHeight/res)
  let c = Math.floor(innerWidth/res)
 createCanvas(innerWidth,innerHeight);
  grid = new Grid(res*c,res*r,res)
  grid.initArr()
}

function draw() {
  background(0);
  grid.init()
  grid.draw()
}

class Grid{
  constructor(width,height,res){
    this.width = width;
    this.height = height;
    this.row = Math.floor(height/res);
    this.col = Math.floor(width/res);
    this.res = res
    this.arr = [];
    this.pos = [0,0]
  }
  initArr(){
    let num = 1;
    for(let i = 0;i<this.height;i+= this.res){
      this.arr.push([])
      for(let j =0;j<this.width;j+= this.res){
        this.arr[Math.floor(i/this.res)].push([0,0,0,0,false])
        num++;
      }
    }
    this.row = this.arr.length;
    this.col = this.arr[0].length
    console.log(this.row,this.col);
    
  }
  isFinished(){
    for(let i =0;i<this.arr.length;i++){
      for(let j=0;j<this.arr[i].length;j++){
        if(this.arr[i][j][4] == false){
          return false;
        }
      }
    }
    return true;
  }
  findBYID(ID){
  
    return [ID[0],ID[1]]
  }
  move(){
    let avail = [];
    let j =0;  
    for(let i = -1;i<2;i++){
        if(i == 0)continue;
          if(!(this.pos[0]+i <0||this.pos[1]+j<0||this.pos[0]+i>=this.row||this.pos[1]+j>=this.col) && !this.arr[this.pos[0]+i][this.pos[1]+j][4]){
            avail.push([this.pos[0]+i,this.pos[1]+j])
          }
      }
      let i =0;
    for(let j = -1;j<2;j++){
      if(j == 0)continue;
        if(!(this.pos[0]+i <0||this.pos[1]+j<0||this.pos[0]+i>=this.row||this.pos[1]+j>=this.col) && !this.arr[this.pos[0]+i][this.pos[1]+j][4]){
          avail.push([this.pos[0]+i,this.pos[1]+j])
        }
    }
    if(avail.length == 0) return false;
    let next = avail[Math.floor(random(0,avail.length))]

    this.connect(this.pos,next);
    return this.pos = next;
  }
  connect(p1,p2){
    //console.log(p1,p2,p1[0]< p2[0],p1[0] > p2[0]);
    if(p1[0]< p2[0]){
      this.arr[p1[0]][p1[1]][2] = 1
      this.arr[p2[0]][p2[1]][0] = 1
    }
    if(p1[1]>p2[1]){
      //right
      this.arr[p1[0]][p1[1]][3] = 1
      this.arr[p2[0]][p2[1]][1] = 1
    }
    if(p1[0] > p2[0]){
      //moved bottom
      this.arr[p1[0]][p1[1]][0] = 1
      this.arr[p2[0]][p2[1]][2] = 1
    }
    if(p1[1]<p2[1]){
      //left
      this.arr[p1[0]][p1[1]][1] = 1
      this.arr[p2[0]][p2[1]][3] = 1
    }

  }
  checkNei(){
    let avail = [];
    let j =0;  
    for(let i = -1;i<2;i++){
        if(i == 0)continue;
          if(!(this.pos[0]+i <0||this.pos[1]+j<0||this.pos[0]+i>=this.row||this.pos[1]+j>=this.col) && !this.arr[this.pos[0]+i][this.pos[1]+j][4]){
            avail.push(this.arr[this.pos[0]+i][this.pos[1]+j][4])
          }
      }
      let i =0;
    for(let j = -1;j<2;j++){
      if(j == 0)continue;
        if(!(this.pos[0]+i <0||this.pos[1]+j<0||this.pos[0]+i>=this.row||this.pos[1]+j>=this.col) && !this.arr[this.pos[0]+i][this.pos[1]+j][4]){
          avail.push(this.arr[this.pos[0]+i][this.pos[1]+j][4])
        }
    }
    if(avail.length >0) return true;
    return false;
  }
  init(){
        this.arr[this.pos[0]][this.pos[1]][4] = true;
        if(this.checkNei()){
          stack.push([this.pos[0],this.pos[1]])
          this.move()
        }else{
          if(stack.length<=0) return;
          this.pos = stack.pop()
        }
        
  }
  draw(){
    let r = this.res;
    push()
    for(let i = 0;i<this.arr.length;i++){
      for(let j =0;j<this.arr[i].length;j++){
        stroke(255)
        //console.log(this.arr[i][j]);
        if(!this.arr[i][j][0]){
        //top
        line(j*r,i*r,(j*r)+r,i*r)
        }
        if(!this.arr[i][j][1]){
          //right
          line((j*r)+r,i*r,(j*r)+r,(i*r)+r)
        }
        if(!this.arr[i][j][2]){
          //bottom
          line(j*r,(i*r)+r,(j*r)+r,(i*r)+r)
        }
        if(!this.arr[i][j][3]){
          //left
          line(j*r,i*r,j*r,(i*r)+r)
        }
        if(!this.arr[i][j][4]){
          fill(255)
          rect(j*r,i*r,r,r)
        }
      }
    }
    pop()
    fill(255,0,0)
    rect(this.pos[1]*r,this.pos[0]*r,r,r)
  }
}




