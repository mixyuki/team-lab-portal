/*お題が簡単に増やせるようにリスト化、拡張性をもたせる
ゲームを作る上で考えるべきことは修正を容易にできるようにすることUnityであれば
参照やテキストをヒエラルキーWindow上で変えるようにするなどがそのテクニックあたる*/

const Game = {
  state: 'TITLE',
  topics: ['美少女','骸骨','学校','銃','好きなもの','ピポサル'],
  topic: '',
  playTurn: 1,
  p1Grid: null,
  p2Grid: null,
  selectedColor: 0,
  timerSec: 45,
  timerStartMs: 0,
  result: { winner:'', comment:['グレートだぜ!','なかなかおもろいww','パルフェクト'], startMs:0 },
  
  newGrid(){ return Array.from({length:CanvasScreen.gridSize},()=>Array(CanvasScreen.gridSize).fill(3)); },
  toTitle(){ this.state='TITLE'; },
  startMatch(){
    this.topic = random(this.topics);
    this.p1Grid = this.newGrid();
    this.p2Grid = this.newGrid();
    if (typeof Color1 !== 'undefined' && typeof Color1.rPalette === 'function') Color1.rPalette();
    this.selectedColor = 0;
    this.playTurn = 1;
    this.timerStartMs = millis();
    this.state = 'CANVAS';
  },
  endTurn(){
    if(this.state!=='CANVAS') return;
    if(this.playTurn===1){
      this.playTurn = 2;
      this.timerStartMs = millis();
    }else{
      this.state = 'TOHYO';
    }
  },
  decideRandomWinner(){
    const w = random(['P1','P2']);
    this.result = { winner:w, comment:'', startMs:millis() };
    this.state = 'RESULT';
  }
};

function setup(){
  const host = document.getElementById('wrap') || document.body;
  const c = createCanvas(900,700);
  if (c && typeof c.parent === 'function') c.parent(host);
  pixelDensity(1); noSmooth(); textFont('DotGothic16');
}

function draw(){
  background('#0e1016');
  if(Game.state==='TITLE'){
    TitleScreen.draw();
  }else if(Game.state==='CANVAS'){
    CanvasScreen.draw();
    const remain = Game.timerSec - floor((millis()-Game.timerStartMs)/1000);
    if(remain<=0) Game.endTurn();
  }else if(Game.state==='TOHYO'){
    TOHYOScreen.draw();
  }else if(Game.state==='RESULT'){
    ResultScreen.draw();
    if(millis()-Game.result.startMs>15000) Game.toTitle();
  }
}

function mousePressed(){
  if(Game.state==='TITLE'){
    textSize(28);
    const label='スタート';
    const w=textWidth(label);
    const th=textAscent()+textDescent();
    const rx=width/2 - w/2 - 16;
    const ry=height/2 + 40 - th/2 - 12;
    const rw=w+32, rh=th+24;
    if(mouseX>=rx && mouseX<=rx+rw && mouseY>=ry && mouseY<=ry+rh){ Game.startMatch(); }
  } else if (Game.state==='CANVAS') {
    CanvasScreen.onMousePressed();
  }
}

function mouseDragged(){
  if (Game.state==='CANVAS') {
    CanvasScreen.onMouseDragged();
  }
}

//デバック用
function keyPressed(){
  if(key==='1') Game.state='TITLE';
  if(key==='2') Game.state='CANVAS';
  if(key==='3') Game.state='TOHYO';
  if(key==='4') Game.state='RESULT';
  if(key==='s'||key==='S') saveCanvas('peindot-skeleton','png');
}
