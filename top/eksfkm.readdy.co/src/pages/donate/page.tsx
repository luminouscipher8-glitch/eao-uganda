import { DonateStructuredData } from '../../components/seo/StructuredData';
import DonationForm from '../../components/forms/DonationForm';

export default function DonatePage() {
  return (
    <div className="pt-20">
      <DonateStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 to-orange-600/90"></div>
            <img
              src="https://public.readdy.ai/ai/img_res/a5c06f7bdd7e432e599ac1ef54d09652.jpg"
              alt="Children learning in classroom"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Make a{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Difference
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your generosity transforms lives and builds futures for Uganda's children
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Your Donation Changes Lives
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every contribution helps provide education, meals, and hope to children in need. 
                Join us in making a lasting impact.
              </p>
            </div>
            
            <DonationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
