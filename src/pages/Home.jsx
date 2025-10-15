import React from 'react';
import { Shield, Globe, Wifi, Smartphone, ChevronRight } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

// Import your local images from the assets folder
import laptopImage from '../assets/laptop.png'; 
import africaMapImage from '../assets/map.png'; 

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#004AAD] via-[#0066CC] to-[#00D084] text-white overflow-hidden relative pt-20">
            {/* Faint Background Visuals */}
            <div className="absolute inset-0 z-0"> 
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${laptopImage})`, opacity: '0.3' }}
                ></div>
                <div 
                    className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-no-repeat bg-contain" 
                    style={{ backgroundImage: `url(${africaMapImage})`, opacity: '0.5' }}
                ></div>
            </div>
            
            {/* Hero Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Cybersecurity<span className="text-[#00D084]"> Made Simple</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                Protect your African SME with our comprehensive cybersecurity platform.
                                Scan websites, secure social media, and safeguard your POS systems.
                            </p>
                            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                                <Link to="/login">
                                  <Button className="bg-[#00D084] hover:bg-[#00B872] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200">
                                    Start Free Security Scan
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                  </Button>
                                </Link>
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 py-3 px-8 rounded-full">
                                    Watch Demo
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#00D084]/20 rounded-lg p-4 text-center border border-white/20">
                                        <Shield className="h-8 w-8 text-[#00D084] mx-auto mb-2" />
                                        <p className="text-white font-semibold">Website Security</p>
                                    </div>
                                    <div className="bg-[#004AAD]/20 rounded-lg p-4 text-center border border-white/20">
                                        <Smartphone className="h-8 w-8 text-white mx-auto mb-2" />
                                        <p className="text-white font-semibold">Social Media</p>
                                    </div>
                                    <div className="bg-[#0066CC]/20 rounded-lg p-4 text-center border border-white/20">
                                        <Globe className="h-8 w-8 text-white mx-auto mb-2" />
                                        <p className="text-white font-semibold">Network Scan</p>
                                    </div>
                                    <div className="bg-[#00B872]/20 rounded-lg p-4 text-center border border-white/20">
                                        <Wifi className="h-8 w-8 text-[#00D084] mx-auto mb-2" />
                                        <p className="text-white font-semibold">WiFi Security</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Complete Cybersecurity Suite</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">Everything your African SME needs to stay secure in the digital world</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {[
                            { icon: Globe, title: "Website Security Scan", description: "Comprehensive vulnerability assessment for your business website" },
                            { icon: Smartphone, title: "Social Media Protection", description: "Security checklist and monitoring for your social media presence" },
                            { icon: Wifi, title: "POS & WiFi Security", description: "Secure your payment systems and wireless networks" }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                                <feature.icon className="h-12 w-12 text-[#00D084] mb-4 mx-auto" />
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/80">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 py-16">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { number: "500+", label: "SMEs Protected" },
                            { number: "1000+", label: "Threats Detected" },
                            { number: "99.9%", label: "Uptime Guaranteed" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-[#00D084] mb-2">{stat.number}</div>
                                <div className="text-white/80">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Business?</h2>
                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Join hundreds of African SMEs who trust CyberChapChap to protect their digital assets
                    </p>
                    {/* The "Start Your Free Security Assessment" button is now a link to the /login route */}
                    <Link to="/login">
                        <Button className="bg-[#00D084] hover:bg-[#00B872] text-white font-semibold py-4 px-12 rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105">
                            Start Your Free Security Assessment
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};