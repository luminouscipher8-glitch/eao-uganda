import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OptimizedImage from '../../../components/common/OptimizedImage.tsx';
import { FadeIn, SlideIn } from '../../../components/common/MicroInteractions.tsx';
import { Calendar, Clock, User, ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Eye, Tag } from 'lucide-react';

// Mock blog post data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: 1,
    title: "Transforming Lives: How Education Changed Sarah's Future",
    excerpt: "Meet Sarah, a 14-year-old from rural Uganda whose life was transformed through our educational sponsorship program. From struggling in basic literacy to excelling in mathematics, Sarah's journey inspires us all.",
    content: `
      <p>Meet Sarah, a bright 14-year-old from the rural villages of Northern Uganda. Three years ago, Sarah's future seemed uncertain. Like many children in her community, she faced numerous barriers to education - from financial constraints to the lack of quality schools nearby.</p>
      
      <h2>The Beginning of a Journey</h2>
      <p>When our team first met Sarah, she was struggling with basic literacy and mathematics. Her parents, hardworking farmers, wanted the best for their daughter but simply couldn't afford the school fees and supplies needed for quality education.</p>
      
      <p>"I wanted to learn, but it was hard," Sarah recalls. "My parents tried their best, but there were days I had to miss school because we couldn't afford the bus fare."</p>
      
      <h2>Enter the Sponsorship Program</h2>
      <p>Through our educational sponsorship program, Sarah received comprehensive support that went beyond just covering her school fees. She received:</p>
      <ul>
        <li>Full tuition coverage at a quality local school</li>
        <li>Educational materials including books, uniforms, and supplies</li>
        <li>After-school tutoring and mentorship</li>
        <li>Nutritional support to ensure she could focus on her studies</li>
        <li>Regular health check-ups</li>
      </ul>
      
      <h2>The Transformation</h2>
      <p>The change in Sarah was remarkable. Within six months, her grades improved dramatically. She went from struggling with basic reading to becoming one of the top students in her class.</p>
      
      <p>"Sarah's dedication is incredible," says her teacher, Ms. Achieng. "She comes to school early, stays late for extra help, and always encourages other students. She's become a leader in her classroom."</p>
      
      <h2>Beyond Academics</h2>
      <p>But Sarah's transformation wasn't just academic. She developed confidence, leadership skills, and a passion for helping others. She now leads the school's environmental club and tutors younger students who are struggling with their studies.</p>
      
      <p>"I want to become a doctor," Sarah says with determination. "So I can help people in my community stay healthy. And I want to start a school someday, so other children like me can have the chance to learn."</p>
      
      <h2>The Ripple Effect</h2>
      <p>Sarah's success has inspired other children in her village. School enrollment has increased, and parents are more invested in their children's education. Her story has become a testament to the power of educational support.</p>
      
      <h2>Looking to the Future</h2>
      <p>Today, Sarah is preparing for her national examinations with confidence. Her teachers believe she has what it takes to earn a scholarship to a top secondary school. Her parents couldn't be prouder.</p>
      
      <p>"Every day, I thank God for this opportunity," Sarah's mother says. "Our daughter's future is bright, and it's all because someone believed in her potential."</p>
      
      <h2>How You Can Help</h2>
      <p>Sarah's story is just one of many. There are thousands of children across Uganda who, like Sarah, have the potential to succeed but lack the resources and support. Through our sponsorship program, we're changing that reality, one child at a time.</p>
      
      <p>When you sponsor a child, you're not just paying for school fees. You're investing in a future, empowering a family, and strengthening a community. You're giving a child like Sarah the chance to dream big and achieve those dreams.</p>
      
      <p><strong>Join us in transforming more lives. Consider sponsoring a child today.</strong></p>
    `,
    author: "Emily Johnson",
    authorAvatar: "/images/authors/emily.jpg",
    authorBio: "Emily is our Programs Director and has been working in educational development in Uganda for over 8 years.",
    category: "Success Stories",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    publishedAt: "2024-01-20T10:00:00Z",
    readTime: 5,
    views: 1250,
    likes: 89,
    comments: 12,
    shares: 23,
    featured: true,
    tags: ["success", "education", "inspiration", "sponsorship"]
  },
  {
    id: 2,
    title: "Building Schools, Building Futures: Our Latest Project in Northern Uganda",
    excerpt: "We're excited to announce the completion of our new school building in Northern Uganda, providing education access to over 300 children who previously had to walk miles to reach the nearest school.",
    content: `<p>Full article content here...</p>`,
    author: "Michael Chen",
    authorAvatar: "/images/authors/michael.jpg",
    authorBio: "Michael is our Infrastructure Development Manager and oversees all construction projects.",
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
  }
];

const relatedPosts = [
  {
    id: 3,
    title: "The Power of Community: How Local Volunteers Are Changing Education",
    excerpt: "Discover how our network of local volunteers is making a significant impact on education quality in remote villages.",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    readTime: 6,
    category: "Community"
  },
  {
    id: 4,
    title: "From Dropout to Scholar: James' Remarkable Journey",
    excerpt: "James was on the verge of dropping out when our mentorship program intervened. Today, he's studying to become a doctor.",
    featuredImage: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
    readTime: 6,
    category: "Success Stories"
  }
];

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState(blogPosts.find(p => p.id === parseInt(id || '1')));
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const foundPost = blogPosts.find(p => p.id === parseInt(id || '1'));
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-amber-600 hover:text-amber-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <FadeIn>
          {/* Category */}
          <div className="mb-6">
            <span className="px-4 py-2 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.authorBio}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views} views
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <OptimizedImage
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-amber prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-strong:text-gray-900 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-ul:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Engagement Bar */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isBookmarked 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </article>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideIn>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
                  <p className="text-gray-600 mb-4">{post.authorBio}</p>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors duration-300">
                      Follow
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <SlideIn key={relatedPost.id} delay={index * 100}>
                  <Link to={`/blog/${relatedPost.id}`} className="group block">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <OptimizedImage
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors duration-300">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">{relatedPost.readTime} min read</span>
                          </div>
                          <span className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-300">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SlideIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter CTA */}
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
