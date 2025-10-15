import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/Card';
import { Textarea } from '../components/ui/TextArea/index';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    phoneNumber: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log('Form Data Submitted:', formData);
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ 
      firstName: '', 
      lastName: '', 
      email: '', 
      businessName: '', 
      phoneNumber: '', 
      message: '' 
    });
  };

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      value = value.toLowerCase();
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const faqData = [
    {
      question: "How quickly can I get started?",
      answer: "You can start your security assessment immediately. Our platform is designed for instant access with results available in minutes."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a comprehensive free security scan to help you understand your current cybersecurity posture."
    },
    {
      question: "Do you support businesses across Africa?",
      answer: "Absolutely. We're built specifically for African SMEs and support businesses across the continent with localized solutions."
    },
    {
      question: "What if I need help during setup?",
      answer: "Our support team is here to help. We offer guided onboarding and 24/7 support for all technical questions."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#004AAD] to-[#00C2A0] text-white p-6 md:p-12">
      <main className="container mx-auto max-w-6xl w-full pt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">
          Get In Touch
        </h1>
        <p className="text-center text-gray-200 mb-12">
          We’d love to hear from you! Reach out to our team with any questions or inquiries.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Form */}
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Your first name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Your last name"
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="businessName" className="text-gray-200">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Your business name (optional)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-gray-200">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+254 XXX XXX XXX"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-200">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us how we can help you..."
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#00D084] hover:bg-[#00B872] text-white font-semibold py-3 rounded-md"
              >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Right Side - Contact Information */}
          <Card className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#00D084] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-200">cyberchapchap@tum.ac.ke</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#00D084] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-200">+254 717 280 536</p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons with YouTube added */}
              <div className="mt-8 pt-6 border-t border-white border-opacity-20">
                <h3 className="font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {/* LinkedIn */}
                  <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>

                  {/* X (formerly Twitter) */}
                  <Link to="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.19l-6.269-8.497L5.61 21.75H2.292l7.182-8.225L1.475 2.25h3.308l5.485 7.537zM17.826 19.987h2.955L8.532 4.237H5.567z"/>
                    </svg>
                  </Link>
                  
                  {/* Instagram */}
                  <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.672 1.576 4.82 4.82.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-0.148 3.252-1.576 4.672-4.82 4.82-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.85-.07-3.252-0.148-4.672-1.576-4.82-4.82-0.058-1.265-0.069-1.645-0.069-4.849 0-3.204.012-3.584.07-4.85 0.148-3.252 1.576-4.672 4.82-4.82 1.265-0.058 1.645-0.069 4.849-0.069zm0-2.163c-3.259 0-3.669.014-4.943.071-4.008.183-6.108 2.275-6.291 6.291-.058 1.274-0.072 1.684-0.072 4.943s0.014 3.668 0.072 4.943c0.183 4.008 2.283 6.108 6.291 6.291 1.274.058 1.684 0.072 4.943 0.072s3.668-0.014 4.943-0.072c4.008-0.183 6.108-2.275 6.291-6.291 0.058-1.274 0.072-1.684 0.072-4.943s-0.014-3.668-0.072-4.943c-0.183-4.008-2.283-6.108-6.291-6.291-1.274-0.058-1.684-0.072-4.943-0.072zM12 5.838c-3.463 0-6.263 2.8-6.263 6.263s2.8 6.263 6.263 6.263 6.263-2.8 6.263-6.263-2.8-6.263-6.263-6.263zm0 10.3c-2.227 0-4.037-1.81-4.037-4.037s1.81-4.037 4.037-4.037 4.037 1.81 4.037 4.037-1.81 4.037-4.037 4.037zm6.406-11.845c-0.56 0-1.012 0.452-1.012 1.011s0.452 1.012 1.012 1.012 1.012-0.452 1.012-1.012-0.452-1.011-1.012-1.011z"/>
                    </svg>
                  </Link>

                  {/* WhatsApp */}
                  <Link to="https://wa.me/254717280536" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </Link>

                  {/* YouTube */}
                  <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.5 7.234c-0.231-0.852-0.902-1.523-1.754-1.754C19.782 5.051 12 5.051 12 5.051s-7.782 0-8.746 0.429C2.402 5.711 1.731 6.382 1.5 7.234c-0.429 1.964-0.429 6.273-0.429 6.273s0 4.309 0.429 6.273c0.231 0.852 0.902 1.523 1.754 1.754 0.964 0.429 8.746 0.429 8.746 0.429s7.782 0 8.746-0.429c0.852-0.231 1.523-0.902 1.754-1.754 0.429-1.964 0.429-6.273 0.429-6.273s0-4.309-0.429-6.273zM9.75 16.25v-8.5l7.5 4.25-7.5 4.25z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links separated */}
            <div className="mt-8 space-y-3">
              <Link to="/about" className="block">
                <Button
                  className="w-full bg-transparent border border-white text-white hover:bg-white hover:bg-opacity-20"
                >
                  Learn More About Us
                </Button>
              </Link>
              <Link to="/login" className="block">
                <Button
                  className="w-full bg-[#00D084] hover:bg-[#00B872] text-white"
                >
                  Start Your Security Assessment
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="container mx-auto max-w-6xl w-full py-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-200 mb-12">
          Quick answers to common questions about our services
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqData.map((faq, index) => (
            <Card key={index}>
              <h3 className="text-xl font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-200">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}