import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Sparkles, Upload, FileText, MessageSquare, Target, TrendingUp } from "lucide-react";

export default function AiTool() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const { toast } = useToast();

  const aiQueryMutation = useMutation({
    mutationFn: async (data: { query: string }) => {
      const res = await apiRequest("POST", "/api/ai-queries", data);
      return res.json();
    },
    onSuccess: (data) => {
      setResponse(data.response);
      setShowResponse(true);
      toast({
        title: "AI Analysis Complete",
        description: "Your career insights are ready!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process your request",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question or description first.",
        variant: "destructive",
      });
      return;
    }
    aiQueryMutation.mutate({ query });
  };

  const setPrompt = (prompt: string) => {
    setQuery(prompt + ": ");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQuery(`Analyzing uploaded resume: ${file.name}`);
      toast({
        title: "File Selected",
        description: `Selected: ${file.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            AI Career Assistant
          </h1>
          <p className="text-xl text-gray-600">Get personalized career advice and insights powered by advanced AI</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-indigo-600" />
              Career Guidance Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2">What career guidance do you need?</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrompt("Resume Review")}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                >
                  <FileText className="mr-1 h-4 w-4" />
                  Resume Review
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrompt("Interview Prep")}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Interview Prep
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrompt("Career Path")}
                  className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200"
                >
                  <Target className="mr-1 h-4 w-4" />
                  Career Path
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPrompt("Skill Development")}
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                >
                  <TrendingUp className="mr-1 h-4 w-4" />
                  Skill Development
                </Button>
              </div>
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your career question or upload your resume for analysis..."
                className="h-32 resize-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={handleSubmit}
                disabled={aiQueryMutation.isPending}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
              >
                {aiQueryMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Insights
                  </>
                )}
              </Button>

              <div className="flex items-center space-x-4">
                <Label htmlFor="resume-upload" className="flex items-center cursor-pointer text-indigo-600 hover:text-indigo-700">
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Label>
              </div>
            </div>

            {showResponse && (
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Sparkles className="text-indigo-600 mr-2 h-5 w-5" />
                    AI Career Assistant Response
                  </h4>
                  <div
                    className="text-gray-700 space-y-3"
                    dangerouslySetInnerHTML={{ __html: response }}
                  />
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
