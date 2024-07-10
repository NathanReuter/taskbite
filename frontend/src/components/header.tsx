import Separator from "@tailus-ui/Separator.tsx";
import BrandLogo from "./BrandLogo.tsx";
import {UserDropdown} from "./UserDropdown.tsx";
import Button from '@tailus-ui/Button';
import { twMerge } from 'tailwind-merge';
import {Search} from "./Search.tsx";
import {useAppSelector} from "../hooks.ts";

export const Link = ({ link, label, isActive = false, mainNav = true }: { link: string; label: string; isActive?: boolean; mainNav?: boolean }) => (
    <Button.Root
        variant={isActive && !mainNav ? 'soft' : 'ghost'}
        intent="gray"
        href={link}
        size="sm"
        className={twMerge(
            isActive && mainNav && 'relative before:absolute before:inset-x-0 before:-bottom-2 before:h-0.5 before:rounded-t-full before:bg-primary-600'
        )}
    >
        <Button.Label>{label}</Button.Label>
    </Button.Root>
);

export function Header() {
    const userSelect = useAppSelector(state => state.user);
    return (
        <header className="feedback-bg fixed top-0 z-10 w-full border-b">
            <div className="mx-auto max-w-6xl px-5">
                <div className="flex items-center justify-between py-4">
                    <div className="flex h-7 items-center gap-4">
                        <a href="#" hidden className="sm:block">
                            <BrandLogo/>
                        </a>
                        <Separator hidden className="rotate-12 sm:block" orientation="vertical"/>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link link="#" label="Help" mainNav={false}/>
                        <div className="size-6 hidden sm:block">
                            <UserDropdown user={userSelect}/>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10">
                    <nav className="relative flex h-10 gap-2 pb-2">
                        <Link link="#" label="Boards" isActive/>
                        <Link link="#" label="Stared"/>
                    </nav>
                    <Button.Root intent='primary' className={''}>
                        <Button.Label>
                            Create
                        </Button.Label>
                    </Button.Root>
                    <Search/>
                </div>
            </div>
        </header>
    )
}
