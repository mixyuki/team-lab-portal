//書いてあるものは絶対消さないこと

/*キャンバスの位置やグリッドの調整　viewSize = gridSize * cellSize、originX = (width - viewSize)/2、originY = (height - viewSize)/2 - padY　などを使って値を代入し÷2をし中心にしている*/

const CanvasScreen = {
  gridSize: 32, //グリッドの大きさ
  cellSize: 16,　//マスの大きさ
  padY: 2,　//canvasの位置、基壁からの空白

  get viewSize(){ return this.gridSize * this.cellSize; },
  get originX(){ return (width - this.viewSize) / 2; },
  get originY(){ return (height - this.viewSize) / 2 - this.padY; },

  // グリッドの枠と線
  drawGridBase(){
    push(); noSmooth(); translate(this.originX, this.originY);
    noStroke(); fill(255); rect(0,0,this.viewSize,this.viewSize,10); // 白い下地
    stroke('#2a2d35'); strokeWeight(1);
    for(let i=0;i<=this.gridSize;i++){
      line(0, i*this.cellSize, this.viewSize, i*this.cellSize);
      line(i*this.cellSize, 0, i*this.cellSize, this.viewSize);
    }
    pop();
  },

  // パレット
  paletteRect(i){
    const totalW = 5*46; const startX=(width-totalW)/2; const y=this.originY+this.viewSize+24;
    return {x:startX+i*46, y, w:36, h:36, r:8};//■の位置
  },
  drawPaletteBase(){
    textAlign(CENTER, TOP); textSize(14);
    for(let i=0;i<5;i++){
      const r=this.paletteRect(i);
      noStroke(); fill('#111216'); rect(r.x-4,r.y-4,r.w+8,r.h+32,10);
      stroke((typeof Game!=='undefined' && Game.selectedColor===i)? '#ffffff' : '#3a3d47'); strokeWeight(2);
      fill(Color1.palette[i]); rect(r.x,r.y,r.w,r.h,r.r);
      noStroke(); fill('#c8cad1'); text('∞', r.x+r.w/2, r.y+r.h+6);
    }
  },

  // ピクセル描画
  drawPixels(grid){
    if(!grid) return;
    push(); noSmooth(); translate(this.originX, this.originY);
    noStroke();
    for(let y=0;y<this.gridSize;y++){
      for(let x=0;x<this.gridSize;x++){
        fill(Color1.palette[grid[y][x]]);
        rect(x*this.cellSize, y*this.cellSize, this.cellSize, this.cellSize);
      }
    }
    pop();
  },

  // クリック座標からセルを色塗りを計算
  mouseToCell(mx,my){
    const gx = floor((mx - this.originX) / this.cellSize);
    const gy = floor((my - this.originY) / this.cellSize);
    if (gx<0 || gy<0 || gx>=this.gridSize || gy>=this.gridSize) return null;
    return {x:gx, y:gy};
  },

  getActiveGrid(){
    if (!Game) return null;
    return (Game.playTurn===1) ? Game.p1Grid : Game.p2Grid;
  },

  // パレット当たり判定
  hitPalette(mx,my){
    for(let i=0;i<5;i++){
      const r=this.paletteRect(i);
      if (mx>=r.x && mx<=r.x+r.w && my>=r.y && my<=r.y+r.h) return i;
    }
    return -1;
  },

  // 画面描画
  draw(){
    noStroke(); fill('#151821'); rect(0,0,width,60);
    textSize(18); fill('#cfd4df'); textAlign(LEFT, CENTER);
    text(`お題：${Game.topic}`, 24, 30);
    textAlign(RIGHT, CENTER);

    // やりたいこと①: 残り時間の計算を実装する
    const elapsed = floor((Game.timerSec - Game.timerStartMs) / 1000);
    const remain = max(0,Game.timerSec - Math.floor((millis()-Game.timerStartMs)/ 1000));
    text(`残り ${remain} 秒 / P${Game.playTurn}`, width-24, 30); 
    // やりたいこと①: タイマー表示
    this.drawPixels(this.getActiveGrid());
    this.drawGridBase();
    this.drawPaletteBase();
  },
  
  // クリック処理：パレット選択or塗り
  onMousePressed(){
    // やりたいこと②: パレットがクリックされたら その色にする
    // やりたいこと②: キャンバスがクリックされたら、対応セルを選択色で塗る
  },

  // ドラッグで塗り続ける
  onMouseDragged(){
    //やりたいこと③: mouseToCell → getActiveGrid でセルを取り、選択色で塗り続ける
  }
};

