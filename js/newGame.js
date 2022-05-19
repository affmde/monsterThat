let currentText;
class NewGameScene extends Phaser.Scene{
    constructor(){
        super({key: 'NewGameScene'})
    }

    preload(){
        this.load.image('bgRoom', 'assets/bedroom.png');
    }

    create(){
        const textDisplay={
            text1: true,
            text2: false,
        }
        this.textOn= false;
        this.i=0;
        
        
        
    }

    update(){
        this.bg=this.add.image(0,0,'bgRoom').setOrigin(0).setInteractive().setTint(0xFFFFFF)
        const textArray=['...', '...', 'Charles: Hi! Are you there?', 'Charles: I heard something weird.', 'You: Damn! You woke me up. I hope it is something important. Let me just turn the lights on.',
            'You: What is going on?', 'Charles: I heard Princess Elb was kidnapped two hours ago! Kind Arthur is offering a reward of 5000000€ for her rescue!', 
            'You: You sure? That could be a great opportunity to help my family.',
            'Charles: Yeah I know. That is why I called you! Do not waste this chance.',
            'You: Sure I will not.',
            'Charles: But be careful, I heard the world out there is full of monsters and for sure there will be other people trying to find her before you.',
            'You: Do not worry. I will be happy to destroy them all. But hey.. no more time to loose. Thank you and see you Charles!'
        ];
        const val= textArray.length;
        
        
        if(this.i<val){
            if(this.i<6){
                this.bg.setTint(0x000000)
            }
            this.bg.on('pointerup', ()=>{
                this.createText(this.i, textArray);
                this.i+=1
                
            })
            
        }else{
            this.bg.on('pointerup', ()=>{
                this.scene.stop();
                this.scene.start('Level2')
            })
        }
    }

    createText(number, texts){
        const text= new DialogBox(this, texts[number], null, null, null);
    }
}

