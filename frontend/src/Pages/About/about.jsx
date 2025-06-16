import React from 'react';
import UserNav from '../../Components/Navbar/userNav';

const About = () => {
    return (
        <>
            <UserNav />
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 mt-24">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-lg tracking-tight">About Football Community</h1>
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">Our Story</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Football Community was founded with a simple goal: to bring football lovers together and make organizing, joining, and enjoying matches easier than ever. Whether you’re a casual player, a team captain, or just looking to meet new friends through the beautiful game, our platform is designed for you.
                    </p>
                </section>
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">What We Offer</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg pl-4">
                        <li>Discover and join <span className="font-semibold text-blue-700">local football matches</span> with just a few clicks.</li>
                        <li>Create your own matches, set the <span className="font-semibold text-blue-700">location, time</span>, and invite players.</li>
                        <li>Connect and <span className="font-semibold text-blue-700">chat</span> with other players in real time.</li>
                        <li>Rate your experience and vote for the <span className="font-semibold text-blue-700">MVP</span> after each match.</li>
                        <li>See match locations on an <span className="font-semibold text-blue-700">interactive map</span> and get directions.</li>
                        <li>Enjoy a seamless experience on both <span className="font-semibold text-blue-700">web and mobile</span> devices.</li>
                    </ul>
                </section>
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg pl-4">
                        <li><span className="font-semibold text-blue-700">Community-Driven:</span> Built for and by football fans, our platform grows with your feedback and needs.</li>
                        <li><span className="font-semibold text-blue-700">Easy to Use:</span> Clean, modern design and intuitive features make organizing and joining matches simple for everyone.</li>
                        <li><span className="font-semibold text-blue-700">Secure & Reliable:</span> Your data and experience are protected with secure authentication and privacy-first design.</li>
                        <li><span className="font-semibold text-blue-700">Always Improving:</span> We’re constantly adding new features and listening to our users to make Football Community even better.</li>
                    </ul>
                </section>
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">Meet the Team</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Our team is made up of passionate footballers, designers, and developers who believe in the power of sport to connect people. We’re committed to making your football experience as fun and hassle-free as possible.
                    </p>
                </section>
                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-3 text-blue-600">Contact Us</h2>
                    <p className="text-gray-700 text-lg">
                        Have questions, suggestions, or want to partner with us? Email us at <a href="mailto:support@example.com" className="text-blue-600 underline font-semibold">support@example.com</a> or use our <a href="/contact" className="text-blue-600 underline font-semibold">contact form</a>. We’d love to hear from you!
                    </p>
                </section>
                <footer className="border-t pt-6 mt-12 text-center text-gray-500 text-base">
                    <p>&copy; {new Date().getFullYear()} Football Community. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default About;