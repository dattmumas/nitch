'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const Logo = ({ width, height }) => {
    const { theme } = useTheme();
    const [windowWidth, setWindowWidth] = useState(0);

    const updateWidth = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const [showButton, setShowButton] = useState(false);

    const changeNavButton = () => {
        if (window.scrollY < 400 && window.innerWidth < 768) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavButton);
    }, []);

    return (
        <div>
            <Link href="/">
                <Image
                    src="./static/logo2.svg"
                    alt="logo"
                    width={width}
                    height={height}
                    className={theme === "dark" ? "invert" : ""}
                />
            </Link>
        </div>
    );
};

export default Logo;