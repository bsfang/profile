var correct = function(z,T1GHz,T20GHz,Z0){
    if(Z0==undefined){
        Z0 = 50;
    }

    // normalize
    let L = T20GHz;
    let r = T1GHz/T20GHz;
    let zn = (z-146.7385)/ 63.9181;
    let Ln = (L-2.75)/1.4361;
    let rn = (r-0.2)/0.0632;
    let Z0n = (Z0-50)/1.8708;

    // Cal
    let line1 = 0.0503*Ln + 0.023*rn + 0.0919*zn - 0.0094*Z0n + 0.0019*Ln*Ln ;
    let line2 = 0.0159*Ln*rn + 0.0657*Ln*zn - 0.0055*Ln*Z0n + 0.0329*rn*zn - 0.0024*rn*Z0n - 0.0059*zn*zn - 0.007*zn*Z0n;
    let line3 = 0.0007*Ln*Ln*Ln + 0.0038*Ln*Ln*rn + 0.0095*Ln*Ln*zn - 0.0009*Ln*Ln*Z0n + 0.0013*Ln*rn*rn + 0.0262*Ln*rn*zn - 0.0022*Ln*rn*Z0n;
    let line4 = -0.0031*Ln*zn*zn - 0.0033*Ln*zn*Z0n + 0.0003*Ln*Z0n*Z0n + 0.0015*rn*rn*zn - 0.0001*rn*rn*Z0n - 0.0006*rn*zn*zn - 0.0015*rn*zn*Z0n;
    let line5 = 0.0001*rn*Z0n*Z0n + 0.0143*zn*zn*zn - 0.0045*zn*zn*Z0n + 0.0008*zn*Z0n*Z0n - 0.0003*Z0n*Z0n*Z0n + 0.0006*Ln*Ln*Ln*Ln + 0.0002*Ln*Ln*Ln*rn;
    let line6 = 0.0007*Ln*Ln*Ln*zn - 0.0002*Ln*Ln*Ln*Z0n + 0.0004*Ln*Ln*rn*rn + 0.0033*Ln*Ln*rn*zn - 0.0002*Ln*Ln*rn*Z0n + 0.0041*Ln*Ln*zn*zn - 0.0007*Ln*Ln*zn*Z0n;
    let line7 = 0.0001*Ln*Ln*Z0n*Z0n + 0.001*Ln*rn*rn*zn + 0.0019*Ln*rn*zn*zn - 0.001*Ln*rn*zn*Z0n + 0.0001*Ln*rn*Z0n*Z0n + 0.0061*Ln*zn*zn*zn;
    let line8 = -0.0009*Ln*zn*zn*Z0n + 0.0002*Ln*zn*Z0n*Z0n - 0.0002*Ln*Z0n*Z0n*Z0n + 0.0002*rn*rn*rn*rn - 0.0001*rn*rn*rn*Z0n + 0.0004*rn*rn*zn*zn + 0.0022*rn*zn*zn*zn;
    let line9 = -0.0002*rn*zn*zn*Z0n + 0.0001*rn*zn*Z0n*Z0n - 0.0002*rn*Z0n*Z0n*Z0n - 0.0042*zn*zn*zn*zn + 0.0014*zn*zn*zn*Z0n - 0.0002*zn*Z0n*Z0n*Z0n + 0.0001*Z0n*Z0n*Z0n*Z0n;
    return z*(line1+line2+line3+line4+line5+line6+line7+line8+line9+1.0818);
};

var cable_s21 = function(T1GHz, T20GHz){
    let L = T20GHz;
    let r = T1GHz/T20GHz;

    let c1 = L*(20*r-1)/(20-Math.sqrt(20));
    let c2 = L*(1-Math.sqrt(20)*r)/(20-Math.sqrt(20));

    let T = {x:[],y:[]};
    let f_min = 10E6;
    let f_max = 40E9;
    let n_point = 201;
    let f_step = (f_max - f_min)/(n_point-1);
    for(let i=0; i<f_step; i++){
        let freq = f_min+f_step*i;
        T.x.push(freq);
        T.y.push(c1*Math.sqrt(freq)+c2*freq);
    }
    return T;
}