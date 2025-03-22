import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0B0B1E]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,#000_70%,transparent_110%)] opacity-20" />
        
        {/* Main Gradient Blooms */}
        <div className="absolute w-[1000px] h-[1000px] -top-[400px] -left-[300px] bg-blue-500/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute w-[800px] h-[800px] -bottom-[300px] -right-[300px] bg-purple-500/10 rounded-full blur-[100px] opacity-40" />
        <div className="absolute w-[600px] h-[600px] top-[40%] left-[40%] bg-indigo-500/10 rounded-full blur-[80px] opacity-30" />
        
        {/* Additional Medium Blooms */}
        <div className="absolute w-[450px] h-[450px] top-[15%] right-[15%] bg-blue-400/5 rounded-full blur-[90px]" />
        <div className="absolute w-[550px] h-[550px] bottom-[25%] left-[10%] bg-purple-400/5 rounded-full blur-[110px]" />
        <div className="absolute w-[350px] h-[350px] top-[55%] right-[25%] bg-indigo-400/5 rounded-full blur-[70px]" />
        
        {/* Small Accent Blooms */}
        <div className="absolute w-[250px] h-[250px] top-[20%] left-[20%] bg-blue-300/3 rounded-full blur-[50px]" />
        <div className="absolute w-[200px] h-[200px] bottom-[35%] right-[30%] bg-purple-300/3 rounded-full blur-[40px]" />
        <div className="absolute w-[180px] h-[180px] top-[45%] left-[35%] bg-indigo-300/3 rounded-full blur-[35px]" />
        
        {/* Extra Small Subtle Glows */}
        <div className="absolute w-[150px] h-[150px] top-[30%] right-[40%] bg-blue-200/2 rounded-full blur-[30px]" />
        <div className="absolute w-[120px] h-[120px] bottom-[40%] left-[25%] bg-purple-200/2 rounded-full blur-[25px]" />
        <div className="absolute w-[100px] h-[100px] top-[60%] right-[15%] bg-indigo-200/2 rounded-full blur-[20px]" />
        
        {/* Very Subtle Star-like dots */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Products />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
