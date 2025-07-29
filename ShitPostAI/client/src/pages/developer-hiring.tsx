import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { Code, Ticket, CheckCircle } from "lucide-react";

const developerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  experience: z.string().min(1, "Experience level is required"),
  techStack: z.array(z.string()).min(1, "Please select at least one technology"),
  githubProfile: z.string().optional(),
  portfolioWebsite: z.string().optional(),
  motivation: z.string().min(10, "Please provide more details about your motivation"),
});

type DeveloperFormData = z.infer<typeof developerSchema>;

const techStackOptions = [
  "React/Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "Vue.js",
  "Go",
];

export default function DeveloperHiring() {
  const [submitted, setSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState("");
  const { toast } = useToast();

  const form = useForm<DeveloperFormData>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      experience: "",
      techStack: [],
      githubProfile: "",
      portfolioWebsite: "",
      motivation: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: DeveloperFormData) => {
      const res = await apiRequest("POST", "/api/developer-applications", data);
      return res.json();
    },
    onSuccess: (data) => {
      setQueueNumber(data.queueNumber);
      setSubmitted(true);
      toast({
        title: "Application Received!",
        description: "Your developer application has been submitted successfully.",
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

  const onSubmit = (data: DeveloperFormData) => {
    submitMutation.mutate(data);
  };

  const handleTechStackChange = (tech: string, checked: boolean) => {
    const currentStack = form.getValues("techStack");
    if (checked) {
      form.setValue("techStack", [...currentStack, tech]);
    } else {
      form.setValue("techStack", currentStack.filter(item => item !== tech));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border border-gray-200">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="text-2xl text-purple-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
              <p className="text-gray-600 mb-4">Your developer application has been submitted successfully.</p>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-purple-700">Your Queue Number:</p>
                <p className="text-2xl font-bold text-purple-600">#{queueNumber}</p>
              </div>
              <p className="text-sm text-gray-500">Please save this queue number for future reference. We'll contact you within 3-5 business days.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Join Our Developer Team
          </h1>
          <p className="text-xl text-gray-600">Apply to become a developer at ShitPost and help build the future</p>
        </div>

        <Card className="shadow-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-6 w-6 text-purple-600" />
              Developer Application
            </CardTitle>
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
                          <Input placeholder="Jane Developer" {...field} />
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
                          <Input type="email" placeholder="jane@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years (Junior)</SelectItem>
                          <SelectItem value="2-4">2-4 years (Mid-level)</SelectItem>
                          <SelectItem value="5-7">5-7 years (Senior)</SelectItem>
                          <SelectItem value="8+">8+ years (Lead/Principal)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="techStack"
                  render={() => (
                    <FormItem>
                      <FormLabel>Primary Technology Stack *</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {techStackOptions.map((tech) => (
                          <FormField
                            key={tech}
                            control={form.control}
                            name="techStack"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={tech}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(tech)}
                                      onCheckedChange={(checked) => {
                                        handleTechStackChange(tech, checked as boolean);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {tech}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Profile</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://github.com/yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolioWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio Website</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://yourportfolio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join ShitPost? *</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-32 resize-none"
                          placeholder="Tell us about your motivation and what you can bring to our team..."
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
                >
                  {submitMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Code className="mr-2 h-5 w-5" />
                      Apply for Developer Position
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
