'use client';

import Logo from './ui/logo';
import { NavigationMenuDemo } from './nav_buttons';
import { ModeToggle } from './ui/mod_toggle';
import { useState } from 'react';

export function MainNav() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="w-full p-4 shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center space-x-6">
                <div className="flex items-center space-x-6">
                    <Logo width={75} height={75}/>
                    <NavigationMenuDemo />
                </div>
                <div className="ml-auto">
                    <ModeToggle />
                </div>
            </div>
            <hr className="mt-4 border-gray-300" />
        </div>
    );
}