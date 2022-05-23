const menu={
    intro: false,
    menu: true,
    attacks: false,
    item: false,
    resume: false,
    final: false,
}
let texts={};

let randExp;
let moneyReturn;
let victory;
let turn = 'player'
let player;
let opponent;
class Battle extends Phaser.Scene{
    constructor(){
        super({key: 'Battle'})
    }

    preload(){
        this.load.image(`${currentOponnent.fig}`, `assets/${currentOponnent.fig}.png`);
        this.load.image('player', 'assets/bandit.png');
        this.load.image('bg', 'assets/battleBg.png')
        this.load.image('gymBg', 'assets/gym/gymLeaderBg.png');
        this.load.image('bg2', 'assets/battlebg2.png');
        this.load.image('swords', 'assets/swords.png');
        this.load.image('heartRecover', 'assets/heartRecover.png');
        this.load.image('quit', 'assets/quit.png');
        this.load.image('circle', 'assets/circle.png');
    }

    create(){
        //Variables
        console.log(currentOponnent)
        
        //Background Image
        if(currentOponnent.type==='Trainer'){
            const bgImage= this.add.image(0,0,'bg').setOrigin(0);
        }else if(currentOponnent.type==="GymLeader"){
            this.add.image(0,0,'gymBg').setOrigin(0)
        }else if(currentOponnent.type==='Bug'){
            this.add.image(0,0, 'bg2').setOrigin(0)
        }
        
        //Opponent
        opponent= this.add.image(w*0.75,h*0.38 , `${currentOponnent.fig}`).setScale(4).setOrigin(0.5).setInteractive();
        texts.opponentName = this.add.text(w*0.75, h*0.15, currentOponnent.name, {fontSize: 28, color: currentOponnent.type==='Bug' ? 'black' : 'white'}).setOrigin(0.5)
        texts.opponentLevel = this.add.text(w*0.69, h*0.22, `Lvl: ${currentOponnent.level}`, {fontSize: 20, color: currentOponnent.type==='Bug' ? 'black' : 'white'}).setOrigin(0.5);
        this.actualHp=currentOponnent.hp;
        
        //Player
        player= this.add.image(w*0.13, h*0.83, 'player').setScale(4).setOrigin(0.5);
        texts.playerName= this.add.text(w*0.13,h*0.63, 'Player 1', {fontSize: 28}). setOrigin(0.5);
        texts.playerLevel = this.add.text(h*0.13, h*0.7, `Lvl: ${playerStats.level}`, {fontSize: 20}).setOrigin(0.5)
        texts.playerHp= this.add.text(h*0.35, h*0.7, `Hp: ${playerStats.hp}`, {fontSize: 20}).setOrigin(0.5)
        this.playerEnergy=0;
        //Attacks
        this.swords= this.add.image(w*0.33, h*0.83, 'swords').setInteractive().setAlpha(0);
        this.heartRecover= this.add.image(w*0.53, h*0.83, 'heartRecover').setInteractive();
        //Quit
        this.quitBtn= this.add.image(w*0.90, h*0.83, 'quit').setInteractive().on('pointerdown', ()=>{
            currentScene='Level2'
            this.scene.stop();
            this.scene.resume('Level2');

        })
        
        //Camera
        this.cameras.main.fadeIn(1000);
  
        
        opponent.on('pointerdown', ()=>{
            const attack1Damage= playerStats.attackBase+playerStats.level+Math.floor(Math.random()*playerStats.level)
                this.actualHp-=attack1Damage;
                this.playerEnergy+=attack1Damage;
                opponent.setScale(3.9)
                opponent.setAlpha(0.85)
                let pointerX= this.input.activePointer.x;
                let pointerY= this.input.activePointer.y;
                console.log('pointer: ', pointerX, pointerY)
                this.circle= this.add.image(pointerX, pointerY, 'circle').setOrigin(0.5)
        })

        opponent.on('pointerup', ()=>{
            opponent.setScale(4)
            opponent.setAlpha(1)
            this.circle && this.circle.destroy()
        })

        this.heartRecover.on('pointerdown', ()=>{
            const attack2Recover=playerStats.recoverBase+Math.floor(Math.random()*playerStats.level);
            if(playerStats.hp+attack2Recover>=playerStats.maxHp){
                playerStats.hp=playerStats.maxHp
                this.heartRecover.disableInteractive();
                this.heartRecover.setAlpha(0.3)
                this.activeHeart= setTimeout(()=>{
                    this.heartRecover.setInteractive();
                    this.heartRecover.setAlpha(1);
                },5000)
            }else{
                playerStats.hp+=attack2Recover;
                this.heartRecover.disableInteractive();
                this.heartRecover.setAlpha(0.3)
                this.activeHeart= setTimeout(()=>{
                    this.heartRecover.setInteractive();
                    this.heartRecover.setAlpha(1);
                },5000)
            }
        })

        this.swords.on('pointerdown', ()=>{
                this.actualHp-=playerStats.attackBase*(10+playerStats.level);
                this.playerEnergy=0;
                this.swords.disableInteractive();
                this.swords.setAlpha(0);
        })

        //Opponent attack
        const opponentDamage= this.handleOpponentDamage();
        this.opponentAttack = setInterval(()=>{
            if(playerStats.hp-opponentDamage<=0){
                //If player will die with attack
                playerStats.hp=0
                victory=false
                clearInterval(this.opponentAttack)
                opponent.disableInteractive();
                this.heartRecover.disableInteractive();
                this.heartRecover.setAlpha(0.3)
                this.activeHeart && clearTimeout(this.activeHeart)
                this.scene.stop();
                this.scene.start('BattleReward')
            }else{
                //If attack doesnt kill the player
                playerStats.hp-=opponentDamage;
            }
        }, 250)
        


        
    }

