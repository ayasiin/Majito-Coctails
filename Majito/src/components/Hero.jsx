import {useGSAP} from '@gsap/react'
import {SplitText} from "gsap/all";
import gsap from "gsap";


const Hero = () =>{
    useGSAP(() => {
        const heroSplit = new SplitText('.title',{type:'chars,words'})
        const paragraphSplit = new SplitText('.subtitle',{type:'lines'})
        heroSplit.chars.forEach((char) => char. classList.add('text-gradient'))
        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:"expo.outt",
            stagger:0.06
        })
        gsap.from(paragraphSplit.lines,{
            opacity:0,
            yPercent:100,
            duration:1.8,
            ease:'expo.out',
            stagger:0.06,
            delay:1,

        })
        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom bottom',
                scrub:true,


            }
        })
            .to('.right-leaf',{
                y:200},0)
            .to('.left-leaf',{
                y:200},0)
        },
        [])


    return (
        <>
        <section id='hero' className='noisy'>
            <h1 className='title'> Mojito</h1>
            <img src='/images/hero-left-leaf.png' alt='left-leaf' className='left-leaf'/>
            <img src='/images/hero-right-leaf.png' alt='right-leaf' className='right-leaf'/>


        <div className='body'>

            <div className='content'>
                <div className='space-y-5 hidden md:block'>
                    <p>Cool ..Crisp and Sour</p>
                    <p className='subtitle'> Sip the joy <br/> of Summer</p>
                </div>
                <div className='view-cocktails'>
                    <p className= 'subtitle'>
                        lorem ipsum lorremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                    <a href='#coctails'>View Coctail</a>

                </div>
            </div>
        </div>
            </section>
</>

)

}

export default Hero;