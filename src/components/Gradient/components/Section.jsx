import { useReducedMotion } from 'framer-motion';
import ParticleBlob from './ParticleBlob';

export default function Section({
    id,
    children,
    className = '',
    hasBlobs = false
}) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            id={id}
            className={`section ${className}`}
            aria-labelledby={`${id}-heading`}
        >
            {hasBlobs && (
                <>
                    <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] opacity-60 pointer-events-none z-0">
                        <ParticleBlob particleCount={1500} />
                    </div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] opacity-50 pointer-events-none z-0">
                        <ParticleBlob particleCount={1200} colors={['#D8B4A0', '#C4956A', '#9FB8A0']} />
                    </div>
                </>
            )}
            <div className="container relative z-10">
                {children}
            </div>
        </section>
    );
}
