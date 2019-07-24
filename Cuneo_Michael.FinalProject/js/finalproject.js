window.onload = function() {

  var player = document.getElementById("player");
  var screen = document.getElementById("screenContainer");

  var keyPressed = [];
  var shotxmax = screen.offsetLeft + 800; // end of game screen x for player bullets
  var shotymax = screen.offsetTop + 519; // end of game screen y for player bullets
  var shotxmin = screen.offsetLeft; // end of game screen x for enemies and bullets
  var shotymin = screen.offsetTop - 81;

  // variables regarding player and shots
  var playerPNG = ["images/playershipdef.png", "images/playershipshotgun.png", "images/playershipmachinegun.png", "images/playershiplaser.png", "images/playershippulsegun.png", "images/playershiprailgun.png", "images/playershiptrackinggun.png"];
  var playerFirePNG = ["images/playershipdeffire.png", "images/playershipshotgunfire.png", "images/playershipmachinegunfire.png", "images/playershiplaserfire.png", "images/playershippulsegunfire.png", "images/playershiprailgunfire.png", "images/playershiptrackinggunfire.png"];
  var playerFireAudio = ["audio/laserdef.wav", "audio/lasershotgun.wav", "audio/lasermachinegun.wav", "audio/laserlaser.wav", "audio/laserpulse.wav", "audio/laserrailgun.wav", "audio/lasertrackinggun.wav"];
  var playerShotOffsetX = [36, 36, 27, -76, 36, -80, 36];
  var playerShotOffsetY = [22, 22, 22, 22, 18, 22, 22];
  var playerShotSpeed = [120, 250, 40, 30, 210, 500, 350];
  var playerShotProjNum = [1, 8, 1, 1, 1, 1, 4];
  var playerShotDamage = [40, 35, 20, 8, 12, 300, 65];
  var playerShotPoints = [20, 25, 10, 35, 5, 90, 35];
  var x = 20;
  var y = 300;
  var playerheight = player.clientHeight;
  var playerwidth = player.clientWidth;
  var state = 0;
  healthActual = document.getElementById("healthActual");
  healthNum = document.getElementById("healthNumber");
  shieldActual = document.getElementById("shieldActual");
  shieldNum = document.getElementById("shieldNumber");
  var deadTrigger = 0;

  // array regarding explosion animation
  var explodeColors = ["red", "yellow", "green", "orange", "blue", "purple", "pink", "white"];

  // variables regarding background movement
  var screenOverlay = document.getElementById("screenContainerOverlay");
  var screenOverlay2 = document.getElementById("screenContainerOverlay2");
  var screenNebula = document.getElementById("screenContainerOverlayNebula");
  var screenNebula2 = document.getElementById("screenContainerOverlayNebula2");
  $("#screenContainerOverlayNebula").hide();
  $("#screenContainerOverlayNebula2").hide();

  var scoreDiv = document.getElementById("score");
  var score = 0;
  var scoretrigger = 0;
  var highscore = document.getElementById("highscorenum");
  var highscorebar = document.getElementById("highScoreBar");
  var scorecon = document.getElementById("scoreContainer");

  // variables regardings top menu
  var ammoCounter = [];
  var statusSelect = document.getElementsByClassName("statusselect");
  var statusSelectCounter = 0;
  var ammo = document.getElementsByClassName("ammo")

  // variables regarding powerups
  var ammoAdd = [60, 400, 300, 90, 30, 30];
  var powerupPNG = ["images/shotgunpowerup.png", "images/machinegunpowerup.png", "images/laserpowerup.png", "images/pulsegunpowerup.png", "images/railgunpowerup.png", "images/trackinggunpowerup.png"];

  //variables regarding background
  var backgroundBackCounter = 0;
  var backgroundFrontCounter = 0;
  var backgroundFrontCounter2 = 0;
  var backgroundNebulaCounter = 0;
  var backgroundNebulaCounter2 = 0;
  var backgroundswitch = 0;
  var backgroundMusic = new Audio("audio/LiquidVortex.mp3");

  var levelSpawn = [900, 825, 750, 675, 600, 525, 450, 400, 350, 300];
  var levelSpeed = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
  var levelHealth = [50, 60, 70, 80, 90, 95, 100, 110, 115, 120];
  var levelScore = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3.0, 3.25];
  var levelCurrent = -1;
  var level = document.getElementById("lvlnum");

  var dummyRemover = document.getElementById("dummyremover");

  window.addEventListener("keydown", function(evt) {
    keyPressed[evt.keyCode || evt.which] = true;
  });

  window.addEventListener("keyup", function(evt) {
    keyPressed[evt.keyCode || evt.which] = false;
  });

  //***************************************************************************************************************** Audio Loop *****************************************************************************************************************************************
  function autoPlay() {
    backgroundMusic.play();
    backgroundMusic.volume = 0.3;
    setTimeout(autoPlay, 432000);
  }

  //***************************************************************************************************************** Level Handler ************************************************************************************************************************************
  function levelHandler() {
    if (deadTrigger == 0) {
      levelCurrent++;
      level.innerHTML = levelCurrent + 1;
      if (levelCurrent < 9) {
        setTimeout(levelHandler, 45000);
      }
    }
  }

  //***************************************************************************************************************** Player and player movement information *************************************************************************************************************
  // player move function
  function playerMove() {
    if (keyPressed[37] && x > 0) {
      x -= 8;
    }
    if (keyPressed[38] && y > 0) {
      y -= 8;
    }
    if (keyPressed[39] && x < 750) {
      x += 8;
    }
    if (keyPressed[40] && y < 570) {
      y += 8;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    autoPlay();
    setTimeout(playerMove, 10);
  }
  //*************************************************************************************************************** Background Movement (score is also here for time alive) **************************************************************************************
  // this section was easier to do by repeating the same function slightly modified
  function backgroundAnimationBack() {
    backgroundBackCounter--;
    if (backgroundBackCounter == -1600) {
      backgroundBackCounter = 0;
    }
    screen.style.backgroundPosition = backgroundBackCounter + "px 0px";
    setTimeout(backgroundAnimationBack, 300);
  }

  function backgroundAnimationFront() {
    backgroundFrontCounter -= 20;
    if (backgroundFrontCounter == -1600) {
      backgroundFrontCounter = 0;
    }
    screenOverlay.style.backgroundPosition = backgroundFrontCounter + "px 0px";
    setTimeout(backgroundAnimationFront, 10);
    if (deadTrigger == 0) {
      score += levelScore[levelCurrent];
      scoreDiv.innerHTML = parseInt(score);
    }
  }

  function backgroundAnimationNebula() {
    backgroundNebulaCounter -= 5;
    if (backgroundNebulaCounter == -1600) {
      backgroundNebulaCounter = 0;
    }
    screenNebula.style.backgroundPosition = backgroundNebulaCounter + "px 0px";
    setTimeout(backgroundAnimationNebula, 10);
  }

  function backgroundAnimationFront2() {
    backgroundFrontCounter2 -= 60;
    if (backgroundFrontCounter2 == -1600) {
      backgroundFrontCounter2 = 0;
    }
    screenOverlay2.style.backgroundPosition = backgroundFrontCounter2 + "px 0px";
    setTimeout(backgroundAnimationFront2, 10);
  }

  function backgroundAnimationNebula2() {
    backgroundNebulaCounter2 -= 15;
    if (backgroundNebulaCounter2 == -1600) {
      backgroundNebulaCounter2 = 0;
    }
    screenNebula2.style.backgroundPosition = backgroundNebulaCounter2 + "px 0px";
    setTimeout(backgroundAnimationNebula2, 10);
  }

  function backgroundController() {
    var randomTimer1 = Math.floor(Math.random() * 60000) + 20000;
    var randomTimer2 = Math.floor(Math.random() * 80000) + 20000;
    if (backgroundswitch == 0) {
      $("#screenContainerOverlayNebula").fadeIn(randomTimer1);
      $("#screenContainerOverlayNebula2").fadeIn(randomTimer1);
      $("#screenContainerOverlay").fadeOut(randomTimer1);
      $("#screenContainerOverlay2").fadeOut(randomTimer1);
      backgroundswitch++;
    }
    if (backgroundswitch == 1) {
      $("#screenContainerOverlayNebula").fadeOut(randomTimer1);
      $("#screenContainerOverlayNebula2").fadeOut(randomTimer1);
      $("#screenContainerOverlay").fadeIn(randomTimer1);
      $("#screenContainerOverlay2").fadeIn(randomTimer1);
      backgroundswitch--;
    }
    setTimeout(backgroundController, randomTimer2);
  }

  //***************************************************************************************************************** Bullet creation ***********************************************************************************************************************************
  // creates bullet and returns its reference
  function createBullet() {
    var newBul = document.createElement("div");
    if (state == 0) {
      newBul.setAttribute("class", "bulletDef");
    } else if (state == 1) {
      newBul.setAttribute("class", "bulletShotgun");
    } else if (state == 2) {
      newBul.setAttribute("class", "bulletMachinegun");
    } else if (state == 3) {
      newBul.setAttribute("class", "bulletLaser");
    } else if (state == 4) {
      newBul.setAttribute("class", "bulletPulsegun");
    } else if (state == 5) {
      newBul.setAttribute("class", "bulletRailgun");
    } else if (state == 6) {
      newBul.setAttribute("class", "bulletTrackinggun");
    }
    screen.appendChild(newBul);
    return newBul;
  }

  //***************************************************************************************************************** Bullet trajectory information *********************************************************************************************************************
  // creates the "angle" at which a bullet will travel
  function createTrajectory() {
    var trajectory;
    if (state == 1) {
      trajectory = Math.floor((Math.random() * -4) + (Math.random() * 8)) / 2;
    } else if (state == 2) {
      trajectory = Math.floor((Math.random() * -2) + (Math.random() * 4)) / 2;
    } else if (state == 6) {
      trajectory = Math.floor((Math.random() * -6) + (Math.random() * 4)) / 3;
    } else {
      trajectory = 0;
    }
    return trajectory;
  }

  //*************************************************************************************************************** Bullet movement and collision information ***********************************************************************************************************
  // controls bullet movement and collision for all bullet types
  function bulletTracker(bullet, shotx, shoty, trajectory, bulletSpeed, selectedTarget) {
    if (bulletSpeed == 0) {
      shotx += 15;
    } else if (bulletSpeed == 1 || bulletSpeed == 2) {
      shotx += 25;
    } else if (bulletSpeed == 3) {
      shotx += 120;
    } else if (bulletSpeed == 4) {
      shotx += 12;
      bullet.style.height = bullet.clientHeight + 2 + "px";
      shoty -= 1;
    } else if (bulletSpeed == 5) {
      shotx += 120;
    } else if (bulletSpeed == 6) { // behavior for tracking gun - movement determination is most complex here - if targeted element is removed, a new index is chosen to pull from the actively updating enemy node list
      var targets = document.getElementsByClassName("enemy");
      var target = targets[selectedTarget];
      if (typeof target === "undefined") {
        shotx += 3;
        selectedTarget = findTarget();
      } else {
        if (shotx < target.offsetLeft) {
          shotx += 3;
        }
        if (shotx > target.offsetLeft) {
          shotx -= 3;
        }
        if (shoty < target.offsetTop) {
          shoty += 3;
        }
        if (shoty > target.offsetTop) {
          shoty -= 3;
        }
      }
    }
    shoty += trajectory;
    bullet.style.left = shotx + "px";
    bullet.style.top = shoty + "px";

    var test = document.getElementById("test");
    var trigger = 0;

    buly = bullet.offsetTop;
    bulx = bullet.offsetLeft;
    bulheight = bullet.clientHeight;
    bulwidth = bullet.clientWidth;

    //general function for hit detection
    function enemyHitDetect() {
      var enemies = document.getElementsByClassName("enemy");
      for (var i = 0; i < enemies.length; i++) {
        var enemyy = enemies[i].offsetTop;
        var enemyx = enemies[i].offsetLeft;
        var enemyheight = enemies[i].clientHeight;
        var enemywidth = enemies[i].clientWidth;
        if (buly + bulheight >= enemyy && buly <= enemyy + enemyheight && bulx >= enemyx - bulwidth && bulx <= enemyx + enemywidth) {
          var laserHit = new Audio("audio/laserhit.wav");
          laserHit.play();
          score = score + playerShotPoints[state];
          if (parseInt(enemies[i].getAttribute("health")) > 0) {
            enemies[i].setAttribute("src", "images/scoutdamage.png");
          }
          enemies[i].setAttribute("health", enemies[i].getAttribute("health") - playerShotDamage[state]);
          var enemy = enemies[i]; // needed for damage flash - will throw error when setTimeout triggers below because enemies[i] is different after 30ms
          if (bulletSpeed != 3 && bulletSpeed != 4 && bulletSpeed != 5) {
            if (parseInt(enemies[i].getAttribute("health")) > 0) {
              setTimeout(function() {
                enemy.setAttribute("src", "images/scout.png");
              }, 30);
            }
            screen.removeChild(bullet);
            trigger++; // trigger is needed otherwise bullet triggers error on last conditional below - can't remove element that has already been removed

          } else {
            if (parseInt(enemies[i].getAttribute("health")) > 0) {
              enemy.setAttribute("src", "images/scout.png");
            }
          }
        }
      }
    };

    enemyHitDetect();

    // normal end of screen detection for bullets - top, bottom, and right sides of screen
    if (shotx <= shotxmax && trigger == 0) {
      setTimeout(function() {
        bulletTracker(bullet, shotx, shoty, trajectory, bulletSpeed, selectedTarget);;
      }, 10);
    } else {
      if (trigger == 0) {
        screen.removeChild(bullet);
      }
    }
  }

  //***************************************************************************************************************** Bullet controller function ************************************************************************************************************************
  // when the player presses spacebar and no powerups are on
  function playerShootController() {
    if (keyPressed[32] && deadTrigger == 0) {
      laserSound = new Audio(playerFireAudio[state]);
      laserSound.play();
      player.src = playerFirePNG[state];
      var shotx = [];  // these variables set as arrays to account for multi-bullet firing modes (ie shotgun and tracking gun)
      var shoty = [];
      var bullet = [];
      var bulletSpeed = state; // this variable created instead of using global "state" variable to keep previously fired projectile speed the same when switching firing modes
      var trajectory = [];
      var selectedTarget = 0;
      if (state != 0) {
        ammo[state].innerHTML = Number(ammo[state].innerHTML) - 1;
      }

      for (var i = 0; i < playerShotProjNum[state]; i++) {
        if (state == 6) {
          selectedTarget = findTarget();
        }
        shotx[i] = player.offsetLeft + playerShotOffsetX[state]; // starting point of bullet at x-axis
        shoty[i] = player.offsetTop + playerShotOffsetY[state]; // starting point of bullet at y-axis
        bullet[i] = createBullet();
        bullet[i].style.top = shoty[i] + "px";
        trajectory[i] = createTrajectory();
        bulletTracker(bullet[i], shotx[i], shoty[i], trajectory[i], bulletSpeed, selectedTarget);
        setTimeout(
          function() {
            player.src = playerPNG[state];
          }, 60);
      }
      setTimeout(playerShootController, playerShotSpeed[state]);
    } else {
      setTimeout(playerShootController, 30);
    }
  }

  //***************************************************************************************************************** Tracking Gun Target Finder ****************************************************************************************************************
  function findTarget() {
    var targets = document.getElementsByClassName("enemy");
    var index = Math.floor(Math.random() * targets.length);
    return index;
  }

  //***************************************************************************************************************** Enemy Creation ************************************************************************************************************************************
  // creates new enemy object
  function Enemy(spawnenemyx, spawnenemyy, health, damage, speed, trajectory, points) {
    this.spawnenemyx = spawnenemyx;
    this.spawnenemyy = spawnenemyy;
    this.health = health;
    this.damage = damage;
    this.speed = speed;
    this.trajectory = trajectory;
    this.points = points;
  }

  // creates an enemy and returns its reference
  function createEnemy() {
    var newEnemy = document.createElement("img");
    newEnemy.setAttribute("src", "images/scout.png");
    newEnemy.setAttribute("class", "enemy");
    screen.appendChild(newEnemy);
    return newEnemy;
  }
  // adds attributes to element from created Enemy object
  function enemyAddAttributes(enemyRef, enemyObj) {
    enemyRef.setAttribute("health", enemyObj.health);
    enemyRef.setAttribute("damage", enemyObj.damage);
    enemyRef.setAttribute("speed", enemyObj.speed);
    enemyRef.setAttribute("trajectory", enemyObj.trajectory);
    enemyRef.setAttribute("points", enemyObj.points);
  }

  //***************************************************************************************************************** Enemy trajectory information *********************************************************************************************************************
  function createEnemyTrajectory() {
    var trajectory;
    trajectory = Math.floor(Math.random() * 3 - 1);
    return trajectory;
  }

  //***************************************************************************************************************** Enemy spawn information **************************************************************************************************************************
  // creates the location where the enemy will spawn from on the side of screen
  function createEnemySpawnPoint() {
    var xy = [];
    xy[0] = shotxmax + 50; // enemy x value
    xy[1] = Math.floor(Math.random() * shotymax); // enemy y value
    return xy;
  }

  //***************************************************************************************************************** Enemy movement and death information *************************************************************************************************************
  function enemyTracker(enemyRef) {
    var enemyx = enemyRef.offsetLeft - (enemyRef.getAttribute("speed") * levelSpeed[levelCurrent]);
    var enemyy = enemyRef.offsetTop - (enemyRef.getAttribute("trajectory"));
    enemyRef.style.left = enemyx + "px";
    enemyRef.style.top = enemyy + "px";

    if (enemyRef.getAttribute("health") > 0) {
      if (enemyRef.offsetLeft >= shotxmin - 50 && enemyRef.offsetTop >= shotymin - 30 && enemyRef.offsetTop <= shotymax) {
        setTimeout(function() {
          enemyTracker(enemyRef);
        }, 15);
      } else {
        screen.removeChild(enemyRef);
      }
    } else if (enemyRef.getAttribute("health") <= 0) {
      explode(enemyRef);
      setTimeout(function() {
        screen.removeChild(enemyRef);
      }, 15);
      score += parseInt(enemyRef.getAttribute("points") * levelScore[levelCurrent]);
    }
  }

  //***************************************************************************************************************** Explosion Animation ******************************************************************************************************************************
  // this simply contains the animation effect for destroying an enemy ship
  function explode(enemyRef) {
    var explosound = new Audio("audio/shipexplosion.wav");
    explosound.volume = 0.4;
    explosound.play();
    var newExplosion = document.createElement("div");
    newExplosion.setAttribute("class", "explosion");
    newExplosion.style.backgroundColor = explodeColors[Math.floor(Math.random() * explodeColors.length)];
    screen.appendChild(newExplosion);
    $(newExplosion).fadeOut(400);
    setTimeout(function() {
      screen.removeChild(newExplosion);
    }, 400);
    enemyRef.setAttribute("src", "images/shipexplosion.png");
    enemyRef.style.width = "50px";
    enemyRef.style.height = "50px";
    enemyRef.style.top = enemyRef.offsetTop - 10 + "px";
  }

  //***************************************************************************************************************** Enemy collision function (with player) ***********************************************************************************************************
  function enemyCollision(enemyRef) {
    if (y >= enemyRef.offsetTop - enemyRef.clientHeight && y <= enemyRef.offsetTop + enemyRef.clientHeight && x >= enemyRef.offsetLeft - playerwidth && x <= enemyRef.offsetLeft + enemyRef.clientWidth) {
      if (enemyRef.offsetTop != 0 && enemyRef.offsetLeft != 0) { // keeps player from dying from "nothing" in upper left corner of screen when enemy elements are removed
        var explosion = new Audio("audio/shipexplosion.wav");
        explosion.play();
        screen.removeChild(player);
        screen.removeChild(enemyRef);
        healthActual.style.width = "0px";
        shieldActual.style.width = "0px";
        healthNum.innerHTML = "0";
        shieldNum.innerHTML = "0";
        deadTrigger++; // used as a conditional elsewhere to halt function recursion when player dies
        $("#gameover").show();
        backgroundMusic.muted = true;
        setHighScore();
      }
    }
    if (deadTrigger == 0) {
      setTimeout(function() {
        enemyCollision(enemyRef);
      }, 30);
    }
  }

  //***************************************************************************************************************** Enemy controller function ************************************************************************************************************************
  function enemyCreateController() {
    var enemyRef = createEnemy();
    var spawnposxy = createEnemySpawnPoint();
    var enemyObj = new Enemy(spawnposxy[0], spawnposxy[1], levelHealth[levelCurrent], 0, 3, createEnemyTrajectory(), 100); // in a more complete version, this object constructor would handle creating many different enemies with many different stats and abilities, so it is more versatile than needed for current implementation
    enemyAddAttributes(enemyRef, enemyObj);
    enemyRef.style.left = enemyObj.spawnenemyx + "px";
    enemyRef.style.top = enemyObj.spawnenemyy + "px";
    enemyTracker(enemyRef);
    enemyCollision(enemyRef);
    setTimeout(enemyCreateController, levelSpawn[levelCurrent]);
  }

  //***************************************************************************************************************** Powerup Controllers **************************************************************************************************************************
  function powerupController() {
    var index = Math.floor(Math.random() * 6);
    var chosenPower = createPowerup(index);
    chosenPower.style.top = Math.floor(Math.random() * shotymax);
    chosenPower.style.left = "830px";
    chosenPower.style.display = "block";
    var powerupy = chosenPower.offsetTop;
    var powerupx = chosenPower.offsetLeft;
    var powerupheight = 30;
    var powerupwidth = 30;
    powerupTracker(chosenPower, powerupy, powerupx, powerupheight, powerupwidth, index);

    if (deadTrigger == 0) {
      setTimeout(powerupController, 30000);
    }
  }

  // controls the powerup movement and player collision information
  function powerupTracker(chosenPower, powerupy, powerupx, powerupheight, powerupwidth, index) {
    var trigger = 0;
    if (chosenPower.offsetLeft > 400) {
      powerupx -= 1;
    }
    chosenPower.style.left = powerupx + "px";
    if (y >= powerupy - powerupheight && y <= powerupy + powerupheight && x >= powerupx - playerwidth && x <= powerupx + powerupwidth) {
      player.src = playerPNG[index + 1];
      var powerupSound = new Audio("audio/powerupget.wav");
      powerupSound.play();
      state = index + 1;
      statusMenuPowerupTracker();
      ammo[state].innerHTML = Number(ammo[state].innerHTML) + ammoAdd[index];
      chosenPower.style.display = "none";
      chosenPower.style.left = "830px";
      chosenPower.style.display = "block";
      trigger++;
    }
    if (trigger != 1) {
      setTimeout(function() {
        powerupTracker(chosenPower, powerupy, powerupx, powerupheight, powerupwidth, index);
      }, 10);
    }
  }

  // creates a new powerup element
  function createPowerup(index) {
    powerup = document.createElement("img");
    powerup.setAttribute("src", powerupPNG[index]);
    powerup.setAttribute("class", "powerUp");
    screen.appendChild(powerup);
    return powerup;
  }

  //***************************************************************************************************************** Status Menu Handler *************************************************************************************************************
  // allows the player to toggle through firing modes they only have ammo for
  window.onkeydown = function statusMenuSelect() {
    if (keyPressed[17]) {
      var statusSound = new Audio("audio/statusswitch.wav");
      statusSound.volume = 0.2;
      statusSound.play();
      statusSelect[statusSelectCounter].setAttribute("id", "");
      statusSelectCounter++;
      if (statusSelectCounter > 6) {
        statusSelectCounter = 0;
      }
      while (ammo[statusSelectCounter].innerHTML == 0) {
        statusSelectCounter++;
        if (statusSelectCounter > 6) {
          statusSelectCounter = 0;
        }
        if (ammo[statusSelectCounter].innerHTML != 0) {
          statusSelect[statusSelectCounter].setAttribute("id", "selected");
          break;
        }
      }
      statusSelect[statusSelectCounter].setAttribute("id", "selected");
      state = statusSelectCounter;
      player.src = playerPNG[state];
    }
  }

  // when the player runs out of ammo for a spcific type, this function auto selects the next available firing mode
  function ammoStatusSkip() {
    while (Number(ammo[statusSelectCounter].innerHTML) == 0) {
      statusSelect[statusSelectCounter].setAttribute("id", "");
      statusSelectCounter++;
      if (statusSelectCounter > 6) {
        statusSelectCounter = 0;
      }
      if (ammo[statusSelectCounter].innerHTML != 0) {
        statusSelect[statusSelectCounter].setAttribute("id", "selected");
        state = statusSelectCounter;
        player.src = playerPNG[state];
        break;
      }
    }
    setTimeout(ammoStatusSkip, 30);
  }

  // used when a powerup is picked up to change the firing mode selected
  function statusMenuPowerupTracker() {
    document.getElementById("selected").setAttribute("id", "");
    statusSelectCounter = state;
    statusSelect[statusSelectCounter].setAttribute("id", "selected");
  }

  //***************************************************************************************************************** Program Credits******************************************************************************************************************
  // simple show/hide for credits button
  var creditbuttonswitch = 0;
  var creditbutton = document.getElementById("creditbutton");
  creditbutton.onclick = function() {
    if (creditbuttonswitch == 0) {
      $("#credit").show();
      creditbuttonswitch++;
    } else if (creditbuttonswitch == 1) {
      $("#credit").hide();
      creditbuttonswitch--;
    }
  }

  //***************************************************************************************************************** High Score Handler ************************************************************************************************************
  // gets high score from local storage, and if it is defined, writes it to the page
  function getHighScore() {
    var parseValue = JSON.parse(window.localStorage.getItem("highscore"));
    if (parseValue != undefined) {
      highscore.innerHTML = parseInt(parseValue);
    }
    return parseValue;
  }

  // writes new high score to local storage and if the new high score is higher than the last, it will change from white to yellow
  function setHighScore() {
    if (score > prevHigh) {
      var setvalue = JSON.stringify(score);
      window.localStorage.setItem("highscore", setvalue);
      highscore.innerHTML = parseInt(score);
      highscorebar.style.color = "yellow";
    }
  }
  // if you surpass the previous high score in the current play, the score will change from white to yellow to let the player know
  function activeHighScore() {
    if (score > prevHigh) {
      scorecon.style.color = "yellow";
      scoretrigger++;
    }
    if (scoretrigger == 0) {
      setTimeout(activeHighScore, 30);
    }
  }

  //***************************************************************************************************************** Program Execution ***************************************************************************************************************
  var startbutton = document.getElementById("startbutton");
  var instructions = document.getElementById("instructions");
  var gameover = document.getElementById("gameover");
  var prevHigh = getHighScore();
  startbutton.onclick = function() { // controls start button
    startbutton.style.display = "none";
    instructions.style.display = "block";
    instructions.onclick = function() { // controls information screen
      instructions.style.display = "none";
      activeHighScore()
      backgroundController();
      levelHandler();
      playerMove();
      playerShootController();
      setTimeout(function() {
        powerupController();
      }, 30000);
      ammoStatusSkip();
      backgroundAnimationBack();
      backgroundAnimationFront();
      backgroundAnimationFront2();
      backgroundAnimationNebula()
      backgroundAnimationNebula2()
      enemyCreateController();
    };
  };
  gameover.onclick = function() { // allows the page to be reloaded on the game over screen without using browser refresh - easiest way to reset the game
    document.location.reload(true);
  };
};