import {r, j as e, L as t} from "./index-CWbBFHrl.js";
function b() {
    const [p,d] = r.useState(!1)
      , [s,m] = r.useState({
        children: 0,
        districts: 0,
        years: 0,
        transparency: 0
    });
    return r.useEffect( () => {
        const a = () => {
            d(window.scrollY > 50)
        }
        ;
        return window.addEventListener("scroll", a),
        () => window.removeEventListener("scroll", a)
    }
    , []),
    r.useEffect( () => {
        const a = () => {
            const x = 33.333333333333336;
            let n = 0;
            const h = setInterval( () => {
                n++;
                const l = n / 60;
                m({
                    children: Math.floor(2847 * l),
                    districts: Math.floor(12 * l),
                    years: Math.floor(8 * l),
                    transparency: Math.floor(94 * l)
                }),
                n >= 60 && clearInterval(h)
            }
            , x)
        }
          , i = new IntersectionObserver(c => {
            c[0].isIntersecting && (a(),
            i.disconnect())
        }
        )
          , o = document.getElementById("impact-section");
        return o && i.observe(o),
        () => i.disconnect()
    }
    , []),
    e.jsxs("div", {
        className: "min-h-screen bg-white",
        children: [e.jsxs("section", {
            className: "relative h-screen w-full overflow-hidden",
            children: [e.jsxs("div", {
                className: "absolute inset-0",
                children: [e.jsx("video", {
                    autoPlay: !0,
                    loop: !0,
                    muted: !0,
                    playsInline: !0,
                    className: "w-full h-full object-cover",
                    poster: "https://public.readdy.ai/ai/img_res/3cc681e6458229e2005588fa41cbc6a6.jpg",
                    children: e.jsx("source", {
                        src: "https://readdy.ai/api/search-image?query=slow%20motion%20video%20of%20Ugandan%20school%20children%20learning%20in%20classroom&width=1920&height=1080&seq=hero-video-001&orientation=landscape",
                        type: "video/mp4"
                    })
                }), e.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"
                })]
            }), e.jsx("div", {
                className: "relative h-full flex items-center justify-center px-4 sm:px-6",
                children: e.jsxs("div", {
                    className: "max-w-4xl text-center",
                    children: [e.jsx("h1", {
                        className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg",
                        children: "Empowering Uganda's Future Through Education"
                    }), e.jsx("p", {
                        className: "text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 sm:mb-12 font-light max-w-3xl mx-auto leading-relaxed px-4",
                        children: "Every child deserves the opportunity to learn, grow, and transform their community through quality education"
                    }), e.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4",
                        children: [e.jsx(t, {
                            to: "/donate",
                            className: "w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 hover:scale-105 whitespace-nowrap cursor-pointer text-center",
                            children: "Donate Now"
                        }), e.jsx("a", {
                            href: "#impact",
                            className: "w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-3 border-white text-white text-base sm:text-lg font-semibold rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300 whitespace-nowrap cursor-pointer text-center",
                            children: "Our Impact"
                        })]
                    })]
                })
            }), e.jsx("div", {
                className: "absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce",
                children: e.jsx("i", {
                    className: "ri-arrow-down-line text-3xl sm:text-4xl text-white/80"
                })
            })]
        }), e.jsx("section", {
            className: "py-16 sm:py-24 px-4 sm:px-6 bg-white",
            children: e.jsx("div", {
                className: "max-w-6xl mx-auto",
                children: e.jsxs("div", {
                    className: "grid md:grid-cols-2 gap-12 sm:gap-16",
                    children: [e.jsxs("div", {
                        className: "space-y-4 sm:space-y-6",
                        children: [e.jsxs("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [e.jsx("div", {
                                className: "w-10 h-10 sm:w-12 sm:h-12 bg-amber-500 rounded-full flex items-center justify-center",
                                children: e.jsx("i", {
                                    className: "ri-compass-3-line text-xl sm:text-2xl text-white"
                                })
                            }), e.jsx("h3", {
                                className: "text-2xl sm:text-3xl font-bold text-gray-900",
                                children: "Our Mission"
                            })]
                        }), e.jsx("p", {
                            className: "text-base sm:text-lg text-gray-700 leading-relaxed",
                            children: "To provide comprehensive educational support to orphaned and vulnerable children in Uganda, ensuring they have access to quality education, essential school materials, and the resources needed to build a brighter future for themselves and their communities."
                        })]
                    }), e.jsxs("div", {
                        className: "space-y-4 sm:space-y-6",
                        children: [e.jsxs("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [e.jsx("div", {
                                className: "w-10 h-10 sm:w-12 sm:h-12 bg-teal-600 rounded-full flex items-center justify-center",
                                children: e.jsx("i", {
                                    className: "ri-eye-line text-xl sm:text-2xl text-white"
                                })
                            }), e.jsx("h3", {
                                className: "text-2xl sm:text-3xl font-bold text-gray-900",
                                children: "Our Vision"
                            })]
                        }), e.jsx("p", {
                            className: "text-base sm:text-lg text-gray-700 leading-relaxed",
                            children: "A Uganda where every child, regardless of their circumstances, has equal access to quality education and the opportunity to reach their full potential, breaking the cycle of poverty through knowledge and empowerment."
                        })]
                    })]
                })
            })
        }), e.jsx("section", {
            id: "impact",
            className: "relative overflow-hidden",
            children: e.jsxs("div", {
                id: "impact-section",
                className: "grid md:grid-cols-2",
                children: [e.jsx("div", {
                    className: "bg-teal-700 py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center",
                    children: e.jsxs("div", {
                        className: "grid grid-cols-2 gap-8 sm:gap-12 max-w-xl w-full",
                        children: [e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3",
                                children: s.children.toLocaleString()
                            }), e.jsx("div", {
                                className: "text-xs sm:text-sm uppercase tracking-wider text-teal-100",
                                children: "Children Supported"
                            })]
                        }), e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3",
                                children: s.districts
                            }), e.jsx("div", {
                                className: "text-xs sm:text-sm uppercase tracking-wider text-teal-100",
                                children: "Districts Reached"
                            })]
                        })]
                    })
                }), e.jsx("div", {
                    className: "bg-amber-50 py-16 sm:py-24 px-4 sm:px-6 flex items-center justify-center",
                    children: e.jsxs("div", {
                        className: "grid grid-cols-2 gap-8 sm:gap-12 max-w-xl w-full",
                        children: [e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-700 mb-2 sm:mb-3",
                                children: s.years
                            }), e.jsx("div", {
                                className: "text-xs sm:text-sm uppercase tracking-wider text-teal-600",
                                children: "Years of Service"
                            })]
                        }), e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsxs("div", {
                                className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-700 mb-2 sm:mb-3",
                                children: [s.transparency, "%"]
                            }), e.jsx("div", {
                                className: "text-xs sm:text-sm uppercase tracking-wider text-teal-600",
                                children: "Transparency Score"
                            })]
                        })]
                    })
                })]
            })
        }), e.jsx("section", {
            className: "py-16 sm:py-24 px-4 sm:px-6 bg-white",
            children: e.jsxs("div", {
                className: "max-w-7xl mx-auto",
                children: [e.jsxs("div", {
                    className: "mb-12 sm:mb-16",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-2 mb-4",
                        children: [e.jsx("i", {
                            className: "ri-book-open-line text-lg sm:text-xl text-amber-500"
                        }), e.jsx("span", {
                            className: "text-xs sm:text-sm uppercase tracking-wider text-amber-600 font-semibold",
                            children: "What We Do"
                        })]
                    }), e.jsxs("div", {
                        className: "grid md:grid-cols-2 gap-6 sm:gap-8",
                        children: [e.jsx("h2", {
                            className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight",
                            children: "Transforming Lives Through Education"
                        }), e.jsx("p", {
                            className: "text-base sm:text-lg text-gray-600 leading-relaxed flex items-center",
                            children: "We provide comprehensive support programs that address the educational needs of orphaned and vulnerable children across Uganda, from school fees to essential materials and beyond."
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "grid md:grid-cols-3 gap-6 sm:gap-8",
                    children: [e.jsxs(t, {
                        to: "/programs#education",
                        className: "group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer",
                        children: [e.jsx("img", {
                            src: "https://readdy.ai/api/search-image?query=Ugandan%20school%20children%20in%20clean%20uniforms%20with%20new%20textbooks%20and%20school%20supplies%20on%20wooden%20desk%2C%20bright%20classroom%20setting%2C%20natural%20lighting%2C%20authentic%20African%20educational%20materials%20including%20notebooks%20pencils%20and%20rulers%2C%20warm%20hopeful%20atmosphere%2C%20close-up%20documentary%20style%20photography%20showing%20details%20of%20scholastic%20materials&width=600&height=800&seq=program-education-001&orientation=portrait",
                            alt: "Education Support",
                            className: "w-full h-full object-cover object-top"
                        }), e.jsx("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        }), e.jsxs("div", {
                            className: "absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white",
                            children: [e.jsx("div", {
                                className: "w-12 sm:w-16 h-1 bg-amber-500 mb-3 sm:mb-4"
                            }), e.jsx("h3", {
                                className: "text-2xl sm:text-3xl font-bold mb-2 sm:mb-3",
                                children: "Education Support"
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed",
                                children: "School fees, scholastic materials, uniforms, and sanitary support for vulnerable children"
                            }), e.jsxs("span", {
                                className: "inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base",
                                children: ["Learn More ", e.jsx("i", {
                                    className: "ri-arrow-right-line"
                                })]
                            })]
                        })]
                    }), e.jsxs(t, {
                        to: "/programs#events",
                        className: "group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer",
                        children: [e.jsx("img", {
                            src: "https://readdy.ai/api/search-image?query=vibrant%20charity%20run%20event%20in%20Uganda%20with%20diverse%20participants%20running%20together%20wearing%20colorful%20athletic%20wear%20and%20event%20t-shirts%2C%20energetic%20atmosphere%2C%20community%20gathering%2C%20outdoor%20setting%20with%20Ugandan%20landscape%2C%20action%20photography%20capturing%20movement%20and%20joy%2C%20people%20of%20all%20ages%20participating%20in%20fundraising%20marathon&width=600&height=800&seq=program-events-001&orientation=portrait",
                            alt: "Runs & Events",
                            className: "w-full h-full object-cover object-top"
                        }), e.jsx("div", {
                            className: "absolute top-0 left-0 right-0 h-2 bg-amber-500"
                        }), e.jsx("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                        }), e.jsxs("div", {
                            className: "absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white",
                            children: [e.jsx("div", {
                                className: "w-12 sm:w-16 h-1 bg-teal-400 mb-3 sm:mb-4"
                            }), e.jsx("h3", {
                                className: "text-2xl sm:text-3xl font-bold mb-2 sm:mb-3",
                                children: "Runs & Events"
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed",
                                children: "Annual fundraising runs and community events that bring people together for education"
                            }), e.jsxs("span", {
                                className: "inline-flex items-center gap-2 text-teal-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base",
                                children: ["Learn More ", e.jsx("i", {
                                    className: "ri-arrow-right-line"
                                })]
                            })]
                        })]
                    }), e.jsxs(t, {
                        to: "/programs#school-building",
                        className: "group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 cursor-pointer",
                        children: [e.jsx("img", {
                            src: "https://readdy.ai/api/search-image?query=construction%20progress%20of%20modern%20school%20building%20in%20Uganda%2C%20architectural%20development%20showing%20new%20classroom%20blocks%20with%20large%20windows%2C%20construction%20site%20with%20workers%2C%20hopeful%20future%20vision%2C%20bright%20daylight%2C%20professional%20architectural%20photography%2C%20building%20materials%20and%20scaffolding%20visible%2C%20educational%20infrastructure%20development%20in%20rural%20African%20setting&width=600&height=800&seq=program-building-001&orientation=portrait",
                            alt: "School-Building Initiative",
                            className: "w-full h-full object-cover object-top"
                        }), e.jsx("div", {
                            className: "absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
                        }), e.jsxs("div", {
                            className: "absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white",
                            children: [e.jsx("div", {
                                className: "w-12 sm:w-16 h-1 bg-amber-500 mb-3 sm:mb-4"
                            }), e.jsx("h3", {
                                className: "text-2xl sm:text-3xl font-bold mb-2 sm:mb-3",
                                children: "School-Building Initiative"
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base text-white/90 mb-3 sm:mb-4 leading-relaxed",
                                children: "Our vision to own and operate a school that serves as a model for quality education"
                            }), e.jsxs("span", {
                                className: "inline-flex items-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all text-sm sm:text-base",
                                children: ["Learn More ", e.jsx("i", {
                                    className: "ri-arrow-right-line"
                                })]
                            })]
                        })]
                    })]
                })]
            })
        }), e.jsxs("section", {
            className: "relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden",
            children: [e.jsxs("div", {
                className: "absolute inset-0",
                children: [e.jsx("img", {
                    src: "https://readdy.ai/api/search-image?query=beautiful%20Uganda%20landscape%20with%20rolling%20green%20hills%20and%20scattered%20acacia%20trees%20at%20golden%20hour%2C%20peaceful%20rural%20African%20scenery%2C%20wide%20open%20spaces%2C%20natural%20beauty%2C%20slightly%20desaturated%20colors%20for%20elegant%20look%2C%20cinematic%20landscape%20photography%2C%20serene%20atmosphere%20representing%20hope%20and%20possibility&width=1920&height=800&seq=cta-background-001&orientation=landscape",
                    alt: "Uganda Landscape",
                    className: "w-full h-full object-cover object-top"
                }), e.jsx("div", {
                    className: "absolute inset-0 bg-black/30"
                })]
            }), e.jsx("div", {
                className: "relative max-w-4xl mx-auto",
                children: e.jsxs("div", {
                    className: "bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center",
                    children: [e.jsx("h2", {
                        className: "text-3xl sm:text-4xl md:text-5xl font-bold text-teal-700 mb-4 sm:mb-6",
                        children: "Every Child Deserves Education"
                    }), e.jsx("p", {
                        className: "text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto",
                        children: "Your support can transform a child's life forever. Join us in building a brighter future for Uganda's most vulnerable children through the power of education."
                    }), e.jsxs("div", {
                        className: "flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center",
                        children: [e.jsx(t, {
                            to: "/donate",
                            className: "w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-amber-500 text-white text-base sm:text-lg font-semibold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap cursor-pointer text-center",
                            children: "Donate Monthly"
                        }), e.jsx(t, {
                            to: "/donate",
                            className: "w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-teal-700 text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer text-center",
                            children: "One-Time Gift"
                        }), e.jsxs(t, {
                            to: "/get-involved",
                            className: "w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-teal-700 text-base sm:text-lg font-semibold rounded-full hover:bg-teal-50 transition-all duration-300 whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2",
                            children: ["Volunteer ", e.jsx("i", {
                                className: "ri-arrow-right-line"
                            })]
                        })]
                    })]
                })
            })]
        })]
    })
}
export {b as default};
//# sourceMappingURL=page-C1Ae36DV.js.map
