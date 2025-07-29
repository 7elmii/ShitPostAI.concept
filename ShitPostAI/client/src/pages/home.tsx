import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Rocket, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShitPost
              </span>
              <br />
              <span className="text-gray-900">AI-Powered Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Revolutionizing professional networking and career advancement through cutting-edge AI technology and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shitpost-ai">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                  <Brain className="mr-2 h-5 w-5" />
                  Try ShitPost AI
                </Button>
              </Link>
              <Link href="/get-employed">
                <Button variant="outline" className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 text-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Employed Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="glass-morphism hover:transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
                <p className="text-gray-600">Advanced algorithms connect talent with opportunities using intelligent matching technology.</p>
              </CardContent>
            </Card>

            <Card className="glass-morphism hover:transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fast Track Hiring</h3>
                <p className="text-gray-600">Streamlined application process that gets you hired faster than traditional methods.</p>
              </CardContent>
            </Card>

            <Card className="glass-morphism hover:transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Network</h3>
                <p className="text-gray-600">Connect with industry professionals and expand your career opportunities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
