'use client'
import Image from 'next/image'
import Link from 'next/link'
import { navLinks } from "../../constants"
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin()
export default function Navbar() {
	useGSAP(() => {
		const navTween = gsap.timeline({
			scrollTrigger: {
				trigger: 'nav',
				start: 'bottom top'
			}
		})

		navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
			backgroundColor: '#00000050',
			backgroundFilter: 'blur(10px)',
			duration: 1,
			ease: 'power1.inOut'
		})
	})
	return (
		<nav>
			<div>
				<Link href="#home" className="flex items-center gap-2">
					<Image src="/images/logo.png" alt="logo" width={32} height={32} />
					<p>Velvet Pour</p>
				</Link>
				<ul>
					{navLinks.map((link) => (
						<li key={link.id}>
							<Link href={`#${link.id}`}>{link.title}</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}