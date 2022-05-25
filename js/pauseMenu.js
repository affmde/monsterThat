class PauseMenu extends Phaser.Scene{
    constructor(){
        super({key: 'PauseMenu'})
    }

    preload(){
        this.load.image('stone', 'assets/items/stone.png');
        this.load.image('coin', 'assets/items/coin.png');
        this.load.image('water', 'assets/items/water.png');
        this.load.image('meat', 'assets/items/meat.png');
        this.load.image('herbs', 'assets/items/herbs.png');
        this.load.image('wood', 'assets/items/wood.png');
        this.load.image('badge1', 'assets/badges/badge1.png');
        this.load.image('badge2', 'assets/badges/badge2.png');
        this.load.image('badge3', 'assets/badges/badge3.png');
        this.load.image('badge4', 'assets/badges/badge4.png');
        this.load.image('badge5', 'assets/badges/badge5.png');
        this.load.image('badge6', 'assets/badges/badge6.png');
    }

    create(){
        const rectangle= this.add.rectangle(w*0.5,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0)
        const title= this.add.text(w*0.75, h*0.125, 'Menu', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        const resume= this.add.text(w*0.75, h*0.9375, 'Resume', {color: 'black', fontSize: 25}).setOrigin(0.5).setScrollFactor(0).setInteractive()
        resume.on('pointerdown', ()=>{
            console.log('close detected')
            this.scene.stop();
            this.scene.resume('Level2')
        })
        const stats= this.add.text(w*0.75, h*0.3875, 'Stats', {color: 'black', fontSize: 25}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        const items= this.add.text(w*0.75, h*0.48, 'Items', {color: 'black', fontSize: 25}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        const save= this.add.text(w*0.75, h*0.58, 'Save', {color: 'black', fontSize: 25}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        const badges= this.add.text(w*0.75, h*0.68, 'Badges', {color: 'black', fontSize: 25}).setOrigin(0.5).setScrollFactor(0).setInteractive();
        
        this.showMenu={
            stats:false,
            items:false,
            save: false,
            badges: false
        }
        stats.on('pointerup', ()=>{
            this.showMenu={
                stats:true,
                items:false,
                save: false,
                badges: false
            }
        })
        items.on('pointerup', ()=>{
            this.showMenu={
                stats:false,
                items:true,
                save: false,
                badges: false
            }
        })
        save.on('pointerup', ()=>{
            this.showMenu={
                stats:false,
                items:false,
                save: true,
                badges: false
            }
            this.saveGame()
        })
        badges.on('pointerup', ()=>{
            this.showMenu={
                stats:false,
                items:false,
                save: false,
                badges: true,
            }
            this.saveGame()
        })
    }

    update(){
        if(this.showMenu.stats){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const statsText= this.add.text(w*0.25, h*0.125, 'Stats', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const hpText= this.add.text(w*0.20, h*0.415, 'Hp: ', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            this.playerMaxLifeRect= this.add.rectangle(w*0.25, h*0.415, 150, 8, 0xFF0000 ).setOrigin(0,0.5);
            this.playerCurrentLifeRect= this.add.rectangle(w*0.25, h*0.415, 150*playerStats.hp/playerStats.maxHp,8, 0x7CFC00).setOrigin(0,0.5);
            const maxHpText= this.add.text(w*0.25, h*0.5175, `Max Hp: ${playerStats.maxHp}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const moneyText= this.add.text(w*0.25, h*0.61, `Money: ${playerStats.money}€`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const xpText= this.add.text(w*0.25, h*0.7125, `XP: ${Math.floor(playerStats.xp)}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const lvlText= this.add.text(w*0.25, h*0.81, `Lvl: ${playerStats.level}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }else if(this.showMenu.items){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const itemsText= this.add.text(w*0.25, h*0.125, 'Items', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const wood= this.add.image(w*0.25,h*0.35,'wood').setOrigin(0.5).setScrollFactor(0.5)
            const woodValue= this.add.text(w*0.375, h*0.35, `x${playerStats.items.wood}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const water= this.add.image(w*0.25,h*0.47,'water').setOrigin(0.5).setScrollFactor(0.5)
            const waterValue= this.add.text(w*0.375, h*0.47, `x${playerStats.items.water}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const meat= this.add.image(w*0.25,h*0.59,'meat').setOrigin(0.5).setScrollFactor(0.5)
            const meatValue= this.add.text(w*0.375, h*0.59, `x${playerStats.items.meat}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const stone= this.add.image(w*0.25,h*0.71,'stone').setOrigin(0.5).setScrollFactor(0.5)
            const stoneValue= this.add.text(w*0.375, h*0.71, `x${playerStats.items.stone}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const herbs= this.add.image(w*0.25,h*0.83,'herbs').setOrigin(0.5).setScrollFactor(0.5)
            const herbsValue= this.add.text(w*0.375, h*0.83, `x${playerStats.items.herbs}`, {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }else if(this.showMenu.save){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const saveText= this.add.text(w*0.25, h*0.125, 'Save', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const savingText= this.add.text(w*0.25, h*0.5, 'Save completed', {fontSize: 25, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
        }else if(this.showMenu.badges){
            const rectangle= this.add.rectangle(0,0,w*0.5,h, 0xffffff).setScrollFactor(0).setOrigin(0);
            const badgesText= this.add.text(rectangle.width/2, h*0.125, 'Badges', {fontSize: 30, color: 'black'}).setOrigin(0.5).setScrollFactor(0);
            const badge1= this.add.image(w*0.15, h*0.40, 'badge1').setScrollFactor(0);
            const badge2= this.add.image(w*0.35, h*0.40, 'badge2').setScrollFactor(0);
            const badge3= this.add.image(w*0.55, h*0.40, 'badge3').setScrollFactor(0);
            const badge4= this.add.image(w*0.15, h*0.70, 'badge4').setScrollFactor(0);
            const badge5= this.add.image(w*0.35, h*0.70, 'badge5').setScrollFactor(0);
            const badge6= this.add.image(w*0.55, h*0.70, 'badge6').setScrollFactor(0);

            badges.one? badge1.setTint(0xFFFFFF).setAlpha(1) :badge1.setTint(0x000000).setAlpha(0.8);
            badges.two? badge2.setTint(0xFFFFFF).setAlpha(1) :badge2.setTint(0x000000).setAlpha(0.8);
            badges.three ? badge3.setTint(0xFFFFFF).setAlpha(1) :badge3.setTint(0x000000).setAlpha(0.8);
            badges.four? badge4.setTint(0xFFFFFF).setAlpha(1) :badge4.setTint(0x000000).setAlpha(0.8);
            badges.five? badge5.setTint(0xFFFFFF).setAlpha(1) :badge5.setTint(0x000000).setAlpha(0.8);
            badges.six? badge6.setTint(0xFFFFFF).setAlpha(1) :badge6.setTint(0x000000).setAlpha(0.8);
        }
    }

    saveGame(){
        const saveFile={
            player: playerStats,
            x: playerPosition.x,
            y: playerPosition.y,
            defeatedOpponents: defeatedOpponents,
            oppenedBaus: oppenedBaus,
            defeatedGyms: defeatedGyms,
            hospitalsVisited: hospitalsVisited,
            badges: badges
        }
        localStorage.setItem('monsterThatSaveGame', JSON.stringify(saveFile));
        console.log('Game Saved')
    }
    
}