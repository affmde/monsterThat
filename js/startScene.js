let newGame=false;
let device;

class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
    }

    preload(){
        this.load.image('homeBg', 'assets/homebackground.png');
        this.load.image('woodStick', 'assets/woodStick.png');
        this.load.image('woodStick2', 'assets/woodStick2.png');
    }

    create(){
        this.add.image(0,0,'homeBg').setOrigin(0)
        const savedGame= localStorage.getItem('monsterThatSaveGame')
        const title= this.add.text(w/2, h*0.10, 'The Adventurer', {
			fontFamily: 'Quicksand',
			fontSize: '40px',
			color: 'black',
			fontStyle: 'normal',
			strokeThickness: 3,
			shadow: { blur: 5, stroke: true, fill: false },
			padding: { left: null }
		}).setOrigin(0.5);
        const subTitle= this.add.text(w/2, h*0.22, 'Save the princess', {
			fontFamily: 'Quicksand',
			fontSize: '30px',
			color: 'black',
			fontStyle: 'normal',
			strokeThickness: 1,
			shadow: { blur: 2, stroke: true, fill: false },
			padding: { left: null }
		}).setOrigin(0.5)
        const woodStick= this.add.image(w/2, h*0.4, 'woodStick').setOrigin(0.5)
        savedGame && this.add.text(w/2, h*0.4, 'Continue Game', {
        fontFamily: 'Quicksand',
        fontSize: '25px',
        color: '#fff',
        fontStyle: 'normal',
        strokeThickness: 1,
        shadow: { blur: 1, stroke: true, fill: true, color: '#000000' },
        padding: { left: null }}).setOrigin(0.5).setInteractive().on('pointerdown', ()=>{
            newGame=false;
            const gameDiv= document.getElementById('gameDiv');
            gameDiv.addEventListener('click', ()=>{
                gameDiv.requestFullscreen()
            })
            this.scene.stop();
            this.scene.start('Level2')
        });
        const woodStick2= this.add.image(w/2, h*0.55, 'woodStick2')
        const newGameText= this.add.text(w/2, h*0.55, 'New game', {
            fontFamily: 'Quicksand',
            fontSize: '25px',
            color: '#fff',
            fontStyle: 'normal',
            strokeThickness: 1,
            shadow: { blur: 1, stroke: true, fill: true, color: '#000000' },
            padding: { left: null }
        }).setOrigin(0.5).setInteractive();
        newGameText.on('pointerdown', ()=>{
            localStorage.removeItem('monsterThatSaveGame')
            newGame=true;
            const gameDiv= document.getElementById('gameDiv');
            gameDiv.addEventListener('click', ()=>{
                gameDiv.requestFullscreen()
            })
            this.scene.stop();
            this.scene.start('NewGameScene')
        })
        device=this.deviceType()
    }

    update(){
        
    }

    deviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };
    
}
