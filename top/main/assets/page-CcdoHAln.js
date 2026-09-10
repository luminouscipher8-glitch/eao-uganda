import {r as d, j as e, L as r} from "./index-CWbBFHrl.js";
function o() {
    const [l,m] = d.useState("2023")
      , i = [{
        year: "2023",
        quarter: "Q4",
        title: "2023 Annual Financial Report",
        date: "December 31, 2023",
        type: "Annual Report",
        pages: 45,
        size: "3.2 MB",
        highlights: "Record year with UGX 2.1B in revenue, 94% transparency rating"
    }, {
        year: "2023",
        quarter: "Q3",
        title: "Q3 2023 Financial Statement",
        date: "September 30, 2023",
        type: "Quarterly Report",
        pages: 18,
        size: "1.1 MB",
        highlights: "Expanded programs to 3 new districts"
    }, {
        year: "2023",
        quarter: "Q2",
        title: "Q2 2023 Financial Statement",
        date: "June 30, 2023",
        type: "Quarterly Report",
        pages: 16,
        size: "980 KB",
        highlights: "School-building project 35% complete"
    }, {
        year: "2023",
        quarter: "Q1",
        title: "Q1 2023 Financial Statement",
        date: "March 31, 2023",
        type: "Quarterly Report",
        pages: 15,
        size: "890 KB",
        highlights: "Launched monthly giving program"
    }, {
        year: "2022",
        quarter: "Annual",
        title: "2022 Annual Financial Report",
        date: "December 31, 2022",
        type: "Annual Report",
        pages: 42,
        size: "2.8 MB",
        highlights: "Served 2,000+ children across 8 districts"
    }, {
        year: "2021",
        quarter: "Annual",
        title: "2021 Annual Financial Report",
        date: "December 31, 2021",
        type: "Annual Report",
        pages: 38,
        size: "2.5 MB",
        highlights: "Expanded to reach 1,500 children"
    }]
      , t = {
        totalRevenue: "UGX 2.1B",
        programSpending: "70%",
        operationsSpending: "20%",
        fundraisingSpending: "10%",
        childrenSupported: "2,347",
        transparencyScore: "94%"
    }
      , x = [{
        icon: "ri-graduation-cap-line",
        label: "School Fees Paid",
        value: "2,347",
        color: "teal"
    }, {
        icon: "ri-book-2-line",
        label: "Books Distributed",
        value: "15,420",
        color: "amber"
    }, {
        icon: "ri-shirt-line",
        label: "Uniforms Provided",
        value: "3,580",
        color: "teal"
    }, {
        icon: "ri-heart-pulse-line",
        label: "Girls Supported",
        value: "1,245",
        color: "amber"
    }]
      , n = [{
        name: "KPMG Uganda",
        role: "External Auditor",
        years: "2021-2023",
        logo: "https://public.readdy.ai/ai/img_res/7ebc4f2d2a469100552597376cb96937.jpg"
    }, {
        name: "Grant Thornton",
        role: "Financial Advisor",
        years: "2022-2024",
        logo: "https://readdy.ai/api/search-image?query=financial%20advisory%20firm%20logo%20professional%20simple%20design%20white%20background%20clean%20corporate%20identity%20consulting%20services&width=200&height=120&seq=auditor-002&orientation=landscape"
    }];
    return e.jsxs("div", {
        className: "min-h-screen bg-white",
        children: [e.jsx("section", {
            className: "relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800",
            children: e.jsxs("div", {
                className: "max-w-6xl mx-auto",
                children: [e.jsxs("div", {
                    className: "text-white/80 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base",
                    children: [e.jsx(r, {
                        to: "/",
                        className: "hover:text-white transition-colors cursor-pointer",
                        children: "Home"
                    }), e.jsx("i", {
                        className: "ri-arrow-right-s-line"
                    }), e.jsx("span", {
                        children: "Financial Reports"
                    })]
                }), e.jsx("h1", {
                    className: "text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6",
                    children: "Financial Transparency"
                }), e.jsx("p", {
                    className: "text-lg sm:text-xl md:text-2xl text-teal-100 mb-8 sm:mb-12 max-w-3xl leading-relaxed",
                    children: "We believe in complete accountability. Every shilling is tracked, reported, and published for our donors and the communities we serve."
                }), e.jsxs("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6",
                    children: [e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.totalRevenue
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Total Revenue 2023"
                        })]
                    }), e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.programSpending
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Programs"
                        })]
                    }), e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.operationsSpending
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Operations"
                        })]
                    }), e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.fundraisingSpending
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Fundraising"
                        })]
                    }), e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.childrenSupported
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Children Supported"
                        })]
                    }), e.jsxs("div", {
                        className: "bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20",
                        children: [e.jsx("div", {
                            className: "text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2",
                            children: t.transparencyScore
                        }), e.jsx("div", {
                            className: "text-xs sm:text-sm text-teal-100",
                            children: "Transparency"
                        })]
                    })]
                })]
            })
        }), e.jsx("section", {
            className: "py-16 sm:py-20 md:py-24 px-4 sm:px-6",
            children: e.jsxs("div", {
                className: "max-w-6xl mx-auto",
                children: [e.jsxs("div", {
                    className: "mb-8 sm:mb-12",
                    children: [e.jsx("h2", {
                        className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6",
                        children: "Financial Reports Archive"
                    }), e.jsx("p", {
                        className: "text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed",
                        children: "Download our complete financial statements, audit reports, and impact assessments"
                    })]
                }), e.jsx("div", {
                    className: "flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12",
                    children: ["2023", "2022", "2021"].map(s => e.jsx("button", {
                        onClick: () => m(s),
                        className: `px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${l === s ? "bg-teal-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                        children: s
                    }, s))
                }), e.jsx("div", {
                    className: "grid sm:grid-cols-2 gap-6 sm:gap-8",
                    children: i.filter(s => s.year === l).map( (s, a) => e.jsxs("div", {
                        className: "bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-teal-600 hover:shadow-xl transition-all duration-300",
                        children: [e.jsxs("div", {
                            className: "flex items-start justify-between mb-4 sm:mb-6",
                            children: [e.jsx("div", {
                                className: "w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-xl flex items-center justify-center",
                                children: e.jsx("i", {
                                    className: "ri-file-text-line text-2xl sm:text-3xl text-teal-600"
                                })
                            }), e.jsx("span", {
                                className: "px-3 sm:px-4 py-1 sm:py-1.5 bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold rounded-full",
                                children: s.type
                            })]
                        }), e.jsx("h3", {
                            className: "text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3",
                            children: s.title
                        }), e.jsx("p", {
                            className: "text-sm sm:text-base text-gray-600 mb-3 sm:mb-4",
                            children: s.date
                        }), e.jsxs("div", {
                            className: "flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600",
                            children: [e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [e.jsx("i", {
                                    className: "ri-file-line"
                                }), " ", s.pages, " pages"]
                            }), e.jsxs("span", {
                                className: "flex items-center gap-1",
                                children: [e.jsx("i", {
                                    className: "ri-download-line"
                                }), " ", s.size]
                            })]
                        }), e.jsx("p", {
                            className: "text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed",
                            children: s.highlights
                        }), e.jsxs("button", {
                            className: "w-full py-3 sm:py-4 bg-teal-600 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap",
                            children: [e.jsx("i", {
                                className: "ri-download-2-line"
                            }), "Download Report"]
                        })]
                    }, a))
                })]
            })
        }), e.jsx("section", {
            className: "py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50",
            children: e.jsxs("div", {
                className: "max-w-6xl mx-auto",
                children: [e.jsxs("div", {
                    className: "text-center mb-12 sm:mb-16",
                    children: [e.jsx("h2", {
                        className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6",
                        children: "2023 Impact by Numbers"
                    }), e.jsx("p", {
                        className: "text-base sm:text-lg md:text-xl text-gray-600",
                        children: "See how your donations created real change"
                    })]
                }), e.jsx("div", {
                    className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16",
                    children: x.map( (s, a) => e.jsxs("div", {
                        className: "bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300",
                        children: [e.jsx("div", {
                            className: `w-16 h-16 sm:w-20 sm:h-20 bg-${s.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`,
                            children: e.jsx("i", {
                                className: `${s.icon} text-3xl sm:text-4xl text-${s.color}-600`
                            })
                        }), e.jsx("div", {
                            className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-3",
                            children: s.value
                        }), e.jsx("p", {
                            className: "text-sm sm:text-base text-gray-600 font-semibold",
                            children: s.label
                        })]
                    }, a))
                }), e.jsxs("div", {
                    className: "bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg",
                    children: [e.jsx("h3", {
                        className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center",
                        children: "How We Spend Your Donations"
                    }), e.jsxs("div", {
                        className: "max-w-2xl mx-auto space-y-6 sm:space-y-8",
                        children: [e.jsxs("div", {
                            children: [e.jsxs("div", {
                                className: "flex justify-between items-center mb-3 sm:mb-4",
                                children: [e.jsx("span", {
                                    className: "text-base sm:text-lg font-semibold text-gray-900",
                                    children: "Education Programs"
                                }), e.jsx("span", {
                                    className: "text-xl sm:text-2xl font-bold text-teal-600",
                                    children: "70%"
                                })]
                            }), e.jsx("div", {
                                className: "w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden",
                                children: e.jsx("div", {
                                    className: "bg-gradient-to-r from-teal-600 to-teal-500 h-full rounded-full",
                                    style: {
                                        width: "70%"
                                    }
                                })
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-2",
                                children: "UGX 1.47B - Direct support for children's education"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsxs("div", {
                                className: "flex justify-between items-center mb-3 sm:mb-4",
                                children: [e.jsx("span", {
                                    className: "text-base sm:text-lg font-semibold text-gray-900",
                                    children: "Operations & Administration"
                                }), e.jsx("span", {
                                    className: "text-xl sm:text-2xl font-bold text-amber-600",
                                    children: "20%"
                                })]
                            }), e.jsx("div", {
                                className: "w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden",
                                children: e.jsx("div", {
                                    className: "bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full",
                                    style: {
                                        width: "20%"
                                    }
                                })
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-2",
                                children: "UGX 420M - Staff, infrastructure, and program management"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsxs("div", {
                                className: "flex justify-between items-center mb-3 sm:mb-4",
                                children: [e.jsx("span", {
                                    className: "text-base sm:text-lg font-semibold text-gray-900",
                                    children: "Fundraising & Marketing"
                                }), e.jsx("span", {
                                    className: "text-xl sm:text-2xl font-bold text-gray-700",
                                    children: "10%"
                                })]
                            }), e.jsx("div", {
                                className: "w-full bg-gray-200 rounded-full h-4 sm:h-5 overflow-hidden",
                                children: e.jsx("div", {
                                    className: "bg-gradient-to-r from-gray-600 to-gray-500 h-full rounded-full",
                                    style: {
                                        width: "10%"
                                    }
                                })
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-2",
                                children: "UGX 210M - Events, donor relations, and awareness campaigns"
                            })]
                        })]
                    })]
                })]
            })
        }), e.jsx("section", {
            className: "py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white",
            children: e.jsxs("div", {
                className: "max-w-6xl mx-auto",
                children: [e.jsxs("div", {
                    className: "text-center mb-12 sm:mb-16",
                    children: [e.jsx("h2", {
                        className: "text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6",
                        children: "Independent Verification"
                    }), e.jsx("p", {
                        className: "text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
                        children: "Our financial reports are audited by internationally recognized firms to ensure accuracy and compliance"
                    })]
                }), e.jsx("div", {
                    className: "grid sm:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16",
                    children: n.map( (s, a) => e.jsxs("div", {
                        className: "bg-gray-50 rounded-xl sm:rounded-2xl p-8 sm:p-10 text-center border-2 border-gray-200",
                        children: [e.jsx("div", {
                            className: "h-20 sm:h-24 mb-6 sm:mb-8 flex items-center justify-center",
                            children: e.jsx("img", {
                                src: s.logo,
                                alt: s.name,
                                className: "max-h-full w-auto"
                            })
                        }), e.jsx("h3", {
                            className: "text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3",
                            children: s.name
                        }), e.jsx("p", {
                            className: "text-base sm:text-lg text-teal-600 font-semibold mb-2",
                            children: s.role
                        }), e.jsx("p", {
                            className: "text-sm sm:text-base text-gray-600",
                            children: s.years
                        })]
                    }, a))
                }), e.jsxs("div", {
                    className: "bg-teal-50 rounded-xl sm:rounded-2xl p-8 sm:p-12 border-2 border-teal-200",
                    children: [e.jsx("h3", {
                        className: "text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center",
                        children: "Our Certifications"
                    }), e.jsxs("div", {
                        className: "grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8",
                        children: [e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4",
                                children: e.jsx("i", {
                                    className: "ri-shield-check-line text-3xl sm:text-4xl text-white"
                                })
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base font-semibold text-gray-900",
                                children: "NGO Registration"
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-1",
                                children: "Ministry Certified"
                            })]
                        }), e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4",
                                children: e.jsx("i", {
                                    className: "ri-star-line text-3xl sm:text-4xl text-white"
                                })
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base font-semibold text-gray-900",
                                children: "4-Star Rating"
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-1",
                                children: "Charity Navigator"
                            })]
                        }), e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4",
                                children: e.jsx("i", {
                                    className: "ri-verified-badge-line text-3xl sm:text-4xl text-white"
                                })
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base font-semibold text-gray-900",
                                children: "Tax Exempt"
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-1",
                                children: "URA Approved"
                            })]
                        }), e.jsxs("div", {
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4",
                                children: e.jsx("i", {
                                    className: "ri-eye-line text-3xl sm:text-4xl text-white"
                                })
                            }), e.jsx("p", {
                                className: "text-sm sm:text-base font-semibold text-gray-900",
                                children: "94% Transparency"
                            }), e.jsx("p", {
                                className: "text-xs sm:text-sm text-gray-600 mt-1",
                                children: "GuideStar Seal"
                            })]
                        })]
                    })]
                })]
            })
        }), e.jsx("section", {
            className: "py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-900",
            children: e.jsxs("div", {
                className: "max-w-4xl mx-auto text-center",
                children: [e.jsx("h2", {
                    className: "text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6",
                    children: "Donate with Confidence"
                }), e.jsx("p", {
                    className: "text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed",
                    children: "Your donation is managed with complete transparency and maximum impact"
                }), e.jsx(r, {
                    to: "/donate",
                    className: "inline-block px-10 sm:px-12 py-4 sm:py-5 bg-amber-500 text-white text-lg sm:text-xl font-bold rounded-full hover:bg-amber-600 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer whitespace-nowrap",
                    children: "Make a Donation"
                })]
            })
        })]
    })
}
export {o as default};
//# sourceMappingURL=page-CcdoHAIn.js.map
