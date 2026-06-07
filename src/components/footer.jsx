import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { footerGallery } from "../clientPages/mockTravelData";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-neutral-400">
      
      {/* 1. NEWSLETTER TOP-BAR */}
      <div className="border-b border-white/5 py-5">
        <div className="mx-auto max-w-[1170px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-serif font-bold text-white tracking-wide">Lovetravel</h2>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (4 CỘT) */}
      <div className="mx-auto max-w-[1170px] px-5 py-8 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* CONTACT US */}
          <div>
            <h3 className="font-serif text-[18px] font-semibold text-white mb-6 uppercase">CONTACT US</h3>
            <p className="text-[14px] leading-7 mb-6 text-neutral-400">
              You can visit our official office directly or contact us via email or phone:
            </p>
            <div className="space-y-4 text-[14px]">
              <p className="flex items-start gap-3"><MapPin className="h-5 w-5 text-[#6eb48c] mt-0.5" /> 01 Central Park, US, New York City</p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#6eb48c]" /> Phone: (012) 345 6789</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#6eb48c]" /> Email: pencidesign@gmail.com</p>
            </div>
            <div className="mt-6 flex gap-2">
              <SocialIcon Icon={Facebook} color="bg-[#3b5998]" />
              <SocialIcon Icon={Twitter} color="bg-[#00aced]" />
              <SocialIcon Icon={Instagram} color="bg-[#d6249f]" />
              <SocialIcon Icon={Linkedin} color="bg-[#0077b5]" />
              <SocialIcon Icon={Youtube} color="bg-[#cd201f]" />
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-serif text-[18px] font-semibold text-white mb-6 uppercase">COMPANY</h3>
            <ul className="space-y-3 text-[14px]">
              {["About", "Pricing", "Support", "Contact", "Cooperate", "Captioning"].map(item => (
                <li key={item}><a href="#" className="hover:text-[#6eb48c] transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3 className="font-serif text-[18px] font-semibold text-white mb-6 uppercase">USEFUL LINKS</h3>
            <ul className="space-y-3 text-[14px]">
              {["Privacy Policy", "Terms of Use", "Personal Information", "Register Account", "Corporate Information", "Apps & Products"].map(item => (
                <li key={item}><a href="#" className="hover:text-[#6eb48c] transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* RECENT POSTS */}
          <div>
            <h3 className="font-serif text-[18px] font-semibold text-white mb-6 uppercase">RECENT POSTS</h3>
            <div className="space-y-6">
              {footerGallery.slice(0, 3).map((post) => (
                <article key={post.id} className="flex gap-4">
                  <img src={post.image} alt="" className="w-[80px] h-[50px] object-cover" />
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-semibold text-white leading-tight hover:text-[#6eb48c] cursor-pointer line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcon = ({ Icon, color }) => (
  <a href="#" className={`flex h-9 w-9 items-center justify-center ${color} text-white transition hover:opacity-80`}>
    <Icon className="h-4 w-4" />
  </a>
);