import {useGSAP} from '@gsap/react'
import {SplitText} from "gsap/all";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useRef, useEffect} from "react";
import {useMediaQuery} from 'react-responsive';
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef();
    const isMobile = useMediaQuery({maxWidth: 767})

    // Ensure video plays on mobile devices
    useEffect(() => {
        // Small timeout to ensure DOM is fully loaded
        const playVideo = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                    console.warn('Video autoplay was prevented:', error);
                });
            }
        }, 100);

        return () => clearTimeout(playVideo);
    }, []);

    useGSAP(() => {
            const heroSplit = new SplitText('.title', {type: 'chars,words'})
            const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})
            heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))
            gsap.from(heroSplit.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06
            })

            gsap.from(paragraphSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: 'expo.out',
                stagger: 0.06,
                delay: 1,

            })
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,


                }
            })
                .to('.right-leaf', {
                    y: 200
                }, 0)
                .to('.left-leaf', {
                    y: 200
                }, 0)

            const startValue = isMobile ? 'top 50%' : 'center 60%';
            const endValue = isMobile ? '120% top' : 'bottom top';

            // Create a timeline for video animation on scroll
            const tl  = gsap.timeline({
                scrollTrigger: {
                    trigger: 'video',
                    start: startValue,
                    end: endValue,
                    scrub: true,
                    pin: true,
                    markers: false, // Set to true for debugging
                }
            })

            videoRef.current.onloadedmetadata = () =>{
                tl.to(videoRef.current,{
                    currentTime: videoRef.current.duration

                })

            }
    },[])
    return (
        <>
        <section id='hero' className='noisy'>
            <h1 className='title'> Juice </h1>
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
                       lorem ipsum lorremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostro consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,</p>
                    <a href='#coctails'>View Coctails
                    </a>
                    </div>
                </div>
            </div>
            </section>
            <div className='video absolute inset-0'>
                <video
                    ref={videoRef}
                    muted
                    playsInline
                     preload='auto'
                    src='/videos/output.mp4'
                />

            </div>
</>
    )
}
    export default Hero ;
