import { Link } from 'react-router-dom';

export default function AboutPage() {
  const boardMembers = [
    {
      name: 'Dr. Sarah Nakato',
      role: 'Executive Director',
      bio: 'Passionate educator with 15+ years of experience in child development and NGO management across East Africa.',
      image:
        'https://public.readdy.ai/ai/img_res/f12c8ec9405299ad66385e54318f228d.jpg',
    },
    {
      name: 'James Okello',
      role: 'Board Chairman',
      bio: "Former education minister with deep commitment to transforming Uganda's education system and supporting vulnerable children.",
      image:
        'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20distinguished%20African%20man%20board%20chairman%20in%20formal%20suit%2C%20confident%20expression%2C%20office%20background%2C%20professional%20headshot%20photography%2C%20authentic%20Ugandan%20leader%2C%20experienced%20and%20trustworthy%20appearance&width=400&height=400&seq=board-member-002&orientation=squarish',
    },
    {
      name: 'Grace Nambi',
      role: 'Programs Director',
      bio: 'Social worker specializing in child welfare and community development with extensive field experience in rural Uganda.',
      image:
        'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20warm%20African%20woman%20programs%20director%20in%20smart%20casual%20attire%2C%20friendly%20smile%2C%20natural%20office%20lighting%2C%20professional%20headshot%20photography%2C%20authentic%20Ugandan%20professional%2C%20compassionate%20and%20dedicated&width=400&height=400&seq=board-member-003&orientation=squarish',
    },
    {
      name: 'David Musoke',
      role: 'Finance Director',
      bio: 'Certified accountant ensuring transparency and accountability in all financial operations and donor fund management.',
      image:
        'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20serious%20African%20man%20finance%20director%20in%20business%20suit%2C%20professional%20demeanor%2C%20office%20setting%2C%20professional%20headshot%20photography%2C%20authentic%20Ugandan%20professional%2C%20trustworthy%20and%20detail-oriented&width=400&height=400&seq=board-member-004&orientation=squarish',
    },
    {
      name: 'Rebecca Atim',
      role: 'Community Outreach Coordinator',
      bio: 'Grassroots organizer building strong relationships with communities and families across 12 districts in Uganda.',
      image:
        'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20energetic%20African%20woman%20community%20coordinator%20in%20colorful%20professional%20attire%2C%20bright%20smile%2C%20natural%20setting%2C%20professional%20headshot%20photography%2C%20authentic%20Ugandan%20professional%2C%20warm%20and%20engaging&width=400&height=400&seq=board-member-005&orientation=squarish',
    },
    {
      name: 'Peter Ssemakula',
      role: 'Education Advisor',
      bio: 'Retired headmaster with 30 years of teaching experience, providing strategic guidance on educational programs.',
      image:
        'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20wise%20African%20man%20education%20advisor%20in%20smart%20casual%20attire%2C%20gentle%20smile%2C%20library%20or%20classroom%20background%2C%20professional%20headshot%20photography%2C%20authentic%20Ugandan%20educator%2C%20experienced%20and%20knowledgeable&width=400&height=400&seq=board-member-006&orientation=squarish',
    },
  ];

  const timeline = [
    {
      year: '2016',
      title: 'Foundation',
      description:
        'Educate an Orphan Uganda was founded by a group of passionate educators and community leaders who witnessed the devastating impact of the education gap on vulnerable children.',
      image:
        'https://readdy.ai/api/search-image?query=small%20group%20of%20African%20educators%20and%20community%20leaders%20meeting%20together%20planning%20education%20initiative%2C%20hopeful%20beginning%2C%20simple%20office%20setting%2C%20documentary%20photography%20style%2C%20authentic%20Ugandan%20community%20organizing%2C%20warm%20natural%20lighting&width=600&height=400&seq=timeline-2016-001&orientation=landscape',
    },
    {
      year: '2017',
      title: 'First 100 Children',
      description:
        'We enrolled our first 100 children in the program, providing school fees and basic scholastic materials. The transformation in their lives was immediate and inspiring.',
      image:
        'https://readdy.ai/api/search-image?query=group%20of%20happy%20Ugandan%20children%20in%20new%20school%20uniforms%20holding%20books%20and%20school%20supplies%2C%20celebrating%20educational%20opportunity%2C%20outdoor%20school%20setting%2C%20joyful%20expressions%2C%20documentary%20photography%20capturing%20authentic%20moment%20of%20hope&width=600&height=400&seq=timeline-2017-001&orientation=landscape',
    },
    {
      year: '2018',
      title: 'Expansion to 5 Districts',
      description:
        'Growing demand led us to expand operations to five districts across Uganda, establishing partnerships with local schools and community organizations.',
      image:
        'https://readdy.ai/api/search-image?query=map%20of%20Uganda%20with%20marked%20locations%2C%20community%20meeting%20with%20local%20leaders%20and%20educators%2C%20partnership%20building%2C%20rural%20and%20urban%20settings%2C%20documentary%20style%20showing%20organizational%20growth%20and%20community%20collaboration&width=600&height=400&seq=timeline-2018-001&orientation=landscape',
    },
    {
      year: '2019',
      title: 'Sanitary Support Program',
      description:
        'Recognizing that many girls were missing school during menstruation, we launched our sanitary support program, dramatically improving attendance rates.',
      image:
        'https://readdy.ai/api/search-image?query=African%20female%20students%20in%20classroom%20setting%2C%20educational%20health%20program%2C%20dignified%20and%20respectful%20imagery%2C%20girls%20attending%20school%20confidently%2C%20supportive%20environment%2C%20natural%20lighting%2C%20documentary%20photography%20showing%20empowerment%20through%20education&width=600&height=400&seq=timeline-2019-001&orientation=landscape',
    },
    {
      year: '2020',
      title: 'COVID-19 Response',
      description:
        'During school closures, we distributed learning materials to homes and provided emergency food support to families, ensuring children could continue learning.',
      image:
        'https://readdy.ai/api/search-image?query=community%20volunteers%20distributing%20educational%20materials%20and%20supplies%20to%20families%20in%20Uganda%2C%20safe%20distance%20protocols%2C%20outdoor%20distribution%2C%20hopeful%20atmosphere%20despite%20challenges%2C%20documentary%20photography%20showing%20resilience%20and%20adaptation&width=600&height=400&seq=timeline-2020-001&orientation=landscape',
    },
    {
      year: '2021',
      title: 'First Annual Run',
      description:
        'We launched the Educate an Orphan Run, bringing together over 500 participants and raising significant funds while building community awareness.',
      image:
        'https://readdy.ai/api/search-image?query=large%20group%20of%20diverse%20runners%20at%20charity%20race%20start%20line%20in%20Uganda%2C%20colorful%20event%20t-shirts%2C%20energetic%20atmosphere%2C%20community%20celebration%2C%20outdoor%20event%20with%20banners%20and%20flags%2C%20action%20photography%20capturing%20movement%20and%20unity&width=600&height=400&seq=timeline-2021-001&orientation=landscape',
    },
    {
      year: '2022',
      title: 'Reaching 2,000 Children',
      description:
        'Our programs reached a milestone of supporting 2,000 children across 10 districts, with measurable improvements in academic performance and school retention.',
      image:
        'https://readdy.ai/api/search-image?query=large%20gathering%20of%20Ugandan%20school%20children%20in%20uniforms%20celebrating%20achievement%2C%20diverse%20ages%2C%20joyful%20expressions%2C%20school%20compound%20setting%2C%20aerial%20view%20showing%20scale%2C%20documentary%20photography%20capturing%20milestone%20moment&width=600&height=400&seq=timeline-2022-001&orientation=landscape',
    },
    {
      year: '2023',
      title: 'School-Building Vision',
      description:
        'We announced our ambitious plan to build and operate our own school, creating a model institution for quality education in Uganda.',
      image:
        'https://readdy.ai/api/search-image?query=architectural%20rendering%20or%20groundbreaking%20ceremony%20for%20new%20school%20building%20in%20Uganda%2C%20community%20leaders%20with%20shovels%2C%20hopeful%20future%20vision%2C%20construction%20site%20with%20plans%2C%20professional%20photography%20showing%20beginning%20of%20major%20project&width=600&height=400&seq=timeline-2023-001&orientation=landscape',
    },
    {
      year: '2024',
      title: 'Today',
      description:
        'We now support 2,847 children across 12 districts, with a dedicated team of staff and volunteers working tirelessly to expand our impact every day.',
      image:
        'https://readdy.ai/api/search-image?query=modern%20vibrant%20scene%20of%20Ugandan%20students%20learning%20with%20tablets%20and%20books%20in%20well-equipped%20classroom%2C%20engaged%20teacher%2C%20contemporary%20educational%20setting%2C%20natural%20lighting%2C%20professional%20photography%20showing%20current%20state%20of%20thriving%20program&width=600&height=400&seq=timeline-2024-001&orientation=landscape',
    },
  ];

  const values = [
    {
      icon: 'ri-book-open-line',
      title: 'Education First',
      description:
        'We believe education is the most powerful tool for breaking the cycle of poverty and transforming communities.',
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Integrity',
      description:
        'We operate with complete transparency and accountability in all our programs and financial operations.',
    },
    {
      icon: 'ri-eye-line',
      title: 'Transparency',
      description:
        "Every donor deserves to know exactly how their contribution is making a difference in children's lives.",
    },
    {
      icon: 'ri-heart-line',
      title: 'Compassion',
      description:
        'We treat every child with dignity, respect, and the love they deserve as they pursue their educational dreams.',
    },
  ];

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-white">
        {/* Hero Section - Mobile-First Design */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image - Full Screen on Mobile, Split on Desktop */}
          <div className="absolute inset-0 md:hidden">
            <img
              src="https://readdy.ai/api/search-image?query=heartwarming%20scene%20of%20African%20educators%20and%20volunteers%20with%20Ugandan%20children%20in%20school%20setting%2C%20genuine%20smiles%20and%20connection%2C%20natural%20outdoor%20lighting%2C%20authentic%20community%20interaction%2C%20diverse%20group%20showing%20teamwork%20and%20care%2C%20documentary%20photography%20style%20capturing%20real%20moment%20of%20educational%20support&width=800&height=1000&seq=about-hero-001&orientation=portrait"
              alt="Our Team"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            {/* Mobile Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-teal-900/80"></div>
            {/* Mobile Pattern Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              ></div>
            </div>
          </div>

          {/* Desktop Layout - Split Screen */}
          <div className="hidden md:grid md:grid-cols-2 w-full">
            {/* Left Side - Brand Color */}
            <div className="bg-teal-700 py-24 px-12 flex items-center">
              <div className="max-w-xl">
                <h1 className="text-6xl font-bold text-white mb-6">
                  Educate an Orphan Uganda
                </h1>
                <div className="text-2xl text-teal-100 mb-12 font-light italic">
                  Est. 2016
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-teal-100 mb-3 uppercase tracking-wide">
                      Our Mission
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      To provide comprehensive educational support to orphaned
                      and vulnerable children in Uganda, ensuring access to
                      quality education and essential resources.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-teal-100 mb-3 uppercase tracking-wide">
                      Our Vision
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed">
                      A Uganda where every child has equal access to quality
                      education and the opportunity to reach their full
                      potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-full min-h-[600px]">
              <img
                src="https://readdy.ai/api/search-image?query=heartwarming%20scene%20of%20African%20educators%20and%20volunteers%20with%20Ugandan%20children%20in%20school%20setting%2C%20genuine%20smiles%20and%20connection%2C%20natural%20outdoor%20lighting%2C%20authentic%20community%20interaction%2C%20diverse%20group%20showing%20teamwork%20and%20care%2C%20documentary%20photography%20style%20capturing%20real%20moment%20of%20educational%20support&width=800&height=1000&seq=about-hero-001&orientation=portrait"
                alt="Our Team"
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-teal-700/20"></div>
            </div>
          </div>

          {/* Mobile Content - Overlay on Image */}
          <div className="relative z-10 md:hidden px-6 py-12 text-center">
            {/* Floating Logo/Brand */}
            <div className="mb-8">
              {/* Mobile: Big logo on top */}
              <div className="md:hidden mb-4">
                <img
                  src="/images/web-logo.png"
                  alt="Educate an Orphan Uganda"
                  className="w-48 h-48 mx-auto mb-2 object-contain"
                  style={{ marginBottom: '-40px', marginTop: '-20px' }}
                />
                <h1 className="text-3xl font-bold text-white text-center">
                  Educate an Orphan
                </h1>
                <div className="text-lg text-teal-100 text-center">Uganda</div>
              </div>

              {/* Desktop: Side-by-side layout */}
              <div className="hidden md:inline-flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 p-2">
                  <img
                    src="/images/web-logo.png"
                    alt="Educate an Orphan Uganda"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-white">
                    Educate an Orphan
                  </h1>
                  <div className="text-lg text-teal-100">Uganda</div>
                </div>
              </div>
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <span className="text-teal-100 text-sm font-medium">
                  Est. 2016
                </span>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="space-y-6 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center">
                    <i className="ri-target-line text-2xl text-amber-300"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-sm">
                  To provide comprehensive educational support to orphaned and
                  vulnerable children in Uganda, ensuring access to quality
                  education and essential resources.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-400/20 rounded-xl flex items-center justify-center">
                    <i className="ri-eye-line text-2xl text-teal-300"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-white/90 leading-relaxed text-sm">
                  A Uganda where every child has equal access to quality
                  education and the opportunity to reach their full potential.
                </p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-12">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Join Our Journey</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 right-6 w-8 h-8 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-32 left-8 w-12 h-12 bg-teal-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-6 h-6 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Our Journey
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                From a small group of passionate educators to an organization
                transforming thousands of lives across Uganda
              </p>
            </div>

            {/* Desktop Timeline - Hidden on Mobile */}
            <div className="relative hidden md:block">
              {/* Timeline Spine */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>

              {/* Timeline Items */}
              <div className="space-y-24">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    {/* Content */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}
                    >
                      <div className="inline-block px-6 py-2 bg-amber-500 text-white font-bold rounded-full mb-4">
                        {item.year}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Image */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? 'pl-16' : 'pr-16'}`}
                    >
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline - Vertical Layout */}
            <div className="md:hidden relative">
              {/* Mobile Timeline Spine */}
              <div className="absolute left-6 top-0 w-0.5 h-full bg-teal-200"></div>

              {/* Mobile Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-16">
                    {/* Timeline Node */}
                    <div className="absolute left-3.5 top-2 w-5 h-5 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Year Badge */}
                    <div className="inline-block px-4 py-1.5 bg-amber-500 text-white text-sm font-bold rounded-full mb-3">
                      {item.year}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      {/* Image */}
                      <div className="w-full h-48">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Text Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Board Members Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Leadership & Governance
              </h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {boardMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/90 transition-all duration-300 flex items-center justify-center p-8">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-teal-200 mb-4 text-lg">
                        {member.role}
                      </p>
                      <p className="text-sm leading-relaxed text-white/90">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Default Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-teal-200">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every action
                we take
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${value.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-teal-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-teal-100 mb-12 leading-relaxed">
              Together, we can create lasting change in the lives of Uganda's
              most vulnerable children
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/donate"
                className="px-10 py-5 bg-amber-500 text-white text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer"
              >
                Support Our Work
              </Link>
              <Link
                to="/get-involved"
                className="px-10 py-5 bg-white text-teal-700 text-lg font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
