class RecoverScene extends Phaser.Scene{
    constructor(){
        super({key: 'RecoverScene'})
    }

    preload(){
        this.load.image('hospitalBg', 'assets/hospitalBg.png');
    }

    create(){
        const cost = Math.floor(playerStats.money*(playerStats.level*0.2))
        if(cost<=0){
            this.add.image(0,0, 'hospitalBg').setOrigin(0)
            this.add.text(w*0.025,h*0.125, 'You have no money to pay!', {fontSize: 28, color: 'black', lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }});
            this.add.text(w*0.025,h*0.3125, 'Your recover process cost you all your items', {fontSize: 25, color: 'black', lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }})
            playerStats.money=0;
            playerStats.hp=playerStats.maxHp;
            playerStats.items= playerStartingStats.player.items
            setTimeout(()=>{
                currentScene='Level2';
                this.scene.stop();
                this.scene.resume('Level2')
            },3000)
        }else{
            this.add.image(0,0, 'hospitalBg').setOrigin(0)
            this.add.text(w*0.025,h*0.125, 'You were found inconscient in the street and brought to the hospital', {fontSize: 30, color: 'black', lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }});
            this.add.text(w*0.025,h*0.3125, `Your recover costed you: \r\n ${cost}€`, {fontSize: 30, color: 'black', lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }})

            playerStats.money-=cost;
            playerStats.hp=playerStats.maxHp;
            setTimeout(()=>{
                currentScene='Level2'
                this.scene.stop();
                this.scene.resume('Level2')
            },3000)
        }
    }

    update(){

    }
}