    update(time, delta){
        //this.menuHandling(time, delta);
        
        //Oponent live bar
        this.maxLifeRect= this.add.rectangle(w*0.7, h*0.22, 150, 8, 0xFF0000 ).setOrigin(0, 0.5);
        this.currentLifeRect= this.add.rectangle(w*0.7, h*0.22, 150*this.actualHp/currentOponnent.hp,8, 0x7CFC00).setOrigin(0,0.5);
        //Player live bar
        this.playerMaxLifeRect= this.add.rectangle(w*0.20, h*0.7, 150, 8, 0xFF0000 ).setOrigin(0,0.5);
        this.playerCurrentLifeRect= this.add.rectangle(w*0.20, h*0.7, 150*playerStats.hp/playerStats.maxHp,8, 0x7CFC00).setOrigin(0,0.5);
        //Allow mega sword attack
        if(this.playerEnergy>100){
            this.swords.setInteractive();
            this.swords.setAlpha(1)
        }

        if(this.actualHp<=0){
            victory=true;
                this.actualHp=0;
                opponent.disableInteractive();
                opponent.setAlpha(0.7)
                clearInterval(this.opponentAttack)
                this.heartRecover.disableInteractive();
                this.heartRecover.setAlpha(1);
                this.activeHeart && clearTimeout(this.activeHeart)
                this.scene.stop();
                this.scene.start('BattleReward')
        }
    }

    
        
    
    menuHandling(time, delta){
        //Menu
       /* if(menu){
            const playerRect = this.add.rectangle(w*0.25, h*0.625, w*0.375, h*0.3, 0xFFFFFF).setOrigin(0).setInteractive();
            if(menu.intro){
                
            }else if(menu.menu){
                const attackText = this.add.text(playerRect.x+w*0.025, h*0.65, 'Attacks', {fontSize: 25, color: 'black'}).setInteractive();
                attackText.on('pointerdown',()=>{
                    menu.menu=false;
                    menu.attacks=true;
                })
                const itemText = this.add.text(playerRect.x+w*0.025, h*0.825, 'Item', {fontSize: 25, color: 'black'}).setInteractive();
                const quitText = this.add.text(playerRect.x+w*0.25, h*0.7175, 'Quit', {fontSize: 25, color: 'black'}).setInteractive();
                quitText.on('pointerdown', ()=>{
                    currentScene='Level2'
                    this.scene.stop();
                    this.scene.resume('Level2')
                })
            }else if(menu.attacks){
                if(turn==='player'){
                    //Player attacking turn
                    const attack1Damage= playerStats.attackBase+playerStats.level+Math.floor(Math.random()*playerStats.level)
                    const attack1= this.add.text(playerRect.x+w*0.03125, h*0.65, 'Tackle', {fontSize: 25, color: 'black'}).setInteractive();
                    attack1.on('pointerdown', ()=>{
                        if(this.actualHp-attack1Damage<=0){
                            victory=true;
                            menu.attacks=false;
                            this.actualHp=0;
                            menu.resume=true;
                        }else{
                            this.actualHp-=attack1Damage
                        }
                        turn='next'
                        this.tweens.add({
                            targets:player,
                            x: opponent.x-w*0.125,
                            y: opponent.y+h*0.125,
                            ease: 'Linear',
                            duration:250 ,
                            repeat: 0,
                            yoyo: true,
                        })
                    })
                    const attack2 = this.add.text(playerRect.x+w*0.03125, h*0.825, 'Recover', {fontSize: 25, color: 'black'}).setInteractive();
                    const attack2Recover=playerStats.recoverBase+playerStats.level+Math.floor(Math.random()*playerStats.level)
                    attack2.on('pointerdown', ()=>{
                        if(playerStats.hp+attack2Recover>=playerStats.maxHp){
                            victory=false
                            playerStats.hp=playerStats.maxHp
                        }else{
                            playerStats.hp+=attack2Recover;
                        }
                        turn='next'
                    })
                    const quitText = this.add.text(playerRect.x+w*0.25, h*0.7175, 'Back', {fontSize: 25, color: 'black'}).setInteractive();
                    quitText.on('pointerdown', ()=>{
                        menu.attacks=false;
                        menu.menu=true
                    })
                }else if(turn==='opponent'){
                    //Opponent attacking turn
                    const attack1= this.add.text(playerRect.x+w*0.03125, h*0.65, 'Tackle', {fontSize: 20*0.5625, color: 'black'})
                    const attack2 = this.add.text(playerRect.x+w*0.03125, h*0.725, 'Recover', {fontSize: 20*0.5625, color: 'black'})
                    const quitText = this.add.text(playerRect.x+w*0.25, h*0.65, 'Back', {fontSize: 20*0.5625, color: 'black'})
                    const opponentDamage= this.handleOpponentDamage()
                    this.tweens.add({
                        targets:opponent,
                        x: player.x+w*0.125,
                        y: player.y-h*0.125,
                        ease: 'Linear',
                        duration:250 ,
                        repeat: 0,
                        yoyo: true,
                    })
                    
                    if(playerStats.hp-opponentDamage<=0){
                        //If player will die with attack
                        playerStats.hp=0
                        turn='player'
                        menu.attacks=false;
                        menu.final=true;
                        victory=false

                    }else{
                        //If attack doesnt kill the player
                        playerStats.hp-=opponentDamage;
                        turn='player'
                        menu.attacks=false;
                        menu.menu=true

                    }
                    
                }else{
                    playerRect.on('pointerdown', ()=>turn='opponent')
                }
                
            }else if(menu.resume){
                this.add.text(playerRect.x+w*0.03125, h*0.65, 'You won!', {fontSize: 25, color: 'black'});
                this.add.text(playerRect.x+w*0.03125, h*0.75, `You got ${moneyReturn}€`, {fontSize: 25, color: 'black'});
                this.add.text(playerRect.x+w*0.03125, h*0.85, `and ${randExp} xp`, {fontSize: 25, color: 'black'});
                playerRect.on('pointerdown', ()=>{
                    menu.resume=false;
                    menu.final=true
                })
            }else if(menu.final){
                playerRect.on('pointerdown', ()=>{
                    if(victory){
                        if(currentOponnent.type==='Bug'){
                            handleItemsReward()
                        }else{
                            handleBattleReward(randExp, moneyReturn)
                        }
                        
                        if(currentOponnent.type==="Trainer"){
                            defeatedOpponents.push(currentOponnent.id);
                        }else if(currentOponnent.type==="GymLeader"){
                            defeatedGyms.push(currentOponnent.id)
                        }
                        menu.final=false;
                        menu.menu=true;
                        currentScene='Level2'
                        this.scene.stop();
                        this.scene.resume('Level2')
                        console.log('playerStats: ', playerStats)
                    }else{
                        handleBattleReward(randExp*0.2, 0-moneyReturn)
                        //playerStats.money-=moneyReturn;
                        //playerStats.xp+=randExp*0.2;
                        menu.final=false;
                        menu.menu=true;
                        currentScene='Hospital'
                        this.scene.stop();
                        //Add recover scene
                        this.scene.launch('RecoverScene')
                        console.log('playerStats: ', playerStats)
                    }
                    
                })
            }
        }*/      
    }

    handleOpponentDamage(){
        let damage;
        if(currentOponnent.type==='GymLeader'){
            damage=Math.floor(Math.random()*currentOponnent.level)+(Math.floor(Math.random()*10))
        }else if(currentOponnent.type==='Trainer'){
            damage=Math.floor(Math.random()*(currentOponnent.level+5))
        }else if(currentOponnent.type==='Bug'){
            damage=Math.floor(Math.random()*(currentOponnent.level))+0.5
        }
        console.log(damage)
        return damage
    }
}