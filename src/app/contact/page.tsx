import ContactForm from '@/components/ContactForm';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-30">
      <h1 className="text-4xl font-bold mb-8">Get In Touch</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side: Info */}
        <div>
          <p className="text-lg text-zinc-400 mb-10">
            I'm currently looking for new opportunities or interesting projects to collaborate on. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="space-y-6">
            {/* Email Display */}
            <div className="flex items-center gap-4">
              <Mail className="text-blue-500" />
              <a 
                href="mailto:haristahirrana@gmail.com" 
                className="hover:text-blue-500 transition-colors"
              >
                haristahirrana@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-8">
              {/* GitHub */}
              <a 
                href="https://github.com/HarisTahir2003" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={28} />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/haristahirrana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}