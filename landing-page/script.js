let targetClass1 = document.querySelector('div') 
let targetClass2 = document.querySelector('body') 
let targetClass3 = document.querySelector('.quote-section') 
let targetClass4 = document.querySelector('.banner-section .banner')
let targetClass5 = document.querySelector('.info-section .info-card-container')

let imgMain = document.querySelector('body .intro-section .intro-content .main-image')
let img1 = document.querySelector('body .info-section .info-card-container .info-card .card-1')
let img2 = document.querySelector('body .info-section .info-card-container .info-card .card-2')
let img3 = document.querySelector('body .info-section .info-card-container .info-card .card-3')
let img4 = document.querySelector('body .info-section .info-card-container .info-card .card-4')

imgMain.src = 'images/main-norm.png'
img1.src = 'images/1-norm.png'
img2.src = 'images/2-norm.png'
img3.src = 'images/3-norm.png'
img4.src = 'images/4-norm.png'
targetClass2.classList.remove('anim-background')

sobriety = true

function colorSwitch() {
    if (sobriety == false) {
        
        sobriety = true

        location.reload()

    } else {
        
        sobriety = false

        targetClass1.classList.add('anim-layer2')
        targetClass2.classList.add('anim-layer1')
        targetClass2.classList.add('anim-background')
        targetClass3.classList.add('anim-layer2')
        targetClass4.classList.add('anim-layer2')
        targetClass5.classList.add('anim-layer1')

        imgMain.src = 'images/main.gif'
        img1.src = 'images/1.gif'
        img2.src = 'images/2.gif'
        img3.src = 'images/3.gif'
        img4.src = 'images/4.gif'

        document.getElementById('paranoia1').innerHTML = "Oh god... Oh no....."
        document.getElementById('paranoia2').innerHTML = "WTF just happened"
        document.getElementById('paranoia3').innerHTML = "Where am I?"
        document.getElementById('paranoia4').innerHTML = "Who's there??"
        document.getElementById('paranoia5').innerHTML = "What the hell did I just sign up for?"
        document.getElementById('paranoia6').innerHTML = "Eyes... burning. Mind..... flashing colors and unreal memories. A harsh bellowing rings out around me, drowning out the sound of my own thoughts!"
        document.getElementById('paranoia7').innerHTML = "Get me out of here!!"
        document.getElementById('paranoia8').innerHTML = "Hot light boiling the inner fluids of my eyes"
        document.getElementById('paranoia9').innerHTML = "DEATH!"
        document.getElementById('paranoia10').innerHTML = "VOID!"
        document.getElementById('paranoia11').innerHTML = "LIFE!"
        document.getElementById('paranoia12').innerHTML = "VOID!"
        document.getElementById('paranoia13').innerHTML = "\"We have been to the moon, we have charted the depths of the ocean and the heart of the atom, but we have a fear of looking inward to ourselves because we sense that is where all the contradictions flow together.\""
        document.getElementById('paranoia14').innerHTML = "- Terrance McKenna"
        document.getElementById('paranoia15').innerHTML = "Knowledge blossoming at my visual periphery!"
        document.getElementById('paranoia16').innerHTML = "Reduced to a pile of sensory data and residual slime!!"
        document.getElementById('paranoia17').innerHTML = "Get me out of here!!"
        
        
    }
}

console.log("Hello there.");