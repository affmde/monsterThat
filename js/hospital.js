class Hospital extends Phaser.Scene{
    constructor(){
        super({key: 'Hospital'})
    }

    preload(){
        this.load.image('hospitalbg', 'assets/hospitalBg2.png')
    }

    create(){
        const cost= 10+playerStats.level*3;
        this.add.image(0,0,'hospitalbg').setOrigin(0);
        this.add.text(w*0.025, h*0.125, 'Do you want our recovering services?', {fontSize: 30, lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }});
        this.add.text(w*0.025, h*0.20, `It will cost you ${cost}€`, {fontSize :30, lineSpacing: 10, wordWrap: { width: 680, useAdvancedWrap: true }})

        const ansA= this.add.text(w*0.1,h*0.375, 'Yes', {fontSize: 30} ).setInteractive();
        const ansB= this.add.text(w*0.325,h*0.375, 'No', {fontSize: 30} ).setInteractive();

        ansA.on('pointerdown', ()=>{
            playerStats.money-=cost;
            playerStats.hp=playerStats.maxHp;
            currentScene='Level2';
            hospitalsVisited.push(currentHospital)
            setTimeout(()=>{
                this.scene.stop()
                this.scene.resume('Level2')
            },1000)
        })

        ansB.on('pointerdown', ()=>{
            currentScene='Level2';
            this.scene.resume('Level2')
            this.scene.stop();
        })
    }

    update(){

    }
}