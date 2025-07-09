/*
	Installed from https://reactbits.dev/ts/default/
*/

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
	radius?: number;
	duration?: number;
	speed?: number;
	scrambleChars?: string;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
	radius = 100,
	duration = 1.2,
	speed = 0.5,
	scrambleChars = ".:",
	className = "",
	style = {},
	children,
}) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const charsRef = useRef<HTMLElement[]>([]);

	useEffect(() => {
		if (!rootRef.current) return;

		const split = SplitText.create(rootRef.current.querySelector("p"), {
			type: "chars",
			charsClass: "char",
		});
		charsRef.current = split.chars as HTMLElement[];

		charsRef.current.forEach((c) => {
			gsap.set(c, {
				display: "inline-block",
				attr: { "data-content": c.innerHTML },
			});
		});

		const handleMove = (e: PointerEvent) => {
			charsRef.current.forEach((c) => {
				const { left, top, width, height } = c.getBoundingClientRect();
				const dx = e.clientX - (left + width / 2);
				const dy = e.clientY - (top + height / 2);
				const dist = Math.hypot(dx, dy);

				if (dist < radius) {
					gsap.to(c, {
						overwrite: true,
						duration: duration * (1 - dist / radius),
						scrambleText: {
							text: (c as HTMLElement).dataset.content || "",
							chars: scrambleChars,
							speed,
						},
						ease: "none",
					});
				}
			});
		};

		const el = rootRef.current;
		el.addEventListener("pointermove", handleMove);

		return () => {
			el.removeEventListener("pointermove", handleMove);
			split.revert();
		};
	}, [radius, duration, speed, scrambleChars]);

	return (
		<div ref={rootRef} className={`text-block ${className}`} style={style}>
			<p>{children}</p>
		</div>
	);
};

export default ScrambledText;
