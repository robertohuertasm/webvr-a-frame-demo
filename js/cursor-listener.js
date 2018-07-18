AFRAME.registerComponent('cursor-listener', {
  init: function() {
    this.el.addEventListener('click', function(evt) {
      echo(`AIMED at ${new Date().toISOString()}`);
      if (shootingAllowed && playing) {
        var camPos = AFRAME.scenes[0].camera.getWorldPosition();
        qS('#bullet').body.position.set(camPos.x, camPos.y, camPos.z);
        var worldDir = AFRAME.scenes[0].camera.getWorldDirection();
        worldDir.multiplyScalar(10);
        qS('#bullet').body.velocity.set(worldDir.x, worldDir.y, worldDir.z);

        let randX = Math.floor(Math.random() * Math.floor(20) - 10);
        let randY = Math.floor(Math.random() * Math.floor(20) - 10);
        let randZ = Math.floor(Math.random() * Math.floor(20) - 10);
        qS('#bullet').body.angularVelocity.set(randX, randY, randZ);

        qS('#dummy').setAttribute('position', '0 -5 0');
        shootingAllowed = false;
        cooldownTimer = setTimeout(function() {
          shootingAllowed = true;
          qS('#dummy').setAttribute('position', '1 -0.5 -0.2');
        }, 500);
      } else if (evt.target.id === 'messageBox') {
        shootingAllowed = true;
        playing = true;
        qS('#messageBox').setAttribute('position', '0 -5 0');
        playing = true;
        echo(`START! ${score} `, 'bc9712');
        velo += dVelo;
        qS('#target').body.velocity.set(0, velo, 0);
      }
    });
  },
});
