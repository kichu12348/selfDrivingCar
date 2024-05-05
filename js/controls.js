class Controls{
    constructor(controlType){
        this.forward = false;
        this.reverse = false;
        this.left = false;
        this.right = false;
        switch(controlType){
            case 'KEYS':
                this.#addKeyboardListeners();
                break;
            default:
                this.forward = true;
                break;
        }

    }

    #addKeyboardListeners(){
        document.addEventListener('keydown',e=>{
            switch(e.key){
                case 'w' || 'ArrowUp' || 'W':
                    this.forward = true;
                    break;
                case 's' || 'ArrowDown' || 'S':
                    this.reverse = true;
                    break;
                case 'a' || 'ArrowLeft' || 'A':
                    this.left = true;
                    break;
                case 'd' || 'ArrowRight' || 'D':
                    this.right = true;
                    break;
            }
        })

        document.addEventListener('keyup',e=>{
            switch(e.key){
                case 'w':
                    this.forward = false;
                    break;
                case 's':
                    this.reverse = false;
                    break;
                case 'a':
                    this.left = false;
                    break;
                case 'd':
                    this.right = false;
                    break;
            }
        })
    }
    
}