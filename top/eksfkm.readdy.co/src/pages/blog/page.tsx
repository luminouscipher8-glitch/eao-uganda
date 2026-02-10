import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../../components/common/OptimizedImage';
import { FadeIn, SlideIn } from '../../components/common/MicroInteractions';
import { Clock, User, ArrowRight, Search, Heart, MessageCircle, Eye } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Transforming Lives: How Education Changed Sarah's Future",
    excerpt: "Meet Sarah, a 14-year-old from rural Uganda whose life was transformed through our educational sponsorship program. From struggling in basic literacy to excelling in mathematics, Sarah's journey inspires us all.",
    content: "Full article content here...",
    author: "Emily Johnson",
    authorAvatar: "/images/authors/emily.jpg",
    category: "Success Stories",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-20T10:00:00Z",
    readTime: 5,
    views: 1250,
    likes: 89,
    comments: 12,
    shares: 23,
    featured: true,
    tags: ["success", "education", "inspiration"]
  },
  {
    id: 2,
    title: "Building Schools, Building Futures: Our Latest Project in Northern Uganda",
    excerpt: "We're excited to announce the completion of our new school building in Northern Uganda, providing education access to over 300 children who previously had to walk miles to reach the nearest school.",
    content: "Full article content here...",
    author: "Michael Chen",
    authorAvatar: "/images/authors/michael.jpg",
    category: "Projects",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-18T14:30:00Z",
    readTime: 7,
    views: 890,
    likes: 67,
    comments: 8,
    shares: 15,
    featured: true,
    tags: ["infrastructure", "development", "community"]
  },
  {
    id: 3,
    title: "The Power of Community: How Local Volunteers Are Changing Education",
    excerpt: "Discover how our network of local volunteers is making a significant impact on education quality in remote villages, bringing hope and opportunity to thousands of children.",
    content: "Full article content here...",
    author: "Grace Nakato",
    authorAvatar: "/images/authors/grace.jpg",
    category: "Community",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-15T09:15:00Z",
    readTime: 6,
    views: 756,
    likes: 54,
    comments: 19,
    shares: 31,
    featured: false,
    tags: ["volunteers", "community", "impact"]
  },
  {
    id: 4,
    title: "Technology in Education: Bridging the Digital Divide",
    excerpt: "Learn how we're introducing digital learning tools in rural schools, preparing students for the future while maintaining cultural values and traditional knowledge.",
    content: "Full article content here...",
    author: "David Mwangi",
    authorAvatar: "/images/authors/david.jpg",
    category: "Innovation",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: 8,
    views: 623,
    likes: 41,
    comments: 6,
    shares: 18,
    featured: false,
    tags: ["technology", "digital", "future"]
  },
  {
    id: 5,
    title: "From Dropout to Scholar: James' Remarkable Journey",
    excerpt: "James was on the verge of dropping out when our mentorship program intervened. Today, he's studying to become a doctor and inspiring other children in his village.",
    content: "Full article content here...",
    author: "Sarah Williams",
    authorAvatar: "/images/authors/sarah.jpg",
    category: "Success Stories",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-10T11:20:00Z",
    readTime: 6,
    views: 1120,
    likes: 78,
    comments: 14,
    shares: 27,
    featured: false,
    tags: ["success", "mentorship", "inspiration"]
  }
];

const categories = ["All", "Success Stories", "Projects", "Community", "Innovation", "Updates"];
const featuredTopics = ["Education", "Community", "Technology", "Success Stories"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Hope</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Transformation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover inspiring stories from our community, learn about our impact, and see how education is changing lives across Uganda.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stories, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 shadow-sm"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {featuredTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSearchTerm(topic)}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200 hover:border-amber-300 transition-all duration-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="relative group cursor-pointer">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <OptimizedImage
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-full">
                          Featured Story
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-amber-600 font-medium text-sm">{featuredPost.category}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500 text-sm">{formatDate(featuredPost.publishedAt)}</span>
                        </div>
                        
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-amber-600 transition-colors duration-300">
                          {featuredPost.title}
                        </h2>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{featuredPost.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Eye className="w-4 h-4" />
                            <span className="text-sm">{featuredPost.views}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{featuredPost.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{featuredPost.comments}</span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/blog/${featuredPost.id}`}
                          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300"
                        >
                          Read Story
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <SlideIn key={post.id} delay={index * 100}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-amber-600 font-medium text-xs">{post.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-xs">{formatDate(post.publishedAt)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{post.readTime} min</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs">{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Heart className="w-3 h-3" />
                          <span className="text-xs">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="w-3 h-3" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-300"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Updated with Our Stories
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Get inspiring stories and updates delivered directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
