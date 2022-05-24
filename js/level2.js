let opponents1;
let opponents2;
let gyms;
let baus;
let guards;
let polices;
let hospitals;
let shops;
let princessPlaces;
let showStats=false;
let currentScene='Level2'
let playerPosition={}
let options={
    mobileGamepad:{
        arrows: false,
        joystic: true,
    }
}

class Level2 extends Phaser.Scene{
    constructor(){
        super({key: 'Level2'})
    }

    preload(){
        //Loading screen
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        let percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        loadingText.setOrigin(0.5, 0.5);
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });


        this.load.image('classicTileset', 'assets/ClassicRPG_Sheet.png');
        this.load.image('medievalTileset', 'assets/medieval_tilesheet.png');
        this.load.image('tilemap', 'assets/tilemap.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/world2.json');
        this.load.atlas('bandit', 'assets/players/bandit.png', 'assets/players/bandit_atlas.json');
        this.load.animation('bandit_anim', 'assets/players/bandit_anim.json');
        this.load.atlas('boy', 'assets/players/boy.png', 'assets/players/boy_atlas.json');
        this.load.animation('boy_anim', 'assets/players/boy_anim.json');
        this.load.image('ranger', 'assets/ranger.png');
        this.load.image('elf', 'assets/elf.png')<
        this.load.image('closedBau', 'assets/closedBau.png');
        this.load.image('openedBau', 'assets/openedBau.png');
        this.load.image('guard', 'assets/guard.png');
        this.load.image('stone', 'assets/items/stone.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.image('water', 'assets/items/water.png');
        this.load.image('meat', 'assets/items/meat.png');
        this.load.image('herbs', 'assets/items/herbs.png');
        this.load.image('wood', 'assets/items/wood.png');
        this.load.image('menu', 'assets/menuIcon.png');
        this.load.image('fullscreen', 'assets/fullscreen.png');
        if(device!=='desktop'){
            this.load.image('up', 'assets/gamepad/up.png');
            this.load.image('down', 'assets/gamepad/down.png');
            this.load.image('left', 'assets/gamepad/left.png');
            this.load.image('right', 'assets/gamepad/right.png');
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);
        }
        
    }

    create(){
        //Load Data
        const loadData= loadGame()!==undefined ? loadGame() : playerStartingStats;
        console.log(loadData)
        playerStats={
            level: loadData.player.level || 1,
            money: loadData.player.money || 100,
            hp: loadData.player.hp || 75,
            maxHp: loadData.player.maxHp || 75,
            items:{
                stone: loadData.player.items.stone || 0,
                meat: loadData.player.items.meat || 0,
                water: loadData.player.items.water || 0,
                wood: loadData.player.items.wood || 0,
                herbs: loadData.player.items.herbs || 0
            },
            xp: loadData.player.xp || 0,
            attackBase: loadData.player.attackBase || 2,
            recoverBase: loadData.player.recoverBase || 10
        }

        defeatedOpponents=loadData.defeatedOpponents || []
        oppenedBaus=loadData.oppenedBaus || [];
        defeatedGyms= loadData.defeatedGyms || [];
        hospitalsVisited=loadData.hospitalsVisited || [{
            x:6487,
            y:7800
        }]
        console.log(hospitalsVisited[hospitalsVisited.length-1])

        //Array of Animals on the grass

        this.wildAnimals=[
            {
                id: 'A0',
                name: 'Bugger',
                level: Math.floor(Math.random()*playerStats.level)<1 ? 1 : Math.floor(Math.random()*(playerStats.level+1)),
                hp: Math.floor(Math.random()*25),
                fig: 'mashroom'
            },
            {
                id: 'A1',
                name: 'Gold Racoon',
                level: Math.floor(Math.random()*playerStats.level)<1 ? 1 : Math.floor(Math.random()*(playerStats.level+2)),
                hp: Math.floor(Math.random()*30),
                fig: 'goldRacoon'
            }
        ]

        console.log('playerStats: ', playerStats)
        //Tilemap creation
        const map = this.make.tilemap({ key: 'tilemap', tileWidth:16, tileHeight: 16 })
        const tileset = map.addTilesetImage('ClassicRPG_Sheet', 'classicTileset');
        const tileset2= map.addTilesetImage('tilemap', 'tilemap')
        map.createLayer('background', tileset);
        const forest= map.createLayer('forest', tileset);
        const sea= map.createLayer('sea', tileset);
        const ground= map.createLayer('ground', tileset);
        this.grass= map.createLayer('grass', tileset);
        const buildings= map.createLayer('buildings', tileset2)

        //Player creation
        if(newGame===false){
            this.player=this.physics.add.sprite(loadData.x || 6487,loadData.y || 7980, 'boy');
        }else{
            this.player=this.physics.add.sprite(6487, 7800, 'boy');
        }
        
        console.log(this.player.body)
        //Tilemap collisions
        forest.setCollisionByExclusion([0, -1]);
        sea.setCollisionByExclusion([0, -1]);
        buildings.setCollisionByExclusion([0, -1, 283, 573, 574, 543, 544, 545]);
        this.grass.setCollisionByExclusion([0,-1])
        this.physics.add.collider(this.player, forest)
        this.physics.add.collider(this.player, sea)
        this.physics.add.collider(this.player, buildings);
        
        //Create opponents
        opponents1= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Opponent1').objects.forEach(trainer=>{
            const newTrainer = opponents1.create(trainer.x, trainer.y, 'ranger');
            newTrainer.properties= trainer.properties;
            this.physics.add.collider(newTrainer, this.player, (opponent, player)=>{
                if(this.checkDefeatedTrainers(trainer.id)){
                    return
                }else{
                    const dialog = new DialogBox(this, opponent.properties[3].value, 'Battle', 'Level2',null)
                    //this.saveGame()
                    currentOponnent.id=trainer.id
                    currentOponnent.name= trainer.name;
                    currentOponnent.hp=opponent.properties[0].value;
                    currentOponnent.moneyReturn=opponent.properties[2].value;
                    currentOponnent.level=opponent.properties[1].value;
                    currentOponnent.fig= 'ranger';
                    currentOponnent.type='Trainer';
                    currentScene='Battle';
                    this.checkDefeatedTrainers(trainer.id)
                    this.player.setVelocity(0)
                          
                }
                
            })
        })
        opponents2= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Opponent2').objects.forEach(trainer=>{
            const newTrainer = opponents1.create(trainer.x, trainer.y, 'elf');
            newTrainer.properties= trainer.properties;
            this.physics.add.collider(newTrainer, this.player, (opponent, player)=>{
                if(this.checkDefeatedTrainers(trainer.id)){
                    return
                }else{
                    const dialog = new DialogBox(this, opponent.properties[3].value, 'Battle', 'Level2',null)
                    currentOponnent=opponent.properties;
                    currentOponnent.id=trainer.id
                    currentOponnent.name= trainer.name;
                    currentOponnent.hp=opponent.properties[0].value;
                    currentOponnent.moneyReturn=opponent.properties[2].value;
                    currentOponnent.level=opponent.properties[1].value;
                    currentOponnent.fig= 'elf';
                    currentOponnent.type='Trainer';
                    currentScene='Battle';
                    this.checkDefeatedTrainers(trainer.id)
                    this.player.setVelocity(0)
                }
                
            })
        })


        //Create Baus
        baus= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('baus').objects.forEach(bau=>{
            let newBau
            if(this.checkBauOpened(bau.id)){
                newBau = opponents1.create(bau.x, bau.y, 'openedBau');
            }else{
                newBau = opponents1.create(bau.x, bau.y, 'closedBau');
            }
            newBau.id=bau.id
            this.physics.add.collider(newBau, this.player, (bau, player)=>{
                if(this.checkBauOpened(bau.id)){
                    return
                }else{
                    currentScene='Bau'
                    bau.setTexture('openedBau')
                    const prizes= handleItemsReward()
                    console.log(prizes)
                    const moneyReward= Math.floor(Math.random()*(100*playerStats.level))
                    playerStats.money+=moneyReward;
                    console.log(playerStats)
                    oppenedBaus.push(newBau.id)
                    const box= new RewardBox(this, 'stone', prizes.stone, 'meat', prizes.meat, 'water', prizes.water, 'wood', prizes.wood, 'herbs', prizes.herbs, 'coin', moneyReward )
                    console.log('new stats: ', playerStats)
                    console.log('openedBaus: ', oppenedBaus)
                }
                
            })
        })

        //create Gyms
        gyms= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('gyms').objects.forEach(gym=>{
            const newGym = gyms.create(gym.x, gym.y, 'elf').setAlpha(0.1).setOrigin(0,1)
            newGym.properties=gym.properties
            newGym.id=gym.id
            this.physics.add.collider(newGym, this.player, (gym, player)=>{
                if(this.checkDefeatedGyms(newGym.id)){
                    const dialog= new DialogBox(this, "I dont want to see you again. You proved to be too good!", null,null,null)
                }else{
                    this.saveGame()
                    currentOponnent=gym.properties;
                    currentOponnent.hp=gym.properties[2].value;
                    currentOponnent.moneyReturn=gym.properties[4].value;
                    currentOponnent.level=gym.properties[3].value;
                    currentOponnent.name=gym.properties[0].value
                    currentOponnent.id=gym.id
                    currentOponnent.fig= 'Leader1';
                    currentOponnent.type='GymLeader'
                    currentScene='Battle';
                    this.checkDefeatedGyms(gym.id)
                    const dialog = new DialogBox(this, "Hey boss it seems someone is daring to challenge you!", 'GymLeaderIntro', 'Level2',null)
                }
                
            })
        })

        //Create the guards

        guards= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Police').objects.forEach(police=>{
            const newGuard = guards.create(police.x, police.y, 'guard');
            newGuard.setOrigin(0,0.8)
            newGuard.gymNumber= police.properties[0].value
            this.physics.add.collider(newGuard, this.player, (opponent, player)=>{
                if(this.checkDefeatedGyms(newGuard.gymNumber)){
                    newGuard.destroy()
                }else{
                    if(textOn===false){
                        const rec= new DialogBox(this, 'You must defeat the city Gym Leader if you want to go ahead!', null, null)
                    }else{
                        return
                    }
                    
                }
                
            })
        })

        //Create the Hospitals
        hospitals= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('hospital').objects.forEach(hospital=>{
            const newHospital = hospitals.create(hospital.x, hospital.y, 'guard').setAlpha(0.1).setOrigin(0,1);
            this.physics.add.collider(newHospital, this.player, (hosp, player)=>{
                this.player.y=this.player.y+10;
                animation='down'
                currentScene="Hospital"
                currentHospital={
                    x: hospital.x,
                    y: hospital.y
                }
                currentHospital.id=hospital.id
                console.log(currentHospital)
                this.scene.pause();
                this.scene.launch('Hospital');
            })
        })

        //Create Shops
        shops= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('shops').objects.forEach(shop=>{
            const newShop= shops.create(shop.x,shop.y, 'guard').setAlpha(0.1).setOrigin(0.5,1)
            this.physics.add.collider(newShop, this.player, ()=>{
                this.player.y=this.player.y+10;
                animation='down'
                currentScene="Shop";
                const dialog= new DialogBox(this, 'Hmm.. a shop! Maybe i can buy something here.', 'Shop', 'Level2', null)
            })
        })

        //Create PrincessPlace
        princessPlaces= this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('princessPlace').objects.forEach(place=>{
            const newPlace= princessPlaces.create(place.x,place.y, 'guard').setAlpha(0.1).setOrigin(0.5,0.8)
            this.physics.add.collider(newPlace, this.player, ()=>{
                currentScene="PrincessRescue";
                const dialog= new DialogBox(this, "THis must be the place. Let's get in and rescue the princess.", 'PrincessRescue', 'Level2', null)
            })
        })

        //Add texts to gym, hospitals and shops
        map.getObjectLayer('texts').objects.forEach(text=>{
            this.add.text(text.x, text.y, text.text.text).setOrigin(0)
        })


        //cursors
        cursors = this.input.keyboard.createCursorKeys();

        //cameras
        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0,0, 8000, 8000);
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setZoom(1);

        //Save game
        keyObj = this.input.keyboard.addKey('S');  // Get key object
        isDown = keyObj.isDown;

        //Pause Menu
        this.menu= this.add.image(w*0.9, h*0.25, 'menu').setScrollFactor(0).setInteractive().setOrigin(0.5).setScale(1*0.5625)
        this.menu.on('pointerup', ()=>{
            console.log(playerPosition)
            this.scene.launch('PauseMenu')
            this.scene.pause();
        })

        //Controlls
        if(device!=='desktop'){
            if(options.mobileGamepad.arrows){
                this.controls={}
                this.controls.left=this.add.image(75, h-150, 'left').setScrollFactor(0).setAlpha(0.6).setInteractive();
                this.controls.up=this.add.image(75, h-150, 'up').setScrollFactor(0).setOrigin(0,1).setAlpha(0.6).setInteractive();
                this.controls.down=this.add.image(75, h-150, 'down').setScrollFactor(0).setOrigin(0,0).setAlpha(0.6).setInteractive();
                this.controls.right=this.add.image(75, h-150, 'right').setScrollFactor(0).setOrigin(-0.5,0.5).setAlpha(0.6).setInteractive();
            }else if(options.mobileGamepad.joystic){
                //Joystick
                this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                    x: 100,
                    y: h-100,
                    radius: 100,
                    base: this.add.circle(0, 0, 50, 0x888888).setAlpha(0.8),
                    thumb: this.add.circle(0, 0, 25, 0xcccccc).setAlpha(0.8),
                    dir: '4dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                    forceMin: 16,
                    enable: true
                })
                this.player.body.maxVelocity.set(130);
            }
            
        }

        //Fullscreen handling
        const fullscreenIcon= this.add.image(w*0.9, h*0.1, 'fullscreen').setScrollFactor(0).setInteractive();
        fullscreenIcon.on('pointerup', ()=>{
            if(this.scale.isFullscreen){
                const close= document.exitFullscreen()||document.cancelFullScreen()
            }else{
                const canvas= document.querySelector('canvas')
                canvas.requestFullscreen()
            }
        })

    }//end of create Method

    update(){
        if(currentScene==='Level2'){
            
            this.checkAnimation();
            this.checkControls();
    
            playerStats.level=this.playerLevel()
    

            if(keyObj.isDown){
                this.saveGame();  
            }

            this.grassWalk();

            playerPosition={
                x: this.player.x,
                y: this.player.y
            }

            //Check player position after death
            this.checkPlayerPositionAfterDeath()
        }
    }


    checkDefeatedTrainers(id){
        const trainer= defeatedOpponents.find(tnr=>tnr===id)
        if(trainer){
            return true
        } else{
            return false
        }
    }

    checkBauOpened(id){
        const bau= oppenedBaus.find(bau=>bau===id)
        if(bau){
            return true
        }else{
            return false
        }
    }

    checkDefeatedGyms(id){
        const gym= defeatedGyms.find(gym=>gym===id)
            if(gym){
                return true
            }else{
                return false
            }
    }

    saveGame(){
        const saveFile={
            player: playerStats,
            x: this.player.x,
            y: this.player.y,
            defeatedOpponents: defeatedOpponents,
            oppenedBaus: oppenedBaus,
            defeatedGyms: defeatedGyms,
            hospitalsVisited: hospitalsVisited,
            
        }
        localStorage.setItem('monsterThatSaveGame', JSON.stringify(saveFile));
        console.log('Game Saved')
    }

    playerLevel(){
        if(playerStats.xp<500){
            return 1
        }else if(playerStats.xp<1000){
            return 2
        }else if(playerStats.xp<2250){
            return 3
        }else if(playerStats.xp<4000){
            return 4
        }else if(playerStats.xp <6000){
            return 5
        }else if(playerStats.xp< 8500){
            return 6
        }else{
            return 7
        }
    }


    grassWalk(){
        let grassTile = this.grass.getTileAtWorldXY(this.player.x, this.player.y);
        if(!grassTile)return
        if(grassTile.index===31){
            if(currentScene==='Level2'){
                const rand= Math.floor(Math.random()*1000)
                if(rand<2 && currentScene==="Level2"){
                    const randOpponent= Math.floor(Math.random()*(this.wildAnimals.length))
                    console.log(randOpponent)
                    console.log(this.wildAnimals.length)
                    currentScene='Battle';
                    currentOponnent.id=this.wildAnimals[randOpponent].id;
                    currentOponnent.name= this.wildAnimals[randOpponent].name;
                    currentOponnent.hp=this.wildAnimals[randOpponent].hp;
                    currentOponnent.moneyReturn=0;
                    currentOponnent.level=this.wildAnimals[randOpponent].level;
                    currentOponnent.fig= this.wildAnimals[randOpponent].fig;
                    currentOponnent.type='Bug';
                    this.scene.pause();
                    this.scene.launch('Battle'); 
                }
            }
        }
    }

    checkAnimation(){
        if(animation==='left'){
            this.player.anims.play('boy_left', true)
        }else if(animation==='right'){
            this.player.anims.play('boy_right', true)
        }else if(animation==='up'){
            this.player.anims.play('boy_up', true)
        }else if(animation==='down'){
            this.player.anims.play('boy_down', true)
        }else{
            return
        }
    }

    //Controls
    checkControls(){
        if(device==="desktop"){
            if(cursors.up.isDown){
                this.player.setVelocityY(-110)

                animation='up';
            }else if(cursors.down.isDown){
                this.player.setVelocityY(110);
                animation='down';
            }else{
                this.player.setVelocityY(0)
                
            }
    
            if(cursors.left.isDown){
                this.player.setVelocityX(-110);
                animation='left';
                this.player.flipX=false;
            }else if(cursors.right.isDown){
                this.player.setVelocityX(110);
                this.player.flipX=false;
                animation='right';
            }else{
                this.player.setVelocityX(0)
                
            }
        }else{
            if(options.mobileGamepad.arrows){
                //Left Button
                this.controls.left.on('pointerdown', ()=>{
                    this.player.setVelocityX(-110);
                    animation='left';
                    this.player.flipX=false;
                    this.controls.left.setAlpha(0.3)
                })
                this.controls.left.on('pointerup', ()=>{
                    this.player.setVelocityX(0);
                    animation='idle';
                    this.controls.left.setAlpha(0.6)
                })
                this.controls.left.on('pointerout', ()=>{
                    this.player.setVelocityX(0);
                    animation='idle';
                    this.controls.left.setAlpha(0.6)
                })
                //Right Button
                this.controls.right.on('pointerdown', ()=>{
                    this.player.setVelocityX(110);
                    animation='right';
                    this.player.flipX=false;
                    this.controls.right.setAlpha(0.3)
                })
                this.controls.right.on('pointerup', ()=>{
                    this.player.setVelocityX(0);
                    animation='idle';
                    this.controls.right.setAlpha(0.6)
                })
                this.controls.right.on('pointerout', ()=>{
                    this.player.setVelocityX(0);
                    animation='idle';
                    this.controls.right.setAlpha(0.6)
                })
                //Up Button
                this.controls.up.on('pointerdown', ()=>{
                    this.player.setVelocityY(-110);
                    animation='down';
                    this.player.flipX=true;
                    this.controls.up.setAlpha(0.3)
                })
                this.controls.up.on('pointerup', ()=>{
                    this.player.setVelocityY(0);
                    animation='idle';
                    this.controls.up.setAlpha(0.6)
                })
                this.controls.up.on('pointerout', ()=>{
                    this.player.setVelocityY(0);
                    animation='idle';
                    this.controls.up.setAlpha(0.6)
                })
                //Down Button
                this.controls.down.on('pointerdown', ()=>{
                    this.player.setVelocityY(110);
                    animation='up';
                    this.player.flipX=true;
                    this.controls.down.setAlpha(0.3)
                })
                this.controls.down.on('pointerup', ()=>{
                    this.player.setVelocityY(0);
                    animation='idle';
                    this.controls.down.setAlpha(0.6)
                })
                this.controls.down.on('pointerout', ()=>{
                    this.player.setVelocityY(0);
                    animation='idle';
                    this.controls.down.setAlpha(0.6)
                })
            }else if(options.mobileGamepad.joystic){
                if(this.joyStick.pointer){
                    const angle= this.joyStick.angle;
                    const force= this.joyStick.force
                    //UP and DOWN moves
                    if(angle<-67.5 && angle>-112.5){//Move only Up
                        this.player.setVelocityY(-force);
                        animation='up';
                    }else if(angle>67.5 && angle < 112.5){//Move only down
                        this.player.setVelocityY(force)
                        animation='down';
                    }
    
                    //LEFT and RIGHT moves
                    else if(angle<-157.5  || angle>157.5){ //Move only left
                        this.player.setVelocityX(-force);
                        animation='left';
                        this.player.flipX=false;
                    }else if(angle <22.5 && angle >-22.5){ //Move only right
                        this.player.setVelocityX(force);
                        animation='right';
                        this.player.flipX=false;
                    }
                    //DIAGONAL moves
                    else if(angle<-22.5 && angle>-67.5){ //Move up and right
                        this.player.setVelocityX(force);
                        this.player.setVelocityY(-force);
                        animation='right';
                        this.player.flipX=false;
                    }else if(angle<-112.5 && angle>-157.5 ){ //Moves up and left
                        this.player.setVelocityX(-force);
                        this.player.setVelocityY(-force);
                        animation='left';
                        this.player.flipX=false;
                    }else if(angle>112.5 && angle<157.5){ //Moves down and left
                        this.player.setVelocityX(-force);
                        this.player.setVelocityY(force);
                        animation= 'left';
                        this.player.flipX=false;
                    }else if(angle>22.5 && angle<64.7){//Moves down and right
                        this.player.setVelocityX(force);
                        this.player.setVelocityY(force);
                        animation='right';
                        this.player.flipX=false;
                    }else{
                        this.player.setVelocityX(0);
                        this.player.setVelocityY(0);
                    }
    
                    
                }else{
                    this.player.setVelocity(0)
                }
            }
        } 
    }


    checkPlayerPositionAfterDeath(){
        if(victory===false){
            this.player.x=hospitalsVisited[hospitalsVisited.length-1].x;
            this.player.y= hospitalsVisited[hospitalsVisited.length-1].y+5;
            console.log(hospitalsVisited)
        }
        victory=undefined
    }
}

