let currentText;
class NewGameScene extends Phaser.Scene{
    constructor(){
        super({key: 'NewGameScene'})
    }

    preload(){

    }

    create(){
        const textDisplay={
            text1: true,
            text2: false,
        }
        this.textOn= false;
        const recBg = this.add.rectangle(0,0,w,h, 0x000000).setOrigin(0).setInteractive();
        const textArray=['...', '...', 'Hi! Are you there?']
        this.i=0;
        /*if(this.i<=textArray.length){
            recBg.on('pointerdown', ()=>{
                this.createText(this.i, textArray)
            })
        }*/
        
    }

    update(){

    }

    createText(number, texts){
        
        const text= new DialogBox(this, texts[number], null, null, null);
        this.i++

    }
}

