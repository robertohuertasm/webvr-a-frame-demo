let hit = false;
let resetId = 0;
let targetPos = [
  [-4.5, 4, -2],
  [-3, 4, -4],
  [0, 4, -4],
  [3, 4, -4],
  [4.5, 4, -2],
];
let oldPos = 2;
let randPos = 2;
let shootingAllowed = false;
let velo = 0;
let dVelo = -0.05;
let score = 0;
let playing = false;

const resetTarget = () => {
  clearTimeout(resetId);

  oldPos = randPos;
  do {
    randPos = Math.floor(Math.random() * Math.floor(5));
  } while (randPos === oldPos);

  qS('#target').body.position.set(
    targetPos[randPos][0],
    targetPos[randPos][1],
    targetPos[randPos][2],
  );

  velo += dVelo;
  qS('#target').body.velocity.set(0, velo, 0);
  qS('#target').setAttribute('rotation', '0 0 0');
  hit = false;

  let randX = Math.random() * 2 - 1;
  let randY = Math.random() * 2 - 1;
  let randZ = Math.random() * 2 - 1;
  qS('#target').body.angularVelocity.set(randX, randY, randZ);

  hit = false;
  resetId = setTimeout(resetTarget, 5000);
};

qS('#bullet').addEventListener('collide', e => {
  let target = qS('#target');
  if (e.detail.body.id === target.body.id && !hit) {
    score += 100;
    // qS('#points').value = `Points: ${points}`;
    qS('#points').setAttribute('text', 'value', `Score: ${score}`);
    echo(`HIT! ${score} `, '07c64a');
    hit = true;
    target.components.sound.playSound();
    clearTimeout(resetId);
    resetId = setTimeout(resetTarget, 5000);
  }
});

qSA('.spot').forEach(function(element) {
  element.addEventListener('collide', e => {
    let target = qS('#target');
    if (e.detail.body.id === target.body.id) {
      playing = false;
      echo(`DAMN IT! ${score} `);
      qS('#messageBox').setAttribute('position', '0 0.5 -3');
      qS('#message').setAttribute('value', 'Game over!\nYour score: ' + score);
    }
  });
});
