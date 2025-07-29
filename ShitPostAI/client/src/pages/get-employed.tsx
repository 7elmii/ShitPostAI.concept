import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, CloudUpload, Send } from "lucide-react";

const employmentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  desiredPosition: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type EmploymentFormData = z.infer<typeof employmentSchema>;

export default function GetEmployed() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmploymentFormData>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      desiredPosition: "",
      additionalInfo: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: EmploymentFormData & { resume: File }) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      if (data.desiredPosition) formData.append("desiredPosition", data.desiredPosition);
      if (data.additionalInfo) formData.append("additionalInfo", data.additionalInfo);
      formData.append("resume", data.resume);

      const response = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Your resume has been successfully uploaded to our database.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmploymentFormData) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please upload your resume first.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate({ ...data, resume: selectedFile });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Only PDF, DOC, and DOCX files are allowed.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border border-gray-200">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-2xl text-green-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-4">Your resume has been successfully uploaded to our database.</p>
              <p className="text-sm text-gray-500">Our AI will analyze your profile and match you with suitable opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Get Employed Fast
          </h1>
          <p className="text-xl text-gray-600">Upload your resume and let our AI match you with perfect opportunities</p>
        </div>

        <Card className="shadow-2xl border border-gray-200">
          <CardHeader>
            <CardTitle>Job Application</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desiredPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer, Marketing Manager, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume *</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('resume-upload')?.click()}
                  >
                    <CloudUpload className="text-4xl text-gray-400 mb-4 h-10 w-10 mx-auto" />
                    <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <div className="mt-3 text-indigo-600 font-medium">
                        Selected: {selectedFile.name}
                      </div>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-24 resize-none"
                          placeholder="Tell us about your experience, skills, or preferences..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  {submitMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
