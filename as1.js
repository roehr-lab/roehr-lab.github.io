



//for i in range(n_electron +1):
//    s.append([])
//    sb.append([])
//    idx.append([])
//    for j in range(i+1):
//        if(((i+j) %2) ==0):
//            l.append(i-1)
//            l2.append(j)
//            s[i].append(j)
//            sb[i].append(point(i,j))
//            idx[i].append(idl)

//            idl += 1

class TreePoint{
    constructor(m,n){
        this.i = m;
        this.j = n;
        this.conn =[];
    }

    tracePrev(plc,ad) {
        if(this.conn.length == 0){
            plc[this.i] = this.j;
            if(!(-1 in plc)){
                let pl= [...plc]
                ad.push(pl)
            }
        }
        for(let i = 0; i < this.conn.length; i++){
            plc[this.i] = this.j ;
            this.conn[i].tracePrev(plc,ad);
        }
    }
}

function GenerateSTree(n_electron){
    console.log(n_electron);
    const S_point =[];
    const S_pointObject = [];
    const idx =[];
    let idl = 0;
    for(let i = 0; i < n_electron + 1; i++){
        S_point.push([])
        S_pointObject.push([])
        idx.push([])
        for(let j = 0; j < i + 1; j++){
            if((i+j) %2 == 0){
                S_point[i].push(j);
                S_pointObject[i].push(new TreePoint(i,j))
                idx[i].push(idl)
                idl++;
                //console.log(i,j);
            }   
        }
    }
    console.log(S_pointObject.length);
    return [S_point , S_pointObject,idx];
}


function GenerateConnection(pt){
    const sb = pt[1]
    const idx = pt[2]
    const index = []
        for(let i = 0; i < sb.length;i++){
        for(let j = 0; j < sb[i].length; j++){
            if(i > 0){
                if( j < sb[i-1].length){
                    sb[i][j].conn.push(sb[i-1][j]);
                    index.push(idx[i][j]);
                    index.push(idx[i-1][j]);
                }
                if(j+1 < sb[i-1].length){
                    if(i%2 == 1){
                        sb[i][j].conn.push(sb[i-1][j+1]);
                        index.push(idx[i][j]);
                        index.push(idx[i-1][j+1]);
                    }
                }
            }
            if( j > 0){
                if(i %2 == 0){
                    sb[i][j].conn.push(sb[i-1][j-1]);
                    index.push(idx[i][j]);
                    index.push(idx[i-1][j-1]);
                }
            } 
        }
    }
    return index
}

function make_m(multiplicity){
    console.log(multiplicity);
    const max_m = [...multiplicity]
    const min_m = []
    for(let i =0; i < max_m.length; i++){
        min_m.push(max_m[i]*(-1))
    }
    const spin_point = []
    for(let i = 0; i < max_m.length; i++){
        const s1p = []
        for(j = min_m[i] ; j < max_m[i]+1 ; j += 2 ){
            s1p.push(j*0.5)
        }
        spin_point.push(s1p);
    }

    return spin_point;
}



for(let nelectron =1 ; nelectron < 30; nelectron++){
    const pt = GenerateSTree(nelectron)
    console.log(nelectron)
    const indx =  GenerateConnection(pt)
    const mad = []
    const finalS = 0
    const st = []
    for(let i = 0; i < pt[0].length;i++){
        st.push(-1)
    }
    console.log(pt[1][pt[1].length -1 ].length)
    pt[1][pt[1].length -1 ][finalS].tracePrev(st,mad)
    console.log(mad.length)
    console.log()
}