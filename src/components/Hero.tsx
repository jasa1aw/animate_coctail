'use client'
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import gsap from "gsap"
import { SplitText} from "gsap/all"
import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"
export default function Hero(){
	const videoRef = useRef<HTMLVideoElement>(null)

	const isMobile = useMediaQuery({ maxWidth: 767 })

	useGSAP(() => {
		const heroSplit = new SplitText(".title", {
			type: "chars, words",
		})

		const paragraphSplit = new SplitText(".subtitle", {
			type: "lines",
		})

		// Apply text-gradient class once before animating
		heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

		gsap.from(heroSplit.chars, {
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
		})

		gsap.from(paragraphSplit.lines, {
			opacity: 0,
			yPercent: 100,
			duration: 1.8,
			ease: "expo.out",
			stagger: 0.06,
			delay: 1,
		})

		gsap
			.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			})
			.to(".right-leaf", { y: 200 }, 0)
			.to(".left-leaf", { y: -200 }, 0)

		const startValue = isMobile ? "top 50%" : "center 60%"
		const endValue = isMobile ? "120% top" : "bottom top"

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "video",
				start: startValue,
				end: endValue,
				scrub: true,
				pin: true,
			},
		})

		if (videoRef.current) {
			videoRef.current.onloadedmetadata = () => {
				tl.to(videoRef.current, {
					currentTime: videoRef.current!.duration,
				})
			}
		}
	}, [])

	return (
		<>
			<section id="hero" className="noisy">
				<h1 className="title">MOJITO</h1>

				<Image
					src="/images/hero-left-leaf.png"
					alt="left-leaf"
					className="left-leaf"
					width={266}
					height={461}
				/>
				<Image
					src="/images/hero-right-leaf.png"
					alt="right-leaf"
					className="right-leaf"
					width={266}
					height={461}
				/>

				<div className="body">
					<div className="content">
						<div className="space-y-5 hidden md:block">
							<p>Cool. Crisp. Classic.</p>
							<p className="subtitle">
								Sip the Spirit <br /> of Summer
							</p>
						</div>

						<div className="view-cocktails">
							<p className="subtitle">
								Every cocktail on our menu is a blend of premium ingredients,
								creative flair, and timeless recipes — designed to delight your
								senses.
							</p>
							<Link href="#cocktails">View cocktails</Link>
						</div>
					</div>
				</div>
			</section>

			<div className="video absolute inset-0">
				<video
					ref={videoRef}
					src="/videos/output.mp4"
					muted
					playsInline
					preload="auto"
				/>
			</div>
		</>
	)
}