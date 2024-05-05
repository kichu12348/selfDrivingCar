class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 4;
        this.rayLength = 100;
        this.raySpread= Math.PI/2;
        this.rays = [];
        this.readings = [];
    }

    #castRays(){
        this.rays=[]
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread/2
                , -this.raySpread/2
                , i / (this.rayCount===1?0.5:this.rayCount-1)
            )

            const start = {
                x: this.car.x,
                y: this.car.y
            }

            const end = {
                x: start.x - Math.sin(this.car.angle + rayAngle)*this.rayLength,
                y: start.y - Math.cos(this.car.angle+ rayAngle) * this.rayLength
            }

            this.rays.push([start,end])
        }
    }

    update(roadBorders){
        this.#castRays();
        this.readings = [];
        for(let i = 0; i<this.rays.length; i++){
            this.readings.push(
                this.#getReading(this.rays[i], roadBorders)
            )
        }
    }

    #getReading(ray, roadBorders){
        let touches = [];
        for(let i = 0; i<roadBorders.length; i++){
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length === 0){
            return null;
        }else{
            const offset = touches.map(e=>e.offset);
            const minOffset = Math.min(...offset);
            return touches.find(e=>e.offset === minOffset);
        }
    }

    draw(ctx){
        for(let i = 0; i<this.rayCount; i++){
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            )
            ctx.lineTo(
                end.x,
                end.y
            )
            ctx.stroke();
        }
    }
}