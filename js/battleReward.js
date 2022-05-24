class BattleReward extends Phaser.Scene{
    constructor(){
        super({key: 'BattleReward'})
    }

    preload(){
        this.load.image(`${currentOponnent.fig}`, `assets/${currentOponnent.fig}.png`);
        this.load.image('bg', 'assets/battleBg.png')
        this.load.image('gymBg', 'assets/gym/gymLeaderBg.png');
        this.load.image('bg2', 'assets/battlebg2.png');
        if(currentOponnent.type==='Bug'){
            this.load.image('stone', 'assets/items/stone.png');
            this.load.image('coin', 'assets/items/coin.png');
            this.load.image('water', 'assets/items/water.png');
            this.load.image('meat', 'assets/items/meat.png');
            this.load.image('herbs', 'assets/items/herbs.png');
            this.load.image('wood', 'assets/items/wood.png');
        }
    }

    create(){
        //Background Image
        if(currentOponnent.type==='Trainer'){
            const bgImage= this.add.image(0,0,'bg').setOrigin(0);
        }else if(currentOponnent.type==="GymLeader"){
            this.add.image(0,0,'gymBg').setOrigin(0)
        }else if(currentOponnent.type==='Bug'){
            this.add.image(0,0, 'bg2').setOrigin(0)
        }

        opponent= this.add.image(w*0.3,h*0.5 , `${currentOponnent.fig}`).setScale(4).setOrigin(0.5);
        this.talkArray=["Ok you were good, I didn't stand a change. Here are your rewards.", 
                        "Ahh damn it! Congrats. Here are your rewards.",
                        "I want a revenge. You can't be better than me. I will give you the following anyway.",
                        "Ohh no. Never expected this result. Here are your rewards.",
                        "Ohoh, you were good. Maybe you stand a chance to find the Princess. Take your rewards.",
                        "Well.. I have to learn with the better ones. Here are your rewards."
                    ]
        
        this.rect= this.add.rectangle(w*0.5, h*0.1, w*0.4, h*0.8, 0xFFFFFF).setOrigin(0.0).setAlpha(0)
        this.rewardsText= this.add.text(w*0.75, h*0.2, "Your Rewards:", {fontSize: 30, color: 'black'}).setOrigin(0.5).setAlpha(0);

        this.moneyReturn= currentOponnent.moneyReturn;
        this.randExp= currentOponnent.type==='GymLeader' ? Math.floor(Math.random()*100)+100 : Math.floor(Math.random()*10)+50;
        if(victory){
            if(currentOponnent.type==='Bug'){
                this.itemReward=handleItemsReward()
                console.log(this.itemReward)
                //Item keys
                this.stoneImage= this.add.image(w*0.65,h*0.35, 'stone').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
                this.meatImage= this.add.image(w*0.65,h*0.43, 'meat').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
                this.waterImage= this.add.image(w*0.65,h*0.51, 'water').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
                this.woodImage= this.add.image(w*0.65,h*0.59, 'wood').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
                this.herbsImage= this.add.image(w*0.65,h*0.67, 'herbs').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);
                this.moneyImage= this.add.image(w*0.65,h*0.75, 'coin').setScrollFactor(0).setScale(0.5*0.5625).setOrigin(0.5);

                //Item Values
                this.stoneValue= this.add.text(w*0.70,h*0.35, `x${this.itemReward.stone}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
                this.meatValue= this.add.text(w*0.70,h*0.43, `x${this.itemReward.meat}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
                this.waterValue= this.add.text(w*0.70,h*0.51, `x${this.itemReward.water}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
                this.woodValue= this.add.text(w*0.70, h*0.59, `x${this.itemReward.wood}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
                this.herbsValue= this.add.text(w*0.70, h*0.67, `x${this.itemReward.herbs}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);
                this.moneyValue= this.add.text(w*0.70, h*0.75, `x${this.itemReward.money}`, {fontSize: 25, color: 'black'}).setScrollFactor(0).setOrigin(0.5);

                this.continueBTN= this.add.text(w*0.75, h*0.85, 'Continue', {fontSize: 25, color: 'black'}).setInteractive().setAlpha(0).setOrigin(0.5)
            }else{
                const rand= Math.floor(Math.random()*(this.talkArray.length-1))
                const dialog= new DialogBox(this, this.talkArray[rand], null, null, null);
                this.battleReward= handleBattleReward(this.randExp, this.moneyReturn)
                console.log(this.battleReward)
                this.rewardsText2= this.add.text(w*0.55,h*0.4, `Money: ${this.moneyReturn}€`, {fontSize: 25, color: 'black'}).setOrigin(0).setAlpha(0);
                this.rewardsText3= this.add.text(w*0.55,h*0.5, `XP: ${this.randExp}`,{fontSize: 25, color: 'black'}).setOrigin(0).setAlpha(0);
                this.continueBTN= this.add.text(w*0.75, h*0.65, 'Continue', {fontSize: 25, color: 'black'}).setInteractive().setAlpha(0).setOrigin(0.5)
            }
            
            if(currentOponnent.type==="Trainer"){
                defeatedOpponents.push(currentOponnent.id);
            }else if(currentOponnent.type==="GymLeader"){
                defeatedGyms.push(currentOponnent.id)
            }
            
            currentScene='Level2'
            //this.scene.stop();
            //this.scene.resume('Level2')
        }else{
            handleBattleReward(this.randExp*0.2, 0-this.moneyReturn)
            currentScene='Hospital'
            this.scene.stop();
            //Add recover scene
            this.scene.launch('RecoverScene')
        }
    }

    update(){
        if(textOn===false){
            this.rect.setAlpha(0.5);
            this.rewardsText.setAlpha(1);
            if(currentOponnent.type!=='Bug'){
                if(victory){
                    this.rewardsText2.setAlpha(1);
                    this.rewardsText3.setAlpha(1);
                    this.continueBTN.setAlpha(1).on('pointerdown', ()=>{
                        this.scene.stop();
                        this.scene.resume('Level2');
                    })
                }
                
            }else{
                this.continueBTN.setAlpha(1).on('pointerdown', ()=>{
                    this.scene.stop();
                    this.scene.resume('Level2');
                })
            }
            
            
        }
    }

}