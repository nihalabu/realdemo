"use client";

import { useState } from "react";
import ChatWidget from "./components/ChatWidget";
import { Search, MessageCircle, Home as HomeIcon, CheckCircle, Menu, X } from "lucide-react";

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#000000] font-['Poppins']">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#ffffff] border-b-[1px] border-[#cecaca] px-[20px] sm:px-[50px] py-[20px] sm:py-[29px] flex justify-between items-center">
        <div className="font-['freight-big-pro'] font-[900] text-[24px] sm:text-[29px] text-[#000000]">Apex Realty</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-[38px] font-['niveau-grotesk'] text-[#000000]">
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]">Buy</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]">Rent</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]">New Projects</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]">Agents</a>
        </div>
        <button className="hidden md:block bg-[#8d2926] text-[#ffffff] px-[29px] py-[1px] h-[43px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#c02b0a] transition-colors duration-[200ms]">
          List Your Home
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-[#000000]"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle navigation"
        >
          {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#ffffff] border-b-[1px] border-[#cecaca] px-[20px] py-[20px] flex flex-col gap-[20px] font-['niveau-grotesk'] text-[#000000] z-40">
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]" onClick={() => setMobileNavOpen(false)}>Buy</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]" onClick={() => setMobileNavOpen(false)}>Rent</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]" onClick={() => setMobileNavOpen(false)}>New Projects</a>
          <a href="#" className="hover:text-[#8d2926] transition-colors duration-[150ms]" onClick={() => setMobileNavOpen(false)}>Agents</a>
          <button className="bg-[#8d2926] text-[#ffffff] px-[29px] h-[43px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#c02b0a] transition-colors duration-[200ms] w-full">
            List Your Home
          </button>
        </div>
      )}

      <main>
        {/* Hero */}
        <section className="px-[20px] sm:px-[50px] py-[50px] sm:py-[80px] grid grid-cols-1 lg:grid-cols-2 gap-[50px] lg:gap-[80px] items-center">
          <div className="flex flex-col gap-[30px] sm:gap-[35px]">
            <div>
              <span className="text-[#8d2926] font-['Roboto'] font-[500] uppercase tracking-wider text-[12px] sm:text-[14px]">Premier Real Estate Agency</span>
              <h1 className="font-['freight-big-pro'] font-[900] text-[46px] sm:text-[60px] lg:text-[71px] leading-[1.1] mt-[20px] sm:mt-[29px]">Find Your Dream Home</h1>
            </div>
            <p className="font-['Poppins'] font-[300] text-[#404042] text-[16px] sm:text-[18px] leading-relaxed">
              We help you find the perfect property that fits your lifestyle and budget. Explore our exclusive listings and let our experts guide you home.
            </p>
            <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[29px]">
              <button className="bg-[#8d2926] text-[#ffffff] px-[35px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#c02b0a] transition-colors duration-[200ms]">Get Started</button>
              <button className="border-[1px] border-[#8d2926] text-[#8d2926] px-[35px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#f3f3f3] transition-colors duration-[200ms]">Learn More</button>
            </div>

            {/* Stats */}
            <div className="flex gap-[24px] sm:gap-[38px] pt-[30px] sm:pt-[35px] border-t-[1px] border-[#cecaca] mt-[10px] sm:mt-[29px] flex-wrap">
              <div>
                <div className="font-['freight-big-pro'] font-[900] text-[26px] sm:text-[29px]">8,500+</div>
                <div className="font-['Roboto'] text-[#888989] text-[13px] sm:text-[14px]">Properties</div>
              </div>
              <div>
                <div className="font-['freight-big-pro'] font-[900] text-[26px] sm:text-[29px]">4,200+</div>
                <div className="font-['Roboto'] text-[#888989] text-[13px] sm:text-[14px]">Happy Clients</div>
              </div>
              <div>
                <div className="font-['freight-big-pro'] font-[900] text-[26px] sm:text-[29px]">15+</div>
                <div className="font-['Roboto'] text-[#888989] text-[13px] sm:text-[14px]">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative mt-[10px] lg:mt-0">
            <img src="/images/hero-home.jpeg" alt="Hero Home" className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover rounded-[10px]" />
            <div className="absolute bottom-[20px] left-[10px] sm:bottom-[29px] sm:left-[-38px] bg-[#ffffff] p-[16px] sm:p-[29px] rounded-[10px] border-[1px] border-[#cecaca] shadow-md">
              <div className="font-['Roboto'] text-[#888989] text-[11px] sm:text-[12px] uppercase">Avg. Home Value</div>
              <div className="font-['freight-big-pro'] font-[900] text-[24px] sm:text-[29px] mt-[1px]">$620,000</div>
              <div className="text-[#8d2926] font-['Roboto'] font-[500] mt-[1px] text-[14px]">↑ 8.4% this year</div>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="bg-[#8d2926] px-[20px] sm:px-[50px] py-[30px] sm:py-[38px] text-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px] sm:gap-[38px] items-center text-center sm:text-left">
            {/* Left */}
            <div className="flex flex-col sm:items-start items-center">
              <span className="font-['freight-big-pro'] italic text-[28px] sm:text-[35px] leading-none">Find your Center</span>
              <span className="text-[12px] font-['Roboto'] tracking-widest uppercase mt-[1px]">SALE</span>
            </div>
            {/* Center */}
            <div className="flex flex-col gap-[1px]">
              <h3 className="font-['freight-big-pro'] font-[900] text-[24px] sm:text-[29px]">The 2026 Summer Sales Event!</h3>
              <p className="font-['Poppins'] font-[300] text-[14px]">Mortgage rate buydowns on all quick move-in homes.</p>
            </div>
            {/* Right */}
            <div className="flex justify-center sm:justify-end">
              <button className="border-[1px] border-[#ffffff] text-[#ffffff] px-[35px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#ffffff] hover:text-[#8d2926] transition-colors duration-[200ms] cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="px-[20px] sm:px-[50px] py-[30px] sm:py-[43px]">
          <div className="bg-[#f3f3f3] rounded-[10px] p-[20px] sm:p-[38px] flex flex-col sm:flex-row gap-[16px] sm:gap-[29px] items-stretch sm:items-end flex-wrap">
            <div className="flex-1 min-w-[140px] flex flex-col gap-[6px]">
              <label className="font-['Roboto'] text-[14px] text-[#404042]">Looking For</label>
              <select className="w-full h-[50px] border-[1px] border-[#cecaca] rounded-[5px] px-[16px] sm:px-[29px] font-['Poppins'] font-[300] bg-[#ffffff]">
                <option>Buy</option>
                <option>Rent</option>
              </select>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-[6px]">
              <label className="font-['Roboto'] text-[14px] text-[#404042]">Property Type</label>
              <select className="w-full h-[50px] border-[1px] border-[#cecaca] rounded-[5px] px-[16px] sm:px-[29px] font-['Poppins'] font-[300] bg-[#ffffff]">
                <option>Any</option>
                <option>House</option>
                <option>Apartment</option>
              </select>
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-[6px]">
              <label className="font-['Roboto'] text-[14px] text-[#404042]">Location</label>
              <input type="text" placeholder="City, Neighborhood, or Zip" className="w-full h-[50px] border-[1px] border-[#cecaca] rounded-[5px] px-[16px] sm:px-[29px] font-['Poppins'] font-[300] bg-[#ffffff]" />
            </div>
            <div className="flex-1 min-w-[140px] flex flex-col gap-[6px]">
              <label className="font-['Roboto'] text-[14px] text-[#404042]">Budget</label>
              <select className="w-full h-[50px] border-[1px] border-[#cecaca] rounded-[5px] px-[16px] sm:px-[29px] font-['Poppins'] font-[300] bg-[#ffffff]">
                <option>Any Price</option>
                <option>Under $500k</option>
                <option>$500k - $1M</option>
              </select>
            </div>
            <button className="bg-[#8d2926] text-[#ffffff] px-[38px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#c02b0a] transition-colors duration-[200ms] w-full sm:w-auto flex-shrink-0">
              Get Results
            </button>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="px-[20px] sm:px-[50px] py-[60px] sm:py-[80px]">
          <h2 className="font-['freight-big-pro'] font-[900] text-[38px] sm:text-[50px] mb-[40px] sm:mb-[60px] text-center">Properties For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[38px]">
            {/* Card 1 */}
            <div className="bg-[#ffffff] border-[1px] border-[#cecaca] rounded-[10px] overflow-hidden hover:border-[#8d2926] transition-colors duration-[300ms] group cursor-pointer">
              <div className="h-56 w-full relative">
                <img src="/images/property-1.jpeg" alt="Sunset Ridge Villa" className="w-full h-full object-cover rounded-t-xl" />
                <div className="absolute top-[20px] left-[20px] bg-[#8d2926] text-[#ffffff] px-[16px] py-[1px] h-[29px] rounded-[2px] font-['Roboto'] font-[500] text-[12px] flex items-center">For Sale</div>
              </div>
              <div className="p-[24px] sm:p-[38px] flex flex-col gap-[20px] sm:gap-[29px]">
                <div>
                  <h3 className="font-['niveau-grotesk'] font-[600] text-[20px]">Sunset Ridge Villa</h3>
                  <div className="font-['Roboto'] font-[400] text-[#888989] text-[14px] mt-[1px]">Beverly Hills, CA</div>
                </div>
                <div className="font-['freight-big-pro'] font-[900] text-[32px] sm:text-[35px] text-[#8d2926]">$1,250,000</div>
                <div className="font-['Roboto'] font-[400] text-[#888989] flex gap-[20px] sm:gap-[29px] text-[14px]">
                  <span>4 Bed</span>
                  <span>3 Bath</span>
                  <span>3,200 sqft</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#ffffff] border-[1px] border-[#cecaca] rounded-[10px] overflow-hidden hover:border-[#1a73e8] transition-colors duration-[300ms] group cursor-pointer">
              <div className="h-56 w-full relative">
                <img src="/images/property-2.jpeg" alt="The Manhattan Loft" className="w-full h-full object-cover rounded-t-xl" />
                <div className="absolute top-[20px] left-[20px] bg-[#8d2926] text-[#ffffff] px-[16px] py-[1px] h-[29px] rounded-[2px] font-['Roboto'] font-[500] text-[12px] flex items-center">For Rent</div>
              </div>
              <div className="p-[24px] sm:p-[38px] flex flex-col gap-[20px] sm:gap-[29px]">
                <div>
                  <h3 className="font-['niveau-grotesk'] font-[600] text-[20px]">The Manhattan Loft</h3>
                  <div className="font-['Roboto'] font-[400] text-[#888989] text-[14px] mt-[1px]">Upper East Side, New York</div>
                </div>
                <div className="font-['freight-big-pro'] font-[900] text-[32px] sm:text-[35px] text-[#8d2926]">$8,500/mo</div>
                <div className="font-['Roboto'] font-[400] text-[#888989] flex gap-[20px] sm:gap-[29px] text-[14px]">
                  <span>2 Bed</span>
                  <span>2 Bath</span>
                  <span>1,100 sqft</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#ffffff] border-[1px] border-[#cecaca] rounded-[10px] overflow-hidden hover:border-[#8d2926] transition-colors duration-[300ms] group cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="h-56 w-full relative">
                <img src="/images/property-3.jpeg" alt="Lakefront Estate" className="w-full h-full object-cover rounded-t-xl" />
                <div className="absolute top-[20px] left-[20px] bg-[#8d2926] text-[#ffffff] px-[16px] py-[1px] h-[29px] rounded-[2px] font-['Roboto'] font-[500] text-[12px] flex items-center">For Sale</div>
              </div>
              <div className="p-[24px] sm:p-[38px] flex flex-col gap-[20px] sm:gap-[29px]">
                <div>
                  <h3 className="font-['niveau-grotesk'] font-[600] text-[20px]">Lakefront Estate</h3>
                  <div className="font-['Roboto'] font-[400] text-[#888989] text-[14px] mt-[1px]">Lake Travis, Austin TX</div>
                </div>
                <div className="font-['freight-big-pro'] font-[900] text-[32px] sm:text-[35px] text-[#8d2926]">$2,800,000</div>
                <div className="font-['Roboto'] font-[400] text-[#888989] flex gap-[20px] sm:gap-[29px] text-[14px]">
                  <span>5 Bed</span>
                  <span>5 Bath</span>
                  <span>5,400 sqft</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-[#000000] text-[#ffffff] py-[50px] sm:py-[60px] px-[20px] sm:px-[50px]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[30px] sm:gap-[50px] text-center">
            <div className="flex flex-col gap-[1px]">
              <div className="font-['freight-big-pro'] font-[900] text-[40px] sm:text-[50px]">8,500+</div>
              <div className="font-['Poppins'] font-[300] text-[#cecaca]">Properties</div>
            </div>
            <div className="flex flex-col gap-[1px]">
              <div className="font-['freight-big-pro'] font-[900] text-[40px] sm:text-[50px]">97%</div>
              <div className="font-['Poppins'] font-[300] text-[#cecaca]">Client Satisfaction</div>
            </div>
            <div className="flex flex-col gap-[1px]">
              <div className="font-['freight-big-pro'] font-[900] text-[40px] sm:text-[50px]">$4.2B+</div>
              <div className="font-['Poppins'] font-[300] text-[#cecaca]">Transactions Closed</div>
            </div>
            <div className="flex flex-col gap-[1px]">
              <div className="font-['freight-big-pro'] font-[900] text-[40px] sm:text-[50px]">38</div>
              <div className="font-['Poppins'] font-[300] text-[#cecaca]">States Covered</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#f3f3f3] py-[60px] sm:py-[80px] px-[20px] sm:px-[50px]">
          <h2 className="font-['freight-big-pro'] font-[900] text-[38px] sm:text-[50px] mb-[50px] sm:mb-[65px] text-center">How It All Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px] sm:gap-[50px]">
            <div className="flex flex-col gap-[29px] relative">
              <div className="font-['freight-big-pro'] font-[900] text-[#cecaca] text-[80px] leading-none opacity-50 absolute top-[-38px] left-0 z-0">1</div>
              <div className="relative z-10">
                <div className="w-[60px] h-[60px] bg-[#ffffff] rounded-[15px] flex items-center justify-center mb-[29px]">
                  <div className="w-[35px] h-[35px] border-[2px] border-[#8d2926] rounded-[5px] flex items-center justify-center">
                    <Search size={24} color="#8d2926" />
                  </div>
                </div>
                <h3 className="font-['niveau-grotesk'] font-[600] text-[24px]">Discover</h3>
                <p className="font-['Poppins'] font-[300] text-[#404042] mt-[1px]">Browse our extensive collection of premium properties tailored to your specific needs.</p>
              </div>
            </div>
            <div className="flex flex-col gap-[29px] relative">
              <div className="font-['freight-big-pro'] font-[900] text-[#cecaca] text-[80px] leading-none opacity-50 absolute top-[-38px] left-0 z-0">2</div>
              <div className="relative z-10">
                <div className="w-[60px] h-[60px] bg-[#ffffff] rounded-[15px] flex items-center justify-center mb-[29px]">
                  <div className="w-[35px] h-[35px] border-[2px] border-[#8d2926] rounded-[5px] flex items-center justify-center">
                    <MessageCircle size={24} color="#8d2926" />
                  </div>
                </div>
                <h3 className="font-['niveau-grotesk'] font-[600] text-[24px]">Connect</h3>
                <p className="font-['Poppins'] font-[300] text-[#404042] mt-[1px]">Get in touch with our expert agents who will guide you through the process.</p>
              </div>
            </div>
            <div className="flex flex-col gap-[29px] relative">
              <div className="font-['freight-big-pro'] font-[900] text-[#cecaca] text-[80px] leading-none opacity-50 absolute top-[-38px] left-0 z-0">3</div>
              <div className="relative z-10">
                <div className="w-[60px] h-[60px] bg-[#ffffff] rounded-[15px] flex items-center justify-center mb-[29px]">
                  <div className="w-[35px] h-[35px] border-[2px] border-[#8d2926] rounded-[5px] flex items-center justify-center">
                    <HomeIcon size={24} color="#8d2926" />
                  </div>
                </div>
                <h3 className="font-['niveau-grotesk'] font-[600] text-[24px]">Visit</h3>
                <p className="font-['Poppins'] font-[300] text-[#404042] mt-[1px]">Schedule private viewings of your selected properties at your convenience.</p>
              </div>
            </div>
            <div className="flex flex-col gap-[29px] relative">
              <div className="font-['freight-big-pro'] font-[900] text-[#cecaca] text-[80px] leading-none opacity-50 absolute top-[-38px] left-0 z-0">4</div>
              <div className="relative z-10">
                <div className="w-[60px] h-[60px] bg-[#ffffff] rounded-[15px] flex items-center justify-center mb-[29px]">
                  <div className="w-[35px] h-[35px] border-[2px] border-[#8d2926] rounded-[5px] flex items-center justify-center">
                    <CheckCircle size={24} color="#8d2926" />
                  </div>
                </div>
                <h3 className="font-['niveau-grotesk'] font-[600] text-[24px]">Close</h3>
                <p className="font-['Poppins'] font-[300] text-[#404042] mt-[1px]">Finalize the deal smoothly with our comprehensive legal and financial support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#ffffff] py-[60px] sm:py-[80px] px-[20px] sm:px-[50px]">
          <h2 className="font-['freight-big-pro'] font-[900] text-[38px] sm:text-[50px] mb-[50px] sm:mb-[65px] text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[38px]">
            {/* Testimonial 1 */}
            <div className="border-[1px] border-[#cecaca] rounded-[10px] p-[30px] sm:p-[50px] flex flex-col gap-[24px] sm:gap-[29px]">
              <div className="text-[#8d2926] text-[20px]">★★★★★</div>
              <p className="font-['Poppins'] font-[300] italic text-[#404042] flex-1">
                &quot;Apex Realty found us our dream home in Austin in under 3 weeks. Maya was incredibly helpful from the first message.&quot;
              </p>
              <div className="flex items-center gap-[20px] sm:gap-[29px]">
                <div className="w-[50px] h-[50px] rounded-[50px] bg-[#8d2926] text-[#ffffff] flex items-center justify-center font-['Roboto'] font-[500] flex-shrink-0">JS</div>
                <div>
                  <div className="font-['niveau-grotesk'] font-[600] text-[16px]">James &amp; Sarah T.</div>
                  <div className="font-['Roboto'] text-[#888989] text-[14px]">Bought in Austin, TX</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="border-[1px] border-[#cecaca] rounded-[10px] p-[30px] sm:p-[50px] flex flex-col gap-[24px] sm:gap-[29px]">
              <div className="text-[#8d2926] text-[20px]">★★★★★</div>
              <p className="font-['Poppins'] font-[300] italic text-[#404042] flex-1">
                &quot;As a first-time buyer in NYC, I was overwhelmed. Their team made the whole process smooth and stress-free.&quot;
              </p>
              <div className="flex items-center gap-[20px] sm:gap-[29px]">
                <div className="w-[50px] h-[50px] rounded-[50px] bg-[#8d2926] text-[#ffffff] flex items-center justify-center font-['Roboto'] font-[500] flex-shrink-0">ML</div>
                <div>
                  <div className="font-['niveau-grotesk'] font-[600] text-[16px]">Marcus L.</div>
                  <div className="font-['Roboto'] text-[#888989] text-[14px]">Renting in Manhattan</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="border-[1px] border-[#cecaca] rounded-[10px] p-[30px] sm:p-[50px] flex flex-col gap-[24px] sm:gap-[29px] sm:col-span-2 lg:col-span-1">
              <div className="text-[#8d2926] text-[20px]">★★★★★</div>
              <p className="font-['Poppins'] font-[300] italic text-[#404042] flex-1">
                &quot;Sold our Malibu property 18% above asking price. Their market knowledge is unmatched.&quot;
              </p>
              <div className="flex items-center gap-[20px] sm:gap-[29px]">
                <div className="w-[50px] h-[50px] rounded-[50px] bg-[#8d2926] text-[#ffffff] flex items-center justify-center font-['Roboto'] font-[500] flex-shrink-0">CW</div>
                <div>
                  <div className="font-['niveau-grotesk'] font-[600] text-[16px]">Christine W.</div>
                  <div className="font-['Roboto'] text-[#888989] text-[14px]">Sold in Malibu, CA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#8d2926] text-[#ffffff] py-[60px] sm:py-[86px] px-[20px] sm:px-[50px] text-center flex flex-col items-center gap-[30px] sm:gap-[35px]">
          <h2 className="font-['freight-big-pro'] font-[900] text-[40px] sm:text-[60px] leading-tight">Ready To Find Your Next Home?</h2>
          <p className="font-['Poppins'] font-[300] text-[17px] sm:text-[20px] max-w-[600px] text-opacity-90">
            Talk to Maya, our AI assistant, and get matched with the right home in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[29px] mt-[10px] sm:mt-[29px] w-full sm:w-auto">
            <button className="bg-[#ffffff] text-[#8d2926] px-[43px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#f3f3f3] transition-colors duration-[200ms]">
              Contact An Agent
            </button>
            <button onClick={() => window.dispatchEvent(new Event('open-maya'))} className="border-[1px] border-[#ffffff] text-[#ffffff] px-[43px] h-[50px] rounded-[5px] font-['Roboto'] font-[500] hover:bg-[#ffffff] hover:text-[#8d2926] transition-colors duration-[200ms] cursor-pointer">
              Learn About Maya
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#000000] py-[50px] sm:py-[65px] px-[20px] sm:px-[50px]">
        <div className="flex flex-col sm:flex-row justify-between gap-[40px] sm:gap-[50px] pb-[50px] sm:pb-[65px] border-b-[1px] border-[#404042]">
          <div className="sm:w-[300px]">
            <div className="font-['freight-big-pro'] font-[900] text-[30px] sm:text-[35px] text-[#ffffff] mb-[20px] sm:mb-[29px]">Apex Realty</div>
            <p className="font-['Poppins'] font-[300] text-[#888989]">
              Premier real estate agency helping you find the perfect property that fits your lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-[30px] sm:gap-[90px]">
            <div className="flex flex-col gap-[20px] sm:gap-[29px]">
              <h4 className="font-['niveau-grotesk'] text-[#ffffff] font-[600]">Properties</h4>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Buy</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Rent</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Commercial</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">New Projects</a>
            </div>
            <div className="flex flex-col gap-[20px] sm:gap-[29px]">
              <h4 className="font-['niveau-grotesk'] text-[#ffffff] font-[600]">Company</h4>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">About Us</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Agents</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Careers</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Blog</a>
            </div>
            <div className="flex flex-col gap-[20px] sm:gap-[29px]">
              <h4 className="font-['niveau-grotesk'] text-[#ffffff] font-[600]">Support</h4>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Contact</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">FAQ</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Privacy Policy</a>
              <a href="#" className="font-['Roboto'] font-[400] text-[#cecaca] hover:text-[#ffffff] transition-colors duration-[150ms]">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="pt-[30px] sm:pt-[38px] text-center font-['Roboto'] font-[300] text-[#888989] text-[14px]">
          © 2025 Apex Realty. All rights reserved. · Powered by UPSERA
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}