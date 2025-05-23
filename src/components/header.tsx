'use client'
import Link from 'next/link';
export default function Header() {
    return (
        <header className="bg-[var(--color-primary)] text-white p-4
shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between itemscenter">
                <Link href="/" className="text-xl font-bold trackingwide">Fireplay</Link>
                <nav className="space-x-4">
                    <Link href="/favorite"
                        className="hover:underline">Favoritos</Link>
                    <Link href="/cart"
                        className="hover:underline">Carrito</Link>
                    <Link href="/login" className="hover:underline">Login</Link>
                    <Link href="/register" className="hover:underline">Register</Link>
                </nav>
            </div>
        </header>
    );
}