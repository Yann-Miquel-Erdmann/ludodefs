let text1 = document.getElementById("text1")
let text2 = document.getElementById("text2")
let button = document.getElementById("button")
let info1 = []
let info2 = []
var end = document.getElementById('end')
var window1 = document.getElementById('window1')
var window2 = document.getElementById('window2')
var window3 = document.getElementById('window3')
var window4 = document.getElementById('window4')
var rep1 = document.querySelector('rep1')
var rep2 = document.querySelector('rep2')
var rep3 = document.querySelector('rep3')
var rep4 = document.querySelector('rep4')
var question = document.querySelector('question')
var mode = document.getElementById('mode')
var bonnereponse = 0
var ratés = []
var currentquestion = 0
let reset = 0
var reslutbas = document.getElementById('resultbas')
function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window4.style.display = 'none'
window2.style.display = 'none'
window3.style.display = 'none'
reslutbas.style.display = 'none'
function delete_info(f){
    elem = document.getElementById("info"+f)
    elem.remove()
    if(info1.length>1){
        info1.splice(f-1,1)
        info2.splice(f-1,1)
    }else{
        info1 = []
        info2 = []
    }
}
function ajouter(value1, value2){
    window1.style.display = "block"
    window2.style.display = 'none'
    window3.style.display = 'none'
    if(value1!="" & value2!=""){
        info1.push(value1)
        info2.push(value2)
        var inform = document.createElement('div')
        var info_one = document.createElement("div");
        var info_two = document.createElement("div");
        var delete_ = document.createElement("input");
        inform.setAttribute("id" , "info"+info1.length)
        inform.setAttribute("style", "height: 2em; width: 100%; position: relative")
        delete_.setAttribute("id", "delete_");
        delete_.setAttribute("type", "button");
        delete_.setAttribute("value", "supprimer");
        delete_.setAttribute("onclick", "delete_info("+info1.length+")");
        info_one.setAttribute("id", "infoone");
        info_two.setAttribute("id", "infotwo");
        inform.appendChild(info_one);
        inform.appendChild(info_two);
        inform.appendChild(delete_);
        window1.insertBefore(inform, end)
        info_one.innerHTML = info1[info1.length-1]
        info_two.innerHTML = info2[info2.length-1]
        
    }else{
        alert("impossible d'ajouter un champ vide")
    }
}
function random_exept(listlength, e){
    let a = randomInt(0, listlength-1)
    
    while(e.includes(a)){
        a = randomInt(0, listlength-1)
    }
    
    return a 
    
}

function show_result(){
    window2.style.display = "none"
    window3.style.display = "block"
    let survingt = Math.round(bonnereponse/(currentquestion+reset*info1.length)*200)/10
    let pourcent = Math.round(bonnereponse/(currentquestion+reset*info1.length)*100*100)/100
    if(survingt>=0){
        document.getElementById('resultat').innerHTML = "Le sujet n'est pas encore acquis."
    }
    if(survingt>=4){
        document.getElementById('resultat').innerHTML = "Passable"
    }
    if(survingt>=8){
        document.getElementById('resultat').innerHTML = "Moyen"
    }
    if(survingt>=12){
        document.getElementById('resultat').innerHTML = "Bien"
    }
    if(survingt>=16){
        document.getElementById('resultat').innerHTML = "Très bien"
    }
    if(survingt>=18){
        document.getElementById('resultat').innerHTML = "Exellent"
    }
    document.querySelector('pourcent').innerHTML = pourcent+"%"
    document.querySelector('sur20').innerHTML = survingt+"/20"
}
function userrep(userreponse){
    if(userreponse == info2[currentquestion]){
        bonnereponse++
    }
    currentquestion++
    if(mode.value == 'mode_fini'){
        if(currentquestion<info1.length){
            show_test(currentquestion)
        }else{
            show_result()
        }
    }
    if(mode.value == 'mode_infini'){
        let survingt = Math.round(bonnereponse/(currentquestion+reset*info1.length)*200)/10
        let pourcent = Math.round(bonnereponse/(currentquestion+reset*info1.length)*100*100)/100
        document.querySelector('pourcentbas').innerHTML = pourcent+"%"
        document.querySelector('sur20bas').innerHTML = survingt+"/20"
        if(currentquestion<info1.length){
            show_test(currentquestion)
        }else{
            currentquestion = 0
            reset++
            show_test(currentquestion)
        }
    }
}
function show_test(i){

        let rand = []
        let exept = []
        question.innerHTML = info1[i]
        exept.push(i)

        rand.push(info2[i])
        let c = random_exept(info2.length, exept)
        exept.push(c)
        rand.push(info2[c])
        c = random_exept(info2.length, exept)
        exept.push(c)
        rand.push(info2[c])
        c = random_exept(info2.length, exept)
        exept.push(c)
        rand.push(info2[c])


        exept = []
        let d = random_exept(rand.length, exept)
        rep1.innerHTML = rand[d]

        exept.push(d)
        d = random_exept(rand.length, exept)
        rep2.innerHTML = rand[d]

        exept.push(d)
        d = random_exept(rand.length, exept)
        rep3.innerHTML = rand[d]

        exept.push(d)
        d = random_exept(rand.length, exept)
        rep4.innerHTML = rand[d]

    
}
function commencer(){
    if(info1.length > 4){
        window1.style.display = 'none'
        window3.style.display = 'none'
        window2.style.display = 'block'
        currentquestion = 0
        bonnereponse = 0
        reset = 0
        reslutbas.style.display = 'none'
        if(mode.value == 'mode_infini'){
            reslutbas.style.display = 'block'
            document.querySelector('pourcentbas').innerHTML = 100+"%"
            document.querySelector('sur20bas').innerHTML = 20+"/20"
        }
        show_test(currentquestion)
    }else{
        alert("Il n'y a pas assez d'information pour commencer l'entrainement")
    }
    
}

function charger_liste(){
    window4.style.display= "block"
    document.getElementById("downloadfile").style.display = "none"
    document.getElementById("inputfile").style.display = "block"
    document.getElementById("inputfile").addEventListener('change', function() {
        
        var all_files = this.files;
        if(all_files.length == 0) {
            alert('Error : No file selected');
            return;
        }
        var file = all_files[0];
        var max_size_allowed = 2*1024*1024
        if(file.size > max_size_allowed) {
            alert('Error : Exceeded size 2MB');
            return;
        }
        var reader = new FileReader();
        reader.addEventListener('load', function(e) {
            var text = e.target.result;
            let infos = []
            infos = text.split(/\r?\n/)
            for(i in infos){
                let a = infos[i].split("¤")
                ajouter(a[0], a[1])
            }
            window4.style.display = "none"
        });

        reader.addEventListener('error', function() {
            alert('Error : Une erreur est survenue lors de la lecture du fichier');
        });
        reader.readAsText(file);
        
    });
}
function telecharger_liste(){
    if(info1.length>0){
        window4.style.display= "block"
        document.getElementById("downloadfile").style.display = "block"
        document.getElementById("inputfile").style.display = "none"
        let fin = ""
        for(i in info1){
            fin = fin+info1[i]+"¤"+info2[i]+"\n"
        }
        var formBlob = new Blob([fin], { type: 'text/plain' });
        document.getElementById("downloadfile").href = window.URL.createObjectURL(formBlob);
    }else{
        alert('Impossible de télécharger une liste vide')
    }
}

