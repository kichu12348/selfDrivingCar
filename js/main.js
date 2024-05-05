const canvas = document.getElementById('canvas');
const networkCanvas = document.getElementById('networkCanvas');



const ctx = canvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');


const road = new Road(canvas.width/2, canvas.width*0.9,3);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0];

if(localStorage.getItem('bestBrain')){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(localStorage.getItem('bestBrain'));

        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }


}

function save(){
    localStorage.setItem('bestBrain',JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem('bestBrain');
}


const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2.5),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2.5),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
];



function generateCars(n){
    const cars=[];
    for(let i=0;i<n;i++){
        cars.push(new Car(
            road.getLaneCenter(Math.floor(Math.random()*road.laneCount)),
            100,
            30,
            50,
            'AI',
        ));
    }
    return cars;

}



function animate(time){
    traffic.forEach(e=>{
        e.update(road.borders,[]);
    })
    cars.forEach(e=>{
        e.update(road.borders,traffic);
    })
    
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
  
    canvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0,-bestCar.y+canvas.height*.7);

    road.draw(ctx);

    ctx.globalAlpha=0.2;
    cars.forEach(e=>{
        e.draw(ctx,"blue");
    })
ctx.globalAlpha=1;
    traffic.forEach(e=>{
        e.draw(ctx,"red");
    })

    
    bestCar.draw(ctx,"black",true);

    ctx.restore();
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);

    requestAnimationFrame(animate);
}

animate();