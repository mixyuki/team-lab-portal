// リザルト画面（骨組み）：枠とテキストだけ。
// TODO: 勝者の絵の拡大描画、コメント表示、数秒後にタイトルへ戻る。

const ResultScreen = {
  draw(){
    noStroke(); fill('#1a1b20'); rect(width/2-300, 80, 600, 420, 16);
    textAlign(CENTER, TOP); textSize(28); fill('#e5e7ef');
    text(' の勝ち！', width/2, 24);
    textSize(18); fill('#b8beca'); text('コメント（未実装）', width/2, 60);

    // ▼TODO: 勝者のグリッド拡大描画
    const winner = Game.result ? Game.result.winner : "P1";
    const grid = (winner === "P1") ? Game.p1Grid : Game.p2Grid;
    if(!grid) return;
    const bigCell = 14
    const side = 32 * bigCell;
    const ox = (width - side) /2;
    const oy = (height - side) /2;
    push(); noSmooth(); translate(ox, oy); noStroke();
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++){
        const idx = grid[y][x];
        fill(Color1.palette[idx]);
        rect(x*bigCell, y*bigCell, bigCell, bigCell);
      }
    }
    pop();
    // ▼TODO: ランダムコメント
    // ▼TODO: 15秒後にタイトルへ戻す
    const ttl = 15000;
    const elapsed = millis() - (Game.result.startMs || 0);
    const ratio = constrain(elapsed / ttl, 0, 1);
    
    noStroke(); fill('#2a2f3b');
    rect( (width-400)/2, height-40, 400, 8, 4);
    fill('#8ab4ff');
    rect( (width-400)/2, height-40, 400*ratio, 8, 4);
    
    const remainSec = ceil( (ttl - elapsed) / 1000);
    textAlign(CENTER, BOTTOM); fill('#cbd0da'); textSize(14);
    text('あと' + max(0, remainSec) + '秒', width/2, height-48);
  }
};
