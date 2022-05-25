class PrincessRescue extends Phaser.Scene{
    constructor(){
        super({key: 'PrincessRescue'})
    }

    preload(){
        this.load.image('prisionClosed', 'assets/prisionClosed.png');
        this.load.image('prisionOpened', 'assets/prisionOpened.png');
        this.load.image('kingAndPrincess', 'assets/kingAndPrincess.png');
    }

    create(){
        this.bg= this.add.image(0,0,'prisionClosed').setOrigin(0).setInteractive();
        

        this.i=0

        this.textArray=[
            {
                id:0,
                text: "The princess must be somewhere here.",
                bg: "prisionClosed"
            },
            {
                id: 1,
                text: "Maybe I should try to open that door.",
                bg: "prisionClosed"
            },
            {
                id: 2,
                text: "Hmm... I'm sure there must be a way to open it.",
                bg: "prisionClosed"
            },
            {
                id: 3,
                text: "Yes. I found the key.",
                bg: "prisionClosed"
            },
            {
                id: 4,
                text: "Yes it worked. Princess Elb, it is a pleasure to meet you. Nice to see you're well.",
                bg: "prisionOpened"
            },
            {
                id: 5,
                text: "I informed your father King Arthur that I was just about to rescue you. He must be on his way.",
                bg: 'prisionOpened'
            },
            {
                id: 6,
                text: "I will stay here with you until he comes.",
                bg: 'prisionOpened'
            },
            {
                id: 7,
                text: "King Arthur: Mrs Elb good to see you again. It is so great that you are alive and safe.",
                bg: 'kingAndPrincess'
            },
            {
                id:8,
                text: "Thank you so much little boy. You saved my daughter. As I promised, here are my rewards. 5000000€ and a place in my Castle if you want.",
                bg: 'kingAndPrincess'
            },
            {
                id: 9,
                text: "You: Thank you my King. This money will help my family solving some of their problems. But I like them too much to leave and move to the castle.",
                bg: 'kingAndPrincess'
            },
            {
                id: 10,
                text: "You: But the most important is that Princess Elb is safe and is going back home. My journey ends here my King. Always at your services.",
                bg: 'kingAndPrincess'
            }
        ];
        this.txt= this.createText(this.i, this.textArray)
        console.log(this.textArray.length)
        this.bg.on('pointerdown', ()=>{
            this.i++
            if(this.i<this.textArray.length){
                this.txt= this.createText(this.i, this.textArray)
                this.bg.setTexture(this.textArray[this.i].bg)
                console.log(this.i)
                console.log(this.textArray[this.i].text)
            }
        })
        
    }

    update(){
        if(this.i>=this.textArray.length){
            playerStats.money+=5000000;
            currentScene='Level2';
            princessSaved=true;
            this.bg.disableInteractive()
            this.scene.stop();
            this.scene.resume('Level2')
        }
    }

    createText(number, texts){
        const text= new DialogBox(this, texts[number].text, null, null, null);
    }
}