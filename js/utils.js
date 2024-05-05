function lerp(a,b,t){
    return a + (b-a)*t;
}

function getIntersection(A,B,C,D){
    
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(B.x-A.x)-(C.x-A.x)*(B.y-A.y);   
    const Bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    if(Bottom !== 0){
        const t = tTop/Bottom;
        const u = uTop/Bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x: A.x + t*(B.x-A.x),
                y: A.y + t*(B.y-A.y),
                offset:t
            }
        }
    }
    return null;
    
}