import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About ShitPost
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing content creation and professional networking
              through cutting-edge AI technology, helping creators and
              professionals reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025 by 4 friends, ShitPost AI helps new creators and
                social media personalities discover how to make it in the
                battleground called social media.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                At ShitPost, we believe that everyone deserves access to
                powerful tools that can transform their creative and
                professional journey. Our AI-powered platform democratizes
                content creation, making professional-grade tools accessible to
                creators and job seekers alike.
              </p>
              <p className="text-lg text-gray-600">
                From AI-generated content to intelligent career matching, we're
                building the future of digital productivity and creative
                expression.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">100K+</h3>
                  <p className="text-sm text-gray-600">Active Users</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">50M+</h3>
                  <p className="text-sm text-gray-600">AI Generations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that drive everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Innovation First
                </h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible with AI
                  technology, delivering cutting-edge solutions that stay ahead
                  of the curve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  User-Centric
                </h3>
                <p className="text-gray-600">
                  Every feature we build is designed with our users in mind,
                  ensuring intuitive experiences that truly solve real-world
                  problems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quality Excellence
                </h3>
                <p className="text-gray-600">
                  We maintain the highest standards in everything we deliver,
                  from our AI models to our user interface design and customer
                  support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              The brilliant minds behind ShitPost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">HE</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Helmi
                </h3>
                <p className="text-indigo-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  With sales experience and a leveled head, leads the team to a
                  brighter future.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">LH</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Laith
                </h3>
                <p className="text-purple-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Head of the coding department and AI development with 4+ yrs,
                  to create excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">BD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bader
                </h3>
                <p className="text-emerald-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Algorithm research department leader, head of account
                  management and product management makes everything possible
                  with his mindset.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">MH</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mohammed
                </h3>
                <p className="text-orange-600 mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Exceptional graphic designer leading the design process and
                  quality assurance making sure everything is up to standard.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and professionals who are already
            transforming their work with ShitPost AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shitpost-ai"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Try ShitPost AI
            </a>
            <a
              href="/get-employed"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Get Employed
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
