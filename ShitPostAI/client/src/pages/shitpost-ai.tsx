import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Video, Scissors, Type, ThumbsUp, Cpu, Edit, Globe, Crown } from "lucide-react";

export default function ShitPostAI() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$14.99",
      period: "/month",
      description: "Perfect for getting started with AI content creation",
      features: [
        "Search for video ideas",
        "Clip YouTube videos", 
        "Add subtitles with custom fonts",
        "50hrs of YouTube footage per month",
        "Basic customer support"
      ],
      limitations: [
        "Limited font options",
        "50hr monthly limit",
        "No 3D content generation",
        "No thumbnail assistance"
      ],
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      id: "pro", 
      name: "Pro",
      price: "$24.99",
      period: "/month",
      description: "Advanced tools for serious content creators",
      features: [
        "Everything in Basic",
        "3D generated videos with subtitles",
        "Logo import functionality", 
        "75hrs of YouTube footage per month",
        "Thumbnail assistance for long-form videos",
        "Priority customer support"
      ],
      limitations: [
        "75hr monthly limit",
        "No algorithmic breakdowns",
        "No script writing tools"
      ],
      icon: Star,
      color: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      id: "ultra",
      name: "Ultra", 
      price: "$34.99",
      period: "/month",
      description: "Complete AI-powered content creation suite",
      features: [
        "Everything in Basic & Pro",
        "Unlimited YouTube footage",
        "Algorithmic breakdowns (TikTok, Instagram, YouTube)",
        "AI script writing assistant",
        "Online video editing platform",
        "Advanced analytics dashboard",
        "24/7 premium support"
      ],
      limitations: [],
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      popular: false
    }
  ];

  const aiFeatures = [
    {
      icon: Video,
      title: "Video Clipping AI",
      description: "Automatically identify and clip the best moments from your content using advanced AI analysis",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Type,
      title: "Caption Generation",
      description: "Generate engaging, contextual captions that boost your social media engagement",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Cpu,
      title: "3D Content Creation",
      description: "Create stunning 3D videos and animations with just a text description",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Globe,
      title: "Algorithm Analysis",
      description: "Understand how TikTok, Instagram, and YouTube algorithms work to optimize your content",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: ThumbsUp,
      title: "Thumbnail Assistant",
      description: "Generate eye-catching thumbnails that increase your video click-through rates",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Edit,
      title: "Script Writing",
      description: "AI-powered script generation for videos, podcasts, and social media content",
      color: "bg-cyan-100 text-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShitPost AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              The most advanced AI-powered content creation platform. Generate captions, clip videos, 
              create 3D content, and understand social media algorithms like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold hover:opacity-90"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Creating Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 text-lg font-semibold hover:bg-indigo-50"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-600">Everything you need to create viral content</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow p-6">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Flexible pricing for creators at every level</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  className={`relative hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
                  } ${selectedPlan === plan.id ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-500 text-white px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={`w-full py-3 font-semibold ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : `Choose ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Cancel anytime
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                14-day free trial
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Regular updates
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Community access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Detailed Feature Comparison</h2>
            <p className="text-xl text-gray-600">See exactly what's included in each plan</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Basic</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Ultra</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Video idea search</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">YouTube video clipping</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Subtitle generation</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">Basic fonts</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Monthly footage limit</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">50 hours</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">75 hours</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">3D video generation</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Logo import</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Thumbnail assistance</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Algorithm breakdowns</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">AI script writing</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Online video editor</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join over 100,000 creators who are already using ShitPost AI to create viral content and grow their audience.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-indigo-600 px-8 py-4 text-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Your 14-Day Free Trial
          </Button>
          <p className="text-indigo-200 mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}