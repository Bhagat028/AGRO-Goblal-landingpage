"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Menu, X, ChevronRight, Globe, ShieldCheck, Clock, CheckCircle,
  Mail, Phone, MapPin, Send, MessageCircle, User, Award,
  Anchor, Coffee, Sun, Leaf, ShoppingBag, BookOpen
} from 'lucide-react';

const ArecronWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hello! Welcome to ARECRON GLOBAL. How can we assist you with your export requirements today?", isUser: false }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your enquiry has been sent successfully. We will get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send enquiry. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const products = [
    { title: "Agro-based & Agro Allied Food", icon: <Leaf className="w-8 h-8 text-green-600" />, desc: "High-quality agricultural produce sourced directly from farmers.", catalogueUrl: "https://drive.google.com/file/d/1XTh9PpTN-R_qKd_6HzuiVHn0-QvZK1Oe/view?usp=sharing" },
    { title: "Meat & Meat Allied Food", icon: <ShoppingBag className="w-8 h-8 text-red-600" />, desc: "Premium quality meat products meeting international safety standards.", catalogueUrl: "https://drive.google.com/file/d/1U-8sdZQhdXVblqFqZ_6szwbevWG5Evv0/view?usp=sharing" },
    { title: "Poultry & Poultry Allied Food", icon: <CheckCircle className="w-8 h-8 text-yellow-600" />, desc: "Fresh and processed poultry products for global markets.", catalogueUrl: "https://drive.google.com/file/d/1R968LPGZv6XkvUUAhpebSp_og9rp9y-L/view?usp=sharing" },
    { title: "Dairy & Dairy Allied Food", icon: <Coffee className="w-8 h-8 text-blue-400" />, desc: "Rich and pure dairy products including milk powder, ghee, and more.", catalogueUrl: "https://drive.google.com/file/d/1NyJxr9SShKgANkXURz2U3dSCuMU8snS5/view?usp=sharing" },
    { title: "Honey & Honey Allied Food", icon: <Sun className="w-8 h-8 text-amber-500" />, desc: "Natural, pure honey and related products.", catalogueUrl: "https://drive.google.com/file/d/1lrI7eFBcvGIUyY8RZ-gLINj3feXxrf-w/view?usp=sharing" },
    { title: "Marine, Aquaculture & Allied", icon: <Anchor className="w-8 h-8 text-blue-700" />, desc: "Fresh catch and processed marine products.", catalogueUrl: "https://drive.google.com/file/d/1G1eoPgGAOUN8iqfYScCssi5Sbz4ev9gd/view?usp=sharing" },
    { title: "Coconut & Coconut Allied", icon: <Leaf className="w-8 h-8 text-green-700" />, desc: "Desiccated coconut, oil, water, and other coconut by-products.", catalogueUrl: "https://drive.google.com/file/d/12iismqH2ISjlpPrcdC5ZivnS3jqpIWMX/view?usp=sharing" },
    { title: "Tea & Tea Allied Products", icon: <Coffee className="w-8 h-8 text-green-800" />, desc: "Premium Indian tea blends from certified estates.", catalogueUrl: "https://drive.google.com/file/d/1ABk225BEwPdWoJUbvdOQJmYyxgzECDk5/view?usp=sharing" },
    { title: "Spices and Spice Allied", icon: <Sun className="w-8 h-8 text-orange-600" />, desc: "Authentic Indian spices known for aroma and flavor.", catalogueUrl: "https://drive.google.com/file/d/18wm4yBWxXVkTMqorutgeWCqZhdUIchqP/view?usp=sharing" },
    { title: "Non-Commodity Board Products", icon: <Globe className="w-8 h-8 text-indigo-600" />, desc: "General trading items and specialized services.", catalogueUrl: "https://drive.google.com/file/d/1WIdaccFcMVHrUAFdctifAocq5q1w2vZO/view?usp=sharing" },
    { title: "Overall Product Catalogue", icon: <BookOpen className="w-8 h-8 text-purple-600" />, desc: "Comprehensive collection of all our product offerings and services.", catalogueUrl: "https://drive.google.com/file/d/1G0pl400Uoj8xnKJdC_I7XkLKvt8KWPaY/view?usp=sharing" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.toLowerCase();

    // Add user message
    setChatMessages(prev => [...prev, { text: chatInput, isUser: true }]);
    setChatInput("");

    // Bot Logic
    setTimeout(() => {
      // Check for product keywords
      const foundProduct = products.find(p => {
        // Create simple keywords from title (e.g., "Meat", "Tea", "Overall")
        const keywords = p.title.toLowerCase().split(' ');
        return keywords.some(key => key.length > 2 && userText.includes(key));
      });

      if (foundProduct) {
        setChatMessages(prev => [...prev, {
          text: `I found the ${foundProduct.title} for you. Directing you to the catalogue now...`,
          isUser: false
        }]);
        setTimeout(() => scrollToSection('products'), 1500); // Scroll after reading delay
      } else if (userText.includes("catalogue") || userText.includes("catalog")) {
        setChatMessages(prev => [...prev, {
          text: "You can find all our product catalogues in the Portfolio section below. Taking you there...",
          isUser: false
        }]);
        setTimeout(() => scrollToSection('products'), 1500);
      } else {
        setChatMessages(prev => [...prev, {
          text: "Thank you for your message. Our team has received your enquiry and will contact you shortly via email.",
          isUser: false
        }]);
      }
    }, 1000);
  };

  const certifications = [
    "Coconut Development Board",
    "Tea Board Certified Member",
    "Spice Board Certified Member",
    "APEDA Certified Member",
    "MPEDA Certified Member",
    "FIEO Certified Member",
    "IEC Import Export Code",
    "FSSAI Central License",
    "GST Certification"
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">

      {/* Navigation */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Image src="/logo.svg" alt="ARECRON GLOBAL Logo" width={40} height={40} className="rounded" />
            <span className="text-xl md:text-2xl font-bold tracking-wider">ARECRON GLOBAL</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-wide">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition">About</button>
            <button onClick={() => scrollToSection('products')} className="hover:text-blue-400 transition">Portfolio</button>
            <button onClick={() => scrollToSection('leadership')} className="hover:text-blue-400 transition">Leadership</button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">Enquire Us</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 p-4 space-y-4">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 hover:text-blue-400">Home</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 hover:text-blue-400">About</button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left py-2 hover:text-blue-400">Portfolio</button>
            <button onClick={() => scrollToSection('leadership')} className="block w-full text-left py-2 hover:text-blue-400">Leadership</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-blue-400 font-bold">Enquire Us</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800 opacity-20 transform skew-x-12 translate-x-20"></div>

        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <h2 className="text-blue-400 font-bold tracking-widest uppercase mb-4 animate-fade-in-up">Welcome to Arecron Global</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Global Commerce</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Bridging the gap between reliable Indian producers and international buyers through transparent trade practices, strict quality compliance, and efficient logistics.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => scrollToSection('products')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center transition shadow-lg shadow-blue-900/50">
                View Portfolio <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button onClick={() => scrollToSection('contact')} className="border border-white hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-lg font-bold transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Bar */}
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center"><Award className="mb-2" /> <span className="font-bold">Quality Focused</span></div>
          <div className="flex flex-col items-center"><Globe className="mb-2" /> <span className="font-bold">Globally Connected</span></div>
          <div className="flex flex-col items-center"><ShieldCheck className="mb-2" /> <span className="font-bold">Compliance Driven</span></div>
          <div className="flex flex-col items-center"><Clock className="mb-2" /> <span className="font-bold">Timely Delivery</span></div>
        </div>
      </div>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Who We Are</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-inner">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                ARECRON GLOBAL is a professionally managed export and trading firm headquartered in Chennai, India. We operate as a merchant exporter, sourcing products directly from trusted manufacturers, farmers, and processing units across India.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our business philosophy is built on <span className="font-bold text-slate-900">integrity, consistency, and transparency</span>. By understanding global market requirements and buyer expectations, we deliver products that meet quality, packaging, and regulatory norms of destination countries.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><Globe className="w-5 h-5 mr-2 text-blue-600" /> Our Vision</h3>
                <p className="text-gray-700">To become a globally trusted export hub by delivering quality products and building long-term international partnerships.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><Award className="w-5 h-5 mr-2 text-green-600" /> Our Mission</h3>
                <p className="text-gray-700">To maintain transparent dealings, ensure timely shipment, and support customer success through professional execution.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-orange-500" /> Core Values</h3>
                <p className="text-gray-700">Integrity • Transparency • Quality Assurance • Customer Commitment • Continuous Improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-slate-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center text-slate-900 mb-10">Our Regulatory Certifications</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-slate-700 flex items-center hover:shadow-md transition">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Portfolio */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Product Portfolio</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Diverse range of high-quality products sourced from the best origins in India.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100 group">
                <div className="mb-4 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition">
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 min-h-[56px] flex items-center">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.desc}</p>
                {product.catalogueUrl ? (
                  <a
                    href={product.catalogueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-semibold flex items-center cursor-pointer hover:text-blue-800"
                  >
                    View Catalogue <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="text-gray-400 text-sm font-semibold flex items-center">
                    Coming Soon <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership & Management</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Proprietor Profile */}
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border-4 border-blue-500">
                <Image src="/png/Proprietor.jpg" alt="Mr. Vishal S - Proprietor" width={128} height={128} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Mr. Vishal S</h3>
              <p className="text-blue-400 font-semibold mb-6">Proprietor</p>
              <p className="text-gray-300 leading-relaxed text-sm">
                As the Proprietor of ARECRON GLOBAL, Mr. Vishal represents Indian products in global markets. He provides strategic direction to ensure all export transactions comply with foreign trade regulations and international standards. His focus lies heavily on quality assurance, accurate documentation, timely execution, and building long-term partnerships.
              </p>
            </div>

            {/* CEO Profile */}
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full mb-6 overflow-hidden border-4 border-green-500">
                <Image src="/png/ceo.jpg" alt="Mr. Sanjay Padmavathy Srinivasan - CEO" width={128} height={128} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Mr. Sanjay Padmavathy Srinivasan</h3>
              <p className="text-green-400 font-semibold mb-6">Chief Executive Officer</p>
              <p className="text-gray-300 leading-relaxed text-sm">
                As CEO, Mr. Sanjay oversees export operations, coordination, quality compliance, logistics execution, and international client relationships. He ensures every shipment meets buyer specifications, destination-country regulations, and international trade standards while delivering reliable, timely, and value-driven export solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">Reach out to us for any export enquiries or collaboration opportunities.</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Headquarters</h4>
                    <p className="text-gray-600 mt-1">
                      No.2/151 Theru Veethiyamman Kovil Street,<br />
                      Kiloy Village, Vayalur Post, Sriperumbudur,<br />
                      Kanchipuram, Tamil Nadu, 602105, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phone</h4>
                    <p className="text-gray-600 mt-1">
                      +91 91596 19055<br />
                      +91 73387 95255<br />
                      +91 93845 88903
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4 text-orange-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-gray-600 mt-1">
                      contact@arecronglobal.com<br />
                      vishal@arecronglobal.com<br />
                      sanjay@arecronglobal.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Enquire Now</h3>

              {submitStatus && (
                <div className={`mb-4 p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Product Enquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; {new Date().getFullYear()} ARECRON GLOBAL. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Export Policy</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <a
        href="https://wa.me/917338795255"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

    </div>
  );
};

export default ArecronWebsite;